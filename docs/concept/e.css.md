# CSS3


## 盒子模型

类似 swfit 的 UIView，每一个 html 元素都可以看成是一个方块，即“盒子”，根据 width/height 的界定，盒子模型分为**W3C标准盒子模型**和**IE怪异盒子模型**

- W3C标准盒子模型：content.height = height
- IE怪异盒子模型：content.height = height + padding + border.width

`box-sizing` 用来切换块的盒子模型类型

- `box-sizing: border-box;` 代表IE怪异盒子模型
- `box-sizing: content-box;` 代表W3C标准盒子模型


## BFC

BFC(Block Formatting Context) 块格式化上下文，结合 Box 和 Formatting Context 来理解：

- Box 是 CSS 布局的最小单位
- Formatting Context 是页面中的一块渲染区域，有自己的渲染规则，它决定其子元素如何定位以及和其他元素的关系和相互作用

BFC 有点类似对象的封装特性，具有 BFC 特性的元素可以看作是隔离的独立容器，容器内的元素不会在布局上影响到外面的元素

形成 BFC 的触发条件：

- body 根元素
- 浮动元素：float 除了 none 之外的值
- 绝对定位：position: absolute || fixed
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 之外的元素，通常使用 `overflow: hidden` 来实现 BFC