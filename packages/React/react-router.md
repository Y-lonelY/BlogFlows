# React Router

[react 路由组件](https://reacttraining.com/react-router/web/guides/quick-start) 通过 `npm install react-router-dom --save` 来引入

react router 内包含三种类型组件：

1. 路由器组件
2. 路由器匹配组件
3. 导航组件

理解：路由器匹配组件一般映射一个模块，当 url 改变时则会去匹配该模块并展示，但是所有的路由器匹配组件都必须被包裹在路由器组件内


## 通过import实现组件的异步加载

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

## 路由跳转

在 react-router 内实现路由跳转，可以通过 `<Link>`、`withRouter`、`useHistory` 来实现

### useHistory



### <Link>

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

### withRouter

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

## router

路由器组件，是 react router 的**地基**，两个关注组件 `<BroswerRouter>` 和 `<HashRouter>`

一般来说，如果有服务器交互，则应该使用 `<BroswerRouter>`，如果作为静态文件服务器，则使用 `<HashRouter>`

`<BroswerRouter>` 利用 H5.history.api(pushState, replaceState, popState) 来实现 UI 和 URL 的同步

`<HashRouter>` 利用 window.location.hash 来实现 UI 和 URL 的同步


## router matching

路由器匹配组件，两个关注组件 `<Route>` 和 `<Switch>`

`<Route>` 通过比较组件设置的path和当前URL的路径，如果能够匹配上，则返回内容，否则返回 null；如果不设置 path 属性，则一定会匹配

`<Switch>` 组件通常用来包裹 `<Route>` list，在 `<Switch>` 中按照组合的先后顺序进行遍历，返回第一个匹配的 `<Route>`，如果一个都没匹配上，可以设置一个无path属性的 `<Route>` 来作为 404 页面


## Use In App

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