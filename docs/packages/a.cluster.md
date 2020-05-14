# Cluster

> 记录开发过程中综合性和耦合度比较高的组件库


## axios

axios现在是一种常见的数据请求库，它仍然基于XMLHttpRequest来进行请求

### 取消重复请求

核心思想利用`set`数据结构，维护一个pending set，里面存放key(通过url.config拼接)和value(取消改请求的cacel方法)

```js
import axios from "axios"
import { message } from "ant-design-vue"

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map()

// 通过工厂方法创建 canceltoken，用于取消用户请求
// let CancelToken = axios.CancelToken
// let source = CancelToken.source()

// axios 实例
let service = axios.create({
  //   baseURL: "/service/",
  timeout: 60000,
  headers: {},
  withCredentials: true
})

const addPending = config => {
  const url = [
    config.method,
    config.url,
    JSON.stringify(config.params),
    JSON.stringify(config.data)
  ].join("&")
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      if (!pending.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        pending.set(url, cancel)
      }
    })
}

const removePending = config => {
  const url = [
    config.method,
    config.url,
    JSON.stringify(config.params),
    JSON.stringify(config.data)
  ].join("&")
  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}

export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url)
  }
  pending.clear()
}

// 设置请求拦截器
service.interceptors.request.use(
  config => {
    removePending(config) // 在请求开始前，对之前的请求做检查取消操作
    addPending(config) // 将当前请求添加到 pending 中
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 设置响应拦截器
service.interceptors.response.use(
  response => {
    removePending(response.config) // 在请求结束后，移除本次请求
    return response
  },
  error => {
    if (axios.isCancel(error)) {
      // 再次尝试 cancel
      console.error(error.message)
    }
    return Promise.reject(error)
  }
)

/**
 * config.params 用来接受查询参数
 */
async function get (url, config = {}) {
  try {
    const response = await service.get(url, config)
    // 返回服务器传值
    return response.data
  } catch (e) {
    throw e
  }
}

/**
 * params 用来接收查询参数
 */
async function post (url, params, config = {}) {
  try {
    const response = await service.post(url, params, config)
    // 返回服务器传值
    return response.data
  } catch (e) {
    throw e
  }
}

export { get, post }
```


## lodash

一个通用的工具库

### isEqual()

lodash 的 `_.isEqual()` 方法用来比较数组，对象等数据结构与原生JavaScript的区别：

- 原生JavaScript比较两者引用地址，如果指向同一块内存则相等，不关心值是否一致
- `isEqual()` 会继续比较值是否相等

### pick && omit

在给定对象中挑选/剔除指定属性，同时返回一个新的对象，这个过程不会更改原对象，注意 `omit` 会忽略属性之外的继承的可枚举属性

```js
import pick from 'lodash/pick'
import omit from 'lodash/omit'

let obj = {a,b,c}
let p_obj = pick(obj, [a, b]) // {a,b}
let e_obj = emit(obj, [a, b]) // {c}
```



## ESLint

eslint已经在MVVM项目被普遍使用，因此了解其在项目内配置和使用显得尤为重要

在项目根目录下添加 `.eslintignore` 文件来跳过指定文件的检查，数据格式和 `.gitignore` 一致

### config

在Vue项目内，其package.json文件内会有eslintConfig字段，可以更改其值来更新配置，也可以采用另一种方法，即在文件根目录下添加 `.eslintrc.js` 文件来修改配置

```js
// .eslintrc.js
module.exports = {
    "root": true,
    "env": {
        "node": true
    },
    "extends": [
        "plugin:vue/essential",
        "eslint:recommended"
    ],
    "rules": {
        // 使用控制台打印
        "no-console": "off",
        // 不使用分号
        "semi": [1, "never"],
        // 函数方法前添加空格
        "space-before-function-paren": 1,
    },
    "parserOptions": {
        "parser": "babel-eslint"
    }
}
```


## Moment.js

::: tip
[Moment.js](http://momentjs.cn/) 是一个日期处理类库，antd等组件库内常用
:::

### 常用

```js
// 30天前
moment().subtract(30, 'days').format('YYYY-MM-DD')

// 七天后
moment().subtract(7, 'days').format('YYYY-MM-DD')

// 当月第一天
moment().startOf('month')

// 当月最后一天
moment().endOf('month')
```

### 针对数据库内不同事件存储类型的解析

```js
import moment from 'moment';

// 对于 DATATIME 类型
var correct_date = moment.utc(origin_date).format('YYYY-MM-DD HH-mm-ss');

// 对于 TIMESTAMP
var correct_time = moment(origin_time).add(8, 'h').format('YYYY-MM-DD HH-mm-ss');
````

### 大小比较

```js
// 两个 moment() 对象可以直接比较大小
moment('2010-10-20') < moment() // true

// 一个字符串和一个 moment() 对象可以通过 isBefore, isSame, isAfter 来进行比较
moment('2010-10-20').isBefore('2010-10-21'); // true
moment('2010-10-20').isSame('2010-10-21'); // false
moment('2010-10-20').isAfter('2010-10-21'); // false
```
