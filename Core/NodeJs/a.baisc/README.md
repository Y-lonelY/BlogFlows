### Node.js 基本概念

##### 事件循环

<a href="base/event.js">events实例</a>

 - javascript 是单进程单线程应用程序，但是 Node.js 通过事件回调支持并发，从而提高性能

 - Node.js 基本上所有的事件机制都是通过观察者模式实现的，即都采用异步事件驱动架构

 - Node.js 单线程类似进入一个 while(true) 的事件循环，直到没有观察者退出，返回 true，在这个过程中，每个异步事件都生成一个事件观察者，如果有事件发生则调用其回调函数

 - Node.js 内所有能触发事件的对象都是 EventEmitter 类的实例

 - Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列

 - `emitter.on()` 方法用来注册监听器，`emitter.emit()`方法用来触发事件

 - 如果直接触发一个未注册的事件，会执行 `error()` 方法，如果 error() 方法也没有，程序会直接抛出异常

##### Buffer(缓冲区)

 - Buffer 类以更优化，更适合 Node.js 的方式来在 TCP 流或文件系统操作等场景中处理二进制数据流

 - Buffer 类的实例类似于整数数组，但 Buffer 的大小是固定的，且在V8堆外分配物理内存，Buffer 的大小在创建时就被确定且无法更改

##### Stream

<a href="base/stream.js">stream实例</a>

 - Node.js 提供处理流数据的抽象接口

 - Node.js 内有四种基本流类型，且所有的流都是 EventEmitter(事件) 的实例

 - 四种基本类型

   - Readable 可读的流

   - Writable 可写的流

   - Duplex 可读可写的流

   - Transform 在读写过程中可以修改和变换数据的 Duplex 流

 - 四种常用事件

   - data 当有数据可读时触发

   - end 没有更多的数据可读时触发

   - error 在接收和写入过程中发生错误触发

   - finish 所有数据已被写入到底层系统时触发

 - Readable 和 Writable 都会将数据存储到 Buffer 中

##### global

 - Node.js 中的全局对象是 global，所有的全局变量都是 global 对象的属性，并且可以直接访问

 - 所有的用户代码都是属于当前模块的，而模块本身不是最外层上下文，所有在 Node.js 中不可能在最外层定义变量

 - 五类全局变量其作用域只在模块被
  
   - `__dirname` 当前执行脚本所在目录

   - `__filename` 当前执行基本文件名，返回文件所在位置的绝对路径

   - `exports`

   - `module`

   - `require()`