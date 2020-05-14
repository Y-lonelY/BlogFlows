<!-- MarkdownTOC -->

- [Trivia](#trivia)
- [Android和iOS键盘弹起样式问题](#android%E5%92%8Cios%E9%94%AE%E7%9B%98%E5%BC%B9%E8%B5%B7%E6%A0%B7%E5%BC%8F%E9%97%AE%E9%A2%98)
- [撑满屏幕](#%E6%92%91%E6%BB%A1%E5%B1%8F%E5%B9%95)

<!-- /MarkdownTOC -->

## Trivia

1. 对于时间类型处理不要通过replace进行去0操作或者格式化，用 `new Date(string)、moment.js、dayjs`，形如2018/07/15这样的时间格式兼容性最好，兼容IE和Sarafi

2. iOS 点击事件触发需要在元素上添加 `cursor:pointer;`

3. 对于 `<input type="radio" name="ylone">` 要实现单选效果，需要对同一组单选按钮设置相同的 *name*

4. HTML展示base64编码的图片，`<img src="data:image/jpg;base64,BASE64CODE">`

5. `<a target="view_window" href="..."></a>` 表示点击该 `<a>` 标签后，浏览器会默认打开一个新TAB，并将其标记为 `view_window`，当用户从该列表再次点击另外的标签，且当前的 `view_window` 处于开启状态，则浏览器会选择在该TAB刷新内容


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