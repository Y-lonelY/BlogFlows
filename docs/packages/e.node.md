# NodeJs

## Sequelize

这里选择 [Sequelize](https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/getting-started.md) 来作为数据库连接库

> Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.

Sequelize 是基于 promise 的 Node.js ORM，它具有可靠的事务支持，关系，渴望，延迟加载，读取复制等

`npm install --save sequelize` 安装 sequelize

`npm install --save mysql2` 安装 mysql 驱动程序

```js
// 引入 mysql
import Sequelize from "sequelize"
// 引入 mysql 设置
import db_config from "../../config/db_config"
// mysql 连接实例类
class Mysql {
    constructor() {}
    /**
     * creat connection
     * 建立连接实例
     * 数据库操作流程：先创建连接，执行sql，关闭连接
     */
    createConnection() {
        return new Sequelize(db_config.database, db_config.username, db_config.password, {
            host: db_config.host,
            dialect: "mysql"
        });
    }

    // close connection
    closeConnection() {
        const sequelizeCase = this.createConnection()
        sequelizeCase
        .close()
        .then(() => {
            console.log("Connection has been closed successfully!")
        })
        .catch(err => {
            console.error('Unable to close the database:', err);
        })
    }

    // test connection
    testConnection() {
        const sequelizeCase = this.createConnection()
        sequelizeCase
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        })
        .finally(() => {
            this.closeConnection()
        })
    }

    // raw query
    query({sql: sql, queryType: queryType}) {
        const sequelizeCase = this.createConnection();
        // 默认为 select，可以为 insert
        let type = Sequelize.QueryTypes.SELECT

        if (queryType && Sequelize.QueryTypes[queryType.toUpperCase()]) {
            type = Sequelize.QueryTypes[queryType.toUpperCase()]
        }
        return sequelizeCase.query(sql, {
            type: Sequelize.QueryTypes[type],
            plain: false
        })
        .finally(() => {
            this.closeConnection()
        })
    }
}

module.exports = new Mysql()
```

## Joi

> The most powerful schema description language and data validator for JavaScript.

`npm install @hapi/joi` 安装 [joi 模块](https://hapi.dev/family/joi/?v=16.1.7)

```js
// 引入 joi，用来校验数据
import Joi from "@hapi/joi";

const scheme = Joi.object({
	// "2019-10-11"
    start: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    // 最小值为0的数字
    chest: Joi.number().min(0).required(),
});

// 通过 try catch 来捕获错误
try {
    const params = await scheme.validateAsync(ctx.request.body);
    // statement
} catch (e) {
    console.log(e);
}

// 或者直接判断返回值的 error 值
const value = schema.validate({ start: '2019-10-17', end: '2019-10-17' });
// -> { value: { username: 'abc', birth_year: 1994 }, error: null }
```

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
