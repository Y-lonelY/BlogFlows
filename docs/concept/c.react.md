# React

## Trivia

将组件作为函数或者对象来思考，根据单一数据原则来判定组件的服务范围，理论上一个组件只能负责一个功能块

将实现内容拆分为组合组件，类似dom文档结构

用 react 创建一个静态脚本，尽量将模版渲染与交互分割开，state 最好在实现交互时再考虑加入

仅保留应用所需的最小 state 集合，其他数据由该数据计算而来，比如：要展示一个列表长度，最好将一个 list 作为 state，而不是其长度或者其他属性

反向数据控制，通过传递 props 传递函数方法结合 setSate() 来实现


## 数据自顶向下

React内，组件作为独立个体，是不关心其他组件是怎样定义或者有无 state 的，因此state除了当前组件外，其他组件不可访问，**state 是局部封装**

组件可以选择将其 state 作为属性传递给子组件，这通常被称为 **自顶向下** 或 **单向** 数据流

任何 state 始终由该特定组件所有，并且从该 state 导出的任何数据或UI只影响树中 **下方** 的组件


## Context

> Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法

思考一个场景，实现系统的主题切换：

1. 类似 iOS13 theme 的实现，通过配置 json 文件来管理不同主题的资源，封装一个 theme 类，在各个模块通过引入该类，使用类的成员变量，会有一个问题，就是更换主题之后需要重新加载页面才能够应用新的主题样式

2. 参考[notepad++](https://notepad-plus-plus.org/) 结合 css filter invert 属性来改变颜色，问题就是颜色切换不够灵活

3. 在 react 项目中，可以通过传递 props 来在各个组件内通过 props.theme 属性进行控制各个组件的展示，理论上可以实现，但是会造成各个组件都需要维护一份样式的麻烦

因此，React 提供 context 来解决此类问题：Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props

更具体一点解释就是：有的时候在组件树中很多不同层级的组件需要访问同样的一批数据。Context 能让你将这些数据向组件树下所有的组件进行“广播”，所有的组件都能访问到这些数据，也能访问到后续的数据更新

注意：Context 主要应用场景在于很多不同层级的组件需要访问同样一些的数据。请谨慎使用，因为这会使得组件的复用性变差。如果只是较少的组件需要用到公共数据，可以通过**组合组件**的方式来渲染

所谓组合组件，直观的理解就是将某个需要用到公共元素的组件封装起来，在高层组件内进行引入，并且通过 props 属性将其进行传递

```jsx
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```




## React 内的错误捕获

React 内错误根据其表现类型可以分为：

- 引用错误，即引入某个资源文件时发生错误
- 渲染错误，即在渲染阶段发生异常，比如某个组件没有引入就使用
- 事件错误，即渲染没问题，但是在在调用其触发事件时发生错误，包括同步事件，异步事件以及 Promise 事件

对于错误事件捕获的方法有：

- `React Error boundaries`，可以捕获引用和渲染错误
- `window.addEventListener('error')`，可以捕获事件错误的同步情况
- `window.addEventListener('unhandledrejection')`，可以捕获异步事件错误


```js
// 一个简单的抛出异常
const err = new Error('crash!')

try {
    throw(err);
} catch(e) {
    console.log(e);
}

// setTimeout 错误，渲染完成时触发
// 根据是否为 Promise 来进行捕获
componentDidMount() {
    setTimeout(() => {
        const e = new Error('111');
        throw(e);
    }, 100);
}

// 同步事件错误，点击下拉菜单时触发
// window.addEventListener('error') 捕获
selectorChange = (value: string) => {
    try {
        JSON.parse(JSON.parse(value));
    } catch (error) {
        const e = new Error('www');
        throw(e);
    }
}

// 异步事件错误，点击下拉菜单时触发
// window.addEventListener('unhandledrejection') 捕获
selectorChange = async (value: string) => {
    try {
        await JSON.parse(JSON.parse(value));
    } catch (error) {
        const e = new Error('www');
        throw(e);
    }
}
```

### Error boundaries

Error boundaries 是 React 组件，它会在其子组件树中的任何位置捕获javascript错误，并记录这些错误，展示降级UI而不是崩溃的组件树

如果 class 组件定义了 `static getDerivedStateFromError()` 或 `componentDidCatch()` 生命周期方法，则该组件就成为了 Error boundaries

以下情况下不能通过 Error Boundaries 来实现 catch 错误：

- 组件的内部的事件处理函数，因为 Error Boundaries 处理的仅仅是 Render 中的错误，而 Hander Event 并不发生在 Render 过程中
- 异步函数中的异常，Error Boundaries 不能 catch，比如 setTimeout 或者 setInterval ,requestAnimationFrame等函数中的异常
- 服务器端的 rendering
- 它仅捕获其子组件中的错误，本身的错误无法捕获


```jsx
<!-- 封装一个 error boundary 组件 -->
import React from 'react';

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        };
    }

    componentDidCatch(error, info) {
        console.log('catch');
        console.log(error);
        console.log(info);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;

<!-- 调用时，通过其包裹即可 -->
<ErrorBoundaryState><App /></ErrorBoundaryState>
```

**static getDerivedStateFromError()**

`static getDerivedStateFromError()` 是一个静态方法，通常用来更改 state，该生命周期会在后代组件抛出错误后被调用

它将抛出的错误作为参数，并返回一个值以更新 state

`static getDerivedStateFromError()` 会在渲染阶段调用，因此不允许出现副作用

**componentDidCatch()**

在后代组件抛出错误后调用，通常用来执行一些副作用，比如将日志写入数据库内等，它接受两个参数：

- error 抛出的错误
- info 带有 componentStack key 的对象，其中包含有关组件引发错误的栈信息

`componentDidCatch()` 会在 commit 阶段被调用