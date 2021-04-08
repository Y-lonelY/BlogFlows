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

