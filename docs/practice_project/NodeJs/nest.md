# Nest



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