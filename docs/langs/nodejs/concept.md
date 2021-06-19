# NodeJs

> Node.js is an open-source and cross-platform JavaScript runtime environment built on Chrome's V8 engine

在这里，我们先给 Node.js 下一个定义：Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时。所谓运行时，可以将其想象成一个执行环境，里面包含了运行代码所需的编译器和操作系统的底层支持。

- Node.js 底层基于 C++ 实现，但是其语法遵循 ECMAScript 规范，这为 Node.js 提供了灵活的语法支持
- Node.js 基于 V8 引擎，为其运行提供了更高效率的实现，例如非阻塞 IO 和事件驱动等

在开始之前，我们先进行一些知识储备：

<b>回调</b>

回调在 Node.js 中被大量使用，其本质是一个高阶函数，即接受一个可执行函数作为参数，并返回一个函数，比如

```javascript
const fs = require('fs')

// 完成 app.json 文件读取后，执行回调内容
fs.readFile('app.json', function(err, data) {
  if (err) return
  // do something
})

```



<b>CPU 执行</b>

在任务完成之前，CPU 在任何情况下都不会暂停或者停止执行，即 CPU 如何执行和同步或者异步、阻塞还是非阻塞没有必然联系

操作系统保证 CPU 始终出于执行中状态，这是通过系统调度来实现的，具体一点就是通过在不同进程/线程内切换实现的



<b>并发和并行</b>

并发和并行分别对应计算机的两种需求

并行(Parallel)：希望计算机做更多的事情（处理多个队列）

并发(Concurrent)：希望计算机更快地执行任务（让队列迅速被消费）

Node.js 通过单线程 + 事件机制实现并发，不同于 Java 通过多线程实现并发



<b>同步和异步</b>

<span style="color: #1890ff;">同步/异步描述的是进程/线程的调用方式，注意这里需要区别于阻塞/非阻塞</span>

调用返回指：内核进程将数据复制到用户进程，即在 Linux 环境下，用户进程没法直接访问内核空间，需要内核通过 copy_to_user 来将数据复制到用户进程中

同步指的是，当进程/线程发起调用，直到等待调用返回后，才会执行下一步操作。在这个过程中，CPU 会保持执行，只是切到另一个进程/线程，等待调用返回后，再切回来继续执行

异步则是指当进程/线程发起调用时，会继续执行，等到调用返回时再以某种方式通知调用者



<b>阻塞和非阻塞</b>

当你在 Node.js 进程内执行一段新增的 JavaScript 代码时，需要等待非 JavaScript 操作执行完毕，此时就是处于阻塞状态

而当你不需要等待非 JavaScript 操作执行完毕，就可以执行新增的 JavaScript 代码时，此时就是处于非阻塞状态

因此，阻塞和非阻塞是执行代码的状态



## Features

### Async hooks

> [async-hooks](https://nodejs.org/api/async_hooks.html#async_hooks_async_hooks) provides an API to track asynchronous resources!

Async hooks 是 Nodejs 提供用来跟踪异步资源处理的 API ，具体使用可参考官网，这里提炼核心点







## Node.js 内部机制

> 除了你的代码，一切都是并行的

一句话概括：在 Node.js runtime 内，代码执行是单线程的，得益于 Node.js 的非阻塞 IO 模型，我们能够通过事件循环 + 回调的形式实现高并发

一个单线程运行的语言在设计时，需要思考一个问题：<b>当处理一个耗时的 I/O，是等待其完成还是先去执行其他任务？</b>

Node.js 选择后者，当遇到 I/O 操作时，发起调用后继续向下执行，等待 I/O 操作完成后执行其回调，依靠异步+回调的形式，Node.js 能够处理高并发的任务

<b>"JavaScript 是单线程的"</b>

无论是浏览器的 V8 runtime 还是 Node.js runtime，JavaScript 都是单线程执行的，并且运行时也没有提供创建多线程的接口，但是其运行时的实现可不是，浏览器是多进程的，而 Node.js 的 libuv（异步 IO 库）则有线程池的概念

即，JavaScript 代码在 Node.js 或者 V8 内是单线程执行的，但是这不代表 Node.js 和 V8 本身是单线程实现的

<b>"JavaScript 是一门异步的语言"</b>

JavaScript 是一门单线程执行的语言，本身也没有异步的实现规范，它的异步实际上是依赖其运行时其他线程来实现，而不是其本身的语言支持

<b>"Node.js 采用了非阻塞 IO 模型"</b>

> "I/O" refers primarily to interaction with the system's disk and network supported by libuv.

参考 [blocking-vs-non-blocking](https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/) 的例子进行理解

在 Node.js 中，I/O 主要指的是 libuv 支持的系统磁盘和网络之间的交互

即，Node.js 基于非阻塞 IO 模型，其标准库内所有的 I/O 操作都提供了异步版本，结合事件循环和回调，从而实现应用程序的高并发和高吞吐量



### 事件执行机制

Node.js 内的事件执行机制和 [浏览器内 JavaScript 执行机制](https://7k7k.life/core_concept/js/common.html#%E6%89%A7%E8%A1%8C%E6%9C%BA%E5%88%B6) 存在差异，在浏览器的运行时内，无所谓高并发

参考 [Node.js 事件循环](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/)

在 Node.js 运行时内，事件循环由底层的 libuv 实现，它将事件循环分割为不同阶段，每个阶段都维护一个回调函数的队列（FIFO），每次循环，都会依次处理队列内的回调



