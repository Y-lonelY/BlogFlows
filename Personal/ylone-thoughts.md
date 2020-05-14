## How about web performance optimization?

web 性能优化，在浏览器输入url之后到页面呈现出渲染结果的过程中，需要经过三个阶段：代码，服务器以及浏览器。所以我觉得性能优化也是从这三个方面入手。

### 服务器

 - 代理服务器

 - Web缓存

### 浏览器

 - 渲染关键路径

 - CSS文件

 - JavaScript文件

 - 回流和重绘

 - 图片预处理

### 代码层面

 - 文件大小

 - 减少模板引擎预编译内容

 - 代码缓存关键信息


## How about big data render? 

### Adidas 官网

无意间看到Adidas官网上的对于大数据量的处理，先说说其交互：进入结果搜索页面，展示20条数据，通过滚轮下拉到底部，会有一个loading动画，接着渲染出新的20条数据，经过若干次loading之后，继续下拉不在进行数据加载，此时需要通过分页按钮进入第二页来获取更多数据，之后的操作就是对之前的操作进行重复。可以看出，它实现异步，分了两种形式，一种通过下拉触发事件，来获取数据；一种通过分页按钮来获取数据。

其通过 `get` 方法去请求数据，分别通过两个接口 `waterfall.json` 和 `list.json`，来分别响应下拉与点击事件

以下是其共有的部分数据

```js
returnObject: {
	view: {
		count: 292
		currentPage: 1
		size: 20
		start: 19
		totalPages: 15
		item: [{}...]
	}
}
```

totalPages = Math.floor(count/size);

start = 上一次start值 + size - 1;

在同一页时，通过下拉事件会触发请求 `waterfall.json` 的方法，同时 `currentPage` 自增

通过翻页事件触发请求 `list.json` 的方法的同时，会立即请求 `waterfall.json`，前者 `currentPage` 和 后者的 `currentPage` 分别自增

我觉得，实际上它把15页的数据分成 5x3 的形式，来使页面的渲染数据在一个合适的范围，从而提高了用户体验