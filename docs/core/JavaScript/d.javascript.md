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

## 运算相关

### 操作符

使用 `+` 将变量转换为数字，但是其只适用于数字字符串，否则返回 NaN

使用 `+` 也可以作用于 Date，返回时间戳，`console.log(+new Date())`

使用 `!!` 将变量转换为布尔类型，只有 0、null、undefined、'' 以及 NaN 会返回 false，其他均返回 true

`1 && 2` 返回值为 2：原因在于在 `x && y` 的表达式中，先评估 x 值并将其解释为布尔值，如果布尔值为0，则直接返回 0 ，不用评估 y；但是如果 x 布尔值为 1，则继续评估 y 值，&& 操作符有趣在于，当表达式评估为真时，会返回表达式本身

### NaN

NaN（not a number）是数字类型

在 JavaScript 中，NaN 最特殊的地方在于，不能使用 == 或者 === 来判断一个值是否等于 NaN，因为 `NaN ==(=) NaN` 也会返回 false

`window.isNaN()` 方法会强制将非数字类型转换成数字类型，比如 `window.isNaN('1.2')` 会返回 false

相较之下，ES6 提出了一个更好的解决办法，即 `Number.isNaN()`，它不会对参数进行强制转换，只有当类型为数字，且值为 NaN 时才会返回 true

### 数学任务

Math对象用于执行数学任务，主要用于处理整数任务

```javascript
// 获取0-1之间随机数
Math.random() // 0.27407576343031925

// 返回数的绝对值（absolute）
Math.abs(-9) // 9

// 返回四舍五入的整数值
Math.round(1.6) // 2

// 返回向下取整的整数值
Math.floor(1.6) // 1

// 返回向上取整的整数值
Math.ceil(1.6) // 2

// 返回最大值，最小值 min 同理
Math.max(1, 2) // 2
// 如果需要返回数组内的最大值，可以通过ES6语法 `Math.max(...arr)` 或者通过 apply 方法 `Math.max.apply(null, arr)`
let arr = [1, 2, 3];
Math.max.apply(null, arr) // 3
Math.max(...arr) // 3
```


## window 对象

### Scroll

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

### Url

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