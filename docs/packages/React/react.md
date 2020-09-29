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