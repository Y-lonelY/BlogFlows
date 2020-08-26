# React Router

> React 生态的路由组件

执行 `npm install react-router-dom --save`  或者 `yarn add react-router-dom` 来引入

⚠️ [react-router future](https://reacttraining.com/blog/reach-react-router-future/) 将会发布新的路由组件，主要是因为 React Hooks 的发布从根本上改变了生态，从而引发了 react-router 的重构，可以关注一下！

简单介绍下 [react-router](https://reactrouter.com/web/example/basic) 的基础知识和一些可利用的组件，接着会介绍针对项目内的使用和组件封装方法

## Basic

React-router 包含三种类型组件，**路由器匹配组件**通常映射一个业务模块，当 url 改变时则会去匹配该模块并展示，所有的路由器匹配组件都必须被包裹在**路由器组件**内：

1. 路由器组件， like `<BrowserRouter>` and `<HashRouter>`
2. 路由器匹配组件，like `<Route>`  and  `<Switch>`
3. 导航组件，like `<Link>`, `<NavLink>`, and `<Redirect>`

此外，React-router 还提供了一些很棒的特性：

- [Prompt](https://reactrouter.com/web/example/preventing-transitions) 用来阻止用户直接退出当前路径，通常用来确定用户表单提交
- [no-match](https://reactrouter.com/web/example/no-match) 用来捕获匹配到的路由，并对其进行处理
- 一个页面内，多个地方匹配路由是一种很常见的场景，比如侧边栏、面包屑和主体内容，在 React-router 内，不过是实现多个 `<Switch><Route></Route></Switch>` 的事情，参考 [Sidebar](https://reactrouter.com/web/example/sidebar)
- React-router 提供 [animated-transitions](https://reactrouter.com/web/example/animated-transitions) 来处理页面切换的过渡效果，注意需要引入 `react-transition-group`
- [Modal Gallery](https://reactrouter.com/web/example/modal-gallery) 是一个 hack 方法的实例，通过 state 同时支持在当前页面内跳转和替换当前页面两种展示模式



### 路由跳转

在  `react-router` 内实现路由跳转，可以通过 `<Link>`、`withRouter`、`useHistory`、`<Redirect>`、`<NavLink>`  来实现

#### Link

针对 `to` 属性，可以支持 string、object、function 三种形式

通过 `replace` 来控制 `target = blank or self`

```ts
// with params && query
<Link
  to={{
    pathname: "/courses",
    search: "?sort=name",
    hash: "#the-hash",
    state: { fromDashboard: true }
  }}
/>
```



#### withRouter

给控件绑定事件，使其能够通过 javascript 来实现跳转，通过 `withRouter` 来实现

```js
import { withRouter } from 'react-router-dom';
class FlowHeader extends React.Component<FlowHeaderProps, FlowHeaderState> {
	// statement

    handleRouter = (index) => {
        const selectedItem = flowItems[index];
        if (selectedItem.label === this.state.currentItem) {
            return;
        } else {
            this.props.history.push('/');
        }
    }
}

export default withRouter(FlowHeader);

// use in redux
export default withRouter(connect(...)(MyComponent))
```

## 



## In Project

介绍在项目的一些使用技巧

### 利用 import 实现组件的异步加载

`import()` 方法会返回一个 Promise 对象，可以利用其进行异步加载操作

```js
// 封装异步加载组件，通过接受一个 import() 方法，返回对应的组件
import React from 'react';

export function asyncComponent(targetComponent) {
    class AsyncComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                component: null
            }
        }

        componentDidMount() {
            targetComponent().then(md => {
                this.setState({
                    // 同时兼容 ES6 和 CommonJS 的模块
                    component: md.default ? md.default : md
                });
            })
        }

        render() {
            const Target = this.state.component;
            // 通过自闭和标签进行返回，是为了接受可能出现的 props 参数传递
            return Target ? <Target {...this.props} /> : null;
        }
    }

    return AsyncComponent;
}

// 在其他文件内的使用方法，之所以这个方法不进行封装，是为了相对路径的考虑，保证组件寻找不会紊乱
const component = asyncComponent(() => import ('@/view/Practice'));
```



### Use In App

在 react 项目中，对 react-router 的封装

1. `RouteConfig.js` 用来引入相关的组件，实现对路由的配置，实现对 `<Route>` API 的相关属性配置
2. `Router.js` 用来实现路由递归逻辑，输入 config，输出 react-router 相关的组件
3. 在 `app.js` 内引入 `RouteConfig.js` 和 `Router.js`，并通过 `<BrowserRouter>` 或者其他 API 来封装启动路由





## Q&A

问题描述：使用 `BroswerRouter` 是，进入到某个模块，例如 `/module` 后，刷新页面，返回 404

原因：当刷新页面时，浏览器会向服务器请求example.com/list，服务器实际会去找根目录下list.html这个文件，发现找不到，因为实际上我们的服务器并没有这样的 物理路径/文件 或没有配置处理这个路由，所有内容都是通过React-Router去渲染React组件，所以会产生 404 错误

解决：

通过修改 nginx 配置，访问任何URI都指向index.html，浏览器上的path，会自动被React-router处理，进行无刷新跳转

```nginx

server {
    server_name react.thinktxt.com;
    listen 80;
 
    root /Users/txBoy/WEB-Project/React-Demo/dist;
    index index.html;
    location / {
        try_files $uri /index.html;
    }
}
```