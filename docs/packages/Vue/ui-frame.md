# UI-Frame

## ant-design-vue

> [antv](https://www.antdv.com/docs/vue/introduce-cn/) 是基于 Ant Design 设计体系的 Vue UI 组件库，主要用于研发企业级中后台产品
### 实现按需加载

先说说全局全量引入的做法，在main.js内：

```js
import Vue from "vue"
import Antd from 'ant-design-vue'
// 引入样式
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)
new Vue({
  render: h => h(app)
}).mount('#app')
```

全量引入的缺点很明显，会大大降低编译的效率，同时会影响前端性能，因此需要实现按需加载，Vue内的组件需要进行注册才能使用，区别于React，因此按需加载的方式也不同

添加babel插件，`npm install babel-plugin-import`，这是一个用于按需加载组件代码和样式的babel插件

之后，对babel.config.js文件进行配置

```js
// 这里区别于官网style配置，不然需要install less-loader
plugins: [
  [
    "import",
    { libraryName: "ant-design-vue", libraryDirectory: "es", style: "css" }
  ]
]
```

最后新增一个antd.js文件，在main.js内引入该文件即可

```js
// antd.js
import Vue from "vue"
import { Form, Button, Input } from 'ant-design-vue'
Vue.component(Form.name, Form)
Vue.component(Form.Item.name, Form.Item)
Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
```


## iview（view-design）

> [iview](https://www.iviewui.com/) 是一套基于 Vue.js 的高质量 UI 组件库
### issues

1. 某些场景下，`Table` 组件不需要其内置的全选（即表头的选择框）功能，而此时直接返回并不能够阻止其默认冒泡行为

可以通过为特定列添加 className，结合 CSS 样式对其进行隐藏，如下

```vue
columns: [
    {
      type: "selection",
      // 设置 className 作为标记
      className: "thead-selection",
      width: 40,
      align: "left",
      fixed: "left"
    }
]
// 注意隐藏的元素和样式，直接 display: none 会造成样式错乱
<style lang="scss">
.ivu-table-small th.thead-selection .ivu-table-cell {
  visibility: hidden;
}
</style>
```