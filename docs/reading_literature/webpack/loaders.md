# Loaders

> Loaders allow you to preprocess files as you 'import' or 'load' them

先看一个简单的例子

```javascript
const path = require('path')

module.exports = {
	// some other configs
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
        exclude: path.resolve(__dirname, 'node_modules')
      }
    ]
  }
}
```

结合上面的例子, 我们可以这样理解: 除 node_modules 目录外, 所有以 `.css` 作为后缀的文件, 都按照 `less-loader`, `css-loader`, `style-loader` 的顺序进行转换后, 再将转换后的代码插入模块内.

-  条件匹配: 通过 `test`, `include` 和 `exclude` 来命中需要转换的文件
- 规则: 通过 `use` 提供一组 loaders 来对源文件进行转换(类似**管道模式**, 将上次操作的结果作为下一次操作的参数), 默认从右到左, 可以通过配置 `enforce` 来改变 loader 的优先级
- 扩展: loader 支持传参来应用不同的转换方式

通过 Loaders, 我们可以极大地进行定制化工作, 体现在压缩, 打包, 语言转换等等



## 特性

1. Loaders 是链式的, 每一个链中的 loader 都被用来转换处理后的数据源
2. Loaders 可以是同步的, 也可以是异步的
3. Loaders 跑在 NodeJS 环境内, 因此可以用它的所有特性
4. Loaders 是可配置的, 现在不推荐使用 `query` 传参, 通过 options 来进行配置
5. Loaders 结合 Plugins 使用更香!



## Todos

自己实现一个 loader