# Navigator



## page load

这是目前最规范的 RUM 模型，用来表示我们页面在加载过程中的各个阶段

<img src="../assets/perf/pageLoad.png" />

我们在进行指标测量时，有几个注意点：

1. 是否每个阶段都会发生？
2. 每个阶段是否都是连续发生？

我们从一个例子开始，当我多次访问同一个域名时，会发生什么？<b>后面再次访问的加载时间明显缩短</b>，原因也很简单，浏览器做了缓存，这里缓存包括浏览器对 DNS 查询结果做缓存，因此第二次访问时，大概率不会执行 DNS 查询阶段。

我们知道浏览器存在同域名 TCP 并发连接限制，一般 blink 内核的限制为 6 个，那么当我们同时发起多个请求时，会存在一个 stalled 状态，<b>表示浏览器知道了这个请求，但是暂时挂起，等待浏览器消费完当前连接后进行处理</b>，除此之外还有浏览器正在分配缓存空间，浏览器处理更高优先级的请求等等情况均会导致 stalled 状态的发生。

下面是我们对指标进行预处理的方法：

```typescript
export function getNavTiming(): WPMNavigationTiming {
  if (!isSupportedWP()) return {}
  // 通过 getEntries 收集 navigation 数据
  const nav = window.performance.getEntriesByType("navigation")[0] as any
  if (!nav) return {}
  return {
    // 从发起请求到数据传输完毕的时间
    fetchTime: +(nav.responseEnd - nav.fetchStart).toFixed(2),
    // 应用缓存
    appCache: +(nav.domainLookupStart - nav.fetchStart).toFixed(2),
    // service worker + response time
    workerTime: nav.workerStart > 0 ? +(nav.responseEnd - nav.workerStart).toFixed(2) : 0,
    // 建立 TCP 连接之后，到接收到第一个字节的时间
    ttfb: +(nav.responseStart - nav.requestStart).toFixed(2),
    // 建立 TCP 连接之后，到数据传输完毕的时间
    networkTime: +(nav.responseEnd - nav.requestStart).toFixed(2),
    // 传输数据时间
    downloadTime: +(nav.responseEnd - nav.responseStart).toFixed(2),
    // HTTP 首部字节数
    headerSize: nav.transferSize - nav.encodedBodySize || 0,
    // DNS 寻址时间
    dnsLookupTime: +(nav.domainLookupEnd - nav.domainLookupStart).toFixed(2),
  }
}
```









## sendBeacon()

> `navigator.sendBeacon(url: string, data: string | Blob | FormData | ArrayBufferView)` 用于将数据异步传输到指定接口，主要满足统计和诊断代码的需要！

<a href="https://caniuse.com/?search=beacon" target="blank"><img src="../assets/beacon.png" alt="beacon" /></a>



通过 [页面生命周期](https://7k7k.life/explores/webs/page-lifecycle.html) 我们了解到，当页面应用捕获到 `unload` 事件或者处于 terminated 状态时，会主动卸载应用释放资源，此时如果你希望上报一些性能行为数据的话，往往是不可靠的，也不建议这么做。因为如果过早发送请求，可能会错误收集时机，过晚发起同步请求，很有可能会被浏览器给丢弃掉！

之前怎么做的呢？

1. 监听到文件卸载，通过脚本创建一个 `image` 标签，通过设置其 `src` 属性来延迟卸载，发送数据；
2. 通过创建一个 no-op 的循环处理，来延迟卸载，从而保证向服务器发送数据；

这样的做法，都是通过一系列手段延迟卸载，从而保证请求的发出。但是，同步的请求会迫使用户延迟卸载文档，进而导致下一个页面加载延迟，这样会极大损害用户体验！

因此，Web API提供 `sendBeacon()` 方法，来将数据放入**异步传输队列**中，同时返回一个 boolean 值来表示该操作是否成功。它会在恰当的时间异步向服务器发送请求，同时不会延迟卸载页面或者影响下一个页面的载入。

通过观察一个多页面应用你就会发现：

- 当你在当前窗口，跳转到一个新的页面时，`sendBeacon()` 会在新页面加载完毕时触发；

- 当你关闭当前窗口时，`sendBeacon()` 会立即触发；

```javascript
window.addEventListener('unload', () => {
  navigator.sendBeacon('http://127.0.0.1:3000/api/perf', JSON.stringify(window.screen))
}, false);
```


