# Cluster

> 记录开发过程中综合性和耦合度比较高的组件库


## ESLint

eslint已经在MVVM项目被普遍使用，因此了解其在项目内配置和使用显得尤为重要

在项目根目录下添加 `.eslintignore` 文件来跳过指定文件的检查，数据格式和 `.gitignore` 一致

### config

在Vue项目内，其package.json文件内会有eslintConfig字段，可以更改其值来更新配置，也可以采用另一种方法，即在文件根目录下添加 `.eslintrc.js` 文件来修改配置

```js
// .eslintrc.js
module.exports = {
    "root": true,
    "env": {
        "node": true
    },
    "extends": [
        "plugin:vue/essential",
        "eslint:recommended"
    ],
    "rules": {
        // 使用控制台打印
        "no-console": "off",
        // 不使用分号
        "semi": [1, "never"],
        // 函数方法前添加空格
        "space-before-function-paren": 1,
    },
    "parserOptions": {
        "parser": "babel-eslint"
    }
}
```


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