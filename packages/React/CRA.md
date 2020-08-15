## Creat-React-APP

[Create React App](https://www.html.cn/create-react-app/docs/getting-started/)为官方推荐脚手架，快速搭建 react 开发环境，创建单页面，简称 `CRA`

作为一个成熟的脚手架，它能够：

1. 不必过多了解构建工具，更专注于开发
2. 只需要引入一个依赖项，即 creat react app，它来确保顶层的部分无缝协调工作
3. 你可以对底层依赖自由配置



## Travia

1. `process.env.NODE_ENV === 'development'` 用来区分生产环境和开发环境
2. 在 `package.json` 内添加 `proxy:"http://..."` 来设置代理，更多细节参考 [设置 proxy](https://www.html.cn/create-react-app/docs/proxying-api-requests-in-development/) ，注意，代理仅在本地开发环境生效



## Webpack



### Less or Sass

引入 `sass or less` 来进行样式预解析

1. 通过 `npm install sass-loader node-sass --save` 来安装  sass 和 sass 编译器
2. 通过 `npm install less less-loader --save` 来安装  less 和 less 编译器

引入依赖之后，在 `webpack.config.js` 内进行相关的配置

```javascript
// style files regexes
// 定义 sass less 的匹配规则
const sassRegex = /\.(scss|sass)$/
const sassModuleRegex = /\.module\.(scss|sass)$/
const lessRegex = /\.less$/
const lessModuleRegex = /\.module\.less$/

// common function to get style loaders
// 配置并返回 loader
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    isEnvDevelopment && require.resolve('style-loader'),
    isEnvProduction && {
      loader: MiniCssExtractPlugin.loader,
      options: Object.assign(
        {},
        shouldUseRelativeAssetPaths ? { publicPath: '../../' } : undefined
      ),
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    // 解决 antd less-loader 解析文件错误问题
    {
      loader: "less-loader",
      options: {
        // 用来解决 antd 引入 less theme 文件报错问题
        // 注意在 babel-loader 6.x 之后采用该配置，较之前多了 lessOptions 的嵌套
        lessOptions: {
          // 通过 modifyVars 来进行主题配置
          modifyVars: { '@primary-color': '#1DA57A' },
          // 该配置用来处理引入 less 文件时，
          // 'ReferenceError: colorPalette is not defined' error
          javascriptEnabled: true
        }
      }
    }
  ].filter(Boolean)
  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: isEnvProduction && shouldUseSourceMap,
      },
    })
  }
  return loaders
}

// 配置相应的规则
return {
  module: {
    rules: [{
      // oneOf 表示匹配到规则立即返回，否则进行 file-loader
      oneOf: [
        // 添加 less-loader 解析，这里以 less 为例进行说明
        {
          test: lessRegex, // 匹配规则
          exclude: lessModuleRegex, // 排除 lessModuleRegex 的匹配文件
          // 指定使用 loader
          use: getStyleLoaders({
            importLoaders: 1, // 表示仅使用一种 loader，可以对比 sass，它需要 scss 和 sass 两种 loader，因此为 2
            sourceMap: isEnvProduction && shouldUseSourceMap,
          }, "less-loader"),
          sideEffects: true,
        },
        {
          test: lessModuleRegex,
          use: getStyleLoaders({
            importLoaders: 1,
            sourceMap: isEnvProduction && shouldUseSourceMap,
            modules: true,
            getLocalIdent: getCSSModuleLocalIdent,
          }, "less-loader"),
        }
      ]
    }]
  }
}
```









## Install && Update

在当前路径下新建一个名为 rApp 的 react app，可以：

1. `npx create-react-app rapp`  npx 为 npm5.2+ 附带的包运行工具
2. 也可以执行 `npm init react-app rapp` 

注意，project name 内不能含有大写字母，否则会出现 `Error: name can no longer containe capital letters` 

通过 `npm install react-scripts@latest` 对 react app 进行更新

安装成功之后，通过 `package.json` 查看运行命令，值得一提的是，`npm run eject` 添加一些高级配置，单向操作（这意味着你不能back）

通过 `npm install --save xxxx` 来安装依赖项

如果需要声明全局变量，最好不要在 .html 文件内直接声明，挂载到 `window` 对象上是更好的办法

例如，通过执行 `npm install --save react-router-dom` 来添加路由解决方案，如果提示有漏洞，执行 `npm audit fix --force` 来修复漏洞



## Config

React 项目 build 的路径问题

- 通过修改 `ceeate-react-app.config > paths.js` 文件内的 `getServedPath()` 方法解决


修改启动端口

- clone 项目之后，通过 `npm install` 安装依赖
- 如果之前 `npm run eject` 则会将配置暴露出来，在 `scripts/start.js` 内修改端口号


为项目 `src` 目录设置别名

- 在 config>paths.js 文件内，添加 `appSrc: resolveApp('src'),`，如果已经存在，则不用添加
- 在 config>webpack.config.js 文件内，添加别名 `alias: { '@': paths.appScr }`
- 如果项目内引入了 TypeScript，在 tsconfig.json 文件内添加 `"paths": { "@/*": ["src/*"] }`



## File Structure

`public/index.html` 为 html 模板，`src/index.js` 为 Javascript 入口文件，以上两者文件名均不可更改，其他随意

webpack 仅会编译 `src` 目录下的文件，其他的顶级目录不会被包含到生产环境，因此可以在 `Public` 目录下放一些静态资源



## Assets

在 javascript 文件内直接引入 .css 文件来表明对该样式表的依赖

通过命名规约 `Xxx.module.css` 来引入 css 模块（相当于公共样式）

create-react-app 会自动压缩 css 并通过 Autoprefixer 来补全前缀

类似 css，通过 `import` 在 javascript 文件中引入图片，字体等资源

引入 public 文件夹内的资源时，需要通过 `%PUBLIC_URL%` 来指定路径