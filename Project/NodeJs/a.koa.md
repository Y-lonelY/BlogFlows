<!-- MarkdownTOC -->

- [Koa](#koa)
    - [Install](#install)
    - [Travia](#travia)
    - [Basics](#basics)
- [获取请求参数](#%E8%8E%B7%E5%8F%96%E8%AF%B7%E6%B1%82%E5%8F%82%E6%95%B0)
- [koa route](#koa-route)
- [执行python脚本](#%E6%89%A7%E8%A1%8Cpython%E8%84%9A%E6%9C%AC)
- [错误捕获](#%E9%94%99%E8%AF%AF%E6%8D%95%E8%8E%B7)

<!-- /MarkdownTOC -->

## Koa

> koa 最大的特色，就是中间件的设计

[koa]((https://koa.bootcss.com/#application)) 是一个 Web 框架，相比 express 框架，其通过利用 async 函数，能够有效解决 “回调地狱” 问题

### Install

依赖 **node v7.6.0**，且对 async 函数方法支持，对于兼容问题可以通过 Babel 来实现 async 方法

`npm i koa` 安装 koa 框架

`npm init` 用来初始化项目，生成 package.json 文件


### Travia

`app.use(function)` 用来将中间件方法添加到应用程序

`next` 是中间件流程关键标志变量，`yeild next` 表示执行下一个中间件


### Basics

Koa 提供一个 context 对象，用来装载请求的上下文，包括http请求和http回复，即 ctx.request, ctx.response

`app.context` 为 ctx 创建的原形，可以通过编辑 `app.context` 来为 ctx 添加其他属性

Koa 默认返回类型是 `text/plain`

- 返回之前通过 `ctx.request.accepts` 判断客户端接受类型
- 然后通过 `ctx.response.type` 来指定返回类型，可选的 type 有：xml, json, html, text


## 获取请求参数

koa 内通常通过三种方式获取请求参数

- 从 post 请求的 `ctx.request.body` 内获取, 需要通过 `koa-bodyparser` 来解析 post 请求
- 从 get 请求的 `ctx.request.query` 内获取，这类通过 `?user=ylonely` 来进行传输，将参数置于 header 内
- 从 delete/get 等请求的 `ctx.params` 内获取，这类通过 `/user/ylonely` 来进行传输

```js
import BodyParser from "koa-bodyparser"

const app = new Koa();

app.use(BodyParser());

// ...view.js
import Router from "koa-router";

// 声明一个 router 实例
const programRouter = new Router({
    prefix: "grow"
});

// body --- { "user": "ylonely" }
programRouter.post('/query', ctx => {
    const { user } = ctx.request.body;
});

// header params --- "user": "ylonely"
programRouter.get('/users', ctx => {
    const { user } = ctx.request.query;
    // statements
})

// url: http:xxx.com/max/ylonely
programRouter.get('/max/:user', ctx => {
    const { user } = ctx.params
    // statements
})
```


## koa route

如果原生的 node，可以通过判断 `ctx.path` 来控制路由，进行不同的处理，但是，koa提供了一个更好的方式：通过 koa 封装的路由中间件来实现路由

通过 `const Router = require('koa-router')` 来引入koa路由中间件，其方法包括：get, post, del, put, all

`all()` 表示适用所有的动词方法

通过 `'/details/:id'` 这样的通配规则来匹配 get 请求， `ctx.params` 来获取路由参数

通过 `app.params()` 方法可以将参数的处理给抽象出来，起到一定的安全防范作用

```js
import Router from 'koa-router';
import Compose from 'koa-compose';

const errorRouter = new Router();

/**
 * 捕获错误，插入数据库
 */
errorRouter.post('/catchErrors', async ctx => {
    // statements
});

const router = new Router;
router.use('/service/system', errorRouter.routes(), errorRouter.allowedMethods());

const router_middle = router.routes();
const router_allow_methods = router.allowedMethods();
const errorCompose = Compose([router_middle, router_allow_methods]);

module.exports = errorCompose;
```


## 执行python脚本

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

## 错误捕获

Koa 提供 `ctx.throw()` 或者 `ctx.response.status = 400` 用来抛出错误，但是更常用的是通过 koa 提供 `app.on('error', (err, ctx) => {})` 监听方法来集中式捕获错误

```js
const listenError = (app) => {
    app.on('error', (err, ctx) => {
        try {
            // 将可能出现的单引号替换为中文全角单引号，避免 sql 错误
            const errStr = String(err).replace(/\'/g, '‘');
            // 自定义错误捕获内容
            let params = {
                username: 'yh',
                project: 'YLONELY_GROWUP-koa',
                referrer: '',
                event: 'koa-error',
                type: '',
                path: ctx.originalUrl,
                level: 1,
                stack: '',
                message: errStr,
                origin: '',
                useragent: JSON.stringify(ctx.app),
                network: '',
                appversion: ''
            };
            // 对错误类型进行分类
            // 请求参数错误
            if (errStr.includes('ValidationError')) {
                params.type = 'ValidationError';
                params.origin = JSON.stringify(err.details);
                // 函数方法错误
            } else if (errStr.includes('TypeError')) {
                params.type = 'TypeError';
                params.stack = err.stack.replace(/\'/g, '‘');;
                // sql 语句错误
            } else if (errStr.includes('SequelizeDatabaseError')) {
                params.type = 'SequelizeDatabaseError';
                params.stack = err.stack.replace(/\'/g, '‘');;
            }
            console.log(params);
            addErrorsRecord(params);
        } catch (e) {
            ctx.throw(e);
        }
    });
}
```










