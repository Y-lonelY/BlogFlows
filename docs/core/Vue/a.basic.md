# Vue

> 渐进式JavaScript框架


## rules

父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的


## render函数内h代表什么

在通过vue-cli创建的Vue应用内，观察其入口`main.js`，发现一段代码如下：

```js
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```

困惑于其 `h` 在其中指代什么，它扮演着什么角色？

`h`代表hyperscript，代表超文本标记脚本，更具体一点是，代表了生成HTML结构的脚本

你可以理解`h`是 `createElement` 方法的缩写，将其传递至render方法内，来创建相应的DOM元素


## slot

slot(插槽)是vue的一个有趣的特性，它给你提供一种机制来进行内容分发，将组件内包裹的元素挂载起来，并将 `<slot>` 元素作为承载分发内容的出口

slot 的几种使用场景：

- 作为容器承载父组件的分发内容
- 如果父容器内没有任何内容，可以设置slot作为默认值，进行展示
- 通过具名插槽（即为插槽命名）来对指定内容进行分发，通过 `<template v-slot:name>` 指令进行设置，一个不带 name 的 `<slot>` 出口会带有隐含的名字 **default**
- 具名插槽 `v-slot` 可以简写为 `#`，例如 `v-slot:header` 可以简写为 `#header`

```
// SlotParent.vue
<template>
  <div>
      <p>hello</p>
      // 基本用法，用于分发内容
      <SlotChildren>
        <span>hello, {{name}}</span>    
      </SlotChildren>

      // 父组件内无分发内容，slot作为默认值使用
      <SlotChildren></SlotChildren>

      // 具名插槽
      <SlotChildren>
          <template v-slot:title>
              <div>i am the title</div>
          </template>
          <template v-slot:content>
              <div>i am the content</div>
          </template>
      </SlotChildren>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import SlotChildren from './SlotChildren.vue';

export default Vue.extend({
  name: "SlotParent",
  components: {
      SlotChildren
  },
  data() {
    return {
        name: 'yh'
    };
  },
});
</script>

// SlotChildren.vue
<template>
  <div>
      // 基本用法，用来承载父组件分发内容   
      <slot></slot>

      // 作为默认值
      <slot>i am the default</slot>

      // 通过具名插槽获取指定分发内容
      <slot name="title"></slot>
      <slot name="content"></slot>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
export default Vue.extend({
  name: "SlotChildren",
});
</script>
```

了解了slot的基本使用之后，看看一个进阶的slot--作用域插槽，我的理解就是，每个组件都有自己的作用域，现在有一个场景就是：子组件内含有变量A和变量B，当前展示的是变量A，但是此时希望展示变量B，于是父组件需要传入变量B，而这个实现的前提就是父组件能够获取到变量B，作用域插槽的目的就是通过值绑定来将子组件内的值传递给父组件

- 在子组件内，通过 `v-bind` 绑定自定义属性，将需要传递的参数进行绑定
- 父组件内，`v-slot:content="slotProps"` 通过 slotProps 来接受传递的对象，然后将获取变量进行内容分发

```
// 子组件
<template>
  <div>
      <slot name="title"></slot>
      <slot name="content" :message="say">
          1111
      </slot>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
export default Vue.extend({
  name: "SlotChildren",
  data() {
    return {
        say: 'hhhhh'
    };
  },
});
</script>

// 父组件，希望展示子组件内的say值
<template>
  <div>
      <p>hello</p>
      <SlotChildren>
          <template v-slot:title>
              <div>i am the title</div>
          </template>
          // slotProps接受到的是一个对象，其值为 {message: 'hhhhh'}
          <template v-slot:content="slotProps">
              <div>i am the content, {{slotProps.message}}</div>
          </template>
      </SlotChildren>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import SlotChildren from './SlotChildren.vue';

export default Vue.extend({
  name: "SlotParent",
  components: {
      SlotChildren
  },
});
</script>
```


## computed

计算属性可以说是vue最好用的特性之一，可以类比react内的派生state，它可以作为data的getter方法的延伸，即如果一个值依赖data内某一项值，可以利用computed属性，来动态计算其值，设计的初衷是封装复杂的运算

几个注意点：

- 计算属性的结果会被缓存，它所依赖的属性变化才会导致计算属性被重新计算
- 计算属性允许你封装其读取和赋值的具体实现，通过 `get && set` 来进行配置

```vue
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'LifeCircle',
    data: function() {
        return {
            name: 'ylone',
        };
    },
    computed: {
    	// 仅读取
        msg: function() {
            return `${this.name}@@`;
        },
        msg2: {
        	get: function() {
				return `get ${this.name}`
    		},
    		set: function(v) {
    			this.name = v;
    		}
        }
    },
});
</script>
```

## 生命周期

对于生命周期，其全称是生命周期钩子函数，可以理解为在特定的事件内触发的函数

Vue实例从创建到卸载过程，其实例的生命周期通常对应其实例构造过程

- 通常经历的过程：数据观测，event/watcher 事件配置，渲染虚拟dom，替换真实dom，解绑定（移除事件监听器等）
- 通常经历的生命周期：beforeCreate, created, beforeMount, mounted, beforeUpdate, updated, beforeDestory, destoryed
- `data`等属性在beforeCreate生命周期之后可以访问，`this.$el`在mounted生命周期之后可以访问

所有的生命周期钩子自动绑定 this 上下文到实例中，因此你可以访问数据，对属性和方法进行运算，怎么理解呢？

- 通过`function`定义的函数其this在调用时指定，指向其调用者，即当前vue实例（可以类比class类的实例，因为vue是通过自己封装的指令来完成这些操作）
- 这也意味着**不能使用箭头函数来定义一个生命周期方法**，因为箭头函数的this在声明时就进行绑定，此时this为undefined，注意不是window对象

vue实例的生命周期仅作用于当前实例，这意味着，比如 `mounted`, `updated` 时，并不会保证其子组件也挂载或者更新完毕，此时需要通过 `this.$nextTick(function() {})` 来触发当所有组件更新完毕之后的回调

```vue
<template>
    <div class="lifeCircle">
        {{msg}}
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'LifeCircle',
    computed: {
        msg: function() {
            return 'hello';
        }
    },
    // 在实例初始化之后，数据观测和event/watcher事件配置之前被调用
    // 在该生命周期内，无法访问到data,computed等属性，之后的生命周期函数内可以访问
    beforeCreate: function() {
        console.log('beforeCreate', this.$el);
    },
    // 实例创建完成之后立即被调用，此时已经完成了：数据观测，属性和方法的运算，watch/event事件回调
    // 挂载阶段还没开始，$el 属性还不可见，即数据准备好了，但是view还没进行挂载
    created: function() {
        console.log('created', this.$el);
    },
     
    // 挂载开始之前被调用：相关的渲染函数首次被调用，此时还没有创建vm.$el
    beforeMount: function() {
        console.log('beforeMount', this.$el) ;
    },

    // el 被新创建的 vm.$el 替换，挂载成功，即在此生命周期之前，this.$el 为 undefined
    mounted: function() {
        console.log('mounted', this.$el);
        this.$nextTick(function() {
			console.log('all children components re-rendered');
        });
    },
	
	// 当data被修改时，立即进入该生命周期
	// 这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器
    beforeUpdate: function() {
        console.log('beforeUpdate');
    },
	
	// 当前组件重新渲染完毕之后调用该生命周期
    updated: function() {
        console.log('update');
    }
})
</script>
```