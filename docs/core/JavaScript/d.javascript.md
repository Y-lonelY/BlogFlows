# JavaScript

## 变量提升

理解一个关键概念：**暂存死区**

- `var`声明被置于函数作用域的顶部，但是它们的赋值不是
- `const`和`let`在块作用域中，会被置于块头部的暂存死区，直至它们被初始化，在这期间，如果变量被访问（比如 typeof ），会直接抛出 ReferenceError 错误

```javascript
function test() {
  console.log(a); // => throws a ReferenceError
  console.log(b); // => undefined
  var b = 100;
  console.log(c); // => throws a ReferenceError
  const c = 100;
  let d;
  console.log(d); // => undefined
  d = 100;
}
```

## 执行机制

::: tip
JavaScript是一门单线程语言，事件循环（Event Loop）是 JavaScript 的执行机制
:::

由于JavaScript引擎是单线程机制，它无法执行多段代码，当一段代码执行的时候，所有后续任务必须等待，从而形成一个任务队列。一旦当前任务完成，再从队列中取出下一个任务执行，这也被称为 ‘阻塞式执行’

<img src="../assets/eventLoop.png">

- `setTimeout()` 设置的延迟参数是从 EventTable 中注册回调函数到 EventQueue 的时延，所有**执行其回调函数的时延 >= 其设置的时延**
- 即使主线程执行栈为空，0ms 实际上也是达不到的，根据HTML标准，最低是 4ms
- `setInterval()` 会每隔指定的时延将回调函数注册进入 EventQueue 中，一旦 `setInterval` 的回调函数的执行时间超过其设置的延迟，那么完全看不出来有时间间隔
- 除了广义的同步任务和异步任务，任务还有更加精细的定义
	- macro-task(宏任务)：正常执行script、setTimeout()、setInterval()
	- mirco-task(微任务)：Promise、process.nextTick(类似node.js版的setTimeout，其回调函数在事件循环的下一次循环中调用)

整体script作为第一个宏任务执行结束，会在 EventQueue 中检查还有哪些微任务，并对其依次执行，至此完成第一次 EventLoop，然后再在 EventQueue 内检查宏任务，进行 EventLoop

```javascript
console.log('1');

setTimeout(function() {
    console.log('5');
    process.nextTick(function() {
        console.log('7');
    })
    new Promise(function(resolve) {
        console.log('6');
        resolve();
    }).then(function() {
        console.log('8')
    })
});

process.nextTick(function() {
    console.log('3');
});

new Promise(function(resolve) {
    console.log('2');
    resolve();
}).then(function() {
    console.log('4')
});

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('11');
    })
    new Promise(function(resolve) {
        console.log('10');
        resolve();
    }).then(function() {
        console.log('12')
    })
});

// 输出结果
1,2,3,4,5,6,7,8,9,10,11,12
```

## window 对象

### scroll

scroll 处理浏览器 sider 滚动

```javascript
// window 为窗口对象，可以是替换成其他dom元素
// 跳转到指定定位，类似绝对定位
window.scrollTo(x,y)

// 把内容相对当前位置滚动指定的像素数，类似相对定位
window.scrollBy(right, bottom)

// 返回滚动的高度/宽度，返回一个浮点数类型
window.scrollY, window.scrollX

// 返回可检查可见行的滚动条对象，通常利用其 visible 来判断其滚动条是否可见
window.scrollbars -> {visible: true}

// scroll 事件监听，兼容IE&&chrome
window.onmousewheel = document.onmousewheel = function(){...};

// scroll 事件监听，兼容 fireFox
document.addEventListener('DOMMouseScroll', function(){...}, false);
```

### url

通过 `window.location ` 获取当前页面 url 的相关信息。以 `https://github.com/YLoNe666` 为例

```javascript
window.location.href -> "https://github.com/YLoNe66"
window.location.host -> "github.com"
window.location.origin -> "https://github.com"
window.location.href -> "https://github.com/YLoNe66"
window.location.pathname -> "/YLoNe666"

/** 获取 url 里面的查询参数
 *  query - 查询参数对象
 *  hash - hash 值
 */
function getUrlParams() {
    let params = {};
    const urlStr = window.location;
    const hashStr = urlStr.hash; // #then-done
    const queryStr = urlStr.search; // ?query=test02

    params['query'] = {};
    params['hash'] = '';

    // deal query
    if (queryStr !== '') {
        let query = queryStr.split("?")[1];
        let queryArr = query.split("&");
        let queryObj = {};

        queryArr.forEach(function(item) {
            var q_key = item.split('=')[0];
            var q_val = item.split('=')[1];
            queryObj[q_key] = q_val;
        });

        params['query'] = queryObj;
    }

    // deal hash
    if (hashStr !== '') {
        const hash = decodeURI(hashStr);
        const oriHash = hashStr;
        params['hash'] = hash;
        params['oriHash'] = oriHash;
    }

    return params;
}
```