# Koa

koa 是一个 Web 框架，相比 express 框架，其通过利用 async 函数，能够有效解决 “回调地狱” 问题

[官方链接](https://koa.bootcss.com/#application)

## Install

依赖 **node v7.6.0**，且对 async 函数方法支持，对于兼容问题可以通过 Babel 来实现 async 方法

`npm i koa` 安装 koa 框架

`npm init` 用来初始化项目，生成 package.json 文件

## Business

### 执行python脚本

使用的相关模块方法

- util
- child_progress

```js
// import 方法基于 babel 实现使用
import util from 'util';

// 通过 util.promisify 来实现异步，其返回一个 promise 对象
const exec = util.promisify(require('child_process').exec);

/**
 * 执行 python 脚本，更新 wakatime
 * @param {start} params 开始时间
 * @param {end} params 结束时间
 */
async function setWakaTime(params) {
    let label = false;
    try {
        const cmd = `python3 scripts/wakatime/wakatime.py ${params.start} ${params.end} False`;
        // stderr 获取错误信息
        // stdout 获取返回信息，即 python 脚本内 return 的数据
        const { stdout, stderr } = await exec(cmd);
        if (stdout !== '') {
            console.log(`stderr: ${stderr}`);
            label = true;
        }
    } catch (e) {
        console.log(e);
    }
    return label;
}
```

### 获取请求参数

通过 `koa-bodyparser` 来解析 post 请求，将请求参数置于 `ctx.request.body` 内

通过 `ctx.request.query` 可以直接获取 get 请求参数

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

programRouter.get('/program/get', ctx => {
	const params = ctx.request.query;
	// statements
})
```