# operamsg

> A vue project for sensenets's operation manage!

## Vue-Cli2.x

### install

 - `npm install --global vue-cli`, 在系统命名空间安装 Vue

 - `npm init webpack projectname`, 创建项目

 - `? Project name (projectname)`, 输入项目名，括号内为默认值

 - `? Project description (A Vue.js project)`, 输入项目描述，括号内为默认值

 - `? Author (Evison <yanghao@sensenets.com>)`, 项目管理者，括号内为默认值

 - `? Vue build (Use arrow keys)` 选择 Vue 的创建方式，推荐选择第一种 `Runtime + Compiler: recommended for most users`(运行加编译)

 - `Install vue-router? (Y/n)` 选择添加路由，推荐选择 Y

 - `Use ESLint to lint your code? (Y/n)` 选择是否ESlint管理代码风格，推荐选择 Y

 - `Pick an ESLint preset (Use arrow keys)` 选择ESlint风格，推荐选择`Airbnb (https://github.com/airbnb/javascript)`

> 如果你需要学习 *airbnb-style* 相关知识，可以参考[airbnb-style](https://github.com/YLoNe666/airbnbJavascriptNote) 

 - `Set up unit tests (Y/n)` 选择是否安装单元测试，因人而异

 - `Setup e2e tests with Nightwatch? (Y/n)` 选择是否安装 e2e 测试，因人而异

 - `npm install` 在当前工作空间生成项目依赖

 - `npm run dev` 在localhost:8080(默认，可在 `index.js` 内更改)开启服务并进行热加载

 - `npm run build` 编译生成项目文件并存放在 `dist` 目录下

### Q&S

#### Invalid prop: type check failed for prop "span". Expected Number, got String.

**Cause**

未按照 `element` 插件要求对属性进行绑定

**Solution**

将 `span='6'` 添加 `v-bind` 绑定，即改写成 `:span='6'` 即可

#### 实现时钟效果

**created**

在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。

**Solution**

通过 `created()` 函数内立即执行时间自增，从而实现时钟效果

#### 设置标签卡图标

**Cause**

网页把根域名作为相对路径的根目录，然而文件路径是相对于项目文件的根目录的，所以要是将图标放在 `/src/assets` 目录下，会找不到文件

**Solution**

将图标放在根目录下的 `/static` 文件下，这个文件夹下的文件会按照原本的结构放在网站根目录下，即在 `index.html` 文件内添加 `<link rel="shortcut icon" type="image/x-icon" href="static/favicon.ico">`

#### Component template should contain exactly one root element

**Sight**

在初始化一个组件实例时，在其中引入了若干个子组件，

**Cause**

未对组件进行封装，Vue 模板只能有一个根对象

**Solution**

通过一个 `div` 或者其他标签对其进行封装，需要注意的是 `template` 内也不支持形如 `<template>test</template>` 这样的操作

### EsLint

#### Unexpected console statement

Eslint 规范不建议在项目内使用 `console`，在 `.eslinttrc.js` 文件内配置 `rules { 'no-console': 'off' }`，关闭控制台输出检测功能

#### Expected linebreaks to be 'LF' but found 'CRLF'

统一换行符，`"\n" unix(for LF)` and `"\r\n" for windows(CRLF)`，默认是 LF，但是当前用的规则是 CRLF。在 `.eslinttrc.js` 文件内配置 `rules { 'linebreak-style': 'off' }`，关闭换行检测功能

#### Mixed spaces and tabs

用空格代替了 tab，导致两者混用，采用同一形式

#### Unexpected tab character

Eslint 不建议使用 tab，在 `.eslinttrc.js` 文件内配置 `rules { 'no-tabs': 'off' }`，关闭换行检测功能

#### Custom elements in iteration require 'v-bind:key' directives

根据 Vue 官方文档，2.2.0+ 的版本中，当组件使用 `v-for` 时，`key` 现在是必须的。为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为没想提供一个唯一 key 属性，理想的 key 值是每项都有的且唯一的 id

#### Trailing spaces not allowed

结尾不允许有空格

#### Newline required at end of file but not found

在文件尾部（最后一行）需要新添一个空行

#### Missing trailing comma / Missing semicolon

尾部缺少逗号 / 缺少分号

#### 'app' is assigned a value but never used

声明了一个变量，却没有使用，取消其声明即可

#### Absolute imports should come before relative imports

绝对引入应该优先于相对引入，将绝对路径的引入置于首位

#### Unexpected use of file extension "vue" for "./App.vue"

在 Vue 内可以自定识别后缀为 `.vue,.js` 的文件，通过 `import` 引入这类文件的时候，不建议添加后缀

#### Assignment can be replaced with operator assignment || Unary operator '++' used

赋值可以被运算赋值代替或者使用了连加符号，例如 `i++`，应该使用 `i+=1` 取代

#### Expected empty line after import statement not followed by another import

如果 `import` 语句之后不是 `import` 语句，则需要空一行

#### Casing of ./OffTasksTable does not match the underlying filesystem

命名空间名称与文件系统中的命名名称大小写不匹配

#### Expected method shorthand

需要对象速记语法，例如 `var a = { test: function () {...}}` 是不被期待的，需要的速记方式 `var a = { test() {...} }`

#### Error in created hook: "ReferenceError: Promise is not defined"

**Cause**

对于低版本浏览器，chrome 49 以下不支持 `promise` 等异步方式

**Solution**

`npm install babel-polyfill --save-dev` 在项目中引入 `babel-polyfill`

在项目入口文件 `main.js` 内 `import 'babel-polyfill';` 引入文件

#### 解决 npm install 一直报错 `error code ELIFECYCLE` 的问题

先执行 `npm config set unsafe-perm true`，之后再执行 `npm install`

