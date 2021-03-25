# Chrome Develop Tools

## Utilities API Reference

[Console Utilities API](https://developers.google.com/web/tools/chrome-devtools/console/utilities#queryselector) 包含了一组执行特定任务的功能集合

**注意: 这些功能只能在控制台内调用, 在 `script` 脚本内, 它们不会生效**

### $(selector, [startNode]) and $$(selector, [startNode])

::: tip
控制台内的元素快捷选择器
:::

如果你是一个“老前端(JQuery 过来人)”, 相信对于 `$` 和 `$$` 一定不会陌生, 在 Chrome Dev Console 内, 也对两者进行了封装:

- `$` 行为类似 `document.querySelector()`, 如果传递第二个参数, 则会将其作为起始点继续寻找,返回**第一个满足条件的元素**
- `$$` 行为类似 `document.querySelectorAll()`, 如果传递第二个参数, 则会将其作为起始点继续寻找,返回**所有满足条件的元素**

**注意, 这些 API 可以被 override, 比如页面内引入了 JQuery, 则 $ 被替换为 JQuery 的实现**

基于此, 我们可以在浏览器内实现一些有趣的功能

**在浏览器上为每个元素添加轮廓线**

```javascript
// 在浏览器上为每个元素添加轮廓线
(function addEleOutline() {
    [].forEach.call($$("*"), function(a) {
        a.style.outline = "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
    });
})()
```