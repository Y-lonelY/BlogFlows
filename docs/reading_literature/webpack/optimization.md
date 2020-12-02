# Optimization

> Smaller, faster 

## optimization.splitChunks

`optimization.splitChunks` 能够将一些不会再发生改变的脚本(比如 `Jquery` 等 )进行打包, 输出一个 chunk, 针对性地让浏览器对这些脚本进行缓存, 从而达到优化的目的

比如当你在访问一个多页面应用时, 实际上很多脚本是在不同页面之间公用的, 通过浏览器缓存可以减少脚本文件的加载时间

