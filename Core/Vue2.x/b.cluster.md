### warning

托管到 github 上会自动忽略 node_modules 文件

可以在 clone 之后在当前目录（package.json）文件下，通过 `npm install` 来初始化 node_modules 文件夹

通过 `vue ui` 生成 GUI 来导入项目，需要先进入到指定文件下，再执行命令

### pieces

注意对于 Boolean 值类型，需要通过 `v-bind 或者 :` 让其作为 JavaScript 表达式计算

#### framework

- build (webpack构建脚本目录)
	 - build.js (生产环境构建脚本)
	 - check-versions.js (检查node和npm版本)
	 - utils.js (构建的共用工具类)
	 - vue-loader.conf.js (css加载器配置)
	 - webpack.base.conf.js (webpack基础配置)
	 - webpack.dev.conf.js (webpack开发环境配置)
	 - webpack.prod.conf.js (webpack生产环境配置)
	 - webpack.test.conf.js (webpack单元测试配置)
	 - logo.png
- config (vue项目配置)
	 - dev.env.js (项目开发环境配置)
 	 - index.js (项目路径，端口等基本配置)
 	 - prod.env.js (项目生产环境配置)
	 - text.env.js (项目测试环境配置)
- dist (经过编译后生成文件的存放路径)
	 - static
	 	 - css
	 	 - js 
	 - index.html (项目入口文件)	
- node_modules (基本依赖)
	 - something about babel (airbnb-babel-cli相关文件)
- src
	- api (业务相关的 axios 请求)
		- mock (存放虚拟数据)
		 - index (mock.js 数据闸口)
		- ... (具体业务的 axios 请求) 
	- assets (静态资源，样式，图片等)
	- components (项目公共组件)
	 - some folders corresponding to view/modules (📍 自定义文件夹，与view内的文件夹对应) 
	- router (配置项目路由)
	- utils (一些公共方法，例如表单验证，axios 拦截器等)
	- App.vue (根组件)
	- main.js (入口文件，定义全局引用及配置)
	- view (📍 自定义文件夹，对页面进行基础布局)
	 - some modules (各个模块文件夹)
- static (静态资源且不会被webpack构建)
- test
- .babelrc (配置babel编译模板) 
- .editorconfig
- .eslintignore
- .eslintrc.js
- .gitignore
- .postcssrc.js
- index.html (项目入口文件)
- package.json (项目相关信息，包括npm脚本, 安装依赖信息)
- README.md (项目介绍)

### router

#### main.js

 - `main.js` 内通过 `import router from './router'` 引进 `router` 实例

 - 通过 `new Vue({ router })` 在根组件内注入路由，使整个应用都有路由功能

#### router/index.js

一个基本的路由实例
	
	// 引入 Vue 和 Vue-router 实例
	import Vue from 'vue';
	import Router from 'vue-router';
	// 引入 路由组件（即跳转页面）
	import home from '../view/home.vue';
	// 通过全局方法 Vue.sue() 使用路由插件
	Vue.use(Router)
	// 配置系统路由
	const routes = [
	    {
	      path: '/', // 路由路径
	      name: 'home', // 路由名称
	      component: home // 路由视图组件
	    }
	  ];
	// 实例化一个路由对象，并传入相关配置
	const router = new Router({ routes });
	// 输出实例化的路由对象
	export default router;

### Mock

#### npm install mockjs --save-dev

在工程内安装 mock.js 依赖

#### 使用 mock 拦截请求并生成数据

**/mock/index.js**

	import Mock from 'mockjs';
	import { test } from './mock.test.js';
		
	function addMock(list) {
	  list.forEach(n => {
	    Mock.mock(n.path, n.data)
	  })
	}
		
	addMock(test);
		
	export default Mock;

**mock.test.js**

模拟数据

	export const test = [
	  {
	    path: '/test',
	    data: {
	      "object|2-4": {
	        "110000": "北京市",
	        "120000": "天津市",
	        "130000": "河北省",
	        "140000": "山西省"
	      }
	    },
	  },
	];

最后在 `main.js` 内 `import mock from './api/mock';` 即可对 `url:'/test'` 的请求进行拦截


### Q&S

#### vue:command not found

**Cause**

npm 的全局路径和环境变量不匹配或者 node_modules 的路径未设置

**Solution**

 - `npm root -g` 查看 npm 的全局路径是否正确，我设置的为 `C:\Program Files\Git\usr\local\node\lib\node_modules`

 - 如果不是上述路径，可以通过 `npm config set prefix /usr/local/node/lib/node_modules` 重定向 npm 全局路径为指定路径，在命令之前需要先创建相应的文件夹

 - 接着修改 $PATH 环境变量，打开 `C:\Program Files\Git\etc\profile`

 - 修改文件内容，加上

```shell
PATH=$PATH:/usr/local/node
export PATH
```

 - `source /etc/profile` 使当前配置立即生效

 - `echo $PATH` 可以查看当前环境变量

 - 最后，将 `C:\Users\dell\AppData\Roaming\npm` 目录下的 `node_modules` 以及同目录下 `vue`, `vue.cmd`, `vue-init`, `vue-init.cmd`, `vue-list`, `vue-list.cmd` 拷贝至新指定的文件夹下即可

#### Failed to load resource

**Sight**

通过 `npm run build` 生成项目之后，直接点击 `index.html` 浏览器中无任何渲染

**Cause**

创建的文件需要放在服务器上，直接通过浏览器打开文件不生效

**Solution**

修改 `index.js` -> `build` -> `assetsPublicPath: '/'` 为 `assetsPublicPath: './'`

#### sass in Vue-cli

**Solution**

 - `npm install node-sass --save-dev`

 - `npm insatll sass-loader --save-dev`

 - 打开 `build/webpack.base.conf.js`, 添加 `{ test: /\.scss$/, loader: ['style', 'css', 'sass'] },`

 - .vue 内 `<style rel="stylesheet/scss" lang="scss" scoped>`

#### busEvent in Vue-cli

 - 在入口文件 `main.js` 内声明 `Bus`，注意不要直接 `const Bus = new Vue()` 而应该在 `new Vue({data: {Bus: new Vue(),}})` 内声明，否则 `this.$root.Bus.$emit` 会找不到 emit 方法

 - 在A组件内触发事件 `..method: { a() {this.$root.Bus.$emit('searchNode', this.inputValue);}}`

 - 在B组件内接受数据 `created() {this.$root.Bus.$on('searchNode', (value) => {...})}`，注意使用箭头函数，`function(value){...}` 会获取不到期望的 `this` 值

 - 在B组件内解除事件绑定 `beforeDestroy() {this.$root.Bus.$off('searchNode');}`