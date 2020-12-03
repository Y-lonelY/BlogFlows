# Optimization

> Smaller, faster 

## optimization.splitChunks

`optimization.splitChunks` 能够将一些不会再发生改变的脚本(比如 `Jquery` 等 )进行打包, 输出一个 chunk, 针对性地让浏览器对这些脚本进行缓存, 从而达到优化的目的

比如当你在访问一个多页面应用时, 实际上很多脚本是在不同页面之间公用的, 通过浏览器缓存可以减少脚本文件的加载时间



## module.noParse

`module.noParse` 可以让 Webpack 忽略对部分没有采用模块化的文件进行解析和处理, 从而提高构建性能, 比如部分大型库(JQuery, 对, 又是它) 没有采用模块化标准,  那么去解析它是没有意义的, 因此你要确保忽略的文件内没有使用 `import`, `require`, `define` 等模块化的导入机制

看下面这个配置:

```javascript
// 使用正则表达式
noParse: /jquery|chartjs/

// 使用函数，从 Webpack 3.0.0 开始支持
noParse: (content)=> {
  // content 代表一个模块的文件路径
  // 返回 true or false
  return /jquery|chartjs/.test(content);
}
```



