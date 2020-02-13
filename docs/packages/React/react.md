# React

> Record React Materials In Project


## Node-Sass 安装问题

clone 一个 react 项目后，在执行 `npm install` 之后，发现 node-sass 安装出现问题，原因是无法自动下载相应的文件

解决办法：

- 注意要先将之前安装的错误的 node-sass 进行删除
- 在错误日志内查看需要的版本，在[官网](https://github.com/sass/node-sass/releases)下载相应的版本
- 将下载文件放在nodejs的根目录下
- 进入项目根目录，设置 sass 路径，`set SASS_BINARY_PATH=[file path]`
- 继续执行 `sudo npm i node-sass -D -verbose` 即可


## 配置淘宝镜像源

```shell
npm install -g mirror-config-china --registry=http://registry.npm.taobao.org
npm install node-sass
```

## Create React App

[Create React App](https://www.html.cn/create-react-app/docs/getting-started/)为官方推荐脚手架，快速搭建 react 开发环境，创建单页面，简称CRA

1. 不必过多了解构建工具，更专注于开发
2. 只需要引入一个依赖项，即 creat react app，它来确保顶层的部分无缝协调工作
3. 你可以对底层依赖自由配置


### Install && Update

在当前路径下新建一个名为 rApp 的 react app，可以：

1. `npx create-react-app rapp`  npx 为 npm5.2+ 附带的包运行工具
2. 也可以执行 `npm init react-app rapp` 

注意，project name 内不能含有大写字母，否则会出现 `Error: name can no longer containe capital letters` 

通过 `npm install react-scripts@latest` 对 react app 进行更新

安装成功之后，通过 `package.json` 查看运行命令，值得一提的是，`npm run eject` 添加一些高级配置，单向操作（这意味着你不能back）

通过 `npm install --save xxxx` 来安装依赖项

如果需要声明全局变量，最好不要在 .html 文件内直接声明，挂载到 `window` 对象上是更好的办法

例如，通过执行 `npm install --save react-router-dom` 来添加路由解决方案，如果提示有漏洞，执行 `npm audit fix --force` 来修复漏洞


### Config

React 项目 build 的路径问题

- 通过修改 `ceeate-react-app.config > paths.js` 文件内的 `getServedPath()` 方法解决


修改启动端口

- clone 项目之后，通过 `npm install` 安装依赖
- 如果之前 `npm run eject` 则会将配置暴露出来，在 `scripts/start.js` 内修改端口号


为项目 scr 目录设置别名

- 在 config>paths.js 文件内，添加 `appSrc: resolveApp('src'),`，如果已经存在，则不用添加
- 在 config>webpack.config.js 文件内，添加别名 `alias: { '@': paths.appScr }`
- 如果项目内引入了 TypeScript，在 tsconfig.json 文件内添加 `"paths": { "@/*": ["src/*"] }`


### File Structure

`public/index.html` 为 html 模板，`src/index.js` 为 Javascript 入口文件，以上两者文件名均不可更改，其他随意

webpack 仅会编译 `src` 目录下的文件，其他的顶级目录不会被包含到生产环境，因此可以在 `Public` 目录下放一些静态资源


### style && assets

在 javascript 文件内直接引入 .css 文件来表明对该样式表的依赖

通过命名规约 `Xxx.module.css` 来引入 css 模块（相当于公共样式）

通过 `npm install node-sass --save` 来安装 Sass 编译器

create-react-app 会自动压缩 css 并通过 Autoprefixer 来补全前缀

类似 css，通过 `import` 在 javascript 文件中引入图片，字体等资源

引入 public 文件夹内的资源时，需要通过 `%PUBLIC_URL%` 来指定路径


## React Router

[react 路由组件](https://reacttraining.com/react-router/web/guides/quick-start) 通过 `npm install react-router-dom --save` 来引入

react router 内包含三种类型组件：

1. 路由器组件
2. 路由器匹配组件
3. 导航组件

理解：路由器匹配组件一般映射一个模块，当 url 改变时则会去匹配该模块并展示，但是所有的路由器匹配组件都必须被包裹在路由器组件内

### 通过import实现组件的异步加载

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


### withRouter

给空间绑定事件，使其能够通过 javascript 来实现跳转，通过 `withRouter` 来实现

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

### router

路由器组件，是 react router 的**地基**，两个关注组件 `<BroswerRouter>` 和 `<HashRouter>`

一般来说，如果有服务器交互，则应该使用 `<BroswerRouter>`，如果作为静态文件服务器，则使用 `<HashRouter>`

`<BroswerRouter>` 利用 H5.history.api(pushState, replaceState, popState) 来实现 UI 和 URL 的同步

`<HashRouter>` 利用 window.location.hash 来实现 UI 和 URL 的同步


### router matching

路由器匹配组件，两个关注组件 `<Route>` 和 `<Switch>`

`<Route>` 通过比较组件设置的path和当前URL的路径，如果能够匹配上，则返回内容，否则返回 null；如果不设置 path 属性，则一定会匹配

`<Switch>` 组件通常用来包裹 `<Route>` list，在 `<Switch>` 中按照组合的先后顺序进行遍历，返回第一个匹配的 `<Route>`，如果一个都没匹配上，可以设置一个无path属性的 `<Route>` 来作为 404 页面

### Q&A

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


### Use In App

在 react 项目中，对 react-router 的封装

1. `RouteConfig.js` 用来引入相关的组件，实现对路由的配置，实现对 `<Route>` API 的相关属性配置
2. `Router.js` 用来实现路由递归逻辑，输入 config，输出 react-router 相关的组件
3. 在 `app.js` 内引入 `RouteConfig.js` 和 `Router.js`，并通过 `<BrowserRouter>` 或者其他 API 来封装启动路由


## Bizcharts

### scale

```js
const scale = {
	// 针对 date 数据列
    date: {
        // 数据类型，非连续的时间类型
        type: 'cat',
        /**
         * range 用来控制坐标轴两边的留白
         * 对于分类数据的坐标轴两边默认会有留白
         * 连续数据的坐标轴的两端没有空白刻度
         * 留白程度通过 range 来控制
         */
        range: [0.1, 0.9]
    }
};
```


## React Hot Loader

> React Hot Loader is a plugin that allows React components to be live reloaded without the loss of state

[React-hot-loader](https://github.com/gaearon/react-hot-loader) 是一个插件，允许 React 组件在不丢失状态的条件下进行实时重新加载操作

webpack-dev-server 也实现了热加载，但是是在代码改动后，经过重新打包，进而重新刷新整个页面

不同于 webpack-dev-server，react-hot-loader 不会刷新整个页面，它只替换修改的代码，进而做到了页面的局部刷新，其需要依赖 webpack 的 HotModuleReplacement 热加载插件

### Use In App

1. `npm install react-hot-loader --save` 引入 react-hot-loader
2. 配置 .babelrc 文件，启用相关插件，在 create react app 且 `npm run eject` 之后，可以直接在 package.json 内进行 babel 相关配置

```json
"babel": {
	"presets": [
	  "react-app"
	],
	"plugins": [
	  "react-hot-loader/babel"
	]
},
```

3. webpack 进行相关文件配置，用来保证 react-hot-loader 在引入 `react` 和 `react-dom` 之前加载

```javascript
// webpackDevServer.config.js
module.exports = function(proxy, allowedHost) {
	return {
		hot: true
	}
}

// webpack.config.js
entry: [
	'react-hot-loader/patch',
]
```

4. 在项目文件内使用

```javascript
// App.js
import { hot } from 'react-hot-loader/root';
const App = () => <div>Hello World!</div>;
export default hot(App);
```