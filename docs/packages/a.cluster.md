# Cluster

> 记录开发过程中综合性和耦合度比较高的组件库

## Moment.js

::: tip
[Moment.js](http://momentjs.cn/) 是一个日期处理类库，antd等组件库内常用
:::

### 常用

```js
// 30天前
moment().subtract(30, 'days').format('YYYY-MM-DD')

// 七天后
moment().subtract(7, 'days').format('YYYY-MM-DD')

// 当月第一天
moment().startOf('month')

// 当月最后一天
moment().endOf('month')
```

### 针对数据库内不同事件存储类型的解析

```js
import moment from 'moment';

// 对于 DATATIME 类型
var correct_date = moment.utc(origin_date).format('YYYY-MM-DD HH-mm-ss');

// 对于 TIMESTAMP
var correct_time = moment(origin_time).add(8, 'h').format('YYYY-MM-DD HH-mm-ss');
````

### 大小比较

```js
// 两个 moment() 对象可以直接比较大小
moment('2010-10-20') < moment() // true

// 一个字符串和一个 moment() 对象可以通过 isBefore, isSame, isAfter 来进行比较
moment('2010-10-20').isBefore('2010-10-21'); // true
moment('2010-10-20').isSame('2010-10-21'); // false
moment('2010-10-20').isAfter('2010-10-21'); // false
```