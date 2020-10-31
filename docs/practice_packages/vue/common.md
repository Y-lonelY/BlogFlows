# Vue Common Packages

**快速索引**

- [CodeMirror](https://codemirror.net/) 代码编辑器
- [Vue Router](https://router.vuejs.org/zh/) Vue 内的路由组件

**Solo with code✨**


## Vue CodeMirror

::: tip
基于 CodeMirror，适用于 Vue 的 Web 代码编辑器
:::

[CodeMirror](https://codemirror.net/)
[Vue-CodeMirror](https://github.com/surmon-china/vue-codemirror)

`npm install vue-codemirror --save` 引入依赖，通过 `import` 相关的插件资源来实现增量功能

一个简单的入门示例：

```vue
<template>
  <div>
    <codemirror v-model="code" :options="cmOptions" />
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/addon/selection/active-line.js'
// vue grammar extension
import 'codemirror/mode/vue/vue.js'
// control theme
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'

const langs = {
  vue: 'text/x-vue',
  js: 'text/javascript'
}

export default {
  components: {
    codemirror
  },
  props: {
    value: {
      type: String,
      default: 'hello world!'
    },
    lang: {
      type: String,
      default: 'vue'
    }
  },
  data () {
    return {
      code: this.value,
      langs,
      cmOptions: {
        tabSize: 2,
        mode: langs[this.lang],
        styleActiveLine: true,
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,
        readOnly: true
      }
    }
  }
}
</script>
```



## Vue Router

::: tip
Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌
:::


通过 `npm install -s vue-router` 安装package

在组件内可以使用

- `this.$route` 访问当前路有对象，在组件生命周期函数内均可以访问
- `this.$router` 访问路由器，可以通过路由器来进行路有控制，控制跳转新路由等，相当于一个Router实例


### Q&A

1. `Navigating to current location is not allowed`

- 原因：导航重复请求，由 vue-router 抛出错误
- 解决：屏蔽这个错误提示，vue-router 升级版本之后，`Router.push()` 改为异步方法，通过重写 `catch` 方法来阻止抛出错误的操作

```js
// 捕获这个错误，但是不再抛出
this.$router.push({
    name: "host",
    query: this.queryData
}).catch(err => {})
```


### 导航守卫

**全局守卫**

从一个路由跳转至一个新的路由，期间会经历一个过程，即已经离开当前路由和即将进入新的路由，这两个过程由vue-router提供的导航守卫来进行控制

- 全局前置守卫，通过 `router.beforeEach((to, from, next) => {})` 进行，对于前置守卫，它可以在适当的时机更改路由，其表现通过 `next()` 函数的传参进行控制，且该方法必须被调用来resolve这个守卫函数，需要重点关注`next()`的表现
- 全局后置守卫，通过 `router.afterEach((to, from) => {})` 进行
- 可以为每个路由单独配置守卫

```js
// statements
const router = new Router({
    routes
});

router.beforeEach((to, from, next) => {
    console.log(to, from);
    // 不进行传参，则表示执行下一个钩子，如果全部钩子函数执行完毕，则导航状态更新为confirmed
    next();
    // 传入一个布尔值，且值为false，会中断当前导航，如果该过程中url发生改变，则重定向为from地址
    next(false);
    // 传入一个Error实例，会使导航终止，且错误会上报给 router.onError()
    next(new Error('error'));
    // 传入一个对象，将其重定向到指定路由，配置参考路由配置
    next({
      path: '/page'
    });
});

router.afterEach((to, from) => {
    console.log(to, from);
});
```

**组件内守卫**

即在组件内可以通过钩子函数监听到路由变化
- 需要显示调用 `next()`
- 在 `beforeRouteEnter` 内，Vue 实例还没有初始化，此时不能直接访问 this，但是可以通过传递回调来兼容
- `beforeRouteLeave` 通常使用场景：禁止用户在还未保存修改行为时突然离开，通过 `next(false)` 来阻止取消路由跳转

```js
export default {
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不能获取组件实例 `this`，因为当守卫执行前，组件实例还没被创建
    next(vm => {
      // 兼容方法，传递回调函数，在实例创建后调用
    }) 
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    next(false)
  }
}
```


### 基本使用

动态路由匹配和嵌套路由的区别：其命中路由相似，但是其意义不同，嵌套路由会在当前路由内渲染子路由，有父子关系

注意区别`this.$route`内的query和params属性：

- params 用于动态路由匹配，例如 `router.push({ name: 'page1', params: { name: 'uuuu' }})` 会命中 /page1/uuuu
- query 为查询参数，通过 `?` 来进行标识，例如 `router.push({ name: 'page1', query: { name: 'rrrr' }})` 会命中 /page1?name=rrrr

通过配置 `redirect` 进行重定向
 
封装一个路由器，其输出为一个Router实例

```js
import Vue from 'vue';
import Router from 'vue-router';
import Page1 from './Page1';
import Page2 from './Page2';
import PageChild from './PageChild';
import PageNull from './PageNull';

// 向Vue内注入Router插件，使其能够在全局范围内被使用
Vue.use(Router);

// 不仅定义了匹配规则，同时也定义了匹配优先级
const routes = [
  // 通过:name进行动态匹配，在组件内通过 `this.$route.params.name` 获取动态参数
  // 此时 /page1 不会命中该路由，直接展示404
  // 通过 name 属性来为路由设置别名
    { path: '/page1/:name', name: 'page1', component: Page1 },
    // children用于匹配子路由，需要在父路有中，添加 <router-view>
    {
        path: '/page2', component: Page2,
        children: [{
          // 匹配到 /page2/child 时会命中
            path: 'child',
            component: PageChild
        }]
    },
    // 通过通配符来匹配前面都没有命中的路由，通常为404页面
    { path: '*', component: PageNull }
];

export const router = new Router({
    routes
});
```

将路由器应用到app内

```js
import Vue from 'vue'
import App from './App.vue'
import { router } from './bootcamp/Router';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```

在了解了路由的匹配声明方式和规则之后，下面继续了解怎么实现路由跳转，可以参考`window.history`特性进行理解，提供四种方法：

- `<router-link to="/page1/uuu">test</router-link>`，通过 router-link 标签来进行路由跳转
- `this.$router.push('/page1/uuu')` 通过路由器实例来进行跳转
- `this.$router.replacereplace('/page1/uuu')` 通过路由器实例来进行跳转，区别于push方法，它会替换当前的路由
- `this.$router.go(-1)` 后退


### 高级特性

你会发现，对于动态路由匹配，在组件内每次都需要去通过 `this.$route.params` 去获取参数，这里提供三种方式对其进行解耦操作，即直接将参数作为props传入组件

- 通过布尔模式进行配置，是否启动props来接受参数
- 对象模式，直接为 `props` 进行赋值，将对象进行传递

```js
const routes = [
    {
        path: '/page2', component: Page2,
        children: [{
            path: 'child/:name',
            component: PageChild,
            // 布尔模式
            // props: true,
            // 对象模式
            // props: { name: 'yyy' },
            // 函数模式
            props: route => {
                // route 为当前路由对象
                return {
                    name: route.params.name
                }
            }
        }]
    },
];

// PageChild
<template>
  <div>
      {{name}}
  </div>
</template>

// 通过 props 来接受 name 参数，比如当路由为 /page2/child/yy 时，其name值为yy
<script lang='ts'>
import Vue from "vue";
export default Vue.extend({
  name: "PageChildren",
  props: ['name'],
});
</script>
```

还有一个很棒的特性，滚动行为记录，这个特性在博客网站内很有帮助，它能够记录你之前访问页面所在的位置，但是这个功能仍有局限性：

- 这个功能只在支持 `history.pushState` 的浏览器中可用
- 第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用

```js
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      // 利用hash模仿锚点位置
      // return to.hash
      return {x: 0, y: 0};
    }
  }
})
```

