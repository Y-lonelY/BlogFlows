# JavaScript Common Packages

**快速索引**

- [axios](https://github.com/axios/axios) 基于 Promise 的客户端请求库
- [lodash](https://lodash.com/docs/4.17.15) 现代化的 JavaScript 实用程序库

**Solo with code✨**


## Axios

axios 现在是一种常见的客户端数据请求库，它基于 XMLHttpRequest 和 Promise 


### 取消重复请求

核心思想利用`set`数据结构，维护一个pending set，里面存放 key(通过url.config拼接)和 value(取消改请求的cacel方法)

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

**isEqual()**

lodash 的 `_.isEqual()` 方法用来比较数组，对象等数据结构与原生JavaScript的区别：

- 原生JavaScript比较两者引用地址，如果指向同一块内存则相等，不关心值是否一致
- `isEqual()` 会继续比较值是否相等

---

**pick && omit**

在给定对象中挑选/剔除指定属性，同时返回一个新的对象，这个过程不会更改原对象，注意 `omit` 会忽略属性之外的继承的可枚举属性

```js
import pick from 'lodash/pick'
import omit from 'lodash/omit'

let obj = {a,b,c}
let p_obj = pick(obj, [a, b]) // {a,b}
let e_obj = emit(obj, [a, b]) // {c}
```