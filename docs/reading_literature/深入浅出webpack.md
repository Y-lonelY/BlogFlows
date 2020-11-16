# 深入浅出 Webpack

## 模块化

> Module is the future!

对于现在的 Web 应用来说, 模块化是一个绕不开的话题. **模块化是指将一个复杂的系统分解为多个模块以方便编码, 简单来说就是: 输入/输出代码块**

在 jQuery 的那个时代, 大多数的脚本都是将其 API 挂载到全局命名空间（比如 `window.$`）下, 以在不同文件内进行引用.

现在回过头来思考一下, 这样的做法会带来一些问题

- 无法合理地管理项目的依赖和版本（命名空间冲突的问题）
- 无法方便地控制依赖的加载顺序

当项目的依赖增多或者前端项目变大时, 这种方式越来越难以维护, 于是有了模块的一些解决方案

### CommonJS

随着 NodeJS 的流行, 这种模块化方案被发扬光大, 其核心思想是**通过 `require` 方法来同步加载(输入)依赖, 通过 `module.exports` 来输出代码块**


### AMD

**AMD(Asynchronous Module Definition)** 顾名思义, 它采用异步的方式来加载依赖的模块, jQuery 时代里, [requirejs](https://requirejs.org/) 就是其典型代表

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