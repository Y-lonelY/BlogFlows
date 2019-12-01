# Css

## Font Style

Roboto Mono 实现效果

![实现效果](./assets/roboto-font.png)

```css
font-family: "Roboto Mono",monospace;
```


## media

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


## flex布局

布局的传统解决方案，基于盒子模型，依赖 `display && position && float`，但是其不适用于特殊布局。因此，W3C 提出了 Flex 布局，其可以简便，完整，响应式地实现各种页面布局且得到各个浏览器的支持

可以为任何一个容器指定 Flex 布局，设为 Flex 布局之后，子元素的 `float,clear,vertical-align` 属性将失效

### 父容器常用属性

```css
.flex-box {
  display: flex;
  /**
   * flex-direction 用来约定 items 的排列方式
   * row 水平方向，起点在左端
   * row-reverse 水平方向，起点在右端
   * column 垂直方向，起点在上沿
   * column-reverse 垂直方向，起点在下沿
   */
  flex-direction: row;
  
  /**
   * flex-wrap 定义当一条轴线上排列不下时，如何换行
   * nowrap 默认，不换行
   * wrap 换行，第一行在上方
   * wrap-reverse 换行，第一行在下方，即后面的换行元素在之前元素的上方
   */
  flex-wrap: nowrap;
  
  /**
   * justify-content 定义了项目在主轴上的对齐方式
   * flex-start 主轴起始位置至结束位置
   * flex-end 主轴结束位置至起始位置
   * center 居中
   * space-between 两端对齐，项目之间等距分隔
   * space-around 项目两侧间隔相等
   */
  justify-content: flex-start;
}
```

### 子容器常用属性

```css
.flex-item {
  /**
   * order 属性定义项目的排列顺序
   * 数值越小，排列越靠前，默认为 0
   */
  order: 1;

  /**
   * flex-grow 属性定义项目的放大比例
   * 默认为0，0 表示即使存在剩余空间，也不放大
   */
  flex-grow: 1;
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




