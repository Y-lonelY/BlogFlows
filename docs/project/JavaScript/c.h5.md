# H5

## Trivia

1. 对于时间类型处理不要通过replace进行去0操作或者格式化，用 `new Date(string)、moment.js、dayjs`，形如2018/07/15这样的时间格式兼容性最好，兼容IE和Sarafi

2. iOS 点击事件触发需要在元素上添加 `cursor:pointer;`

3. 对于 `<input type="radio" name="ylone">` 要实现单选效果，需要对同一组单选按钮设置相同的 *name*

4. HTML展示base64编码的图片，`<img src="data:image/jpg;base64,BASE64CODE">`

5. `<a target="view_window" href="..."></a>` 表示点击该 `<a>` 标签后，浏览器会默认打开一个新TAB，并将其标记为 `view_window`，当用户从该列表再次点击另外的标签，且当前的 `view_window` 处于开启状态，则浏览器会选择在该TAB刷新内容


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


## Android和iOS键盘弹起样式问题

解决android机键盘弹起和iOS解析方式不同问题：

- 描述：iOS会将元素及元素内子元素一起顶起，android只会顶起父元素，其内部元素会产生样式问题
- 解决：判断机型，监听屏幕的 `onresize` 事件，对子元素进行显示或者隐藏

```javascript
// andriod 兼容
var u = navigator.userAgent;

if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
    var oriH = document.body.offsetHeight;
    //  拿到获取焦点的input
    function resize() {
        var curH = document.body.offsetHeight;
        if (curH <= oriH*2/3) {
            // 隐藏...
        } else {
            // 展示...
        }
    }
    window.onresize = resize;
}
```


## 撑满屏幕

vh,vw 是一种视窗单位，也是相对单位，其大小是由视窗大小来决定，单位为1，代表视窗的1%，100vh就是整个视窗的高度
视窗指浏览器可视区域的宽高，也就是 `window.innerWidth` 和 `window.innerHeight`

```css
body {
    height: 100VH,
    width: 100VW,
} 
```

第二种方式，通过 `position:absolute` 来撑满整个屏幕，注意设置 `top` 和 `bottom`

```css
body {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
}
```