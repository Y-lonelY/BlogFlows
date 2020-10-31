# Koa Common Packages


## koa-bodyparser

> A body parser for koa, based on co-body. support json, form and text type body

用来解析 post 请求，将请求参数置于 `ctx.request.body` 内

```js
import BodyParser from "koa-bodyparser"

const app = new Koa();

app.use(BodyParser());

// ...view.js
import Router from "koa-router";

// 声明一个 router 实例
const programRouter = new Router();

programRouter.post('/program/overview', ctx => {
    try {
        const params = ctx.request.body;
        ctx.response.type = 'json';
    } catch (e) {
    	// statement
    }
});
```


## koa-compress 

添加 gzip 支持，通过 `npm install koa-compress --save` 在本地项目内引入 compress

在 app 实例内通过 `use` 添加中间件

```js
import compress from 'koa-compress';
// compress gzip 压缩
const compressInstance = compress({
    // 设置阈值，小于 10k 不进行压缩
    threshold: 1024 * 10,
    flush: require('zlib').Z_SYNC_FLUSH
});

koa.use(compressConfig);
```