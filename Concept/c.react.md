<!-- MarkdownTOC -->

- [Trivia](#trivia)
- [React vs Vue](#react-vs-vue)
- [MVVM](#mvvm)
    - [SPA](#spa)
- [diff算法](#diff%E7%AE%97%E6%B3%95)
- [数据自顶向下](#%E6%95%B0%E6%8D%AE%E8%87%AA%E9%A1%B6%E5%90%91%E4%B8%8B)
- [React 内的错误捕获](#react-%E5%86%85%E7%9A%84%E9%94%99%E8%AF%AF%E6%8D%95%E8%8E%B7)
    - [Error boundaries](#error-boundaries)

<!-- /MarkdownTOC -->

## Trivia

将组件作为函数或者对象来思考，根据单一数据原则来判定组件的服务范围，理论上一个组件只能负责一个功能块

将实现内容拆分为组合组件，类似dom文档结构

用 react 创建一个静态脚本，尽量将模版渲染与交互分割开，state 最好在实现交互时再考虑加入

仅保留应用所需的最小 state 集合，其他数据由该数据计算而来，比如：要展示一个列表长度，最好将一个 list 作为 state，而不是其长度或者其他属性

反向数据控制，通过传递 props 传递函数方法结合 setSate() 来实现


## React vs Vue

首先说说相同点：

- MVVM
- 组件化思想
- 虚拟dom

不同点：

- 状态管理不同，Vue 对每个数据进行动态绑定，可以通过直接赋值来触发更新，而React是单向数据流，需要显式调用 `setState()` 来触发组件更新
- 响应机制不同，React 是通过 diff 算法来进行遍历比较，Vue 则是通过数据绑定来实现响应，当处理大型应用或者复杂场景时，Vue会因此带来性能问题
- React 组件是通过class或者 react hook，而 vue 则是通过声明式来创建组件的
- 模版引擎不同，react 是JSX语法来渲染dom，Vue是通过 template 来实现，前者可以直接使用原生JavaScript的语法，后者需要通过指令来实现`v-if`，会显得有点奇怪


## MVVM

MVVM的核心是数据驱动即ViewModel，ViewModel是View和Model的关系映射，怎么理解这句话？

- Model 层，用户从后端获取数据
- View 层，代表用户看到的视图
- ViewModel 则用来处理js对象和视图模版的映射关系，可以理解为数据的抽象画视图，ViewModel 充当着观察者的角色，当 view 或者 model 任一发生了改变，则会通知另一方作出相应的变化，即为数据的双向绑定

MVVM 最具有代表的特性是数据绑定，MVVM 的核心理念是通过声明式的数据绑定来实现 View 的分离，完全解耦 View

### SPA

单页面应用可以看作是MVVM的一个产物，同时单页面应用也带来了一些挑战：

- 如何保持数据和UI同步更新
- 如何提高DOM操作的效率
- 使用HTML开发UI页面极其复杂

React 框架在一定程度上解决了上述问题：

- 数据双向绑定，react 的 state 特性 来进行UI状态管理
- diff算法，虚拟DOM树来更新DOM
- JSX 来进行模版渲染，通过js来进对应组件的HTML渲染

## diff算法

diff 算法的基本规则：

- 比对不同类型的元素：当根节点为不同类型的元素时，React 会拆卸原有的树并且建立起新的树
- 比对相同类型的元素：当比对两个相同类型的 React 元素时，React 会保留 DOM 节点，仅比对及更新有改变的属性
- 比对相同类型的组件元素：当组件更新时，组件实例保持不变

如何理解呢？

比如，一个元素原本是 `<div>` 标签，结果变成了 `<span>` 标签，那么此时会触发对比不同类型的元素的规则，即会从当前元素开始，重新构建整个子节点。这个过程可以表示如下：

- 首先卸载当前组件实例，组件实例将执行 `componentWillUnmount()` 方法，同时之前和组件关联的 state 也会被销毁
- 再重新构建新的树节点，依次调用 `componentWillMount()` 和 `componentDidMount()` 方法
- 根节点以下的子节点也会执行上述操作，即卸载后重新装载

对于相同元素呢，比如 `className` 改变了，那么对保留 DOM 结果，仅仅改变其属性，调用 `componentWillUpdate()` 和 `render()`

对于组件，比如props更新了，这时组件实例保持不变，更新其props以和最新的元素保持一致，并且调用该实例的 `componentWillReceviceProps()` 和 `componentWillUpdate()` 方法，之后调用与 `render()` 方法

对Dom元素的子节点进行递归时，React绘同时递归两个子元素的列表，当产生差异时，会生成一个突变（mutation）

这样比较造成的一个问题就是，当我不在意列表顺序时，在头插入和尾部插入会造成不一样的性能损耗，在头部插入相当于整个列表的重新渲染，而尾部插入只会影响一个节点，这种情况可能会带来性能问题，因此，react通过支持 key 属性来规避这个风险

所谓key值，实际上就是给某一个dom元素添加一个唯一标识，通过key值来匹配原有树上的子元素以及最新树上的子元素，但是建议不要使用，原因：
- 改变原数组来重新渲染，如果通过 index 来标识，实际上跟有无key并无关系，还是会造成性能损耗
- 如果key是一个下标，那么当修改顺序时，一些非受控组件，比如输入框可能会导致部无预期的后果






## 数据自顶向下

React内，组件作为独立个体，是不关心其他组件是怎样定义或者有无 state 的，因此state除了当前组件外，其他组件不可访问，**state 是局部封装**

组件可以选择将其 state 作为属性传递给子组件，这通常被称为 **自顶向下** 或 **单向** 数据流

任何 state 始终由该特定组件所有，并且从该 state 导出的任何数据或UI只影响树中 **下方** 的组件


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

