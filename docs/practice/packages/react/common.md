# React Common Packages

**快速索引**

- [node-sass](https://github.com/sass/node-sass) 提供 NodeJS 到 Libsass 的绑定
- [react-hot-loader](https://github.com/gaearon/react-hot-loader) React 的热加载工具

**Solo with code✨**


## Node-Sass 安装问题

clone 一个 react 项目后，在执行 `npm install` 之后，发现 node-sass 安装出现问题，原因是无法自动下载相应的文件

解决办法：

- 注意要先将之前安装的错误的 node-sass 进行删除
- 在错误日志内查看需要的版本，在[官网](https://github.com/sass/node-sass/releases)下载相应的版本
- 将下载文件放在nodejs的根目录下
- 进入项目根目录，设置 sass 路径，`set SASS_BINARY_PATH=[file path]`
- 继续执行 `sudo npm i node-sass -D -verbose` 即可



## React Hot Loader

::: tip
React Hot Loader is a plugin that allows React components to be live reloaded without the loss of state
:::

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