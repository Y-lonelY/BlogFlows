# React

## Component

::: tip
组件允许你将 UI 拆分为独立可复用的代码片段，并对每个片段进行独立构思
:::

**组件声明**

- 组件本质上是一个函数对象，所以可以通过函数式来声明或者通过ES6的 class 来创建
- 使用类来创建就允许我们使用其它特性，例如局部状态、生命周期钩子
- 组件名称必须以大写字母开头
- 组件返回值只能有一个根元素，因此组件在创建时一般用一个 `<div>` 标签来包裹
- 注意所有的React组件必须像纯函数那样使用它们的props，这意味着 props 获取的属性值是只读的

```javascript
import React, { Component } from "react";

class Test extends Component {
	// 添加状态
	constructor(props) {
		super(props);
		this.state = {
			// javascript object
		}
	}

	// 组件被插入到 dom 结构中
	componentDidMount() {
		// some codings
	}


	// 组件从 dom 结构中移除
	componentWillUnmount() {
		// some codings
	}


	render() {
		// some deals
		return (
			<div>
			// dom element
			</div>
		)
	}
}

export default Test
```

**组件通信**

- 父组件使用子组件方法，将子组件 this 作为参数传递给父组件，父组件通过 `this.child` 来挂载
- 子组件使用父组件方法，直接将父组件定义好的方法传递给子组件，子组件通过 `this.props` 来访问方法
- 兄弟组件之间通信，将数据挂载至其最近父组件上来进行访问

除此之外，还可以利用第三方库，比如 redux 来对系统内通信进行统一管理

```javascript
// 子组件
class Child extends Component {
	componentDidMount() {
	   this.props.onRef(this);
  	}
  	...
}

// 父组件
class Parent extends Component {
	onRef = (ref) => {
	   this.child = ref;
	}

	// 调用
	submit = () => {
	    // this.child...
	 }

	render() {
		return (
			<Child onRef={ this.onRef }>
		)
	}
}

```