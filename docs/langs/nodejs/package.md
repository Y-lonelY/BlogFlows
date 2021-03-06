# Packages

## PM2


> Advanced, production process manager for Node.js. It can keep your application online 24/7

github: [pm2](https://github.com/Unitech/pm2)

Install -> `npm i -g pm2@latest` or `npm i -D pm2@latest`

Update pm2 version -> `pm2 update`

[CLI completion](https://pm2.keymetrics.io/docs/usage/auto-completion/) -> `pm2 completion install` and `source ~/.zsh`

Start with PM2 apis -> see `pm2.js` and `package.json` for details

---
**Cluster mode**

解决了一个困扰几天的问题，在集群模式下，我设置了实例数为 4，然后发布到**1核2G**的机器上，`pm2 start cms-api` 执行没问题，并且可以看到拉起了四个实例，但是，当我执行 `pm2 reload cms-api` 之后，发现只有一半的实例被重置，导致接口进程在负载均衡时出现问题（一半跑的旧代码，一半跑的新代码）

之后，考虑到可能是 CPU 突然飙高影响，因此尝试了一系列的手段（包括休眠之后再重新启动）仍然不能解决问题，最终考虑是 CPU 核心数的问题，因此设置 `instances: 'max'`，让其在集群模式下自由分配，解决！

### pm2-logrotate

[pm2-logrotate](https://github.com/keymetrics/pm2-logrotate) 用来扩展 pm2 的日志管理功能

想象这样一个场景：pm2 本身没有日志分割功能，会将所有日志都写入到一个文件内，这样会产生一些麻烦：时间久了，日志文件会非常大，增加排查的难度，并且有些日志已经没用了，浪费了内存空间。为此，pm2-logrotate 用来进行日志管理，根据配置规则对日志进行合理切割

```shell
# install 
pm2 install pm2-logrotate

pm2 set pm2-logrotate:max_size 100M
```


## cross-env

> Run scripts that set and use environment variables across platforms.

github: [cross-env](https://github.com/kentcdodds/cross-env)

解决了 node 的环境变量在不同平台的 (eg: `NODE_ENV=production`) 的设置兼容性问题

KYE(keep your eyes): `corss-env` 放在命令的前面, 即 `"dev": "cross-env SERVER_NODE_ENV=development nest start --watch"`

之后，通过 `process.env.SERVER_NODE_ENV` 可以进行访问



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

