# this

JavaScript 中的 `this` 究竟是个什么东西？

我理解的this，就是一个指针，指向一个对象，所以理解 this 的关键在于这个对象

先抛出一个结论：在 JavaScript 内，this 指向的对象会根据声明和调用方式的不同而改变，甚至和js是否启用严格模式有关


## 声明方式

### 箭头函数

箭头函数用于解决函数内 this 指向不明确的情况，箭头函数在定义时就已经明确了this的指向

可以引申一下，在 react 内绑定事件的几种方式，一种是通过 `func.bind(this)` 来显示地将当前实例对象绑定到 func 上，即将其调用时的 this 指向当前实例对象，这样才能使用实例对象内的方法和属性，不然其this会指向触发事件的元素，而通过箭头函数声明的方法则不需要显示绑定，因为它调用时的this指向它声明时的this，即当前实例对象

```js
// es6 之前版本
function Person() {
  this.a = 'a';
  this.b = {
    a: 'aaa',
    t: function() {
      return this.a;
    }
  };
}

// 当调用 t() 方法时，this 指向其调用者，即 this === new Person().b，所以 this.a === 'aaa'
new Person().b.t(); // 'aaa'

// es6 版本，对上面函数稍作修改
function Person() {
  this.a = 'a';
  this.b = {
    a: 'aaa',
    t: () => {
      return this.a;
    }
  };
}

// 通过箭头函数声明的方法，其this指向是定义时this的指向，即在 new Person() 时 this 指向该 Person 的实例对象
// 因此 t() 在定义时 this 就指向其构造函数的实例
new Person().b.t(); // 'a'
```

### 全局函数和对象内声明

在全局环境内声明一个函数，其 this 指向 window 对象，**如果是在严格模式下，则this === undefined**，可以这么理解，test() 是全局环境内的一个方法，即 `window.test`，当调用时，其 this 指向其调用对象，即 window

```js
// ’use strict‘
function test() {
	console.log(this);
}
test(); // 输出 Window 对象，严格模式下输出 undefined
```

同理，如果函数在对象内通过 function 进行声明，则 this 指向该对象，即obj，但是如果通过箭头函数声明，其this还是会指向window对象

```js
var obj = {
	handler: function() {
		console.log(this);
	}
};
obj.handler();
```

## 元素的事件绑定

分为两种元素事件绑定：`addEventListener()` 和 `onclick()`，即一个DOM事件处理，一个内联事件处理

先看看第一种情况，作为DOM事件处理时，其this指向触发事件的元素，即 `<button id="btn">click</button>`，那么如果此时希望this是指向obj呢？

- 通过闭包来解决
- 通过`bind()`方法

```html
<body>
	<button id="btn">click</button>
</body>
</html>

<script type="text/javascript">
	var btn = document.querySelector('#btn');
	var obj = {
		handler: function() {
			console.log(this);
		}
	};
	btn.addEventListener('click', obj.handler);

	// 闭包解决
	btn.addEventListener('click', function() {
		// 在触发时，执行闭包函数，函数内执行obj.handler()，从而绑定this到obj
		obj.handler();
	});

	// bind() 显示将this指向obj
	btn.addEventListener('click', obj.handler.bind(obj));
</script>
```

第二种情况，通过内联事件处理来绑定事件，如下，此时 this 指向 obj，可以观察出一些东西，即 `()` 在其中扮演了一个重要的角色，`obj.handler()` 和 `obj.handler` 会造成其 this 的指向发生变化

```html
<body>
	<button id="btn" onclick="obj.handler()">click</button>
</body>
</html>

<script type="text/javascript">
	var obj = {
		handler: function() {
			console.log(this);
		}
	};
</script>
```


## bind

提到 this，就不得不说说 `bind()` 函数

`bind()` 方法会创建一个新的函数，其 `this` 被指定为 `bind()` 的第一个参数，其余参数作为新函数的参数

```js
// bind() polyfill
if (!Function.prototype.bind) (function(){
  // 保存 slice 方法，用于切割和拷贝 arguments
  var slice = Array.prototype.slice;
  Function.prototype.bind = function() {
    var thatFunc = this, thatArg = arguments[0];
    var args = slice.call(arguments, 1);
    if (typeof thatFunc !== 'function') {
      throw new TypeError('Function.prototype.bind - ' +
             'what is trying to be bound is not callable');
    }
    return function(){
      var funcArgs = args.concat(slice.call(arguments))
      return thatFunc.apply(thatArg, funcArgs);
    };
  };
})();
```

bind方法和call/apply方法的区别在于

- bind 会返回一个新的函数，且不会自己调用
- call/apply 会在使用时调用一次

`call()` 和 `apply()` 也都是用来改变 this 指向对象，区别在于传参不同

- `call(newThis, params1, params2...)` 第一个参数为函数上下文对象，后面传入参数
- `apply(newThis, [params1, params2...])` 第一个参数为函数上下文对象，第二个参数为包裹传入参数的列表

```js
let obj = {
  name: 'ylone',
}

function test(age, job) {
  return [this.name, age, job];
}

// ['ylone', 26, 'engineer']
test.bind(obj, 26, 'engineer')();
test.apply(obj, [26, 'engineer']);
test.call(obj, 26, 'engineer');
```


### Array.prototype.slice.call(arguments)

在开发过程中，会发现经常会用到 `Array.prototype.slice.call(arguments)`，这一步实际上是对arguments进行拷贝，并且将其转换成为一个数组，看看下面的例子

其原理就是能将具有length属性的对象转成数组，常用的方法：

- `Array.prototype.slice.call(args)`
- `[].slice.call(args)`
- `Array.from(args)`
- 通过for循环进行push操作

```js
function test(a,b,c) {
  var args = arguments;
  console.log(arguments.length); // 3
  console.log(Array.isArray(args)); // false
  console.log(typeof args); // object
  console.log(Object.prototype.toString.call(args)); // '[object Arguments]'

  // 通过 Array.from() 或者 Array.prototype.slice.call() 来将其转换为数组的数据类型
  var arr = Array.from(args);
  var arr = Array.prototype.slice.call(args);

  console.log(Array.isArray(arr)); // true
  console.log(typeof arr); // object
  console.log(Object.prototype.toString.call(arr)); // '[object Array]'
}
test(1,2,3);
```


