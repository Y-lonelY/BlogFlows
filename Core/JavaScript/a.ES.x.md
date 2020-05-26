<!-- MarkdownTOC -->

- [import && export](#import--export)
- [Promise](#promise)
- [class](#class)
  - [super 关键字](#super-%E5%85%B3%E9%94%AE%E5%AD%97)
- [Array](#array)
  - [find](#find)
  - [聊聊foreach](#%E8%81%8A%E8%81%8Aforeach)
  - [初始化数组](#%E5%88%9D%E5%A7%8B%E5%8C%96%E6%95%B0%E7%BB%84)
  - [数组常用的操作方法](#%E6%95%B0%E7%BB%84%E5%B8%B8%E7%94%A8%E7%9A%84%E6%93%8D%E4%BD%9C%E6%96%B9%E6%B3%95)
- [Object](#object)
  - [keys\(\)](#keys)
- [Promise](#promise-1)
    - [Promise.prototype.then\(\)](#promiseprototypethen)
    - [Promise.prototype.catch\(\)](#promiseprototypecatch)
    - [Promise.prototype.finally\(\)](#promiseprototypefinally)

<!-- /MarkdownTOC -->

## import && export

ES6 Module 用来解决模块化的问题，将一个大文件拆分成互相依赖的小文件，再将其进行拼接

ES6 之前的 `require` 方法和 ES6 的 `module` 简单比较

**before ES6 -- require**
- `require` 是**运行时加载**，获取的是值的拷贝，这意味着一旦 require 成功，模块更改也不会影响已经 require 的模块
- require 方式获取值，在 class 内外都可以拿到值

**ES6 -- module**
- `module` 是**编译时加载**（或者说静态加载），ES6 可以在编译时就完成模块的加载，效率更高，获取的是文件
- import 方式获取值，在 class 外调值为 undefined，在 class 内调用能够正常拿到值，因为在实例化类的时候，才会去调用这个 import module
- `export` 的本质是在接口名和内部变量之间建立一一对应关系

## Promise

什么是 Promise ?
- Promise 主要用于异步计算
- 可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果
- 简单来讲，Promise 就是一个容器，里面保存着未来某个时间点才会结束的事件

promise的状态：
- 实例话Promise对象时，是 pending 状态
- 执行完后调用 resolve()，是 fulfilled 状态
- 执行完后调用 reject()，是 rejected 状态

当 promise 状态发生改变，就会触发 `.then()` 内的响应函数来处理后续步骤，并且只有异步操作的结果可以唯一决定当初对象的状态，其他操作都不能改变这个状态，且任何时候都能得到这个结果（这意味着可以通过一个变量来保存当前 Promise 实例，之后可以在任意时刻再通过 `.then` 进行处理）

```js
// 基本写法
new Promise(
  // 执行器
  function(resolve, reject) {
    // 执行一个耗时很久的异步操作

    // 事件处理完成
    resolve(data);
    // 事件处理出错
    reject();
  }
).then(function(data) {
  // 成功
}, function() {
  // 错误
})
```

Promise 时如何优化回调地狱的？
- 所谓回调地狱是指，函数一层一层嵌套，将函数作为参数和返回值进行传递

可以看到，第一个 then 方法内 return 了一个新的 Promise 对象，形成链式结构

```js
new Promise(resolve => {
  setTimeout(function() {
    resolve('hello')
  }, 2000);
}).then(data => {
  console.log(data);
  return new Promise(resolve => {
    setTimeout(function() {
      resolve('world');
    }, 2000);
  });
}).then(data => {
  console.log(data);
});
// hello world
```

`.then()` 函数：
- 接受两个参数，分别对应 fulfilled 和 rejected 状态
- 返回一个新的 promise 对象，因此可以链式调用
- 当新的 Promise 状态发生改变时，.then 会根据新 Promise 其最终状态进行执行
- 如果返回其他值（即不是 Promise，直接 return），则下一个 `.then()` 会立即执行
- 尽量不要在 `.then()` 内再去嵌套 then() 方法，直接展开，这样阅读体验更好


针对 Promise 的错误捕获
- 两种方式都可以进行捕获到 `rejected` 状态，一种是通过 `.then()` 传入两个函数，一种是通过 `.catch()` 方法
- catch() 方法也会返回一个 Promise 对象，最好在最后都添加一个 catch() 方法，因为它可以捕获到链路上发生的错误，即如果 then() 内发生了错误，它也可以捕获到

```js
new Promise(resolve => {
  setTimeout(() => {
    resolve();
  }, 1000);
})
.then(() => {
  throw(new Error('error!'))
})
// 当前 then() 会被跳过而直接执行 catch()，因为上一个 Promise 状态被置为 rejected
.then(() => {
  console.log('hello');
})
.catch(err => {
  console.log(err);
});
// Error: error!
```

`Promise.all(array)` 用于封装多个 promise(当然也可以是其他同步方法，会立即执行)，等待都执行完毕，发生状态改变后，返回一个新的 promise 对象
- 如果所有方法执行成功，返回一个包含各个方法结果的数组
- 如果发生了错误，则返回第一个错误发生时的 error
- 通常和 `map()` 连用

```js
let arr = [f1,f2,f3];

Promise.all(arr.map(item => {
  return new Promise(item);
}))
.then(arr => {
  // statement
})
```


## class

在ES6中，通过 `class` 定义一个类的时候，其通过 `constructor` 构造方法内定义的属性和方法是实例对象自己的，而 `constructor` 外定义的方法和属性则是所有实例对象可以共享的

### super 关键字

ES6 中 `super` 关键字有两种存在形式：

1. 作为函数，即 `super()`

通过 `super()` 调用，super() 代表父类的构造函数，但是其内部 this 指向当前子类实例

这是因为子类本身不具有this对象，而是继承父类的this对象，然后对其进行加工，如果不调用 `super()`，子类就无法得到this对象

ES6的继承机制，实质上是先创造父类的实例对象this，然后再用子类的构造函数修改this

注意：子类的构造函数内必须调用一次super()，且只能在 constructor() 内调用

```js
// new.target 指向当前正在执行的函数
class A {
  constructor() {
    console.log(new.target.name);
  }
}
class B extends A {
  constructor() {
    super();
  }
}
new A() // A
new B() // B
```

2. 作为对象，即 `super`，在普通方法内，指向父类的原型对象（即 `SuperClass.prototype`，可以结合 swift 内 super 来理解，访问超类的方法，属性和下标），在静态方法内，指向父类（即 `SuperClass`）

在子类普通方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类实例

```js
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
  }
}

let b = new B();
b.m() // 2
```


## Array

> Array对象是类似于列表的高阶对象，是在JavaScript内用于构造数组的全局对象

Array是一组有序列表，与其他语言相比，JavaScript内数组可以存放人意类型的数据，且数组大小可以动态调整

关注数组支持的方法，其实现效果，返回值，以及是否修改原数组

会修改原数组的方法（即指向同一引用）：`Array.pop()`, `Array.shift()`, `Array.push()`, `Array.unshift()`, `Array.reverse()`

返回一个新数组的方法（即指向不同引用）：`Array.from()`


### find

find()方法用来返回第一个满足条件的元素

```js
var a = [1,2,3].find(item => item > 1) // 2
```

### 聊聊foreach

foreach 是遍历数组的一个常用方法，但是其有一个特性很容易引起错误

- 在foreach循环内，只能通过抛出异常能够跳出整个循环
- 在foreach可以通过 return 来跳出当前循环，执行下一次循环
- 在foreach内如果使用break,continue会直接抛出错误，即它们只能在可迭代语句内使用，在函数内使用会报语法错误

```js
var a = [1,2,3,4,5];
  a.forEach(item => {
    if (item === 3) {
      // Uncaught SyntaxError: Illegal break statement
      break;
      // Uncaught SyntaxError: Illegal continue statement: no surrounding iteration statement
      continue;

      return false; // 1,2,4,5

      throw(new Error('jump')); // 1,2，但是会抛出一个自定义错误
    }
    console.log(item);
  })
```

另外，foreach 是按照 index 来进行遍历的，forEach 不会在迭代之前创建数组的副本，这意味着如果在遍历过程中添加或者删除，会影响其他元素的行为，所以不要在foreach内任意修改数组

```js
// 如果数组在迭代时被修改了，则其他元素会被跳过
var words = ['one', 'two', 'three', 'four'];
words.forEach(function(word) {
  console.log(word);
  if (word === 'two') {
    words.shift();
  }
}); // -> 'one' 'two' 'four'
```


### 初始化数组

```javascript
/**
 * 通过数组声明
 * 1. 可以通过 new Array() 来声明，其中 new 可以省略
 * 2. 更加常用的方法是通过 [] 操作符来声明
 * 3. ES6 提供 Array.of() 方法来声明数组 
 */
let arr1 = new Array() || new Array(10) || new Array("a", "b", "c")
let arr2 = ["a", "b", "c"]
let arr3 = Array.of("a", 1) -> ["a", 1]

/**
 * Array.from() 
 * 将 array-like 和 interable 对象(比如字符串)转换为数组
 *  array-like 要求很严格，必须key为从0开始的数字，且包含length属性
 * 常用在 DOMNodeList 来生成可遍历对象
 */
let pList = Array.from(document.querySelectorAll("p")); ->[p,...]
let strList = Array.from("123") -> ["1", "2", "3"]

/**
 * Array.fill()
 * 通过指定值来填充一个数组，原数组会被重新赋值，但是保持其数组长度不变
 */
arr2.fill(1) -> [1, 1, 1]
```

### 数组常用的操作方法

```javascript
/**
 * 通过索引访问数组
 * 在 JavaScript 中，以数字开头的属性不能用点号引用，必须用方括号
 * 下面的方法以 arr2 最为初始化对象
 */
let arr2 = ["a", "b", "c"]
arr2[arr2.length - 1] -> "c"

/**
 * 删除元素
 * pop() 删除最后一个元素，返回被删除元素的值，直接修改原数组
 * shift() 删除第一个元素，返回被删除元素的值，直接修改原数组
 * splice(start, nums) 来删除指定位置的元素，返回删除元素的数组，直接修改原数组
 */
arr2.pop() -> "c"
arr2.shift() -> "a"
// indexOf() 获取指定元素位置，返回一个Int类型
const index = arr.indexOf("a") -> 0
// 示从 index 开始，向后删除 1 个元素
arr2.splice(index, 1) -> ["a"]

/**
 * 添加元素
 * push() 在数组最后位置添加元素，返回添加元素后的数组长度，直接修改原数组
 * unshift() 在数组第一项前添加元素，返回添加元素后的数组长度，直接修改原数组
 */
arr2.push("d") -> 4
arr2.unshift("d") -> 4

/**
 * 截取数组
 * 如果是从数组开始位置进行截取，可以直接重新复制length来实现截取，返回新的数组长度，直接修改原数组
 */
arr2.length = 1 -> 1
```

使用 `arr1.push.apply(arr1, arr2)` 来合并数组，可以减少内存消耗，`arr1.concat(arr2)` 会创建一个新的数组并消耗内存


## Object

### keys()

`Object.keys()` 以数组形式返回对象自身所有可枚举的属性的键名，可以利用来判断对象是否为空





## Promise



Promise对象的两个特点

 - 对象的状态不受外界影响，Promise对象代表一个异步操作，有三种状态：pending(进行中)、fulfilled(已成功)和rejected(已失败)，
 - 

```javascript
function testPromise(url) {
  let promise = new Promise(function(resolve, reject) {
    console.log('1');
    const image = new Image();
    image.onload = function() {
      return resolve(image);
    };
    image.onerror = function() {
      return reject(url);
    };
    image.src = url;
    });
  return promise;
};

testPromise('./test.jpg').then(function(image){
  console.log('3');
  const val = image;
  console.log(val)
  }, function(url) {
    console.log('4');
    var val = url;
    const err = new Error(`Could not load image at ${val}`);
    console.error(err);
  });

console.log('2');

// 执行结果
1
2
3（4）
```

上述代码的一些知识点：

 - `resolve` 在异步操作成功时调用，将 Promise对象的状态从 ‘pending’ 变成 ‘fulfilled’

 - `reject` 在异步操作失败时调用，将 Promise对象的状态从 ‘pending’ 变成 ‘rejected’，等同于抛出错误

 - Promise实例生成之后，可以用 `then` 方法可以接收两个回调函数作为参数，分别指定 resolved 状态和 rejected 状态的回调函数

 - Promise对象在新建后就会执行，属于同步任务，但是 Promise对象里面的回调函数（即 resolve 和 reject 代码）属于异步任务

 - 调用 resolve 和 reject 并不会终结 Promise 的参数函数的执行，为了更好的阅读体验，通过 return 语句返回

#### Promise.prototype.then()

`then` 方法是定义在原型对象 Promise.prototype 上的，它的作用是为 Promise 实例添加状态改变时的回调函数

`then` 方法返回一个新的 Promise 实例，因此可以采用链式写法，注意前一个 then 中函数需要返回一个 Promise 对象，否则输出结果为 undefined

```javascript
testPromise('./test.jpg').then(function(image){
  console.log(image);
  return testPromise('./hello.jpg');
  }, function(url) {
    console.error(url);
    return testPromise('./hello.jpg');
  }).then(function(image) {
    console.log(image)
    }, function(url) {
      console.error(url);
      });

// 返回结果
(error) ./test.jpg
(erroe) ./hello.jpg
```

#### Promise.prototype.catch()

`.catch()` 是 `.then(null, reject)` 的别名，用于指定发生错误时的回调函数

```javascript
const test2 = new Promise(function(resolve, reject) {
  // resolve('ok');
  throw new Error('error');
  });
test2.then(function(val) {
  console.log(val);
  })
  .catch(function(error) {
  console.error(error);
  console.log('everything is ok');
    });
setTimeout(() => { console.log(123) }, 2000);

// 返回结果
Error: error
everything is ok
123
```

由上述代码可以看出：

 - promise 抛出一个错误，就会被 `catch` 方法指定的回调函数捕获

 - 如果 Promise 状态已经变成 resolved，再抛出错误是无效的，不会被捕获

 - Promise对象的错误具有冒泡性质，会一直向后传递，直至被捕获

 - 一般来说，不要在 `.then()` 方法内定义第二个函数，而是使用 `.catch()` 方法来响应 rejected 状态 

 - Promise 内部的错误不会影响到 Promise 外部的代码执行，“Promise 会将错误内部消化”

#### Promise.prototype.finally()

finally 方法用于指定不管 Promise 对象最后的状态如何，都会执行的操作

finally 方法的回调函数不接受任何参数，这意味着没办法知道，前面的 Promise 状态到底是 fulfilled 还是 rejected，这表明，finally 方法里面的操作，应该是状态无关的

