# JavaScript

## 执行机制

:::tip
JavaScript是一门单线程语言，事件循环（Event Loop）是 JavaScript 的执行机制
:::

在实际开发过程中，会经常用到

由于JavaScript引擎是单线程机制，它无法执行多段代码，当一段代码执行的时候，所有后续任务必须等待，从而形成一个任务队列。一旦当前任务完成，再从队列中取出下一个任务执行，这也被称为 ‘阻塞式执行’

<img src="./assets/eventLoop.png">

- `setTimeout()` 设置的延迟参数是从 EventTable 中注册回调函数到 EventQueue 的时延，所有**执行其回调函数的时延 >= 其设置的时延**
- 即使主线程执行栈为空，0ms 实际上也是达不到的，根据HTML标准，最低是 4ms
- `setInterval()` 会每隔指定的时延将回调函数注册进入 EventQueue 中，一旦 `setInterval` 的回调函数的执行时间超过其设置的延迟，那么完全看不出来有时间间隔
- 除了广义的同步任务和异步任务，任务还有更加精细的定义
	- macro-task(宏任务)：正常执行script、setTimeout()、setInterval()
	- mirco-task(微任务)：Promise、process.nextTick(类似node.js版的setTimeout，其回调函数在事件循环的下一次循环中调用)

整体script作为第一个宏任务执行结束，会在 EventQueue 中检查还有哪些微任务，并对其依次执行，至此完成第一次 EventLoop，然后再在 EventQueue 内检查宏任务，进行 EventLoop

```javascript
console.log('1'); // 同步任务

// 整体作为一个异步任务
setTimeout(function() {
    console.log('5');
    process.nextTick(function() {
        console.log('7');
    })
    new Promise(function(resolve) {
        console.log('6');
        resolve();
    }).then(function() {
        console.log('8')
    })
});

// 异步任务-微任务，在下一次循环内执行
process.nextTick(function() {
    console.log('3');
});

// 微任务-微任务
new Promise(function(resolve) {
    console.log('2');
    resolve();
}).then(function() {
    console.log('4')
});

// 输出结果
// 即 Promise > nextTick > Promise.then
1,2,3,4,5,6,7,8
```

## 渲染关键路径

浏览器接收到服务器封装并返回的字节数据，将其进行解析并转换为像素的过程被称为渲染关键路径

缩短浏览器页面渲染时间的一个思路就是缩短渲染关键路径

1. 处理HTML标记数据并生成DOM树

2. 处理CSS标记数据并生成CSSOM树

3. 将DOM数和CSSOM树合并生成渲染树

4. 遍历渲染树，计算每个节点的位置信息，进行布局

5. 将每个节点绘制到屏幕

以上的步骤是一个**渐进**的过程，为了提高用户体验，渲染引擎会试图更快呈现渲染结果，这意味着它不会等到所有的HTML文件都被解析完才创建并布局渲染树，它会将先获得的文档内容进行渲染（注意要生成渲染树）

DOM树的构建过程是一个深度优先遍历过程：当前节点的所有子节点都构建好后才会去构建当前节点的下一个兄弟节点

DOM（Document Object Model）文档对象模型，用来描述文档的结构与内容

CSSOM（Cascading Style Sheets Object Model）层叠样式表对象模型，用来描述对文档应用的样式规则

浏览器将字节数据解析成树结构（CSSOM以及DOM树）的过程：字节数据(Bytes) > 语义化字符(Characters) > 令牌(Token) > 节点对象(Nodes) > 对象模型(DOM)

在 chrome 中可以利用开发者工具的 `performance > Event log` 来观察一个页面的渲染细节

想要渲染出页面，就需要将DOM树和CSSOM树结合起来，生成渲染树。浏览器会从DOM树的根节点开始遍历每个可见节点（注意`display:none`和`visibility:hidden`区别，前者不渲染，后者渲染），并找到其对应的CSS样式规则

结合盒子模型，计算每个节点在窗口内的确切位置和大小，也就是布局阶段，布局阶段输出的是一个盒子模型，它会精确捕获每个元素在屏幕内的确切位置和大小，所有相对的测量值也会被转换为屏幕内的绝对像素值


## 在浏览器输入 URL 的执行过程

URL 结构：

- scheme: 通信协议，比如 https 等
- host: 主机地址
- port: 端口号，用来标志进程
- path: 虚拟文件路径，说明资源位于服务器什么地方
- query: 查询参数
- hash: 信息片段字符串，锚点部分

明确一个概念，一个 URL 就是一个特定资源，该资源可能需要引用多个其他资源作为支撑

1. 服务端交互获取渲染对象

    - HTTP
    - TCP 三次握手
    - 请求/响应报文结构
    - Cookie
    - 代理服务器

2. 通过浏览器渲染指定的资源文件

    - 渲染关键路径
    - 重绘和回流
