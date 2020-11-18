# 深入浅出 Webpack


## 模块化

> Module is the future!

对于现在的 Web 应用来说, 模块化是一个绕不开的话题. **模块化是指将一个复杂的系统分解为多个模块以方便编码, 简单来说就是: 输入/输出代码块**

在 jQuery 的那个时代, 大多数的脚本都是将其 API 挂载到全局命名空间（比如 `window.$`）下, 以在不同文件内进行引用.

现在回过头来思考一下, 这样的做法会带来一些问题

- 无法合理地管理项目的依赖和版本（命名空间冲突的问题）
- 无法方便地控制依赖的加载顺序

当项目的依赖增多或者前端项目变大时, 这种方式越来越难以维护, 于是有了模块的一些解决方案

这里仅针对 JavaScript 内的模块化方案进行介绍, 还有关于样式的模块化方案, 比如 `less` 等, 这里就不再进赘述, 目的是为了让你能够感知到: 

**我们封装了很多轮子, 来使我们更高效的编码, 但是往往需要编译后的代码才能来让机器执行**

### CommonJS

随着 NodeJS 的流行, 这种模块化方案被发扬光大, 其核心思想是**通过 `require` 方法来同步加载(输入)依赖, 通过 `module.exports` 来输出代码块**

CommonJS 通常被用来在非浏览器端管理依赖，设计目的是避免模块定义全局对象.

**在 CommonJS 内，一个文件就是一个模块**

可以直接在 NodeJS 环境下运行, 但是无法直接在浏览器环境下运行, 需要转换成标准 ES5 


### AMD

**AMD(Asynchronous Module Definition)** 顾名思义, 它采用异步的方式来加载依赖的模块, jQuery 时代里, [requirejs](https://requirejs.org/) 就是其典型代表.

看一个使用 `requirejs` 的例子：

```javascript
// defined a module
define('jquery', function(jq) {
  return jq.noConflict(true)
})

// require a moduel
require(['jquery'], function($) {
  console.log($)
})
```

其优势在于

- 可以直接在浏览器环境或者 NodeJS 环境下运行
- 可以异步加载依赖
- 可以并行加载多个依赖

缺点也很明显, 就是需要引入第三方依赖来实现

### ES6 module

这应该是大家非常熟悉的, 现代框架都是支持的模块化方案, 但是它也无法在 NodeJS 和浏览器环境下直接运行

- 一个文件就是一个模块，不支持按需加载
- ES6 模块是静态的，即导入后无法进行更改
- ES6 是指针绑定，在编译时输出，不同于 CommonJS 值绑定，模块内做出了修改，会反映到所有使用该模块的代码中
- ES6模块采用的是单例模式，每次对同一个模块的导入其实都指向同一个实例


## 构建

前端构建到底是怎么一回事呢？我们不妨从 [webpack](https://www.webpackjs.com/) 的官网上一窥究竟

![webpack](./assets/webpack.png)

**前端构建要做的就是将各个来源的资源（脚本文件也是资源）转换成可执行的 JavaScript, HTML, CSS 代码**

- 代码转换, 比如 TypeScript -> JavaScript, less/sass/scss -> css
- 文件优化, 即文件压缩
- 代码分割
- 模块合并, 将复用模块合并到同一个文件内
- 自动刷新, 监听文件变化, 重新构建并刷新浏览器页面
- 自动发布

