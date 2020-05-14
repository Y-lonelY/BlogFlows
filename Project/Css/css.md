> Practice brings strength.

<!-- MarkdownTOC -->

- [展示相关](#%E5%B1%95%E7%A4%BA%E7%9B%B8%E5%85%B3)
  - [普通数字展示](#%E6%99%AE%E9%80%9A%E6%95%B0%E5%AD%97%E5%B1%95%E7%A4%BA)
  - [自定义滚动条样式](#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%BB%9A%E5%8A%A8%E6%9D%A1%E6%A0%B7%E5%BC%8F)
- [文字样式相关](#%E6%96%87%E5%AD%97%E6%A0%B7%E5%BC%8F%E7%9B%B8%E5%85%B3)
- [@media](#media)
- [user-select](#user-select)
- [自定义字体](#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AD%97%E4%BD%93)
- [CSS选择器](#css%E9%80%89%E6%8B%A9%E5%99%A8)
- [CSS 单位](#css-%E5%8D%95%E4%BD%8D)
- [animation](#animation)
- [::before && ::after](#before--after)

<!-- /MarkdownTOC -->

## 展示相关

### 普通数字展示

```CSS
.number {
    font-family: 'Roboto Mono';
    font-size: '12px';
    color: '#000';
}
```

### 自定义滚动条样式

webkit-scrollbar 样式优化，用来设置webkit内核浏览器的滚动条样式

```css
<!-- 设置整个滚动条的宽和高，高在横向滚动条的时候体现 -->
div::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
<!-- 滚动条轨道 -->
div::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}
<!-- 滚动条上的滚动滑块 -->
div::-webkit-scrollbar-thumb {
  background-color: #fafafa;
  -webkit-box-shadow: inset 0 0 6px #37474F;
  box-shadow: inset 0 0 6px #37474F;
  border-radius: 8px;
}
```


## 文字样式相关

`text-overflow` 属性确定如何向用户发出未显示的溢出内容信号，包含三个属性值，这个属性只对那些在块级元素溢出的内容有效，但是必须要与块级元素内联(inline)方向一致

```css
p {
  /**
   * 确定如何向用户展示溢出样式
   * ellipsis: 用 ... 省略号来代替被截断的文本
   * <string>: 通过自定义字段来代替被截断的文本。如果空间太小到连省略号都容纳不下，那么这个字符串也会被截断
   * clip: 默认值，在内容区域的极限初裁剪文本
   */
  text-overflow: clip;
}
```

`text-transform` 属性用来控制文本的大小写

```css
p {
  /**
   * 用来控制文本的大小写
   * capitalize: 每个单词的首字母大写
   * uppercase: 所有字母大写
   * lowercase: 所有字母小写
   * none: 默认值，不做任何转换
   */
  text-transform: none;
}
```

`white-space` 属性用于确定如何处理元素内的空白（Tab，Space，Enter）

```css
p {
  /**
   * 用于确定如何处理元素内的空白（Tab，Space，Enter）
   * pre-line: 所有空格、制表符合并成一个空格，回车不变，文本换行
   * pre-wrap: 所有空白保留且生效，文本换行
   * pre: 所有空白保留且生效，文本不换行
   * nowrap: 所有的空白都合成一个空格，不换行
   * normal: 默认值，所有的空白都合成一个空格，自动换行，这意味着回车等会失效
   */
  white-space: normal;
}
```

`word-warp` 长单词或者url换行属性

```css
p {
  /**
   * 长单词或者url换行属性
   * normal：浏览器默认值，只在允许的断字点换行
   * break-word：在长单词或者url内部进行换行
   */
  word-wrap: normal;
}
```


## @media

`@media` 可用于根据一个或多个基于设备类型、具体特点和环境的媒体查询来应用样式

`@media` 可以针对不同的屏幕尺寸设置不同的样式，特别是如果你需要设置设计响应式的页面，`@media` 是非常有用的。当你重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面

注意 `@media` 需要放在 CSS 内容的最下面，否则会被覆盖

`@media` 样式规则： `@media 媒体类型 and (筛选条件){样式}`

```css
// max-width(小于等于)，min-height(大于等于) 高度同理
@media screen and (max-width: 1680px) {
    .V-content .con-cap .cap-time {
      color: #fff;
    }
}
```

`@media screen and (orientation:portrait)`: 表示指定输出设备中的页面可见区域的高度大于或者等于宽度

`@media screen and (orientation:landscape)`： 表示除 portrait 之外的所有情况


## user-select

`user-select` 属性用来控制内容能否被选中，包含四个属性值

> **该特性是非标准的，请尽量不要在生产环境中使用它**

 - `nono`: 文本不能被选中

 - `text`: 默认值，可以选中文本

 - `all`: 在一个HTML编辑器中，当双击子元素或者上下文时，那么包含该子元素的最顶层元素也会被选中

 - `element`: 可以选择文本，但选择范围受元素边界的约束(在 Firefox 和 IE 中有效)


## 自定义字体

```css
// 注册自定义字体 Material Icons 
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: local('Material Icons'), local('MaterialIcons-Regular'), url(../../style/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2) format('woff2');
}
// 为class添加自定义字体样式
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
```

## CSS选择器

CSS选择器用于选择你想要的元素的样式的模式

element 选择器

 - `p` 选择所有 `<p>` 元素

 - `div,p` 选择所有的 `<div>` 元素和 `<p>` 元素

 - `div p` 选择 `<div>` 元素内部所有的 `<p>` 元素，注意为后代选择器，会选择孙子元素

 - `div>p` 选择父元素为 `<div>` 元素的所有 `<p>` 元素，注意为子代选择器，不会选择孙子元素

 - `div+p` 选择紧接在 `<div>` 元素之后所有的 `<p>` 元素

 - `div~p` 选择 `<div>` 元素之后的所有 `<p>` 元素

attribute 选择器

 - `[target]` 选择所有带有 `target` 属性的元素

 - `[target=_blank]` 选择所有 `target=_blank` 的元素

 - `[title~=ylone]` 选择所有 title 包含字符串 ylone 的元素

 - `[title|=ylone]` 选择所有 title 属性以 ylone 开头的元素

 - `a[src^='ylone']` 选择所有 src 属性以 ylone 开头的 `<a>` 元素

 - `a[src$='ylone']` 选择所有 src 属性以 ylone 结尾的 `<a>` 元素

 - `a[src*='ylone']` 选择所有 src 属性包含 ylone 字符串的 `<a>` 元素

： 选择器

 - `a:link` 选择所有未被访问的 `<a>`

 - `a:visited` 选择所有被访问过的 `<a>`

 - `a:active` 选择所有活动的 `<a>`，介于被访问和未被访问之间

 - `a:hover` 选择鼠标位于其上的 `<a>`

 - `input:focus` 选择获得焦点的 `<input>` 

 - `p:first-letter` 选择每个 `<p>` 的首字母

 - `P:first-line` 选择每个 `<p>` 的首行

 - `p:first-child` 选择所有内容块（body, div）中第一个元素，且第一个元素为 `<p>`

 - `p:last-child` 选择所有内容块（body, div）中最后一个元素，且最后一个元素为 `<p>`

 - `p:nth-child(n)` 选择所有内容块（body, div）中正数第n个元素，且第n个元素为 `<p>`

 - `P:nth-last-child(n)` 悬着所有内容块（body, div）中倒数第n个元素，且这个元素为 `<p>`

 - `input:enabled` 选择每个启用的 `<input>` 元素

 - `input:disabled` 选择每个禁用的 `<input>` 元素

 - `input:checked` 选择每个被选中的 `<input>` 元素

 - `p:first-of-type` 选择所有内容块（body, div）中第一个为 `<p>` 的元素，注意与 `:first-child` 区别

 - `p:last-of-type` 选择所有内容块（body, div）中最后一个为 `<p>` 的元素，注意与 `:last-child` 区别

 - `p:nth-of-type(n)` 选择所有内容块（body, div）中正数第n个为 `<p>` 的元素，注意 `:nth-of-type(1)` 等同于 `:first-of-type`

 - `p:nth-last-of-type(n)` 选择所有内容块（body, div）中倒数第n个为 `<p>` 的元素，注意 `:nth-last-of=type(1)` 等同于 `:last-of-type`

`.rlul .rlItem:nth-child(odd) {...}` 取奇数子元素

`.rlul .rlItem:nth-child(even) {...}` 取偶数子元素

## CSS 单位

> au(absolute units) -- 绝对单位，ru(relative units) -- 相对单位

| Id | Key | Type | Direction |
| - | :-: | :-: | :-: |
| 0 | px | au | 像素 |
| 5 | em | ru | 相对当前元素字体的倍数 |
| 6 | rem | ru | 相对根元素字体的倍数 |
| 7 | vh |  ru | 相对视窗高度 |
| 8 | vw | ru | 相对视窗宽度 |
| 9 | rpx | ru | 微信小程序扩展单位，可以根据屏幕宽度自适应 |

## animation

CSS animation 可以将一个 CSS 配置转换到另一个 CSS 配置，动画包括两个部分：动画的样式规则（animation）和动画开始，结束及中间点样式的关键帧（@keyframes）

@keyframes 用来定义动画的表现，通过建立两个或两个以上的关键帧来实现，每一个关键帧都描述了元素在给定的时间点上应该如何渲染，关键帧使用百分比来指定动画发生的时间点，其中 0% 和 100% 分别用 from 和 to 代替

`animation` 允许配置动画时间，时长及其它细节，是所有动画属性的简写属性（除 animation-play-state）

`animation-name` 指定由 @keyframes 描述的关键帧名称

`animation-duration` 设置动画的一个周期时长，默认为0，所以为必设置项，否则动画没有效果  

`animation-timing-function` 建立加速度曲线，设置动画在关键帧之间如何变化，默认为 ease

  - ease: 慢 > 快 > 慢
  - linear: 匀速
  - ease-in: 低速启动
  - ease-out: 低速结束
  - ease-in-out: 低速开始和结束
  - cubic-bezier(n,n,n,n): 贝塞尔曲线，值自己定义

`animation-delay` 设置延迟，即元素加载完成到动画序列开始执行的等待时间

`animation-iteration-count` 设置动画重复次数，可设置为 infinite 表示无数次，默认值为 1

`animation-direction` 设置动画每次完成后是反向运行还是重新回到开始位置运行，默认为 normal

  - normal: 动画正常播放
  - reverse: 动画反向播放
  - alternate: 动画在奇数次正向播放，在偶数次反向播放
  - alternate-reverse: 动画在奇数次反向播放，在偶数次正向播放

`animation-play-state` 允许暂停和恢复动画，默认值为 running，暂停值为 paused

注意 `animation-duration` 和 `animation-delay` 设置时间时需要带上单位，否则浏览器无法识别

## ::before && ::after

CSS 利用 `:` 和 `::` 来区分伪类和伪元素，如果只需要为其添加自定义字符时，只需要使用伪类的写法，因为这样可以获得更好的浏览器兼容性，但是如果使用 display 或者 width 等属性使得显示脱离了原本元素时，使用伪元素写法

`::before` 和 `::after` 用于在 CSS 渲染时向元素逻辑上的头部和尾部添加内容，这些添加不会出现在 DOM 中，不会改变文档结构，不可复制，仅在 CSS 渲染层加入

`content` 用来定义插入的内容，支持四种内容形式

 - String: 字符串，支持 [unicode编码](http://www.cnblogs.com/starof/p/4718550.html)

 - attr(): 当前元素属性

 - url()/uri(): 引用多媒体文件

 - counter(): 调用计数器，比如列表序号

[伪类实现特效](https://tympanus.net/Development/CreativeLinkEffects/)




--Respect Css--