<!-- MarkdownTOC -->

- [Vuex](#vuex)
  - [store](#store)
  - [state-mapState](#state-mapstate)
  - [getters-mapGetters](#getters-mapgetters)
  - [mutations-mapMutations](#mutations-mapmutations)
  - [actions-mapActions](#actions-mapactions)
  - [module](#module)

<!-- /MarkdownTOC -->

# Vuex

在设计思路上，Vuex和Redux并无太大区别，只不过它是一个专门为Vue应用开发的**状态管理模式**，它同样采用单向数据流：

- state，驱动应用的数据源
- view，以声明的方式将state映射到视图
- actions，响应在view上用户触发事件导致state发生改变

将组件的共享状态抽离到出来，以一个全局单例模式进行管理，下面介绍Vuex内比较重要的几个概念

- state, getters 数据源，在组件内`computed`内进行映射
- mutations, actions 事件，在组件内`methods`内进行映射

## store

首先声明一个容器，即store来存储相关的数据，如下

```js
// store/index.js
import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

var store = new Vuex.Store({
    state: {
        list: [1,2,3]
    },
    actions: {
    	delayAdd({ commit }, obj) {
    		commit('increments', obj.payload)
    	}
    },
    mutations: {
		increments(state, payload) {
    		// 在这里直接变更 state，不需要return
    		state.list.concat(payload.list);
    	}
    },
    getters: {
        item: state => {
            return state.list.find(item => item > 1);
        }
    },
    modules: {

    }
});

export default store;
```

之后，在声明Vue实例时，将store挂载到Vue的响应式系统内，之后可以通过 `this.$store` 来访问到store对象

```js
import Vue from 'vue'
import App from './App.vue'
import store from './store';

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
```


## state-mapState

state 不用多说，是一个对象，view通过其进行渲染，actions触发改变它，是store实现的基础，更重要的问题是，在组件内如何获取state呢？

在redux内，通过`mapStateToProps`来将store的state映射到props上，之后可以通过`this.props`来访问state

在Vuex内，也有类似的方法，即`mapState`来访问state，mapState作为一个方法，传参可以接受数组和对象，返回一个对象，因此可以使用三点运算符来将其展开

```js
// demo.vue
// statement
<script>
import Vue from "vue";
import { mapState } from 'vuex';

export default Vue.extend({
  name: "VuexTest",
  computed: {
      ...mapState({
      	  // 通过箭头函数返回
          list: state => state.list,
          // 通过字符串指定，等同于state.count
          // 如果使用数组，实际上就是一个字符串数组，用来简化这种获取state的形式
          count: 'count',
          // 如果需要使用当前this，则需要使用常规函数
          newCount(state) {
          	return state.count + this.count;
          }
      })
  },
});
</script>
```

除了mapState方法之外，还可以通过 `this.$store.state` 方法来访问当前state，一般不推荐


## getters-mapGetters

getter 可以看作是在store内对state逻辑处理的封装

思考一个场景：state内有一个列表，然后每次组件内获取这个列表之后都需要对其进行筛选，来过滤掉某些字段，且这样的组件有多个，基本解决是在多个组件内获取state的数据，然后调用公用的方法来处理这份数据，基于这种思路Vuex提供了针对派生state的的解决方法，即利用getter来封装state内数据的处理逻辑

getter可以看作是处理后的state，也是一份数据，在组件内可以通过`mapGetters`来进行获取，与`mapState`不同的是：当其传参为对象时，value不能是一个函数

```js
// demo.vue
// statement
<script>
import Vue from "vue";
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: "VuexTest",
  computed: {
      ...mapGetters({
          item: 'item'
      }),
  },
});
</script>
```

除了mapGetters方法来获取getters值之外，还可以通过 `this.$store.getters`来获取

针对上面的场景，可以将gettters封装成一个方法，而不仅仅是一个值，来进行访问，如下：

```js
// statement
var store = new Vuex.Store({
    state: {
        list: [1,2,3]
    },
    getters: {
        details: (state) => (target) => {
            return state.list.find(item => item === target);
        }
    },
});
```

## mutations-mapMutations

思考一些redux内reducer的用法，`Reducer(currentState, action) -> newState`，其中action为一个对象，可以保存type和data，通过 `store.dispatch(action)` 来触发reducer

Vuex的 mutation 在某种程度上和 reducer 类似，先看看其声明方式：

- 键名对应 type，在 commit 方法内调用
- payload 对应额外传参
- 通过 function，返回一个新的 state
- commit 方法对应 dispatch

```js
var store = new Vuex.Store({
    state: {
        list: [1,2,3]
    },
    mutations: {
    	increments(state, payload) {
    		// 在这里直接变更 state，不需要return
    		state.list.concat(payload.list);
    	}
    },
});

store.commit({
	type: 'increments',
	data: {}
});
```

注意，mutation必须是同步函数，因为如果是异步函数，则不知在何时对其状态进行响应（即回调函数何时被调用），这部分和reducer的规则一样：

- 不要直接修改state，修改其拷贝
- 不要调用 `Date(), Math.random()` 等非纯函数
- 不要做副作用的操作，比如api请求等

继续思考一个问题，在组件内如何使用 mutation?

可以通过 `mapMutations` 辅助函数来映射methods到mutations的关系，

```vue
<script>
import Vue from "vue";
import { mapState, mapMutations } from 'vuex';

export default Vue.extend({
  name: "VuexTest",
  computed: {
      ...mapState({
          list: state => state.list,
      }),
  },
  methods: {
    ...mapMutations({
      // 实际上映射成 this.$store.commit('add')	
      add: 'add'
    })
  },
});
</script>
```

## actions-mapActions

Vuex 内也提出了 action 的概念，但是不同于 redux，它的出现主要是为了解决在 mutation 不能执行的异步问题

- Action 提交的是 mutation，而不是直接变更 state，这意味着**不能再 action 内直接使用 state**，可以通过 `context` 进行取值
- Action 可以包含任意的异步操作

在 store 内新建一个actions

```js
var store = new Vuex.Store({
  state: {
    list: [1, 2, 3]
  },
  // 通过es6语法直接获取commit方法，可以传递其他值，用obj进行承接
  actions: {
    delayAdd({ commit }, obj) {
      setTimeout(function() {
        // mutuactions 通过 commit 来进行调用
        commit("clear")
      }, obj.time)
    },
    // 多层异步事件嵌套情况
    async actionB ({ dispatch, commit }) {
      // 等待 actionA 完成，action 通过 dispatch 来进行调用
	    await dispatch('actionA')
	    commit('gotOtherData', await getOtherData())
	 }
  },
  mutations: {
    add(state, payload) {
      state.list = state.list.concat(payload.list)
    },
    clear(state) {
        state.list = []
    }
  },
});
```

在组件内使用，通常通过`mapActions`来进行映射，也可以通过`this.$store.dispatch('delayAdd')`来执行

```vue
<script>
import Vue from "vue"
import { mapState, mapActions } from "vuex"

export default Vue.extend({
  name: "VuexTest",
  computed: {
    ...mapState({
      list: state => state.list
    })
  },
  methods: {
    ...mapActions({
      delayAdd: 'delayAdd'
    })
  }
})
</script>
```


## module

模块化是为了解决数据或者业务复杂的场景，Vuex通过module允许我们将store进行切分，每个module拥有自己的state,getters,actions,mutations

一个简单的例子：注意 `namespaced` 的使用，如果设置为 true，则相当于添加 `moduleName: { ...module content }`，为模块设置了一个命名空间，将其内容放在该命名空间下

先看看 `module` 在store.js内的应用

```js
// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import topology from './topologyModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    "topology": topology
  },
  // statements
})

export default store
```

接着写入一个module.js

```js
// module.js
export default {
  namespaced: true,
  state: {
    // 原始数据
    data: {
      nodes: [],
      edges: []
    },
  },
  mutations: {
    // payload 为传参
    setTopologyData (state, { data }) {
      state.data = Object.assign({}, data)
    },
  }
}
```

最后，解决在组件内引用问题

```vue
<script>
import { mapState, mapMutations } from "vuex"

export default {
  name: "TopologyDetails",
  computed: {
    // 第一种写法, state/moduleName/state
    ...mapState({
      currentNode: state => state.topology.data,
    }),
    // 第二种写法，先配置好路径，再引用 state
    ...mapState('topology', {
      currentNode: state => state.data,
    }),
  methods: {
    ...mapMutations('topology', {
      setTopologyData: 'setTopologyData'
    })
  }
}
</script>
```



