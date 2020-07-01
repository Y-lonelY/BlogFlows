<!-- MarkdownTOC -->

- [Vue CodeMirror](#vue-codemirror)
  - [Usage](#usage)
- [ant-design-vue](#ant-design-vue)
  - [实现按需加载](#%E5%AE%9E%E7%8E%B0%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD)
- [Vue Router](#vue-router)
  - [Basic](#basic)
  - [Q&A](#qa)
  - [导航守卫](#%E5%AF%BC%E8%88%AA%E5%AE%88%E5%8D%AB)
  - [基本使用](#%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8)
  - [高级特性](#%E9%AB%98%E7%BA%A7%E7%89%B9%E6%80%A7)
- [VuePress](#vuepress)
  - [Install](#install)
  - [Basics](#basics)
  - [Config](#config)
  - [部署到GitHub Page](#%E9%83%A8%E7%BD%B2%E5%88%B0github-page)

<!-- /MarkdownTOC -->

## Vue CodeMirror

> 基于 CodeMirror，适用于 Vue 的 Web 代码编辑器

[CodeMirror](https://codemirror.net/)
[Vue-CodeMirror](https://github.com/surmon-china/vue-codemirror)

### Usage

`npm install vue-codemirror --save` 引入依赖，通过 `import` 相关的插件资源来实现增量功能

封装成组件进行使用

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


## ant-design-vue

> antv 是基于 Ant Design 设计体系的 Vue UI 组件库，主要用于研发企业级中后台产品

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


## Vue Router

> Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌

### Basic

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
- `this.$router.replace('/page1/uuu')` 通过路由器实例来进行跳转，区别于push方法，它会替换当前的路由
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


## VuePress

> Vue 驱动的静态网站生成器

### Install

[VuePress](https://vuepress.vuejs.org/zh/guide/deploy.html#github-pages)

执行 `sudo npm install -g vuepress` 全局安装 vuepress，这意味着可以在全局使用 vuepress 定义的命令，注意 node 版本保持在v8以上

接着新建一个文件夹，执行 `npm init -y` 来初始化项目，会输出一个 package.json 文件

执行 `mkdir docs` 新建 docs 文件夹，用来存放 .md文件和 .vuepress文件夹

进入 `docs` 目录后，执行 `mkdir .vuepress` 来新建一个 .vuepress 文件夹，用来存放相关配置文件，进入 .vuepress，执行 `touch config.js` 新建一个 config.js 文件，编辑该文件进行相关配置

至此，一个基本的系统搭建完成，接着可以执行 `vuepress dev docs` 相关命令来查看

### Basics

> 静态资源引用

所有的 .md 文件都会被编译成 vue 组件，因此在 .md 文件内尽量使用相对路径来引用静态资源

还有一种解决方案，利用 `~` 关键字来指出这是一个 webpack 模块请求，可以配置别名来利用别名引用静态资源，别名在 config.js 内进行配置

公共文件放在 `.vuepress/public` 内进行引用，比如 icon，pwa 图标等，打包出来之后会放在.vuepress/dist/的根目录

可以配置别名来利用别名引用静态资源，别名在 config.js 内进行配置

```js
module.exports = {
	// 该参数用于合并 webpack 配置
	configureWebpack: {
		// 通过 alias 配置文件目录别名
		resolve: {
			alias: {
				'@alias': 'path/to/some/dir'
			}
		}
	}
}
```

在应用过程中，注意 `base` 参数的使用：

- 如果你的网站会被部署到一个非根路径，你将需要在 .vuepress/config.js 中设置 base，比如部署到 `https://y-lonely.github.io/BlogFlows/` 则 `base` 的值为 `/BlogFlows/`，总是以 / 作为开头和结尾
- 一个 base 路径一旦被设置，它将会自动地作为前缀插入到 .vuepress/config.js 中所有以 / 开始的资源路径中
- 着就会导致在本地打开 dist 内的 index.html 文件，会找不到引用资源，从而导致样式错误，此时需要注释掉 base 参数设置，则可以在本地正确展示 dist/index.html

### Config

package.json 文件配置

```json
{
  "name": "BlogFlows",
  "version": "1.0.0",
  "description": "A Summary",
  "main": "index.js",
  // 自定义脚本
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    // 本地环境启动项目
    "server": "vuepress dev docs",
    // 输出 dist
    "build": "vuepress build docs",
    "docs:build": "vuepress build docs"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/yanGo1221/BlogFlows.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/yanGo1221/BlogFlows/issues"
  },
  "homepage": "https://github.com/yanGo1221/BlogFlows#readme"
}
```

.vuepress/config.js 用于配置主要内容

```js
module.exports = {
	// 页面 title 类似 logo 角色
	title: "LoreFlows",
	description: "Welcome To The Knowledge Palace!",
	head: [
	// logo
		['link', { rel: 'icon', href: '/logo.ico'}]
	],
	// github 仓库名
	base: '/BlogFlows/',
	// 本地运行端口
	port: 7727,
	markdown: {
		lineNumbers: true
	},
	themeConfig: {
		// github 地址
		repo: 'https://github.com/yanGo1221',
		// 标题栏导航
		nav: require('./nav.js'),
		// 文档根目录
		docsDir: 'docs',
		lastUpdated: 'Last Updated',
		sidebar: {
			'/tools/': getToolsSide(),
			// statements
		}
	}
}

function getToolsSide() {
	return [
		'/tools/',
		{
			title: 'Tools',
			collapsable: false,
			children: [
			// 即 /tools/a.babel.md
				'a.babel',
				'b.shell',
				'c.developTools',
				'd.nginx'
			]
		}
	]
}
```

.vuepress/nav.js 用于配置 homepage

```js
module.exports = [{
	text: '核心',
	link: '/core/'
}, {
	// 子菜单
	text: '工程',
	items: [
		{
			text: '项目',
			link: '/project/'
		},
		{
			text: '规范',
			link: '/normalize/'
		}
	]
}];
```

### 部署到GitHub Page

`.vuepress/config.js` 内添加 bash 参数，用来表示 github 仓库名，例如 `base: '/BlogFlows/',`

根目录执行 `touch deploy.sh` 用来添加发布脚本，具体配置如下：

```shell
# !/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:Y-lonelY/BlogFlows.git master:gh-pages

cd -
```

在 `package.json` 内添加相应的执行脚本，`"docs:build": "vuepress build docs"`

接着 `./deploy.sh` 执行脚本，注意在执行脚本之前，通过 `chmod 755 deploy.sh` 为其赋予可执行权限
