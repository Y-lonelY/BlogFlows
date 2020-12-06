# Plugins

> Plugins are the backbone of webpack!

Webpack 的 **Plugins** 机制能够帮助我们执行更“细致”的任务, 它可以看作是 **Loaders** 能力的扩展, 比如:

- 打包优化
- 资源管理
- 环境变量注入

Webpack 本身也是基于 Plugins Systerm 建立, 在构建流程中通过注入钩子, Plugins 机制能够进一步扩展 Loaders 的能力.

一个 webpack plugin 是一个有 `apply` 方法的 JavaScript 对象, 这个方法会在整个汇编的生命周期内被 webpack 编译器调用

使用 **config** 来配置 plugins

```javascript
const webpack = require('webpack')
const { ProgressPlugin } = webpack

module.export = {
    // ...other configs
    plugins: [
      new ProgressPlugin()
    ]
}
```

**注意, 由于 plugins 内配置的是一个方法, 可以传递 `arguments/options`, 所以我们必须通过 `new` 关键字来进行实例化**



## Plugin 对象

如之前所说, 一个 webpack plugin 是一个有 `apply` 方法的 JavaScript 对象, 下面我们来实现一个简单的 plugin 对象

```javascript
// must be CamelNamed, and it's advisable to use a constant
const pluginName = 'ConsoleStartTaskWebpackPlugin'

class ConsoleEndTaskWebpackPlugin {
  // webpack compiler, just like `let compiler = webpack(configs)`
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, compilation => {
      console.warn(`let's start the webpack task!`)
    })
  }
}

module.exports = ConsoleEndTaskWebpackPlugin
```

这里我们实现了一个 plugin, 用来在控制台打印, **注意, plugin 必须使用驼峰命名**

接下来, 我们在 webpack 的配置内使用它, 在控制台内我们看到了指定的输出

```javascript
const ConsoleEndTaskWebpackPlugin = require('./plugins/ConsoleEndTask')

module.exports = {
  // ...other configs
  plugins: [
    new ConsoleEndTaskWebpackPlugin()
  ]
}

// in console after run `npm run build`
> Lego-webPack@1.0.0 build /Users/yango/github/blog/Lego-webPack
> webpack --config webpack.config.js

"3% setup run ConsoleStartTaskWebpackPluginlet's start the webpack task!"
...
```

我们不妨再深入一点, 看看在 node runtime 内是如何调用 plugins 方法的?

```javascript
const webpack = require('webpack')
const configs = require('./webpack.config.js')
const ConsoleEndTaskWebpackPlugin = require('./plugins/ConsoleEndTask')

let compiler = webpack(configs)

new ConsoleEndTaskWebpackPlugin().apply(compiler)

compiler.run(function(err, stats) {
  // ...do somethings
})
```

