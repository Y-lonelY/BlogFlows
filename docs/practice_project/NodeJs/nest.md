# Nest



## Notes



### 处理 body 参数

> 具体例子参考: [request-payloads](https://docs.nestjs.com/controllers#request-payloads)

**nest** 提供 `@body` 结合 `DTO(数据传输对象)` 来解析 request payload

- DTO 不是什么新概念，可以结合 golang 内的结构体进行理解，**它是一个对象，用来定义如何通过网络发送数据**
- 结合 TypeScript, DTO 必须通过 `class` 而不是 `interface` 来进行定义，因为 `intetface` 在编辑过程中会被删除，而 `class` 是 ES6 标准中的一部分，会在编译后被保留
- 而 nest 对于 body 的解析和处理是一个 runtime 的行为



### Provider 作用域

**Provider** 的生命周期（作用域）**通常**与应用程序保持一致：即在应用程序创建时，必须解析、实例化每一个 provider。同样，当应用程序关闭时，会销毁所有的 provider.



### shared Module 

通常情况下，**Module** 是单例，因此可以在多个模块之间共享：即模块一旦被创建，则可以被任意模块重复使用。



### Middleware

> Middleware is a function which is called **before** the route handler.

中间件是在接受到客户端发起的请求之后 --- 服务端路由处理之前过程中，执行的函数方法。因此它可以可以访问到请求主体，返回主体以及 `next()` 方法



### Exception Filters

nest 内置的**异常层**能够捕获未处理的错误，并向客户端返回友好的响应内容

`global exception filter` **总是能够处理错误**：如果错误是 `HttpException` 类型（或者继承至该类型），则返回相应的错误，否则直接返回 `{"statusCode": 500, "message": "Internal server error"}` 的默认值



### Pipes Trigger

管道会在控制器路由处理程序之前对参数进行捕获，从而进行**转换**或者**验证**



### Guards Trigger

Guards 会在中间件之后执行，在任何管道/拦截器之前执行完毕



## Details

### `forRoot()`

`forRoot()` 可以同步/异步返回加载模块，比如 `imports: [TypeOrmModule.forRoot()]`



## Improves

### Redis

参考 [caching](https://docs.nestjs.com/techniques/caching) 和 [cms-api-redis](https://github.com/Y-lonelY/cms-apis/tree/master/src/redis) 来进行理解

1. 新建 `RedisModule`，通过 imports 来配置使用 redis store
2. 在 `RedisService` 内提供操作内存的方法，比如 `get(), set()` 等

