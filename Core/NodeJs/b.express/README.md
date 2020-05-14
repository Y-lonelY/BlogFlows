### 路由

路由是指如何定义应用的端点以及如何响应客户端的请求

路由结构 `app.httpMethod(path, callback)`

 - app 是 express 对象的一个实例

 - httpMethod 是指 http 请求方法

 - path 服务器上的路径

 - callback 路由匹配时的执行函数

`app.all()` 是一个特殊的路由方法，没有 http 方法与其对应，它的作用是对于一个路径上所有的请求加载中间件。这意味着不管使用什么 http 方法，其回调函数都会执行

路由路径可以是字符串或者正则表达式

可以为请求处理提供多个回调函数，可以是多个函数或者是一个函数数组，并且这些回调函数可能调用 `next()` 方法将控制权交给剩下的函数处理

> 注意 r1() 内不能调用 res.send() 方法，会直接报错 *Error: Can't set headers after they are sent.*

```javascript
const r1 = function(req, res, next) {
  console.log('response will be sent by the next function...');
  next();
}
const r2 = function(req, res) {
  res.send('i am the next function!');
}
const route = [r1, r2];
```

响应对象（res）的方法向客户端返回响应，终结请求响应的循环，如果一个响应方法都不调用，来自客户端的请求会一直挂起

 - res.download() 提示下载文件

 - res.end() 终结响应处理流程

 - res.json() 发送一个JSON格式的响应

 - res.jsonp() 发送一个支持JSONP的JSON格式响应

 - res.redirect() 重定向请求

 - res.render() 渲染视图模板

 - res.send() 发送各种类型的响应

 - res.sendFile 以八位字节流的形式发送文件

 - res.sendStatus() 设置响应状态代码，并将其以字符串形式作为响应体的一部分

`app.route()` 可以创建路由路径的链式路由句柄

```javascript
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
```

### 中间件

中间件是一个函数，它可以访问 req(请求对象)，res(响应对象)，next(web应用中处于请求-响应循环流程中的中间件)

中间件的功能

 - 执行任何代码

 - 修改请求和响应对象

 - 终结请求-响应循环

 - 调用堆栈中的下一个中间件

---
**应用级中间件**

应用级中间件绑定到 **app对象**，使用 `app.use()` 或者 `app.httpMethod()` 挂载

```javascript
const express = require('express');
const app = express();

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function(req, res, next) {
  ...
  });

// 挂载至 /supreme 的中间件，任何指向 /supreme 路径的请求都会执行它  
app.use('/supreme', function(req, res, then) {
  ...
  });

// 中间件系统，处理指向 /supreme 的 get 请求
app.get('/supreme',function(req, res, then) {
  ...
  });
```

---
**路由级中间件**

路由级中间件绑定到 **express.Router()**，使用 `router.use()` 或者 `router.httpMethod()` 挂载，一般用于构建模块

```javascript
const express = require('express');
const app = express();
const router = express.Router();

// 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
router.use(function(req, res, next) {
  ...
  });

// 一个中间件栈，任何指向 /supreme 路径的请求都会执行它
router.use('/supreme', function(req, res, next) {
  ...
  });

// 一个中间件栈，处理指向 /supreme 的 get 请求   
router.get('/supreme', function(req, res, next) {
  ...
  });

// 将路由挂载至应用
app.use('/', router);  
```

---
**错误处理中间件**

错误处理中间件时必须使用4个参数（err, req, res, next），即使不需要 next 对象，也必须在签名中声明，否则中间件会被识别为一个常规中间件，不能处理错误

```javascript
const express = require('express');
const app = express();

app.use(function(err, req, res, next) {
  res.status(500).send('Something broke!');
  });
```

在其他 `app.use()` 和 路由调用后，最后定义错误处理中间件

向 `next()` 传入参数（除字符串'route'外），express 会认为当前请求有错误的输出，因此跳过其他非错误处理的路由/中间件函数

express 内置了一个错误处理函数，它被添加到中间件堆栈的底部，可以捕获应用中可能出现的任何错误

---
**内置中间件**

`express.static(root, [options])` 是 express 唯一内置的中间件，负责在 express 应用内托管静态资源。参数 root 指提供静态资源的根目录

所有文件的路径都是相对于存放目录的，因此，存放静态资源的目录名不会出现在 url 中

可以通过为静态资源目录制定一个挂载路径的方式来将访问资源存放在一个“虚拟目录”下

```javascript
app.use('/static', express.static('public'));
// 然后可以通过带有 '/static' 前缀的地址来访问 public 目录下的文件
http://localhost:3000/static/images/test.jpg
```

### Request 对象

<a href="src/supreme.js">Request对象实例</a>

request 对象代表 Http 请求，包含了请求查询字符串，参数，内容等属性

> egg: `http://127.0.0.1:3204/supreme/req`

1. req.baseUrl > 路由的 url 路径 > '/supreme'

2. req.path > 路由的请求路径 > '/req'

3. req.hostname > 获取主机名 > '127.0.0.1'

4. req.ip > 获取 ip 地址 > '127.0.0.1'

5. req.originalUrl > 原始请求路径 > '/supreme/req'

6. req.protocol > 协议类型 > 'http'

7. req.xhr > 请求头的 X-Requested-With 是否为 XMLHttpRequest，表明请求是否有诸如 JQuery 之类的客户端库发布的 > false

8. req.fresh > 表明请求是否“新鲜” > false

9. req.stale > 表明请求是否“陈旧” > true