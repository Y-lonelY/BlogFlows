# NodeJs Common Packages

快速索引

- [request promise](https://github.com/request/request-promise) 用来转发第三方接口
- [multer](https://github.com/koajs/multer) 处理表单数据，主要用于文件上传
- [Sequelize](https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/getting-started.md) 基于 Promise 的 ORM
- [Joi](https://hapi.dev/family/joi/?v=16.1.7) 验证字段



## request promise

通过 [request promise](https://github.com/request/request-promise) 来转发第三方接口

`npm install request --save` 和 `npm install --save request-promise`

```js
import request from 'request-promise';

async function getWakaData({ start, end }) {
    let params = {
        'api_key': 'aa7000e7-273a-4cbe-862c-c3ff4faf2daf',
        'cache': true,
        start,
        end
    };
    let option = {
        uri: 'https://wakatime.com/api/v1/users/current/summaries',
        // qs 表示query参数
        qs: params,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };
    // 获取返回数据，request(option) 返回一个 promise 对象
    const data = (await request(option)).data;
}
```


## multer

> Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件

通过 `npm install --save @koa/multer multer` 来安装 [multer](https://github.com/koajs/multer)

[原文档，用来参考配置](https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md)

```js
import Router from "koa-router";
import Compose from "koa-compose";
import multer from "@koa/multer";
import utils from 'utility';

const uploadRouter = new Router();
// 创建文件存储规则
const storage = multer.diskStorage({
    // 文件存放路径，从文件根目录开始寻找
    destination: (req, file, cb) => {
        cb(null, 'upload');
    },
    // 重命名文件
    filename: (req, file, cb) => {
        // 格式化文件后缀
        const fileArray = file.originalname.split('.');
        const prefix = fileArray[0];
        const suffix = fileArray[1];
        // 添加时间戳，避免文件名重复
        cb(null, `${Date.now()}-${utils.md5(prefix)}.${suffix}`);
    }
});
// 创建文件上传限制
const limits = {
    //非文件字段的数量
    fields: 10,
    //文件大小 单位 b，3M
    fileSize: 10 * 1024 * 1024,
    //文件数量
    files: 1
}

let upload = multer({ storage: storage, limits: limits });

// upload.single('file') 表示接受一个以 ‘file’ 命名的文件，且这个文件的信息保存在 ctx.request.file 字段内
// 文件上传错误，可以直接通过 try catch 进行捕获
uploadRouter.post('/upload', upload.single('file'), async ctx => {
    try {
        // 获取上传文件
        const file = ctx.request.file;
        const results = {
            success: true,
            name: file.originalname,
            status: 'done',
            url: `http://192.168.1.103:7777/pics/${file.filename}`
        };
        ctx.body = results;
    } catch (e) {
        ctx.app.emit('error', e, ctx);
    }
});

const router = new Router;
router.use('/service', uploadRouter.routes(), uploadRouter.allowedMethods());

const router_routes = router.routes();
const router_allow_methods = router.allowedMethods();
const uploadCompose = Compose([router_routes, router_allow_methods]);

export default uploadCompose;
```


## Sequelize

这里选择 [Sequelize](https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/getting-started.md) 来作为数据库连接库

> Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.

Sequelize 是基于 promise 的 Node.js ORM，它具有可靠的事务支持，关系，渴望，延迟加载，读取复制等

`npm install --save sequelize` 安装 sequelize

`npm install --save mysql2` 安装 mysql 驱动程序

### Travia

对于 insert 语句返回值为一个数组 [插入的id, 受影响的行]

### 封装一个类

封装一个 Sequelize class

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

    /**
     * 使用 raw query 来进行查询
     * @param  sql raw sql
     * @param  queryType 查询类型：select, insert
     * @return 一个 promise 对象
     */
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

const base_scheme = Joi.object({
	// "2019-10-11"
    start: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    // 最小值为0的数字
    chest: Joi.number().integer().min(0).required(),
});

try {
	// 通过 keys 方法来添加验证参数，如下添加 id 的参数验证
    const scheme = base_scheme.keys({
        id: Joi.number().integer().required(),
    })
    const params = await scheme.validateAsync(ctx.request.body);
    // statement
} catch (e) {
    console.log(e);
}

// 或者直接判断返回值的 error 值
const value = schema.validate({ start: '2019-10-17', end: '2019-10-17' });
// -> { value: { username: 'abc', birth_year: 1994 }, error: null }
```

