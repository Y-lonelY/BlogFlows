# JavaScript

> 记录在使用JavaScript进行实际开发过程中遇到的综合性较强的问题


## Trivia

:::tip
JavaScript 中的冷知识
:::

1. `for in` 会改变原对象顺序，因此构建的数组需要重新排序
2. JS内对数值判断，不能用 `11 < x < 111` , 应该写成 `x > 11 && x < 111`
3. 选择框一般通过 `onchange` 事件监听，`onchange` 在输入框内容改变且 **失去焦点** 的时候触发
4. 在 JavaScript 源文件开头包含 `use strict` 好处在于在运行时自动执行更高标准的 JavaScript 代码解析和错误处理方式
5. `String.replace()` 本身只能替换第一个匹配的元素，可以在正则表达式末尾添加 `/g` 来模拟 `replaceAll()`


## 函数节流与防抖

underscore函数节流

1. 通过判断两次调用函数的时间戳，根据时间间隔来判断是否执行
2. 设置定时器，如果当前缓存存在该定时器，则不执行函数；否则执行该函数并设置新的定时器

```javascript
// `{trailing: false}` 禁用最后一次执行
// `{leading: false}` 禁用第一次执行
var throttled = _.throttle(updatePosition, 100, {trailing: false});
```


## setTimeout

`setTimeout` 是异步执行函数，但是其并不是真正的异步操作

可以简单理解为：只有在 JavaScript 线程中没有任何同步代码要执行的前提下才会执行异步代码，所以 `setTimeout` 只会在 JavaScript 线程空闲状态下执行

如果调用了 `setTimeout` 方法，那么浏览器会在合适的时间将代码插入任务队列，如果这个时间为0，则代表立即插入队列，但是此时并不代表执行，执行取决于当前 JavaScript 线程是拥挤还是空闲

由 `setTimeout()` 调用的代码运行在与所在函数完全分离的执行环境上，这会导致代码中包含的 `this` 在非严格模式下指向 `window` 对象，在严格模式为 undefined

在浏览器中，`setTimeout()` 最小时延为 4ms

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