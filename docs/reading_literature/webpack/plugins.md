# Plugins

> Plugins are the backbone of webpack!

Webpack 本身也是基于 Plugins Systerm 建立, 在构建流程中通过注入钩子, Plugins 机制能够进一步扩展 Loaders 的能力.

一个 webpack plugin 是一个有 `apply` 方法的 JavaScript 对象, 这个方法会在整个汇编的生命周期内被 webpack 编译器调用

