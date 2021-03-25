# Vue Advanced

> Vue 内的一些高级特性


## 自定义指令

自定义指令通常用来操控元素，因为某些特性（比如focus）通过Vue并不能够直接控制，需要通过DOM元素进行控制，此时可以通过将指令绑定到对应的元素，从而获取该元素的控制权，并执行响应的方法

自定义指令的结构，通常是指令名和指令配置，可以参考[钩子函数](https://cn.vuejs.org/v2/guide/custom-directive.html#钩子函数)来为其开发更复杂的功能，基本用法如下：

- 自定义指令支持钩子函数，为其勾入一些Vue特性
- 其钩子函数接受的参数，可以按需进行传递

```js
// 全局注册指令，基本格式，名称和配置对象
Vue.directive('focus', {
    inserted: function(el) {
        el.focus();
    },
});

// 简写形式，在bind和update时触发相同的行为，而不关心其他钩子
// 其中binding.value用来承载传值
Vue.directive('focus', function(el, binding) {
	el.focus();
	el.style.backgroundColor = binding.value;
});


// 使用指令v-focus
<input type="text" v-focus='#fff'>
```

## mixins

mixin感觉和装饰器类型，是为了解决代码/功能复用的问题，一个mixin和一个组件的声明类似，在组件内必须通过`mixins: []`来显示调用指定的mixin

- 当minxin和组件内含有同名属性时，组件优先级高于mixin内属性
- 执行时，会优先执行mixin内的声明周期函数
- mixin可以全局注册，一旦全局注册，则所有的Vue实例都会混入该mixin

其基本使用，建立一个文件，export一个类似组件声明的对象，在需要用到的组件内使用`mixins:[]`来进行承载

需要注意，Vue内 `extends` 和 `mixins` 都是用来扩展组件的钩子，区别在于：

- mixins 传参为一个数组
- 执行优先级：extends > mixins > 组件本身钩子


```js
// mixinTest.js 文件
export let mixinTest = {
    created() {
        this.hello();
    },
    methods: {
        hello() {
            console.log('hello');
        }
    }
};

// 在组件内使用
<script lang='ts'>
import Vue from "vue";
import { mixinTest } from "../Plugins/mixinTest";

export default Vue.extend({
  name: "SlotParent",
  mixins: [mixinTest],
});
</script>
```


## vue plugins

vue plugin机制，类似koa2的中间件，使插件在项目内使用变得更加简单，包括自定义插件和第三方插件

在Vue内自定义插件，通过有以下几种途径：

- 通过原型链继承，即将方法挂载至Vue.prototype上，在Vue实例内通过this进行访问
- 直接将方法挂载至Vue对象上，因为Vue可以看作是一种特定类型的对象，即`Vue.prototype.__proto__ === Object.prototype`，所以可以直接为其添加方法和属性，然后通过Vue进行访问
- 利用Vue本身特性，通过全局自定义指令来声明方法
- 利用Vue本身特性，通过全局mixin来为每个组件添加方法和属性

```vue
// 自定义一个插件
let TestPlugins = {};

TestPlugins.install = function(Vue, options) {
	// 通过原型链继承，其所有的Vue实例可以共享方法，在实例内通过this进行访问，例如 `this.$test()`
    Vue.prototype.$test = function() {
        console.log('testing...');
        console.log(options);
        return 'test successed';
    }

    // 将方法挂载至Vue对象，添加全局的属性或者方法，直接通过Vue对象进行访问，例如 `Vue.globalTest()`
	Vue.globalTest = function() {
		console.log('global test function');
	}
}

export default TestPlugins;
```

将自定义的插件，注册到Vue命名空间上，我理解`Vue.use(TestPlugin, {name: 'test'})`实际上是对 `TestPlugin.install(new Vue(), {name: 'test'})`函数过程的一个封装

```vue
// 在生成Vue实例之前，通过 `Vue.use()` 方法来将其进行注册
// main.js
import Vue from 'vue'
import App from './App.vue'
import TestPlugin from './bootcamp/Plugins/Test';

Vue.config.productionTip = false

Vue.use(TestPlugin, {name: 'test'});

new Vue({
  render: h => h(App),
}).$mount('#app')
```
