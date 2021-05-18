# Modules

> Module is the future!

<b>Module is the future!</b> 初次看到这句话是在翻译 Airbnb JavaScript 规范时，当时觉得这句话很装x，现在回过头看，前端的发展确实在印证这句话！

在讨论模块化的其他内容之前, 我们先来定义一下什么是模块: 

<b>开发者将程序切割成的离散的功能块(discrete chunks of functionality)</b>

对于现在的 Web 应用来说, 模块化是一个绕不开的话题:

<b>模块化是指将一个复杂的系统分解为多个模块以方便编码, 简单来说就是: 输入/输出代码块</b>


这里仅针对 JavaScript 内的模块化方案进行介绍, 还有关于样式的模块化方案, 比如 `less` 等, 这里就不再进赘述, 目的是为了让你能够感知到: 

<b>我们封装了很多轮子, 来使我们更高效的编码, 但是往往需要编译后的代码(比如 babel)才能来让轮子跑起来(机器执行)</b>

截止目前，各种模块化的方案都在结合 babel 向 ES6 Module 模块化方案转变，因此下面主要了解社区模块化发展的历史～



## Module history

在 jQuery 的那个时代, 大多数的脚本都是将其 API 挂载到全局命名空间（比如 `window.$`）下, 以在不同文件内进行引用

现在回过头来思考一下, 这样的做法会带来一些问题

- 无法合理地管理项目的依赖和版本（命名空间冲突的问题）
- 无法方便地控制依赖的加载顺序，如果不添加其他控制，需要按照引入顺序依次进行加载

`IIFE(匿名立即调用函数)` 的出现一定程度上缓解了上面的问题，现在 rollup 仍然支持该方式编译、输出文件

```javascript
;(function (root) {
  // 声明 config 变量在当前作用域内而不是在全局，缓解了全局命名冲突的问题
  const config = {}
  root.config = config
})(window)
```

当项目的依赖增多或者前端项目变大时, 这种方式越来越难以维护, 因此社区在各个时间点出现了模块化的解决方案，其主要的发展历史: AMD -> CMD -> CommonJS -> ES6 Module

### AMD

<b>AMD(Asynchronous Module Definition)</b> 顾名思义, 它采用异步的方式来加载依赖的模块, 能够方便地控制依赖的加载顺序，jQuery 时代里, [requirejs](https://requirejs.org/) 就是其典型代表，注意，它也是将一个文件认定为一个模块

怎么理解异步呢？

AMD 模式下，它在执行加载依赖动作后，可以继续执行剩下代码，等到指定依赖加载完毕后，执行加载完毕后的回调函数

看一个使用 `requirejs` 的例子：

```javascript
// define.js
// defined a module
define('jquery', function(jq) {
  return jq.noConflict(true)
})

// require a moduel，jquery 引入之后，执行加载完毕后的回调函数
require(['./define.js'], function($) {
  console.log($)
})

console.log('hello AMD')
```

其优势在于

- 可以直接在浏览器环境或者 NodeJS 环境下运行
- 可以异步加载依赖，即可以继续执行代码
- 可以并行加载多个依赖，即加载多个依赖后，再执行回调

缺点也很明显

- 需要引入第三方依赖来实现
- 采用前置加载模式，即需要所有依赖提前加载完毕之后，再执行其回调


### CMD

CDM 和 AMD 相比，最大的区别在于其资源加载方式：CMD 推崇就近加载模式，AMD 则推崇前置加载模式

```javascript
// AMD
// 依赖必须一开始就写好
define(['./utils'], function(utils) {
  utils.request();
});

// CMD
define(function(require) {
  // 依赖可以就加载
  var utils = require('./utils');
  utils.request();
});
```


### CommonJS

随着 NodeJS 的流行, CommonJS 模块化方案被发扬光大, 本质上来说，它是一个 Node.js runtime 的模块化方案，其核心思想是: <b>通过 `require()` 方法来同步加载(输入)依赖, 通过 `module.exports` 来输出代码块</b>

<b>同样，在 CommonJS 内，一个文件就是一个模块</b>

CommonJS 加载文件是同步的，这也是最大的一个弊病之一，它必须等待 `const x = require('xxx.js')` 执行完毕之后再执行后面的代码，这点区别于 AMD 

<b>CommonJS 内的模块被挂载到顶层作用域而不是全局作用域，就是避免命名冲突，同时又能够被文件共享</b>


### ES6 module

这应该是大家非常熟悉的, 现代框架都是支持的模块化方案, 相比于 AMD/CMD 是基于 JavaScript 语言上的封装实现，ESM 是一种语言层面上的规范，用来为 Node.js 和浏览器 runtime 提供统一的解决方案

目前，Node.js 和浏览器都没有直接支持 ESM 规范，需要借助 babel 来进行编译

- 一个文件就是一个模块
- ES6 模块是静态的，即导入后无法进行更改
- ES6 是指针绑定，在编译时输出，不同于 CommonJS 值绑定，模块内做出了修改，会反映到所有使用该模块的代码中
- ES6模块采用的是单例模式，每次对同一个模块的导入其实都指向同一个实例

相比于 CommonJS，ESM 具有以下特点：CommonJS 和 AMD 是运行时加载，ESM 是编译时加载（`import()`是运行时加载）

利用 ESM 编译时加载的特点，可以在打包阶段检测并移除其未被引用的代码，即 tree-shaking，达到程序性能优化的特点



## Webpack Modules Resolution（webpack 内模块化的解决方案）

相比 Node.js, Webpack 能够支持更多的模块化方式

- ES6 `import` 语句
- CommonJS `require()` 语句
- AMD `require & define` 语句
- css/less/sass/scss 内的 `@import` 语句

<b>一个模块(业务模块/第三方库)能够被另一个模块引入和使用</b>, 针对引入模块的路径不同, 我们可以分为

1. 绝对路径: 根据路径去引入文件即可

2. 相对路径: 根据当前文件路径和相对路径去寻找其引入文件的绝对路径即可

3. 模块路径: 比如 `import 'antd'` 或者 `import {} from 'antd/lib/form'   `, 在 webpack 内通过 `Resolve` 属性来进行解决



### Resolve

Webpack 通过 `entry` 来解决文件入口的问题, `resolve` 则是用类似**约定**的方式, 在模块内寻找模块所对应的文件

在开发过程中, 我们经常会用 `import React from 'React'`, `import renderCell from '@/components/cell-render'` 等各种类似“代理”的方式来引入模块, 此时 webpack 就是通过 **resolve** 配置项来寻找到相应的模块

通过一个简单的例子来看看常用的属性配置:

```javascript
  resolve: {
    // alias 通过别名来映射一个新的导入路径
    alias: {
      // 如果直接用 './src' 会产生错误
      '@': path.resolve(__dirname, 'src/')
    },
    // mainFields 用来指定适配环境的代码加载顺序
    mainFields: ["broswer", "main"],
    // extensions 用来补全后缀, 并指定补全后缀并匹配的优先级
    extensions: [".ts", ".js", ".json"]
  },
```



<b style="color: #ef613e;">mainFields</b>

​		一些第三方库会根据环境提供多份代码, 比如 `rollup` 打包时可以同时输出 `commonjs` 和 `ES6` 的代码, webpack 会根据 mainFields 来决定代码的使用顺序, 它会按照数组的顺序去 **package.json** 内进行寻找, 匹配到立即返回

<b style="color: #ef613e;">extensions</b>

​		一个很有意思的属性, Ryan 在 deno 发布会上公开 diss 了这个设计(即自动匹配 index, 自动补全 .js), extensions 用来配置补全的后缀和后缀的匹配顺序, 比如 `import App from './app'` , 在默认配置下, 就会优先去匹配 `app.js`, 如果没有匹配到就继续匹配 `app.json`

---

简单来说, webpack 会结合 `package.json` 和 `resolve` 配置来定位目标文件

**要明白, 最终的目的是找到正确的文件, 并以正确的方式对其进行解析和打包**

![webpack module resolve](../assets/resolve.png)

如果指定的路径是一个文件: webpack 会直接打包这个文件, 这个过程会结合 `resolve.extensions` 配置来判断哪些文件类型是被支持的

如果指定的路径是一个目录: 

- 如果文件内包含 `package.json`, 则会根据 `resolve.mainFields` 和 `resolve.exportsFields`  配置内的字段顺序进行查找, 第一个匹配的作为文件路径
- 如果文件内不包含 `package.json`, 也会根据 `resolve.mainFields` 配置内的字段顺序进行查找, 去检查是否匹配的文件名在 `imported/required` 文件目录内