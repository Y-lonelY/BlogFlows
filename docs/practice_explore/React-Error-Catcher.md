# React Error Catcher

> React 内不同类型的错误捕获

![catch image](/Users/yango/github/blog/BlogFlows/practice/assets/React Error Ctacher.png)

本文将会从三个阶段来探讨发生在在 React 内的错误捕获，并且介绍如何封装一个通用的组件：

1. React 内主要错误根因和错误捕获方法
2. 对捕获错误的数据处理
3. 捕获组件设计

Keyword:

- `React Error Boundary`
- `ErrorEvent`
- `Error Information`

Todo:

- Error 展示和数据分析



## How did the error occur

在 React 内，一个错误是如何产生的呢？

不如我们先了解 JavaScript 内一些常见的错误，这会在我们开发组件时提供帮助

```javascript
// 一个简单的抛出异常，可以在脚本任何地方，会被 `onError` 捕获
const err = new Error('crash!')

try {
    throw(err);
} catch(e) {
    console.log(e);
}

// 利用 setTimeout 抛出异步错误，渲染完成时触发
componentDidMount() {
    setTimeout(() => {
        const e = new Error('111');
        throw(e);
    }, 100);
}


// 由于用户交互引起的事件错误，在编译时不被察觉，在执行时产生
// `onError` 捕获
clickValue = (value: string) => {
    JSON.parse(JSON.parse(value));
}


// 异步事件错误，即 Promise.reject()
// `unhandledrejection` 捕获
(async (value: string) => {
    await JSON.parse(JSON.parse(value));
})("hello")

// 组件渲染错误，我们可以直接在 React JSX 内返回一个错误
render() {
  return (
  	<>new Error("hello")<\/>
  )
}
```



在 React 内错误根据其**表现类型**可以分为：

- 渲染错误，即在渲染阶段发生异常，比如某个组件没有引入就使用
- 引用错误，即引入某个资源文件时发生错误，这个往往在编译过程中能够捕获到。在这里我们讨论异步引入的情况
- 事件处理，即渲染没问题，但是在在调用其触发事件时发生错误，比如 `JSON.parse(JSON.parse("some reason"))`，这类错误可以细分为用户手动触发和脚本触发，可以参考 `Error.isTrusted` 属性进行理解
- 异步代码，比如 `promise.reject("some reason")`



## How to catch in React

捕获错误实际上就是弄清楚，**when and where, who did what cause what**（即什么人在什么时间因为执行了某个文件的具体方法从而导致了某个错误）

错误和错误的捕获方法存在一对多的关系，即一个错误可能被不同的方法捕获，在 JavaScript 内错误事件捕获的方法各司其职：

- 使用 `try {} catch(e){}` 语句在事件处理器内部捕获错误
- `React Error boundaries`，可以捕获资源引用和组件渲染错误，通常这两者在 dev 时就能发现
- `window.addEventListener('error')`，可以捕获**事件处理**错误
- `window.addEventListener('unhandledrejection')`，可以捕获**异步代码**错误

接下来，我们将从 **错误类型**，**捕获时机**和**捕获信息**对这三种事件逐一进行介绍



### Error boundaries

[Error Boundaries](https://zh-hans.reactjs.org/docs/error-boundaries.html#how-about-event-handlers) 是 React 提出的一种用于错误捕获的**组件**，事实上，它是一个的定义了 `static getDerivedStateFromError()` 或 `componentDidCatch()` 生命周期方法的 class 组件

Error Boundaries 的出现是为了解决：部分 UI 的错误导致整个 App 的崩溃的问题，比如一个页面内，侧边栏出现的问题导致整个页面无法显示，此时可以通过捕获侧边栏的错误，渲染出降级的 UI（或者另一个方案）来避免这种情况

Error boundaries **可以捕获并打印发生在其子组件树任何位置的 JavaScript 错误并渲染出备用 UI**

以下情况下不能通过 Error Boundaries 来 catch 错误（但是可以通过上述其他手段来获取）：

- 组件的内部的事件处理函数，因为 Error Boundaries 处理的仅仅是 Render 中的错误，而 Handle Event 并不发生在 Render 过程中
- 异步函数中的异常，比如 `setTimeout` 或者 `setInterval` ,`requestAnimationFrame` 等函数中的异常
- 服务端渲染

注意，**Error Boundaries 仅捕获其子组件中的错误，本身的错误无法捕获**，这要求我们在封装组件时，我们需要对组件本身的错误进行处理，使其能够捕获并且不会陷入死循环



### ErrorEvent of JavaScript

通过 `onerror` 捕获的错误类型为 [ErrorEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/ErrorEvent) ，ErrorEvent 继承于 Event，其自身属性包括：

- `message: string` 错误的描述信息
- `filename: string` 发生错误的文件名
- `lineno: number` 错误发生的行号
- `colno: number` 错误发生的列号
- `error: Error` error 实例

继续了解 [Event](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) 获取更多信息，罗列一些关键点：

- `Event.currentTarget` 标识的是事件沿着 DOM 触发时的当前目标，它指向的是事件绑定元素（因为有可能在触发过程中被改变），`Event.target` 指向的是事件触发元素
- `isTrusted: boolean` 表示事件是由浏览器（比如用户点击）发起（true）的还是由脚本（使用事件创建方法）引起的（false）
- `timestamp` 不同浏览器对其定义不一致，因此通常不要使用这个参数来作为时间记录
- `target.performance.timeOrigin` 表示开始记录的高精度 timestamp

通过 `onunhandledrejection` 捕获的错误类型为 [PromiseRejectionEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/PromiseRejectionEvent) ，它出现在 JavaScript 内 `promise` 被 `reject` 时触发事件，其同样继承于 Event，其自身属性包括：

- `promise` 
- `reason` 表示 promise 为什么被 rejected



## Catched error data

针对不同途径获取的错误信息，进行处理后统一上报的信息，对于 `onerror` 和 `onunhandledrejection` 的信息通常通过 `Event.target` 提供，而对于 React Error Boundaries 捕获的错误，通常从 `window` 对象来获取

下面针对一些关键的错误信息进行梳理：

```js
export interface ErrorInfo {
  app?: string
  // "onerror" | "onunhandledrejection" | "componentDidCatch"
  caughtEvent?: string
  user?: string
  message?: string
  // window.performance.timeOrigin 时间戳
  timeOrigin?: number | string
  // at filepath lineno:colno
  stack?: string
  // event.type 事件类型
  type?: string
  // event.isTrusted 事件触发来源
  isTrusted?: boolean
  // 是否启用 cookie
  cookieEnabled?: boolean
  cookie?: string
  userAgent?: string
  href?: string
  screenHeight?: number | string
  screenWidth?: number | string
}
```



## Create a component

当我们具备了捕获错误的能力和整理错误信息的能力之后，封装组件就是一件水到渠成的事情了，大家轻松封装出一个组件，因此我就交流一下在处理数据过程中的一些问题：

1. 重复数据的处理。一个错误往往可能在同一时间触发多个捕获事件，我们可以通过关键字段和 `Set` 类型来进行去重处理，我会选择 `app`、`user`、`timeOrigin` 和 `caughtEvent` 组合成为一个标志符来进行判断
2. 过滤指定错误。因为通常错误不是由我们开发产生的，可能是由于引入的组件引起的，比如 `antd` 部分组件抛出的 `ResizeObserver loop limit exceeded` 错误，对于组件使用没有实际影响。对于这类错误，我们会提供过滤的功能，用来过滤掉指定的错误。同时，为了防止组件本身内部引起的错误循环上报，我们可以抛出一个自定义的错误，并将其进行默认过滤
3. 批量上报。前端错误的产生往往是在一瞬间同时发生的，因此我们不得不考虑进行批量上报。我会从时间上（通过设置定时器任务）和数量上来进行约束