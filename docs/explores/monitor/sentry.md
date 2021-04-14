# Sentry

> Sentry is a service that helps you monitor and fix crashes in realtime!

## 名词

- event volume：事件体量
- PII（Personally Identifiable Information）：个人身份验证信息

## 为什么需要 Sentry?

Sentry 能够提供在生产环境内的实时错误追踪，并且包含针对错误一系列的处理流程。

- 及时发现、响应线上问题
- 通过合理的信息展示，验证问题修复情况
- 针对问题进行多维分析

## Architecture

这里对 Sentry 的[架构](https://develop.sentry.dev/architecture/) 进行理解

### Relay Server

> The Sentry Relay is a service that pushes some functionality from the Sentry SDKs as well as the Sentry server into a proxy process.

参考 [relay](https://github.com/getsentry/relay) ，了解如何进行本地开发/部署

1. 依赖 rust 环境，[安装 rust](https://learnku.com/rust/wikis/29018)
2. `brew install cmake`，安装 cmake，CMak e是一个比 make 更高级的跨平台的安装、编译、配置工具
3. `brew install java`，安装 java 执行环境
4. `brew install kafka` 和 `brew install zookeeper` 部署 kafka 服务
5. `brew install redis` 部署 redis 服务

#### Init

观察 `Makefile`，这里梳理本地 run 的流程：

1. `relay-generate` 内依赖 [uap-core](https://github.com/ua-parser/uap-core)，以 submodule 的形式进行引入，因此需要执行 `make setup` 来初始化依赖，注意，如果碰到 `pip command not found` 的问题，查看本地的 pip 映射目录，我通过将 Makefile 内的 pip 替换成 pip3 解决
2. 执行 `make test` 检查 rust, python 以及 integration 的编译和测试用例情况
3. 执行 `cargo run --all-features -- config init` 初始化 Relay 服务
4. 执行 `cargo run --all-features -- run`

通过 `relay config init` 创建一个初始配置，之后将配置文件放在 `.relay` 内

**Config**

通过修改 `.relay/config.yml` 文件可以覆盖默认配置

```yaml
relay:
  mode: managed
  upstream: "https://sentry.io/"
  host: 127.0.0.1
  port: 3000
  tls_port: ~
  tls_identity_path: ~
  tls_identity_password: ~
```

**Credentials**

在 `.relay/credentials.json` 内读取公钥和私钥，用来验证上游服务器

通过也可以将 public key 用来在 sentry web 上注册 relay，用来覆盖默认配置，relay 服务会读取其配置的修改，比如：PII stripping, filtering, rate limiting 等等










## Data flow

### APP with SDK

在客户端内，sentry 提供了一些配置来[清洗数据](https://docs.sentry.io/platforms/javascript/configuration/filtering/#using-beforesend)

- `beforeSend(event): event | null` 通过对 events 的信息进行判断，返回 null 则表示不进行上报
- `tracesSampler(samplingContext): number`  通过返回采样率来进行处理，如果返回 0 则表示不进行上报
- 配置 `ignoreErrors` 和 `denyUrls` 来进行显式过滤

### Rate limit

在 Sentry Project 内设置  `setting > Client Keys(DSN) > RATA LIMITS` 来<b>限制指定时间段内接受事件的数量</b>，用来处理项目相当“嘈杂”时（上报数据质量低，但是上报量巨大）的情况

<img src="../assets/sentry/rate-limits.png" alt="rate-limits" />

### Filter

在 Sentry Project 内设置 `setting > Inbound Filters` 来<b>阻止 sentry 在存储特定场景下的事件</b>，[参考](https://docs.sentry.io/product/data-management-settings/filtering/)

### Data Scrub

在引入第三方服务时，我们需要搞清楚哪些数据能够允许被发送到 sentry, 哪些允许被存储。除了如上提到的通过 SDK 的方式来筛选和清理敏感数据外，Sentry 也提供配置来在服务端进行[数据清洗](https://docs.sentry.io/product/data-management-settings/server-side-scrubbing/)

通过一个新的配置项 `setting > Security & Privacy` 来配置数据清洗的[高级操作](https://docs.sentry.io/product/data-management-settings/advanced-datascrubbing/)


### Aggregation

