## develop

### 2019-02-27

Vue router 动态改变 `window.location.search` 值的问题
---
1. 通过 `vm.$route.query` 获取当前查询参数对象并进行拷贝，记为 queryObject
2. 通过 `vm.$router.push({query: queryObject})`

Vue 中 `vm.$route` 和 `vm.$router` 的区别
---
`vm.$route` 是 Object，而 `vm.$router` 是 VueRouter
`vm.$route` 里面主要是当前 url 的内容解析，`vm.$router` 是 vue-router 的一个实例对象，里面继承vue-roouter声明的属性和方法


在 Vue 的 `<template>` 中展示对象的属性值要用 `obj[key]` 的形式，而不能用 `obj.key` 的形式

`v-for` Vue 内对象循环
---
`v-for="(value, key) in obj"` 可类比js方法的 `for in`
`v-for="value of Arr"` 可类比js方法的 `for of`
本质上，Array 可看作 Object 的一个子集，所以 `in` 方法对数组同样适用，但是 `of` 仅适用于数组

`v-for="(value, key, index) in obj"` 分别对应于 （值，键，索引）

需要为每项渲染元素绑定一个 `key`，以便 Vue 可以跟踪每个节点的身份，从而重写和重新排序现有元素

i18n 国际化使用
---

基本使用

1. 准备工作：安装依赖 `vue-i18n` 后，在入口文件 `main.js` 导入，通过 `Vue.use(plugins)` 方法来安装插件

2. 基本配置：通过 `new VueI18n({...})` 声明一个 i18n 的实例对象

3. 挂载：在 `new Vue({...})` 方法内将 i18n 实例挂载到 Vue 实例上

4. template：在 template 通过 `$t(message.xxx)` 来对指定词条进行翻译

进阶使用

添加 `i18n-setup.js` 作为公共入口方法

1. 参考[i18n延迟加载](https://kazupon.github.io/vue-i18n/guide/lazy-loading.html)
2. 新增 `window.localStorage.setItem()` 用于保存用户状态
3. 返回 i18n 实例和异步加载语言方法 `laodLangAsync()` 用于调用

添加 `lang`文件夹用于存放语言包 `zh.json, en.json...`

1. 特别注意：首次直接加载的语言包和异步获取的语言包格式不一样，因为异步获取的语言包，vue-i18n 会默认将当前 lang 作为键，获取的 json 对象作为值
2. 具体细节可以在 console 观察 `i18n` 实例和其 `i18n.messages` 属性

### 2019-02-26

`prismjs` 代码高亮工具使用细节

- 要求需要渲染的 dom 元素的 class 包含 `language-xxx`
- import 时需要一个实例对象接收
- 在 dom 渲染完成之后（即 `this.$nextTick()`）再调用 `Prism.highlightAll()` 方法

Vue 响应原理理解

> [source](https://cn.vuejs.org/v2/guide/reactivity.html)

1. Vue 会遍历 `data()` 方法返回的所有 JavaScript 对象，并根据原生对象的 `Object.definePerporty()` 为其属性设置 `getter()` 和 `setter()` 方法
2. 每个组件实例在生成时，同时会生成相应的实例对象 `watcher`，它会在组件渲染过程中把属性记录为依赖,这个过程通过 `getter()` 完成
3. 当属性值发生改变，会调用属性的 `setter()` 方法，`setter()` 方法会通知 `watcher` 实例对象重新计算，从而触发组件更新的方法，使其关联组件更新
4. `data()` 方法内通过 return 语句返回的是响应式属性

> 由于其对象声明的方式，Vue 不允许在已经创建的实例上动态添加新的根级响应式属性，但是可以通过 `this.$set(obj, property, value) 或者 Vue.set(obj, property, value)` 方法将“属性-值”挂载到已声明的对象上

5. Vue **异步** 执行 DOM 更新，只要响应式属性的值发生变化，Vue就会维护一个队列，对于同一个 watcher 多次触发的情况，Vue 维护的队列会进行去重处理。然后在下一次事件循环 `tick` 中，Vue 刷新队列并执行队列任务

6. 为了在数据变化之后等待 Vue 更新DOM，可以在数据变化之后立即调用 `Vue.nextTick(callback) 或者 this.$nextTick(callback)`，这样回调函数会在 DOM 完成更新之后立即调用

### 2019-02-24

Mac OS 下安装 vue-cli 脚手架：`sudo install -g @vue/cli`

### 2019-02-21

Vue 父组件内修改子组件样式

- 去掉 scope 属性：当 `<style>` 标签有 `scoped` 属性时，其 css 样式将只作用于当前组件的元素，而不会渗透到子组件中
- 使用深度选择器 `.a >>> .b {...}`，`>>>` 可以使用 `\deep\` 操作符代替

### 2019-02-20

Vue 页面内跳转的解决方案
---

问题在于：`vue-router` 默认的 hash 模式，在 markdown 文件内通过元素属性 `id='target'` 会改变当前路由的 hash 值，这样会导致通过 `url` 或者刷新当前页面后当前页面会产生错误

解决思路：
1. 通过设置 vue-router 的 `new VueRouter({ mode: 'history' })` history 模式来改变url

> history 模式充分利用 `history.pushState` API 来完成页面跳转

2. 通过设置锚点的id 结合  `ele.scrollIntoView` API 来完成页面内滚动

> 注意：“只有字母和数字[0-9a-zA-Z]、一些特殊符号"$-_.+!*'(),"[不包括双引号]、以及某些保留字，才可以不经过编码直接用于URL”

Url 编码问题
---

> URI是统一标识符的意思，通过我们所说的 URL 是 URI 的一种，URL的编码采用的是ASCII码，而不是Unicode，这样做是为了防止在客户端和服务器支持的字符集不同的情况下，解析不一致而产生问题

1. url 路径中包含汉字，浏览器默认会用 utf-8 编码，通过 `window.location` 可以观察到
2. url 的查询参数，即 `?query=test` 会用操作系统的默认编码
3. GET方法而生成的url包含汉字，比如搜索的场景，这时会以HTML源码中设定的 `<meta charset='utf-8'></meta>` 来决定
4. AJAX 调用中，IE采用操作系统的默认编码，其他一般都是 utf-8 编码

编码顺序：HTTP头设置 > 浏览器设置 > 当前进程系统设置(codePage) > 操作系统默认编码

JavaScript 编码API：

`encodeURI()` 除 `!#$&'()*+,/:;=?@-._~0-9a-zA-Z` 外进行编码
`decodeURI()` 解码

`encodeURIComponent()` 除 `!'()*-._~0-9a-zA-Z` 外进行编码
`decodeURIComponent()` 解码

Vue 路由跳转方案
---

`import` 路由配置文件 `router.js` ，通过编程式导航 `router.push({path: '...'})` 或者 `router.replace({path: ...})` 来重定向，replace 和 push 方法的区别在于：replace 不会向 history 中添加记录

> 通过 `Vue.use(router)` 方法将 router 对象挂载到 Vue 实例对象 `this.$router` 上
> `Vue.use(obj)` 相当于 `Vue.prototype.$obj = obj` 

通过 `<a href="#/...">` 进行跳转


Vue 监听路由变化
---

```javascript
watch: {
  '$route': function(from, to) {
    // code
  }
}
```

通过 event bus 在组件之间传递数据
---

```javascript
// 组件1：注册事件，传递参数
  this.$root.Bus.$emit('trans', {
    testLabel: 'docs',
  });

// 组件2：接受参数，销毁事件
  created() {
    this.$root.Bus.$on('trans', (value) => {
      this.testLabel = value.testLabel;
    });
  },

  beforeDestroy() {
    this.$root.Bus.$off('trans');
  },
```
### 2019-02-19

通过 `transition` 设置过渡效果，因为过渡效果需要两个明确值，因此 `height:auto` 不能够达到过渡效果，两种解决办法

- 通过设置 `max-height` 来解决
- 通过js来动态改变元素的高度

### 2019-02-18

`slot='...'` 具名插槽: 通过设置 name 来进行配置，例如将包含 `slot="test1"` 的元素插入到父组件的 `<slot name="test1"></slot>` 中去

**注意**：在 Vue 生命周期函数中，统一使用箭头函数 `() => {}` 来声明函数，但是生命周期本身不能使用箭头函数声明

> 根据Vue官方文档：“所有的生命周期钩子自动绑定 `this` 上下文到示例中，因此你可以访问数据，对属性和方法进行运算。着意味着你不能使用箭头函数来定义一个生命周期方法，因为箭头函数绑定了父上下文，而造成 `this` 不是只想 Vue 实例

`<template>`的 {{}} 中可以设置表达式

对象的深度拷贝 `var obj1 = JSON.parse(JSON.stringify(obj2))`

### 2019-02-17

使用 `scss`：添加依赖 `sass-loader` 和  `node-sass`
在 .vue 文件内使用 `<style lang="scss">` 注意这里需要使用 scss

> SCSS 是 Sass 3 引入新的语法，其语法完全兼容 CSS3，并且继承了 Sass 的强大功能，主要区别是：SCSS 需要使用分号和花括号而不是换行和缩进，并且对空白符不敏感

### 2019-02-15

Vue 生命周期的 `beforeMount()` 在挂载开始之前被调用：相关的 render 函数首次被调用，此时 methods 和 data 已经准备就绪

`<el-scrollbar>` 包裹在需要滚动的元素外层即可

### 2019-02-14

封装 axios，实现拦截器功能

- `plugins/request.js` 文件用于生成 axios 实例，设置基本配置，对请求和响应进行拦截
- `view/api/base.js` 设置api的同意参数，比如给个模块路径等
- `view/api/apIndex.js` 封装各个api模块 
- `view/api/test.js` 一个请求模块的实例，里面封装该模块下的请求

封装好后在 `main.js` 内将api方法挂载 `Vue.prototype.$api = api` 作为全局变量，之后通过 `this.$api.test.getArticle()` 即可直接引用

Vue Public 作为静态资源，在同域可以直接引用，注意Vue在访问静态资源时会默认访问 `localhost:7777/public`

### 2019-02-13

Vue 生命周期的 `beforeCreated()` 在数据观测和事件配置之前被调用，这意味着在该方法里面不能调用 methods 内的方法和 data内的数据

使用 `el-scrollbar` ，源文件路径 `node_modules\element-ui\packages\scrollbar\src\main.js`

```javascript
props: {
    native: Boolean, // 是否用原生的滚动条
    wrapStyle: {}, // 外层盒子样式，可联想进度条实现效果
    wrapClass: {}, // 外层盒子class
    viewClass: {}, // 内层盒子样式
    viewStyle: {}, // 内层盒子class
    noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    tag: {
      type: String,
      default: 'div'
    }
},
```

## vue-cli3.x

### install

1. `npm uninstall vue-cli -g` 如果之前已经安装过 vue-cli 1.x,2.x ，需要先在全局取消其安装

解决 vue 安装时 'Please try running this command again as root/Administrator.' 问题

- 关闭 vs code，清除其 TERMINAL 影响

- window10 以管理员权限运行 cmd

解决 Invalid tag name "@vue-cli": Tags may not have any characters that encodeURIComponent encodes.

- 原因在于 node 的版本过低，官方推荐8.9以上

2. `npm install -g @vue/cli` 安装新包

3. `vue --version` 检查安装是否成功

### usage

- `vue ui` 打开vue项目管理的图形界面

在项目根目录下

- `npm run serve` 启动当前项目
- `npm run build` 生产环境包

### static resource

webpack 处理

1. JavaScript内被导入
2. template/css 中通过 **相对路径** 引入

直接拷贝

1. 放置在 `Public` 目录下
2. 通过绝对路径引用

### vue.config.js

在项目的根目录下新建文件 `vue.config.js`，在该文件内的配置对象最终会被 `webpack-merge` 合并入最终的 webpack 配置

因此，其配置的属性与 webpack 属性大致相同，需要更改的是其值

具体配置项参考 [vue.config.js](./vue.config.js)

### vue-markdown

依赖

- text-loader
- [vue-markdown](https://github.com/miaolz123/vue-markdown)

配置 `vue.config.js`，目的是可以直接引入 .markdown 文件

参看 `/view/demo1.vue` 文件内容

解决 `toc` 设置初始值为 true 不展示问题

- 原因：通过打印 `toc-rendered` 和 `rendered` 方法可以看出，rendered 是优先于 toc-rendered 渲染的，同时 toc-rendered 的回调参数也是 toc 列表，这样看起来应该是程序 bug
- 解决：为 `toc` 绑定数据，在 rendered 事件内更改其值为 true

### showdown

mounted: `el` 被新创建的 `vm.$el` 替换，并被挂载到实例上去之后调用该钩子，该钩子在服务器端渲染期间不被调用

showdown 需要先生成实例对象

参看 `/view/demo2.vue` 文件内容

通过 `converter.getOptions()` 和 `showdown.getDefaultOptions()` 方法分别获取当前配置和默认配置

```javascript
{
    backslashEscapesHTMLTags: false, // 支持 html 标签转义
    completeHTMLDocument: false, // 输出完整的html文档（即包括 <html>, <body>, <head>）
    disableForced4SpacesIndentedSublists: false, // 禁止4个空格来进行缩进，2-3个空格就可以了
    emoji: false,
    encodeEmails: true, // 通过使用字符实体启用电子邮件地址编码，将ASCII电子邮件地址转义为等效的十进制实体
    ghCodeBlocks: true, // 启用对GFM代码块样式的支持
    ghCompatibleHeaderId: false, // 生成与github样式兼容的标头ID（空格用短划线替换，并删除一堆非字母数字字符）
    ghMentions: false, // 启用github @mentions，链接到提到的用户名
    ghMentionsLink: "https://github.com/{u}", // github @mentions 的链接
    headerLevelStart: false, // 设置标题起始级别，如设置 3，则表示从 <h3> 开始
    literalMidWordUnderscores: false, // 启用此功能将停止显示将单词中间的下划线解释为<em>和<strong>，并将其视为文字下划线
    metadata: false, // 启用对文档元数据的支持，在生成实例对象时就要设置，即在生成 html 之前
    noHeaderId: false, // 禁用标头ID的自动生成。设置为true会覆盖prefixHeaderId
    omitExtraWLInCodeBlocks: false, // 忽略代码块中的换行符
    openLinksInNewWindow: false, // 在新窗口打开链接
    parseImgDimensions: false, // 支持在 markdown 中设置图像尺寸
    prefixHeaderId: false, // 为生成的标头ID添加前缀，传递字符串会将该字符串作为头标识的前缀，设置为true将添加通用的“section”前缀
    rawHeaderId: false, // 从生成的标题ID（包括前缀）中用短划线（ - ）替换 'AND' 和空格
    rawPrefixHeaderId: false, // 将此选项设置为true将阻止showdown修改前缀，这可能导致格式错误的ID（例如，如果在前缀中使用“char”），如果prefixHeaderId设置为false则无效
    requireSpaceBeforeHeadingText: false, // 在＃和标题文本之间添加空格
    simpleLineBreaks: false, // 解析换行符，不需要在行尾存在两个空格
    simplifiedAutoLink: false, // 自动链接到网站，即添加 <a> 
    smartIndentationFix: false, // 尝试在缩进代码中巧妙地修复与es6模板字符串相关的缩进问题
    smoothLivePreview: false, // 防止由于输入不完整实时预览中出现奇怪的效果
    splitAdjacentBlockquotes: false, // 拆分相邻的blockquote块
    strikethrough: false, // 启用对删除线语法的支持
    tables: false, // 支持表格语法
    tablesHeaderId: false, // 表头标记添加id属性
    tasklists: false, // 启用对GFM任务列表的支持
    underline: false, // 下划线支持
}
```

