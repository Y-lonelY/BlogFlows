# 深入浅出 Webpack

> Smaller, Faster,  Modules

这是一篇读书笔记, 记录我在阅读**深入浅出 Webpack**和**Webpack 官方文档**过程中的所学所思🔥

- [modules](./modules.md)



## 构建

前端构建到底是怎么一回事呢？我们不妨从 [webpack](https://www.webpackjs.com/) 的官网上一窥究竟

![webpack](../assets/webpack.png)

**前端构建要做的就是将各个来源的资源（脚本文件也是资源）转换成可执行的 JavaScript, HTML, CSS 代码**

- 代码转换, 比如 TypeScript -> JavaScript, less/sass/scss -> css
- 文件优化, 即文件压缩
- 代码分割
- 模块合并, 将复用模块合并到同一个文件内
- 自动刷新, 监听文件变化, 重新构建并刷新浏览器页面
- 自动发布



## Webpack Main Config

这里列举了 webpack 的核心概念

- **Entry**: Webpack 执行构建任务的入口
- **Module**: 模块是 Webpack 内的核心概念, 一个文件对应一个模块, Webpack 会根据入口递归查找出所有模块的递归关系
- **Chunk**: 一个代码块由多个模块构成, 用于代码分割.
- **Output**: 输出内容
- [loaders 代码转换器](./loaders.md)
- [plugin 扩展插件](./plugins.md)

除此之外, 还有一些配置是用来“服务”上述核心概念, 我们也对其进行理解

- [optimization 优化项](./optimization.md)

先来看一个简单的例子

```javascript
// module.config.js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  // to define the output file path and name
  // with NodeJS core module path
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  // loaders to support file compiler
  // compiling form right to left 
  module: {
    rules: [
      {
        test: /\.css$/,
        // like get request to transfer params
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
```



我们将配置项写在 <b style="color: #ef613e;">webpack.config.js</b> 文件内, 通过 `module.exports = {...}` 来导出, 因为该文件**就是一个标准的 Node.js CommonJS Module**




### Entry

`entry` 支持配置**多主入口**

> This is useful when you would like to inject multiple dependent files together and graph their dependencies into one chunk.

除了支持 string 外, 还可以通过列表或者对象的形式为其配置入口

- Entry 类型为 `string` 或者 `array`, 则只会生成一个 chunk, 且名字为 `main`
- Entry 类型为 `object`, 则会生成多个 chunk, 每个 chunk 名字为其**键值**

```javascript
module.exports = {
  // string -> main.js
  entry: './src/index.js',
	// array -> main.js
  entry: [
    './src/app1/index.js',
    './src/app2/index.js'
  ],
  // object -> app1.js, app2.js
  entry: {
    app1: './src/app1/index.js',
    app2: './src/app2/index.js'
  }
}
```




### Output

**output** 用来告诉 Webpack 如何在磁盘上写入最终输出的文件, 配置类型为 object

个人感觉, webpack 提供如此丰富的输出命名模版变量, 就是希望通过文件名的改变与否, 来间接使用浏览器的[缓存策略](/practice_explore/js/GROWTH性能优化实践.md)

```javascript
output: {
  path: path.resolve(__dirname, 'dist'),
  // [name] will add filename
  filename: '[name].bundle.js',
  publicPath: 'https://7k7k.life/assets/'
},
```



- `path` 输出文件存放的目录, 是一个**绝对路径**, 通常通过 `path.resolve(__dirname, 'path')` 来定义
- `filename` 输出文件的名字, 支持模版字符串, 当 entry 配置为多入口时, 需要使用模版语法来确保每个输出文件有**唯一的名字**

| 变量名                                            | 含义                                 |
| :------------------------------------------------ | ------------------------------------ |
| id                                                | Chunk 的唯一标识，从0开始            |
| name                                              | Chunk 的名称                         |
| hash, 比如 `[hash:8]` 表示取8位 hash 值           | Chunk 的唯一标识的 Hash 值           |
| chunkhash                                         | Chunk 内容的 Hash 值, 由一组模块组成 |
| contenthash, 需要 `ExtractTextWebpackPlugin` 插件 | 代码内容本身组成的 Chunk             |

- `publicPath` 用来配置资源文件的路径, 比如你有一个图片服务器, 地址为 `https:www.images.com/assets/`, 此时可以配置 `output.publicPath:https:www.images.com/assets/ `, 它会告诉 Webpack, 在编译的时候碰到引用该地址的资源文件, 你不用进行感知, 并且这个属性支持在入口文件通过 `__webpack_public_path__ = PublicPath` 来进行动态配置



### Chunk

一个 **chunk** 由多个 module 组成, 用于代码分割和合并

**一个 entry 和其所有依赖的 Modules 组成一个 chunk**

举个例子: 在 webpack 4 之前, 通常将一些不会再改变的脚本(比如 `JQuery, Bootstrap` 等)放到一个 chunk 内(通常是 `vendor.js`), 这样做的目的是为了让浏览器缓存这些脚本, 从而减少加载时间

**webpack 4 之后通过 optimization.splitChunks 属性来配置, 进行代码分割**



## Webpack Else Config

这里介绍一些常用的, 但是没那么重要的配置项

### Target

**Target** 用来控制 webpack 构建出针对不同环境的代码

### Devtool

**Devtool** 控制 webpack 如何生成 Source Map, 默认值为 `false`, 如果在开发时希望生成 source map 来进行调试, 可以设置 `{ devtool: 'source-map'}`



### Watch

**Watch** 控制 webpack 是否开启监听模式, 开启监听模式之后, webpack 会监听文件的变化, 在文件发生变化时重新编译, 设置 `{ watch: true }`

使用 `DevServer` 时, 默认开启, 通过 `watchOptions` 来进行更加灵活的设置

```javascript
  watchOptions: {
    // 不监听的文件
    ignored: /node_modules/,
    // 监听到变化到产生动作的延迟, 防止更新频率太高
    aggregateTimeout: 300,
    // 主动轮训, 每 1000 毫秒判断一次
    poll: 1000
  }
```



### Externals

**externals** 用来告诉 webpack 哪些文件不需要被打包, 那么什么情况下使用这个配置项呢?

我们还是以 JQuery 为例来进行说明(你懂的):

​		比如你在已经在 `index.html` 内通过 `<script src="path/to/jquery.js"></script>` 引入了 JQuery, 实际上其已经挂载到全局的 namespace 上了, 如果你在某个模块内通过 `import $ from 'jquery'` 引入其进行使用的话, webpack 会将同一份 JQuery 脚本打包两次, 浪费了性能和加载流量, 此时 `externals` 就派上了用场:

**externals 用来告诉 webpack, 在 JavaScript runtime 环境内, 可以直接访问到指定的全局变量, 不需要再进行打包**

```javascript
module.export = {
  externals: {
    // 把导入语句里的 jquery 替换成运行环境里的全局变量 jQuery
    jquery: 'jQuery'
  }
}
```

