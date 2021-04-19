# Cache

当我们使用浏览器时，我们通常发现第一次进去会显得很慢，而再次进入则会“丝般顺滑”，打开控制台后，我发现了一些有趣的东西：再次加载资源时，其加载耗时和 size 都很大程度上减小。通过观察我们发现：

- 存在不同状态的 200，并且其资源的 size 值为 `from memory` 或者 `from disk`
- 部分资源请求返回 304 状态，即请求发送过去，服务器发现资源并没有发生变化，于是返回一个实体主体为空的响应报文

![reopen](../assets/cache/rerender.png)

这就是浏览器缓存机制引起的，浏览器缓存的基本元素包括：HTTP缓存，indexDB，cookie，localStorage，sessionStorage

## HTTP 缓存

下图相关的是 <b>HTTP缓存</b>，即通过 HTTP 首部行信息来管理缓存，结合下图来对 HTTP 缓存进行理解

![http-cache](../assets/cache/http-cache.png)

HTTP缓存分为强缓存（cache-control）和协商缓存（e-tag, last_modified），其作用的简单流程：

1. 浏览器根据加载资源的 <b>http request 首部行信息</b>，即 cache-control（注意 expires 为http1.0的产物，这里不做讨论）字段来判断是否命中强缓存，如果命中则直接从缓存中加载资源，这个过程由浏览器主导；

2. 如果未命中强缓存，则会将资源请求发送至服务器，由服务器通过比对 `If-None-Match && ETag`, `If-Modified-Since && Last-Modified` 来判断本地缓存是否失效，如果可以使用，服务器会返回一个实体主体为空的响应报文，浏览器直接从缓存内加载资源；

3. 如果协商缓存也没有命中，则正常进行请求，服务器会返回资源信息和缓存标识，浏览器会加载资源并更新缓存；

---

<b>Q1: 如何判断是否命中强缓存？</b>

通过 HHTP1.1 的Cache-Control规则来进行判定，它含有多个指令，且其优先级高于expires，对其进行一定了解

- `max-age=300` 表示300s 进行重新请求资源，会命中强缓存
- `no-store` 不缓存任何资源
- `no-cache` 客户端仍然缓存资源，是否使用缓存则需要根据协商缓存的验证规则来决定
- `public` 表示浏览器和代理服务器都进行缓存
- `private` 表示仅浏览器对资源进行缓存

强缓存不会发http请求，比如上图中 status=200 且至灰的请求，可以看出从 memory cache 时延为0ms，从 disk cache 时延差不多为2ms

---

<b>Q2: 如何判断是否命中协商缓存?</b>

协商缓存需要进行 http 请求，主要由后端进行验证，参与的两个规则分别是 E-Tag 和 If-Modified-Since，如果返回304，则表示服务器没有更新，直接从缓存内读取资源，否则返回200，且从服务器加载资源

- 浏览器第一次请求一个资源的时候，服务器返回的 header 中会加上 Last-Modified，Last-Modified是一个时间标识该资源的最后修改时间，之后再次请求该资源时，浏览器会在请求内添加 If-Modified-Since字段，让服务器判断资源是否发生改变
- If-Modified-Since/Last-Modified <b>缺点在于其时间最小精度为秒，如果在很短时间内再次发生变化，则可能检测不到</b>
- 因此，E-Tag 提供了一种精度更高的判定方法，即为每个资源添加一个唯一标识，每次资源改变都会重新生成该标识，通过判断 If-None-match/E-Tag 来判断是否命中协商缓存
- E-Tag 优先级高于 Last-Modified

---

<b>Q3: 强缓存如何进行存储和读取?</b>

因为看到强缓存分为 disk cache 和 memory cache，且 disk cache 读取成本高于 memory cache，那么其区别在哪呢？

- 可以类比 sessionStorage 和 localStorage 来进行理解，disk cache会将缓存放在磁盘中，memory cache会放在内存中
- memory cache 更快，但是生命周期短，关闭页面就会释放，主要用来存放 js 文件，因为 js 文件经常要读取，css 文件可能只用读取一次
- disk cache 更慢，但是生命周期长，推测清除浏览器缓存时进行清理，通常在内存占用较高时存放文件，或者存放大文件和不常用的文件缓存
- memory cache 的读取优先级高于 disk cache

下面是一个简单的实现例子：

```javascript
const express = require("express");
const OSS = require("ali-oss");
const zlib = require("zlib");
const { URL } = require("url");
const path = require("path");
const MAX_AGE = 10; //单位秒
// 利用 OSS 缓存，参考：https://developer.alibaba.com/docs/doc.htm?treeId=620&articleId=116183&docType=1
const client = new OSS({...});

const app = express();
const port = 3000;

app.get("*", async (req, res) => {
  let u = req.url;
  if (req.headers.referer) {
    const uuu = new URL(req.headers.referer);
    const uuuu = path.join(uuu.pathname, "../../", u);
    u = uuuu;
  }
  //TODO html 文件不进行缓存

  // ------------------------------------------------
  /**
   *  缓存策略开始
   *  整体流程
   *  html 不进行缓存，只缓存资源文件
   *  请求的 if-none-match 进行比对，分为下面两种情况:
   *    1.  相等: 返回304，请求结束
   *    2.  不相等: 通过sdk获取资源，将头部 cache-control 和 etag写入，然后流式gzip然后返回数据
   *    cache-control 强制缓存时间暂定为1分钟
   */
  try {
    const gzip = zlib.createGzip();
    res.setHeader("cache-control", `max-age=${MAX_AGE}`); // MAX_AGE 时间为秒
    res.setHeader("Content-Encoding", "gzip");
    // 控制协商缓存
    // 如果要下载的文件太大，或者一次性下载耗时太长，您可以通过流式下载
    const result = await client.getStream(u, {
      headers: {
        "If-None-Match": req.headers["if-none-match"],
      },
    });
    res.setHeader("etag", result.res.headers["etag"]);
    res.statusCode = result.res.status;
    result.stream.pipe(gzip).pipe(res);
  } catch (e) {
    res.send("error"); // 抛错，注意获取
    res.end();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```