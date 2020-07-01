## Airbnb React/JSX Coding Standards

### Basic

推荐使用 **JSX语法**，即文件后缀为 `.jsx`

除了在入口文件初始化 react app 时，不要使用 `React.createElement`

如果模块内有 state，则使用 `class extends React.Component` 来创建类，否则直接用普通函数（注意不是箭头函数）来创建类

对于HTML属性值总是使用双引号（遵循 HTML 规范），其他情况均使用单引号 `<Foo className="test" style={{ left: '20px' }} />`

不要在JSX {} 引用括号里两边加空格 `<Foo bar={baz} />`

对于属性值为boolean类型的属性，直接写其属性名即可 `<Foo hidden />`

多行的JSX标签写在 `()` 内，单行不用 `()`

### Import

自己规定引入的文件顺序
1. 第三方库
2. 自己写的组件
3. typescript 声明文件
4. 样式
5. 静态文件

不要使用通配符进行导出，从而保证你每一个输出都是独立的

```javascript
// bad
import * as AirbnbStyleGuide from './AirbnbStyleGuide';

// good
import AirbnbStyleGuide from './AirbnbStyleGuide';
```

一个路径一次支持一个导入，因为一个路径可以通过 `{}` 来一次支持有多个导入，否则会使代码变得难以维护

通过 import 引入内容使用单引号进行包裹

### Export

仅导出一个对象时，用 export default，因为这样代码结构更加清晰

多个导出在文件尾部综合，不用每个方法都进行导出操作

一般情况下导出常量(`const`)，避免在实例中被修改

### Naming

react 模块(即有 html 模版内容的文件)使用 `.jsx` 扩展名，否则使用 `.js`

PascalCase 规范适用
- 组件命名，包括函数组件和class组件
- 组件文件名

camelCase 规范适用
- 实例命名
- JSX 属性命名
- 函数名

将文件夹作为一个模块，`index.js` 作为入口文件，然后直接使用文件名作为模块的名称（即 `'./Footer'` 而不是 `'./Footer/index'`)

变量命令在最后为其添加 `list`, `map` 等来为其表明类型

### Tags

对于没有子元素的标签总是写成自闭和标签

如果模块有多行的属性，关闭标签时新建一行

