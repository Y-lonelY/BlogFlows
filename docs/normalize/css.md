# Style

> 用来记录前端样式的书写规范和一些很棒的实例

## CSS3

::: tip
CSS3 编程规范
:::

1. 使用expand模式
2. 选择器，属性名，属性值推荐用小写
3. 不使用id选择器
4. 每个选择器另开新行

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
}
```


## SCSS

出于 SCSS 语法对 CSS 语法友好的兼容性和扩展性，在 SASS 和 SCSS 中，选择后者作为语法

其规范与 CSS 类似

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
        @include radius(10px);

        // 属性嵌套
        background: {
            color: $white;
            repeat: no-repeat;
        }
        
        // 运算规则，以空格进行分隔，单位也会进行计算
        width: 100px / 2;
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