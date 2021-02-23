# React



## JSX

React 认为渲染逻辑本质上与其他 UI 逻辑内在耦合

- 建议将 JSX 包裹在小括号内，防止分号自动插入陷阱
- 引号将属性值指定为字符串字面量
- 大括号内可以是任意的 JavaScript 脚本

**>>>  JSX 如何避免 XSS 攻击？**

渲染列表时，为什么需要唯一 key 来标记子元素？





## Rendering Elements

> React 元素是 React 应用内最小的构建块

**React 元素是不可变对象，什么是不可变对象？**

不可变对象一旦被创建，它的**状态**就不能再被改变，在 React 内，一旦元素被创建，就无法更改它的子元素或者属性：**元素代表了某个特定时刻的 UI**

**React 只更新它需要更新的部分，如何做到？**

React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期状态



## Props

组件入参的 `props` 具有只读性

**为什么所有的 React 组件都必须像纯函数一样保护它们的 props 不被更改？**

为什么 Class 组件应该始终使用 `props` 参数来调用父类的构造函数？

```javascript
class Text extends React.Component {
  constructor(props) {
    super(props)
  }
}
```



## States

`setState()` 做了什么，能够触发组件更新？为什么直接给 state 赋值不会重新渲染组件？

`State` 的更新可能是异步的，为什么，如何实现多个 `setState()` 合并？如何实现同步更新？

什么是单向数据流？为什么 React 要实现单向数据流？

什么是“受控组件” 和 “非受控组件”？

什么是“状态提升”？