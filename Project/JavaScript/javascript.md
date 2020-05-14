> Knowledge is about mastering, not understanding.

<!-- MarkdownTOC -->

- [Trivia](#trivia)
- [常用正则](#%E5%B8%B8%E7%94%A8%E6%AD%A3%E5%88%99)
- [前端复制](#%E5%89%8D%E7%AB%AF%E5%A4%8D%E5%88%B6)
- [拷贝](#%E6%8B%B7%E8%B4%9D)
  - [浅拷贝](#%E6%B5%85%E6%8B%B7%E8%B4%9D)
  - [深拷贝](#%E6%B7%B1%E6%8B%B7%E8%B4%9D)
- [数组去重](#%E6%95%B0%E7%BB%84%E5%8E%BB%E9%87%8D)
- [函数节流与防抖](#%E5%87%BD%E6%95%B0%E8%8A%82%E6%B5%81%E4%B8%8E%E9%98%B2%E6%8A%96)
- [setTimeout](#settimeout)
  - [交互中双击时屏蔽单击事件](#%E4%BA%A4%E4%BA%92%E4%B8%AD%E5%8F%8C%E5%87%BB%E6%97%B6%E5%B1%8F%E8%94%BD%E5%8D%95%E5%87%BB%E4%BA%8B%E4%BB%B6)
  - [解决递归导致的堆栈溢出](#%E8%A7%A3%E5%86%B3%E9%80%92%E5%BD%92%E5%AF%BC%E8%87%B4%E7%9A%84%E5%A0%86%E6%A0%88%E6%BA%A2%E5%87%BA)
  - [按序输出](#%E6%8C%89%E5%BA%8F%E8%BE%93%E5%87%BA)
- [类型判断](#%E7%B1%BB%E5%9E%8B%E5%88%A4%E6%96%AD)
  - [是否相等判断](#%E6%98%AF%E5%90%A6%E7%9B%B8%E7%AD%89%E5%88%A4%E6%96%AD)
  - [类型判断](#%E7%B1%BB%E5%9E%8B%E5%88%A4%E6%96%AD-1)
- [等待多个异步请求](#%E7%AD%89%E5%BE%85%E5%A4%9A%E4%B8%AA%E5%BC%82%E6%AD%A5%E8%AF%B7%E6%B1%82)
- [.then\(\) && .done\(\)](#then--done)
- [substring\(\)](#substring)
- [全屏切换](#%E5%85%A8%E5%B1%8F%E5%88%87%E6%8D%A2)
  - [JSON.parse\(\)](#jsonparse)
  - [JSON.stringify\(\)](#jsonstringify)

<!-- /MarkdownTOC -->

## Trivia

1. `for in` 会改变原对象顺序，因此构建的数组需要重新排序
2. JS内对数值判断，不能用 `11 < x < 111` , 应该写成 `x > 11 && x < 111`
3. 选择框一般通过 `onchange` 事件监听，`onchange` 在输入框内容改变且 **失去焦点** 的时候触发
4. 在 JavaScript 源文件开头包含 `use strict` 好处在于在运行时自动执行更高标准的 JavaScript 代码解析和错误处理方式
5. `String.replace()` 本身只能替换第一个匹配的元素，可以在正则表达式末尾添加 `/g` 来模拟 `replaceAll()`


## 常用正则

第一个"（" 换行，第二个"）"为空，`String(this.value).replace(/（/,'<br>').replace(/）/, '')`

数字千分：`number.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')`

清除span标签: `str.replace(/<span.*?>|<\/span>/ig,"");`

清除空格：`str.replace(/\s+/g, '')`

清除换行：`str.replace(/[\r\n]/g, '')`


## 前端复制

复制的本质就是数据的存取，前端实现复制功能的思路：
- [x] M1: 利用 `document.execCommand('copy')` 执行复制到剪切板的操作
- [x] M2: 利用 `window.sesstionStorage` 进行前端缓存

**M1**

span, div等标签的点击复制，通过动态插入、获取 input 元素内容，结合 `document.execCommand('copy')` 实现内容复制

```js
onClick={(e) => {
    if (document.execCommand('copy')) {
      // 创建一个input标签用于承接内容 
      const input = document.createElement('input')
      input.setAttribute('value', ips.join(' ').trim())
      document.body.appendChild(input)
      // 选中input，使其获得页面焦点
      input.select()
      // 执行复制命令，返回复制是否成功
      const res = document.execCommand('copy')
      input.remove()
      res && message.success('复制到剪贴板', 2)
    }
}}
```

**M2**

通过事件触发，将数据转换为字符串后进行存取

```js
function copy () {
  try {
    window.sessionStorage.setItem('plcCopyTemp', JSON.stringify(current))
    message.success('复制成功', 1, () => {
      // statements
    })
  } catch (e) {
    message.error(`复制失败${String(e.message)}`, 1, () => {
      // catch error handle
    })
  }Ï
}
```



## 拷贝

### 浅拷贝

```js
// 数组拷贝，通过 concat 实现
let a = [1, 2];
let b = a.concat();

/**
 * 对象拷贝，通过 assign() 实现
 * Object.assign(addObj, targetObj) 将可枚举属性的值从一个或者多个源对象复制到目标对象，并返回合并后的新对象
 */
let c = {a: 1, b: 2};
let d = Object.assign({}, c);
```

### 深拷贝

最简陋的深拷贝，通过 `JSON.stringify()` 和 `JSON.parse()` 来实现，这种方法会造成的一些问题
- 数据量很大，超过函数处理范围
- 对于 function, undefined, RegExp 等不能进行拷贝

此外，参考jquery的 `$.extend()` 方法源码，可以通过递归进行深度遍历结合类型判断，完成深拷贝

```js
jQuery.extend = jQuery.fn.extend = function() {
  var options, name, src, copy, copyIsArray, clone,
    target = arguments[ 0 ] || {},
    i = 1,
    length = arguments.length,
    deep = false;

  // target 为第一个参数，用于控制是否进行深拷贝
  if ( typeof target === "boolean" ) {
    deep = target;

    // Skip the boolean and the target
    target = arguments[ i ] || {};
    i++;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if ( typeof target !== "object" && !isFunction( target ) ) {
    target = {};
  }

  // Extend jQuery itself if only one argument is passed
  if ( i === length ) {
    target = this;
    i--;
  }

  for ( ; i < length; i++ ) {

    // Only deal with non-null/undefined values
    if ( ( options = arguments[ i ] ) != null ) {

      // Extend the base object
      for ( name in options ) {
        copy = options[ name ];

        // Prevent Object.prototype pollution
        // Prevent never-ending loop
        if ( name === "__proto__" || target === copy ) {
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
          ( copyIsArray = Array.isArray( copy ) ) ) ) {
          src = target[ name ];

          // Ensure proper type for the source value
          if ( copyIsArray && !Array.isArray( src ) ) {
            clone = [];
          } else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
            clone = {};
          } else {
            clone = src;
          }
          copyIsArray = false;

          // Never move original objects, clone them
          target[ name ] = jQuery.extend( deep, clone, copy );

        // Don't bring in undefined values
        } else if ( copy !== undefined ) {
          target[ name ] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
};
```


## 数组去重

最直接的方法就是利用循环来进行比较，如果没有，则将其添加至新数组，最终将新数组返回

```javascript
/**
 * 利用 hash 进行去重，时间性能表现良好，但是不够简洁
 * 因为有些数据本身是不能排序的，所以不能对其进行比较查找
 * 如果数据本身很难比较，即使采用折半查找，要比较的次数也是非常多的
 * 哈希并不查找数据本身，而是先将数据映射为一个哈希值
 */
_mergeArray = function(arr) {
  var res = [],
      hash = {};
  for (var i = 0, elem;
      (elem = arr[i]) != null; i++) {
        // 如果hash对象内没有此属性，则返回undefined，此时将此属性值写入数组，并将其映射为一个哈希值
      if (!hash[elem]) {
          res.push(elem);
          hash[elem] = true;
      }
  }
  return res;
}

/**
 * 利用 ES6 set 数据结构和三点运算符
 * 时间性能表现不错，而且足够简洁
 */
let arr = [...new Set([1, 1, 3, 4])] -> [1, 3, 4]
```


## 函数节流与防抖

防抖，指函数在触发之后，指定时间间隔内只执行一次，如果在这段时间内又重新触发，则会更新时延

```js
// 函数防抖
function debounce(func, delay) {
  var label = null;
  return function() {
    var context = this;
    var args = arguments;
    if (label !== null) {
      clearTimeout(label);
    }

    label = setTimeout(function() {
      func.apply(context, args);
    }, delay);
  }
}
```

节流，指连续触发事件，但是在指定时间间隔内只执行一次，稀释执行频率

```js
function throttle(func, delay) {
  var prev = 0;
  return function() {
    var context = this;
    var args = arguments;
    var current = Date.now();
    if (current - prev > delay) {
      func.apply(context, arguments);
      prev = current;
    }
  }
}
```


## setTimeout

`setTimeout` 是异步执行函数，但是其并不是真正的异步操作

可以简单理解为：只有在 JavaScript 线程中没有任何同步代码要执行的前提下才会执行异步代码，所以 `setTimeout` 只会在 JavaScript 线程空闲状态下执行

如果调用了 `setTimeout` 方法，那么浏览器会在合适的时间将代码插入任务队列，如果这个时间为0，则代表立即插入队列，但是此时并不代表执行，执行取决于当前 JavaScript 线程是拥挤还是空闲

由 `setTimeout()` 调用的代码运行在与所在函数完全分离的执行环境上，这会导致代码中包含的 `this` 在非严格模式下指向 `window` 对象，在严格模式为 undefined

在浏览器中，`setTimeout()` 最小时延为 4ms

### 交互中双击时屏蔽单击事件

场景：一个元素同时绑定双击和单击事件，如果如果触发双击事件则会先触发一次单击事件

通过定时器来实现双击事件屏蔽单机事件，如果在规定时间间隔内，再次点击该节点，则认定此次触发双击事件，则取消单击事件的执行

```js
let timer = null

element.addEventListener('click', () => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    // statements
  }, 400)
})

element.addEventListener('doubleClick', () => {
  clearTimeout(timer)
  // statement
})
```

### 解决递归导致的堆栈溢出

堆栈溢出被消除，因为通过事件循环处理递归，而不是调用堆栈

```javascript
// error
var list = readHugeList();
var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        nextListItem();
    }
};

// correct
var list = readHugeList();
var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        setTimeout( nextListItem, 0);
    }
};
```

### 按序输出

使用闭包或者块级作用域来按序输出

```javascript
// 输出 5,5,5,5,5
// 因为循环体内每个函数将在整个循环完成后执行
// 通过 var 声明的变量作用域是整个封闭函数，在执行完毕后 i 会被自动添加到当前的执行环境
for (var i = 0; i < 5; i++) {
    setTimeout(function() { console.log(i); }, 1000 );
}

// 输出 0,1,2,3,4
// 利用闭包，为每次迭代创建一个唯一作用域，并将该变量的每个唯一值存储在其作用域中
for (var i = 0; i < 5; i++) {
    (function(x){
      setTimeout(function() { console.log(x); }, 1000 );
    })(i);
}

// 输出 0,1,2,3,4
// 利用 let 声明块级作用域
for (let i = 0; i < 5; i++) {
    setTimeout(function() { console.log(i); }, 1000 );
}
```


## 类型判断

> JavaScript 中比较常用的类型判断，在实际场景中，比如实现深拷贝，判断服务端返回数据等会经常用到

### 是否相等判断

`==` 会进行隐式转换，比如 `'' == false` 会返回 true

`===` 将数字值 `-0` 和 `+0` 视为相等，并认为 Number.NaN 不等于 NaN

此外，ES6 提出一种新的比较算法，即 `Obejct.is()`，目前 react 已经用于比较 state 的变化，它认为 Number.NaN 等于 NaN，且 `0` 不等于 `-0` 或者 `+0`

```javascript
1 == "1" // true
1 === "1" // false
NaN == NaN // false
null == undefined // true
null === undefined // false

// Object.is
Object.is(0, -0) // false
Object.is(1/0, 1/0) // true
```

### 类型判断

`typeof` 操作符返回一个字符串，表示未经计算的操作数的类型，**在判断对象和数组问题上不太行**

`typeof(null)` 的结果是 'object'，因为在JavaScript的最初实现中，JavaScript中的值是由一个表示类型的标签和实际数值表示的，对象的类型标签是0，null代表的是空指针，因此null的类型标签也是0

``` javascript
typeof(window) // "object"
typeof(null) // "object"
var a = [1,2,3]
typeof(a) // "object"
```

针对数组和对象类型比较的方法：

- `Array.isArray(arr)`
- `Object.prototype.toString.call(arr)`
- `instanceof`

```javascript
let arr = [1,2,3];
Array.isArray(arr) -> true
Object.prototype.toString.call(arr) -> "[object Array]"
arr instanceof Array -> true
```


## 等待多个异步请求

即同时发出n个异步请求，但是需要它们都执行完毕再进行下一步处理

第一个思路，通过 `promise.all()` 来实现，其本质是一个 promise 对象，接受一个 promise 对象的数组作为参数，当数组内所有的 promise 对象的状态全部变成 `resolve` 状态或者出现 `reject` 状态时，则会执行 `then`方法

```js
// 模拟请求
var p1 = Promise.resolve(1),
    p2 = Promise.resolve(2),
    p3 = Promise.resolve(3);

Promise.all([p1, p2, p3]).then(function (results) {
    console.log(results);  // [1, 2, 3]
});
```

第二个思路，利用 `promise.all` 的实现原理，结合 `async...await` 来实现，通过判断到最后一个异步请求完成，再执行相应的动作

```js
// 模拟请求
async function getDateRange() {
    var p1 = Promise.resolve(1),
    p2 = Promise.resolve(2),
    p3 = Promise.resolve(3);
const list = [p1, p2, p3];
const result = [];
for (let index = 0; index < list.length; index++) {
  const res = await list[index];
  result.push(res);
  if (index = list.length - 1) {
  // statements
    return result;
    }
  }
}
```


## .then() && .done()

`.then()` 和 `.done()` 的区别

  - `.then()` 支持持续任务调用模式(eg:promise().then().then().then()),而 `.done()` 不支持

  - `.then()` 会捕获未处理的异常然后把错误状态作为返回值返回，而 `.done()` 则会直接抛出异常


## substring()

`tringObject.substring(start,stop)` 用于提取字符串中介于两个指定下标之间的字符

`substring()` 方法返回的子串包括 start 处的字符，但不包括 stop 处的字符

如果参数 start 与 stop 相等，那么该方法返回的就是一个空串（即长度为 0 的字符串）。如果 start 比 stop 大，那么该方法在提取子串之前会先交换这两个参数

start 与 stop 必须为正整数

## 全屏切换

用代码实现类似 F11 效果

```javascript
  //切换全屏效果
  toggleFullScreen = function(element) {
    //判断是否为全屏模式
    if (!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)) {
      //进入全屏模式，分别为W3C标准，谷歌，火狐，IE
      if (element.requestFullscreen) {
          element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
      }
    } else {
      //退出全屏模式
      if (document.exitFullscreen) {
          document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
      }
    }
  },
  troggleScreen = function() {
      //document.documentElement 为整个页面的元素
      toggleFullScreen(document.documentElement);
  },
```

### JSON.parse()

JSON.parse() 方法用来解析JSON字符串，构造由字符串描述的JavaScript值或对象
JSON.parse(jsonstr, reviver()) 可以接受两个参数

  - jsonstr 表示json字符串，为必填项

  - reviver() 为选填项，如果指定了 reviver() 函数，则解析出的 JavaScript 值（解析值）会经过一次转换后才将被最终返回。

  - 解析值本身以及它所包含的所有属性，会按照一定的顺序（从最最里层的属性开始，一级级往外，最终到达顶层，也就是解析值本身）分别的去调用 reviver 函数，在调用过程中，当前属性所属的对象会作为 this 值，当前属性名和属性值会分别作为第一个和第二个参数传入 reviver 中

  - 如果 reviver 返回 undefined，则当前属性会从所属对象中删除，如果返回了其他值，则返回的值会成为当前属性新的属性值

  - 当遍历到最顶层的值（解析值）时，传入 reviver 函数的参数会是空字符串 ""

```javascript
JSON.parse('{"1": 1, "2": 2,"3": {"4": 4, "5": {"6": 6}}}', function (k, v) {
    console.log(k); // 输出当前的属性名，从而得知遍历顺序是从内向外的，
                    // 最后一个属性名会是个空字符串。
    return v;       // 返回原始属性值，相当于没有传递 reviver 参数。
});

// 1
// 2
// 4
// 6
// 5
// 3 
// ""
```

### JSON.stringify()

JSON.stringify() 方法将一个JavaScript值（对象或者数组）转换成一个 JSON 字符串
JSON.stringify(jsonObj, replace, space) 可以接受三个参数

  - jsonObj 表示一个JavaScript值，即一个json对象或者数组

  - replace参数可以是一个数组或者函数，作为函数，它有两个值，键（key）和值（value）都会被序列化

    - 在对象中，如果返回值是 `undefined`，则该属性值不会在JSON字符串内输出

    - 在数组中，如若返回值是 `undefined` 或者一个函数，将会被null取代

  - space 参数用来控制结果字符串里面的间距。如果是一个数字, 则在字符串化时每一级别会比上一级别缩进多这个数字值的空格（最多10个空格）；如果是一个字符串，则每一级别会比上一级别多缩进用该字符串（或该字符串的前十个字符）

```javascript
// replace 例子
function replacer(key, value) {
  if (typeof value === "string") {
    return undefined;
  }
  return value;
}

var foo = {foundation: "Mozilla", model: "box", week: 45, transport: "car", month: 7};
var jsonString1 = JSON.stringify(foo, replacer);
var jsonString2 = JSON.stringify(foo, ['week', 'month']); 
// 输出 jsonString1 和 jsonString2 值均为：{"week":45,"month":7}
```
