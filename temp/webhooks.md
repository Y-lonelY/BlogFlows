# Webhooks

> Webhooks allow you to build or set up integrations

在日常开发过程中，你一定会有这样的困扰：有一些流程化的工作，甚至是一些很小的改动，都会经历：开发 - 测试 - 提交 - 打包 - 上传 - 编译 - 发布等过程，频繁的重复，大大地降低了我们开发的乐趣！

Webhooks 是 Git 提供的，能够帮助我们进行集成的“钩子”。

**关键点：**

- 配置 `web hooks.Payload URL` 时，注意 Github 目前不支持转发服务，如果你在服务器通过 nginx 配置了转发，且配置 Payload URL 为转发域名，则 Github 会返回 **502**，解决方案：暴露 `host:port/path` 



## Creating webhooks

1. 设置 Git 需要监听哪些事件来触发 webhooks
2. 在服务器内添加路由，用来接受和处理 webhooks 负载（请求）



### Secret

类似 `token`, 用来告诉服务器当前请求来自于 Github

当设置 `secret` 之后，POST 请求会带上 `X-Hub-Signature` 和 `X-Hub-Signature-256` 的请求头



### Run a server



