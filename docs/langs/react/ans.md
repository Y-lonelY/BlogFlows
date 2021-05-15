# React ANS

> React 基础知识和概念，多看看[官方文档](https://zh-hans.reactjs.org/docs/getting-started.html)

## React 如何避免 XSS 攻击？

### What's XSS ?

> Cross-Site Scripting(跨站脚本攻击)简称 XSS，是一种代码注入攻击！

XSS 指：恶意代码未经处理，与正常代码混淆在一起，浏览器无法辨别哪些脚本是可靠的，导致恶意脚本被执行。由于恶意脚本在客户端执行（实际上就是获取了客户端内的部分控制权），从而可以直接获取用户信息，或者利用这些信息冒充真实用户向服务器发起攻击。

<img src="../assets/react/XSS.png" alt="XSS" />

参考：

- [前端安全: 如何防止XSS攻击？](https://tech.meituan.com/2018/09/27/fe-security.html)
- [Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#rule-7-avoid-javascript-urls)
- [React DOM 元素](https://zh-hans.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)

通常注入的手段有如下方式：

1. 用户 UGC 内容，比如在表单内输出一段恶意脚本，服务器未经校验，直接进行存储，当其他客户端请求该资源时，则会在客户端上执行恶意脚本；
2. URL 参数，攻击者诱骗用户点击一个带有恶意代码的 URL, 通过脚本内容在 URL 参数内，用户点击后，可能将该恶意脚本填充到 HTML 内，从而导致恶意脚本被执行；
3. POST 参数，这类难度较大，通过通过诱导用户填写相应内容来实现；
4. Cookie，可能来自其他子域注入；

<b>XSS 类型</b>

根据注入手段的不同，通常将 XSS 攻击分为三类：存储型 XSS、反射型 XSS 以及存储型 XSS，这里不再进行赘述，参考相关文章即可。

事实上，大部分的 XSS 都发生在<b>前后不分离</b>的系统设计内，因为其代码和数据不分离的关系，导致存储型和反射型 XSS 都是在服务端取出恶意代码后，插入到 HTML 里的，攻击者刻意编写的“数据”被内嵌到“代码”中，被浏览器所执行。

```html
<style>
  /* #3: HTML Style Property Values */
  /* selector { property : ...UNTRUSTED SCRIPT...; } */
</style>
<body>
<!-- #1: HTML Element Content -->
<div>
  ...UNTRUSTED SCRIPT...
</div>

<!-- #2: HTML Common Attributes
URL: http://www.xss.com?keyword=<script>...UNTRUSTED SCRIPT...</script> -->
<input type="text" value="<%= getParameter("keyword") %>">

<!-- 不同的元素属性会有不同的攻击方式
URL: http://www.xss.com?redirect_to='javascript: ...UNTRUSTED SCRIPT...' -->
<a href="<%= escapeHTML(getParameter("redirect_to")) %>">跳转...</a>
</body>
```



### React 如何做的？

通过对 XSS 的了解，我们知道，XSS 的攻击过程可以抽象为两步：

1. 攻击者提交恶意脚本；
2. 客户端执行恶意脚本；

通常防御的手段是：

1. 对 UGC 内容进行转义，即服务端不信任任何客户端的数据（这是一个好习惯）；
2. 开启白名单，防止恶意跳转；
3. 对 Cookie 设置 HTTP only，将数据放在服务端维护；

但是，React 这了前后分离（数据和代码分离）的架构实际上已经规避了大部分的 XSS 攻击手段。除此之外，React 实现了一套独立于浏览器的 DOM 系统，它能够防止通过 HTML 注入恶意代码，比如：

```react
export default () => {
  const xssTpl = '<script>alert('xss')</script>'
  return (
  	<div>
      <span>{xssTpl}</span>
      <input type="text" value={xssTpl} />
    </div>
  )
}

// after React transfer
<div>
  <span>"<script>alert('xss')</script>"</span>
  <input type="text" value="<script>alert('xss')</script>" />
</div>
```

React 会将插入变量转换为字符串，除非你在代码中通过 `dangerouslySetInnerHTML` 来插入 HTML 元素

同时，React 在处理样式时，`style` 接受一个采用小驼峰命名属性的 JavaScript 对象，而不是 CSS 字符串。这与 DOM 中 `style` 的 JavaScript 属性是一致的，同时会更高效的，且能预防跨站脚本（XSS）的安全漏洞！



## 受控组件

<b>受控组件就是将表单元素自身 state 控制权完全移交给 React state，将其作为“唯一控制源”的一种方式</b>

具体解释：在 HTML 中，存在一类元素（最常见的就是表单元素），它们通常自己维护 state，但是在 React 内，是将属性值保存在 state 内，通过 setState() 进行更新的模式，如果将 React state 作为唯一数据源，由 React state 对该元素进行控制（赋值），这类元素就是受控组件。对于受控组件来说，输入的值始终由 React 的 state 进行驱动。

将控制权移交给 React state 的好处就是：在覆盖原元素功能的情况，能够对该类元素的值进行其他操作，比如展示、函数控制等



## State

不可以在 react `render()` 方法内使用 `this.setState()`，因为无论何时调用 `setState()` 方法后都会调用 `render()`，如果在 `render()` 内调用 `setState()` 方法，会陷入一个死循环

react 将组件视为状态机，state 的改变会触发组件的重新渲染

不能通过直接赋值 `this.state.data` 来改变 state 值，而是统一通过 `setState()` 来改变，因为React的动态绑定不是通过数据劫持来实现的，而是配合diff算法

React 会将多个 `setState()` 调用合并成一个，因此**State 的更新可能是异步的**，如果需要依赖 props 来更新 state，可以通过传入函数回调的办法来解决

```js
// state 为上一个 state
// props 为当前的 props
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

### state的一些冷知识

执行`setState()`一定会触发render()方法吗，这里针对 Class Component 和 Functional Component 来实验两种特殊情况：

- 对于 Class Component，`setState(null)` 和 `setState(sameValue)`（即传入相同的值）并不会触发render()方法，因为它在调用setState()时，是进行合并操作
- 对于 Functional Component，上面两种情况均会触发render()方法，因为它是替换操作，即只要调用了state重新赋值的方法，就一定会调用render()方法


### class 组件转换为 function

对于纯函数组件，即输入决定输出，输出映射输入的函数，能够进行响应的转换，对比 class 声明组件方式：

- 不需要声明周期函数，直接 `return` jsx template
- 自定义函数声明方式改变

```javascript
function Test(props) {
	const event = (data) => {
		//statement
	};

	return(
		<div className={props.className}>
		// dom element
		</div>
	);
}
```

### constructor

组件内的构造函数，有几点需要特别注意：

- 用来初始化组件，在其内部进行 state 初始化，来避免调用 setState() 而触发的额外渲染
- constructor 内必须调用 `super(props)`，否则无法使用 `this` 对象，它用来调用基类的构造方法，同时将父组件的 props 注入到子组件内
- 如果不初始化 state 或者不进行方法绑定，则不需要为组件实现其构造函数

### 组件的生命周期

React 的生命周期经过了一次迭代，这里记录 React V16 之后的版本

![React生命周期](../assets/react/lifecycle.png)

React 生命周期的不同阶段，可以从横向和纵向来分别进行理解，下面重点对**横向比较**进行理解：

1. 挂载阶段，可以理解成组件初始化阶段，即将组件插入到DOM中，只会发生一次
2. 更新阶段，当组件的props改变了，或组件内部调用了setState或者forceUpdate发生，会多次发生
3. 卸载阶段，组件被卸载或者销毁时调用，可以去清除一些定时器，取消网络请求，清理无效的DOM元素等垃圾清理工作，此时调用 setState() 不会生效

在**挂载阶段**，其生命周期函数调用：

- constructor
- static getDerivedStateFromProps
- render，纯函数，返回渲染内容
- componentDidMount，存放业务逻辑，组件装载之后调用，此时可以获取到DOM节点并操作

在**更新阶段**，其生命周期函数调用：

- static getDerivedStateFromProps
- shouldComponentUpdate，返回布尔值来表示是否需要更新组件，当调用 forceUpdate 并不会触发此方法
- render
- getSnapshotBeforeUpdate
- componentDidUpdate

在**卸载阶段**，其生命周期函数调用：

- componentWillUnmount

**getDerivedStateFromProps(nextProps, prevState)** 是一个静态方法，所以不能使用 this，其有两个参数，返回一个对象来更新当前的 state，如果不需要更新则返回 null

- `nextProps` 指接收到的新参数
- `prevState` 指当前的 state 对象
- 根据图示可以看出，其在 constructor, New props, setState(), forceUpdate() 之后调用
- 一个使用场景就是，当我们接受到新的props时，想去修改原 state 时

### 组件通信

父组件使用子组件方法

- 将子组件 this 作为参数传递给父组件，父组件通过 `this.child` 来挂载（这样有点暴力）
- 更好的方式是通过，父组件将包含`setState()` 的方法传递给子组件，子组件通过 `this.props` 来调用该方法
- 通过 `this.myRef = React.createref()` 和 `ref={this.myRef}` 将 ref 挂载至子组件，从而获取子组件的对象实例，完成通信

子组件使用父组件方法，直接将父组件定义好的方法传递给子组件，子组件通过 `this.props` 来访问方法

- 数据单向传递

兄弟组件通信

- 可以将数据挂载至其最近父组件上来进行访问
- 还可以利用第三方库，比如 redux 来对系统内通信进行统一管理

跨级组件通信

- 通过组合组件将深层组件通过 props 进行传递
- 通过 context 来进行组件通信
- 还可以利用第三方库，比如 redux 来对系统内通信进行统一管理 

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


## 事件绑定

直接绑定到 JSX 元素上，类似 dom 元素事件绑定，传入一个函数方法而不是一个字符串

camelcase，即（`onClick` 而不是 `onclick`）

不能通过 `return false;` 来阻止元素的默认行为（比如 `<a>` 标签），而是通过 `e.preventDefault()` 来实现

### bind this

通常情况下，如果你没有在方法后面添加 `()`，则需要为该方法绑定 `this`

在 ES6 中，class 是不会默认绑定 `this` 的，有三种方法为其绑定：

通过 ES6 的箭头函数

```javascript
class EventHandle extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    return (
		// data 为传参，可不传
      <button onClick={(e) => this.handleClick(data, e)}>
        Click me
      </button>
    );
  }
}
```

2. 通过 `bind()` 方法，利用 `function.prototype.bind` 方法

- 在 constructor 内通过 bind 绑定 this
- 元素内直接绑定 this

```javascript
class EventHandle extends React.Component {
  constructor(props) {
    super(props);
    // 在 constructor 内通过 bind 绑定 this
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    onsole.log('this is:', this);
  }

  render() {
    return (
    	// 或者直接绑定 
    	// <button onClick={this.handleClick.bind(this, data)}>
    	// data 为传参，可选
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

通过实验方法来绑定，`creat-react-app` 内默认使用

```javascript
class EventHandle extends React.Component {
  // 这个语法保证 this 绑定到 handleClick 方法上
  // Warning: 试验性方法
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```