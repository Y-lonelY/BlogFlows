<!-- MarkdownTOC -->

- [Trivia](#trivia)
- [浏览器缓存](#%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98)
- [数据存储](#%E6%95%B0%E6%8D%AE%E5%AD%98%E5%82%A8)
	- [localStorage](#localstorage)
- [BrowserRouter](#browserrouter)
	- [window.history](#windowhistory)
	- [window.onpopstate](#windowonpopstate)
	- [history.pushState\({ state, title, url }\)](#historypushstate-state-title-url-)
	- [history.replaceState\({ state, title, url }\)](#historyreplacestate-state-title-url-)

<!-- /MarkdownTOC -->


## Trivia

行内元素 `<sup> && <sub>` 分别用于添加上标和下标，且内容将会以当前文本流中字符高度的一半来显示


## 浏览器缓存

## 数据存储

JavaScript 内数据存储的几种方式：

- localStorage
- sessionStorage

localStorage 里面存储的数据没有过期时间设置，而存储在 sessionStorage 里面的数据在页面会话结束时会被清除

所谓的一次会话是指在当前的窗口和标签中，访问同一页面（重新加载或者恢复），在新标签或窗口打开一个页面时会在顶级浏览器上下文初始化一个新的会话

最直观的例子就是，当更换浏览器访问同一网址时，sessionStorage 的数据会被清除，而 localStorage 的数据仍然可以访问

### localStorage

键值对总是以字符串的形式存储

localStorage 和 sessionStorage 的使用方法类似

```js
// 创建一个存储数据
localStorage.setItem('myCat', 'Tom'); // 返回值为 undefined

// 访问数据，如果没有存储该数据，则返回值为 null
let cat = localStorage.getItem('myCat');

// 移除指定的存储数据
localStorage.removeItem('myCat'); // 返回值为 undefined

// 直接删除所有的存储数据
localStorage.clear();
```


## BrowserRouter

vue-router && react-router 内通过 h5.window.api 的方式来控制 url 和 ui 的同步（另一种方式是通过 hash 值来判断），用于SPA，主要涉及的API为

- window.history
- window.onpopstate
- history.pushState(obj)
- history.replaceState(obj)

我理解一个可能的实现方案就是：通过配置好的渲染组件及路径，当用户操作导致路径改变时，会触发 `window.onpopstate` 事件，而该事件内通过事先定义好的方法，来实现相关元素重新渲染指定组件的效果，从而达到 SPA 的效果。与此类似，可以监听 `hashchange()` 方法来监听 hash 值的变化

### window.history

一个 **只读** 属性，用来保存浏览器的会话历史（浏览器地址栏中访问的页面，以及当前页面框架中加载的页面）

history 暴露的主要方法为：`back()`, `forward()`, `go()`，其用来控制在用户历史记录中的前后跳转

history 暴露的主要属性为：`length`, `fscrollRestoration`, `state`，其用来记录用户的历史记录相关信息

```js
// 返回上一页
window.back()
window.go(-1)

// 获取上一页的 URL
document.referrer

```

### window.onpopstate

每当处于激活状态的历史记录条目发生变化时，就会触发 `popstate` 事件

注意，不是地址栏发生变化就会触发，调用 `history.pushState()` 或者 `history.replaceState()` 不会触发 popstate 事件，其只会在某些浏览器行为下触发，比如 `back()`, `forward()`, `go()`

```javascript
// demo
window.onpopstate = function(event) {
  alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
};
```

### history.pushState({ state, title, url })

向 history.state 内添加历史记录条目

- 当前地址栏发生变化，但是不会重新加载
- 不会触发 popstate 事件
- 一个特性就是，其可以改变 `XMLHttpRequest` 请求时的的 referer，并且不会改变当前页面内容

state 参数为一个 javascript 对象，`history.state` 内保存该对象
title（可选），state 的一个短标题
url 定义新的历史 url 记录，调用 pushState() 后浏览器并不会立即加载这个URL，但可能会在稍后某些情况下加载这个URL，比如在用户重新打开浏览器时。**新URL不必须为绝对路径。如果新URL是相对路径，那么它将被作为相对于当前URL处理（感觉这里就是 SPA 的关键点）**

```javascript
history.pushState({ bar: 'bar' }, "page 2", "bar.html");
```

### history.replaceState({ state, title, url })

与 pushState 类似，区别在于 `replaceState()`  是修改了当前的历史记录项而不是新建一个，其使用场景在于为了响应用户行为，比如更新 history.state 或者当前历史记录的 url