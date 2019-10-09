# Cluster

> 记录开发过程中综合性和耦合度比较高的组件库

## Moment.js

[Moment.js](http://momentjs.cn/) 是一个日期处理类库，antd等组件库内常用

```js
// 30天前
moment().subtract(30, 'days').format('YYYY-MM-DD')

// 七天后
moment().subtract(7, 'days').format('YYYY-MM-DD')

// 当月第一天
moment().startOf('month')

// 当月最后一天
moment().endOf('month')