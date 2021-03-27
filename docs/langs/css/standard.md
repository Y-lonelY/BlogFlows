# Style Standard

::: tip 目的
积累样式开发规范
:::

## CSS3

参考 [Airbnb CSS / Sass Styleguide](https://github.com/airbnb/css)

- 2 个空格作为缩进
- 选择器，属性名，属性值推荐用小写，推荐使用破折号而不是 camelCase
- 不使用 id 选择器
- 每个选择器另开新行
- 大括号前和属性前添加空格
- 规则声明之间用空行隔开
- 注释独占一行，不要在写在行尾

```css
@charset "utf-8";
/*样式表第一行声明样式表编码*/

.body {
    /*a. 布局定位属性 */
    /*display, position, float, clear, visibility, overflow*/
    display: block;

    /*b. 自身属性，盒子模型*/
    /*width, height, margin, padding, border */
    /*5. 不需要为 0 指明单位*/
    margin: 10px 0;

    /*c. 文本属性*/
    /*color, font, text-*, white-space..*/
    /*6.颜色值不需要空格进行分隔，0-1小数，省略0*/
    color: rgba(255, 255, 255, .75);
    /*7. 统一使用单引号*/
    font-family: 'Microsoft YaHei';

    /*d. 其他属性*/
    /*cursor, box-*, background-*...*/
    cursor: pointer;

    /* 定义无边框样式时，用 0 代替 none */
    border: 0;
}
```


## SCSS

参考 [Airbnb CSS / Sass Styleguide](https://github.com/airbnb/css)

出于 SCSS 语法对 CSS 语法友好的兼容性和扩展性，在 SASS 和 SCSS 中，选择后者作为语法

其规范与 CSS 类似

- `@include` 放在原本属性之后
- 嵌套选择器通过空行进行分隔
- 变量命名风格，使用破折号，例如 `$hello-world`，对于仅用于当前文件的变量，添加下划线作为区分，例如 `$_hello-world`
- **不要让嵌套选择器的深度超过 3 层**

```scss
@charset "utf-8";
// 样式表第一行声明样式表编码*/

/**
 * 多行注释
 * 模块样式
 */
// 可复用属性进行抽离成变量，便于统一维护
$white: #fff;

/**
 * mixin 来建立类似函数的样式控制
 * 设置默认值为 5px
 * 通过 @include 来对其进行使用
 */
@mixin radius($radisu: 5px) {
    -webkit-border-radius: $radius;
    border-radius: $radius;
}

.module {
    // & 作为选择器进行嵌套，表示 module_name
    &_name {
        // 属性嵌套
        background: {
            color: $white;
            repeat: no-repeat;
        }
        
        // 运算规则，以空格进行分隔，单位也会进行计算
        width: 100px / 2;
        @include radius(10px);
    }
}
```


## Assets

::: tip
积累一些很棒的样式实例
:::

adidas yeezy 倒计时字体

```css
body {
    background-color: #fff;
    color: #ababab;
    font-family: VCR, Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;
    font-size: 14px;
    text-transform: uppercase;
}
```