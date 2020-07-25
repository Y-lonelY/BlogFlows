# Frontend Module

> module is the future!

模块化就是将一个复杂的系统分解成多个独立的模块的代码组织方式，在实现模块化之前，都是通过 `<script>` 去进行加载

思考一下，通过 `<script>` 的方式有什么致命缺陷？

每次引入一个新的依赖时，并且这个依赖存在不同的版本，会使项目的代码库越来越臃肿，导致维护困难

因此，模块化的一个核心就是依赖管理，在 JavaScript 内，通常用 `npm` 来进行

<!-- MarkdownTOC -->

- [AMD（Asynchronous Module Definition）](#amd%EF%BC%88asynchronous-module-definition%EF%BC%89)
- [CommonJS](#commonjs)
- [UMD（Universal Module Definition）](#umd%EF%BC%88universal-module-definition%EF%BC%89)
- [Package Source Manage](#package-source-manage)
- [编译及打包](#%E7%BC%96%E8%AF%91%E5%8F%8A%E6%89%93%E5%8C%85)

<!-- /MarkdownTOC -->


## AMD（Asynchronous Module Definition）

异步模块定义，表现形式就是：通过构建好的 JavaScript 库文件，直接在浏览器内引入依赖，比如 `JQuery`

同时可以通过 `require.js` 这样的库来管理依赖，在 `require.js` 内：
- 通过 `define` 定义模块
- 通过 `require` 引入模块

依赖管理方式
- 直接下载对应的库，复制到本地
- 通过 `Bower` 进行管理，很少用了，暂时不做了解

## CommonJS

CommonJS 通常被用来在非浏览器端管理依赖，设计目的是避免模块定义全局对象。
**在 CommonJS 内，一个文件就是一个模块**

应用于 node.js，此种模块化方案特点就是：
- 同步阻塞式加载，无法实现按需异步加载
- 通过 `require() & module.expoorts` 实现，其方式是值绑定
- 运行时加载

依赖管理方式
- npm
- yarn(facebook)

## UMD（Universal Module Definition）

通用模块定义，通过代码来判断 `AMD` 和 `CommonJS` 的使用时机，`typeof exports === 'object'` 用来判断 Node.js 内模块是否存在。
如果不存在，则使用 AMD 来加载模块


## Package Source Manage

NPM 适用于 `package.json` 来管理依赖，定义依赖的源和版本：
- [公有](https://www.npmjs.com/)/私有（一般指公司搭建）源服务器
- 基于源码管理的托管平台，比如直接使用 Git 服务器来管理和分布库的版本
- 本地包，可以通过相对路径进行引入

## 编译及打包

工程化的最终目的，就是将开发友好的开发代码通过一系列工具，编译打包成为可执行的目标代码，在这个过程中产生**构建流**的概念

对于前端来说：
- 用于管理运行时的 runtime.js 文件（比如路由懒加载）
- 样式相关的 style.css
- 解决 JavaScript 在不同浏览器兼容问题的 polyfills.js
- 业务逻辑相关的 main.js


