# Express

<img src="../assets/nodejs/express.png" alt="express">

## ➢ 奇怪的错误捕获

背景：在进行全链路数据采集时，发现 express 框架下，res 对象内只有 statusMessage 和 statusCode 能够获取到错误相关的信息，无法从 res 对象内获取到错误堆栈信息

参考 [express error handling](https://expressjs.com/zh-cn/guide/error-handling.html) 我们不难发现，当发生一个错误时，会将以下信息按照以下规则绑定到 res 对象上：

1. `res.statusCode` 会根据 `err.status || err.statusCode` 进行赋值，如果值不是 400 - 500 范围内，统一设置为 500；
2. `res.statusMessage` 根据 `statusCode` 进行赋值；
3. 在生产环境，返回 body 为 statusCode 和 statusMessage，或者为 err.stack

除此之外，我们发现 express 一定要将错误处理中间件放在末尾，且需要传多一个 `err` 参数

<b>Case1: error middleware 在 route 之前，会直接返回错误堆栈，而不是 `Something failed!`</b>

> "如果将任何项传递到 next() 函数（除了字符串 'route'），那么 Express 会将当前请求视为处于错误状态，并跳过所有剩余的非错误处理路由和中间件函数"

```javascript
function md1 (req, res, next) {
  console.log('md1')
  next()
}
app.use(md1)
app.use((err, req, res, next) => {
  console.log('Enter in Error!')
  res.status(500).send({ error: 'Something failed!' })
})
app.get('/md', (req, res) => {
  throw new Error('1')
})

// console.log
// md1
// ===> 500 return err.stack
```

<b>Case2: error middleware 在最后，返回结果 `Something failed!`</b>

```javascript
function md1 (req, res, next) {
  console.log('md1')
  next()
}
app.use(md1)
app.get('/md', (req, res) => {
  throw new Error('1')
})
app.use((err, req, res, next) => {
  console.log('Enter in Error!')
  res.status(500).send({ error: 'Something failed!' })
})

// console.log
// md1
// Enter in Error!
// ===> 500 return Something failed!
```

小小的👀，大大的困惑：

1. 为什么需要将错误处理放在最后面？
2. `app.use` 如何处理 error handle? middleware 如何根据传参个数来发起不同的处理？
3. `next(err)` 如何传递错误信息到下一个 middleware?
4. express 如何设置 res.statusCode、res.statusMessage 以及 err.stack ?


## ➢ 源码解读

> 当遇到问题时，不妨从源码找找思路           ---Y

首先，我们看看在初始化一个 express 实例时，发生了什么？

```javascript
// express.js
/**
 * 用来创建 express 应用，当执行 express() 回调用 app()，返回 app 实例及其包含属性
 * 1. 这里 req\res 为通过 Object.defineProperty() 定义的对象，并在上下文内进行引用
 * 2. next 指向回调函数的引用
 */
function createApplication() {
  var app = function(req, res, next) {
    app.handle(req, res, next);
  };

  mixin(app, EventEmitter.prototype, false);
  mixin(app, proto, false);

  // 暴露 request 原型对象
  app.request = Object.create(req, {
    app: { configurable: true, enumerable: true, writable: true, value: app }
  })

  // 暴露 response 原型对象
  app.response = Object.create(res, {
    app: { configurable: true, enumerable: true, writable: true, value: app }
  })

  // init() 定义 app 内 settings 内容
  app.init();
  return app;
}

// application.js
/**
 * 将 req, res 分发到应用程序中，并开始管道处理
 */
app.handle = function handle(req, res, callback) {
  var router = this._router;

  /**
   * 如果没有传递 callback, 则默认为最后一步，将其处理为 finalhandler
   * Node.js function to invoke as the final step to respond to HTTP request，参考 https://www.npmjs.com/package/finalhandler
   * <b>在 callback 为空情况下，通过调用 finalhandler 设置 res.statusCode、res.statusMessage 以及 err.stack</b>
   */
  var done = callback || finalhandler(req, res, {
    env: this.get('env'),
    onerror: logerror.bind(this)
  });

  // 如果当前 router 为空，则执行
  if (!router) {
    debug('no routes defined on app');
    done();
    return;
  }

  router.handle(req, res, done);
}
```

紧接着，我们通过会调用 `app.use()` 来挂载中间件回调：

```javascript
// application.js

app.use = function use(fn) {
  var offset = 0;
  var path = '/';

  // 默认 path 为 /
  // 这里兼容处理传入多个 middleware 的情况
  if (typeof fn !== 'function') {
    var arg = fn;

    while (Array.isArray(arg) && arg.length !== 0) {
      arg = arg[0];
    }

    // 处理第一个参数为 path 的情况
    if (typeof arg !== 'function') {
      offset = 1;
      path = fn;
    }
  }

  // 获得中间件集合
  var fns = flatten(slice.call(arguments, offset));

  if (fns.length === 0) {
    throw new TypeError('app.use() requires a middleware function')
  }

  /**
   * lazyrouter() 用来返回 Router 对象，如果 router 对象为空，则进行初始化，初始化时做了两件事情：
   * 1. query() 内解析 url 并将 query 参数赋值给 req.query
   * 2. 将 res, req, next 绑定到 app 实例上
   */
  this.lazyrouter();
  var router = this._router;

  // 之后，遍历参数，将其生成 layer 并放到到指定路径的  router 对象的 stack 属性内
  fns.forEach(function (fn) {
    // non-express app
    if (!fn || !fn.handle || !fn.set) {
      return router.use(path, fn);
    }

    debug('.use app under %s', path);
    fn.mountpath = path;
    fn.parent = this;

    router.use(path, function mounted_app(req, res, next) {
      var orig = req.app;
      fn.handle(req, res, function (err) {
        setPrototypeOf(req, orig.request)
        setPrototypeOf(res, orig.response)
        next(err);
      });
    });

    // mounted an app
    fn.emit('mount', this);
  }, this);

  return this;
};
```

在 `router.use()` 内，我们可以看到它将传入的所有回调按照顺序生成 layer 对象，并放入执行堆栈，最后将堆栈挂载到 router 对象上

```javascript
// router/index.js

proto.use = function use(fn) {
  var offset = 0;
  var path = '/';

  if (typeof fn !== 'function') {
    var arg = fn;

    while (Array.isArray(arg) && arg.length !== 0) {
      arg = arg[0];
    }

    if (typeof arg !== 'function') {
      offset = 1;
      path = fn;
    }
  }

  var callbacks = flatten(slice.call(arguments, offset));

  if (callbacks.length === 0) {
    throw new TypeError('Router.use() requires a middleware function')
  }

  for (var i = 0; i < callbacks.length; i++) {
    var fn = callbacks[i];

    if (typeof fn !== 'function') {
      throw new TypeError('Router.use() requires a middleware function but got a ' + gettype(fn))
    }

    // add the middleware
    debug('use %o %s', path, fn.name || '<anonymous>')

    var layer = new Layer(path, {
      sensitive: this.caseSensitive,
      strict: false,
      end: false
    }, fn);

    layer.route = undefined;

    this.stack.push(layer);
  }

  return this;
};


// router/layer.js
// 我们可以看到在 Layer 内，通过一些属性来标识 middleware，并记录其回调
function Layer(path, options, fn) {
  if (!(this instanceof Layer)) {
    return new Layer(path, options, fn);
  }

  debug('new %o', path)
  var opts = options || {};

  this.handle = fn;
  this.name = fn.name || '<anonymous>';
  this.params = undefined;
  this.path = undefined;
  this.regexp = pathRegexp(path, this.keys = [], opts);

  // set fast path flags
  this.regexp.fast_star = path === '*'
  this.regexp.fast_slash = path === '/' && opts.end === false
}
```

通过上面的代码我们知道 express 所有 path 生成一个 Router 对象，其 stack 属性内挂载了所有中间件及其执行方法，那么，当我们在调用一个方法时，实际发生了什么呢？

```javascript
// application.js

app.all = function all(path) {
  this.lazyrouter();

  // 调用 router.route 方法
  var route = this._router.route(path);
  var args = slice.call(arguments, 1);

  for (var i = 0; i < methods.length; i++) {
    route[methods[i]].apply(route, args);
  }

  return this;
};

// router/index.js
/**
 * 为每个 path 创建一个新的 Router 对象，并将带有结束标志的 layer 放在 stack 的最后
 * 每一个 route 都有一个独立的中间件堆栈
 */
proto.route = function route(path) {
  var route = new Route(path);

  var layer = new Layer(path, {
    sensitive: this.caseSensitive,
    strict: this.strict,
    end: true
  }, route.dispatch.bind(route));

  layer.route = route;

  this.stack.push(layer);
  return route;
};

// ...这里我们省略了匹配到 path 后的中间环节，直接看看当发生 router 内回调错误后，在 error handle 内是怎么处理的...

// router/layer.js

Layer.prototype.handle_error = function handle_error(error, req, res, next) {
  var fn = this.handle;

  // 如果回调形参个数不等于 4，直接跳过，返回给下一个中间件处理
  if (fn.length !== 4) {
    return next(error);
  }

  // 否则，处理错误，一般在 fn 内通过显式调用 `next(err)` 来传递给下一个中间件处理
  try {
    fn(error, req, res, next);
  } catch (err) {
    next(err);
  }
};
```

### 针对错误捕获表现的合理解释

通过对源码的解析，我们不难对上述问题做出解释：express() 在生产出 app 实例之后，经过 `use(), get()` 等一系列方式为其添加回调方法（中间件），在这个过程中，会按照加载顺序将其写入 `router.stack` 数组内，当我们调用该方法时，会按照 stack 的顺序依次执行；

但是<b>当且仅当传递 err 对象</b> 时，才会执行错误捕获的中间件，而这种情况：1) 执行错误，在 `get()` 等调用方法内部发生；2) 通过 `next(err)` 显式调用；

因此，这也解释了当我们把错误捕获中间件放在中间位置时，不被执行，而是直接跳过执行下一个中间件，因为其上一个中间件是调用的 `next()` 而不是 `next(err)`，即一旦错误被捕获到，只能通过 `next(err)` 继续在中间内流转；

最后，当回调为空或者显式调用 `done()` 方法时，会调用 `finalHander` 为 statusCode 和 statusMessage 进行赋值!


