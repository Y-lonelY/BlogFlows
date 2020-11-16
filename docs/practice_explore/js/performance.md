# Performace

::: tip
1. 前端性能监控的基础知识储备
2. 封装一个前端性能监控的组件
3. 针对前端性能分析数据可视化
:::

## Base

就让我们的探索旅程从 Chrome performance 的一个示例开始!

![perf overview](../assets/perf/overview.gif)

我们可以观察到, 在 `Timings` 维度内, Chrome 观察了五个指标, 那么我们如何通过它提供的 API 来重新造一个轮子呢?

"磨刀不误砍柴工", 我们先来学习相关的 API



### Performace Entries

`PerformanceEntry` 对象表示 performance 时间线上一系列的指标(metric), 指标的来源可以分为两部分:

- 手动构建, 通过 `mark` 或者 `measure` 来生成
- 自动生成, 在资源加载时, 会被动生成(例如图片, script 等资源加载)

执行 `window.performance.getEntries()` 来获取当前应用的所有性能指标数据, 返回值为一个对象数组, 如下所示:

![perf overview](../assets/perf/entry.png)

通过观察结果的 `key` 值, 大致分为四种类型:

- **PerformanceNavigationTiming**
- **PerformanceResourceTiming**
- **PerformancePaintTiming**
- **PerformanceEventTiming**

上面类型的公共属性:

- `name` 表示该 performance entry 的名称, 可以是资源名称、URL 或者自定义指标名等
- `entryType` 上报指标的类型, 这个由浏览器本身来进行定义, 参考 [MDN entryType](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceEntry/entryType)
- `startTime` 指标开始上报的时间
- `duration` 该事件发生的整体耗时

此外, 各个类型(除 PerformancePaintTiming 外)还有其他更为详细的属性信息



### PerformanceObserver

**性能监测对象** 用来监测性能度量事件(可以理解为**性能事件的 Listener** ), 当浏览器的时间线记录一个新的 `performance entries` 时进行捕获

这里需要注意 `observe()` 方法的传参问题, 具体可以参考[W3C observe](https://w3c.github.io/performance-timeline/#observe-method)

- `entryTypes` 和 `type` 只能选择其一传入, 因为 `observe()` 会根据传参的键来进行不同模式(multiple 或者 single)的处理

```javascript
// 声明一个 PerformanceObserver 示例对象, 并且注册一个回调
const ob = new PerformanceObserver((list) => {
  console.log(list) // 返回一个 `PerformanceObserverEntryList Object`
  console.log(list.getEntries()) // 通过 `getEntries()` 获取 `performance entries`
  for (const entry of list.getEntries()) {
    // `entry` is a PerformanceEntry instance.
    console.table(entry)
  }
})

// 指定监控的 `entryType` 集合, 当指定 `entryType` 的指标被捕获到时, 会触发在声明实例对象时的回调
ob.observe({ entryTypes: ['paint'] })
// 停止接受性能条目
ob.disconect()
```

让我们看看一个简单页面的针对 `paint` 类型指标的捕获内容:

![observer](../assets/perf/observer.png)