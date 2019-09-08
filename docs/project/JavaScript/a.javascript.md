# JavaScript

> 用来记录在使用JavaScript进行实际开发过程中遇到的综合性较强的问题

## 函数节流与防抖

**underscore函数节流**

1. 通过判断两次调用函数的时间戳，根据时间间隔来判断是否执行
2. 设置定时器，如果当前缓存存在该定时器，则不执行函数；否则执行该函数并设置新的定时器

```javascript
// `{trailing: false}` 禁用最后一次执行
// `{leading: false}` 禁用第一次执行
var throttled = _.throttle(updatePosition, 100, {trailing: false});
```