<!-- MarkdownTOC levels="2,3" -->

- [Basic](#basic)
    - [Store](#store)
    - [State](#state)
    - [Action](#action)
    - [Reducer](#reducer)
    - [Redux Work Flow](#redux-work-flow)
    - [Middleware](#middleware)
- [React-Redux](#react-redux)
    - [Store 传递](#store-%E4%BC%A0%E9%80%92)
    - [Connect](#connect)
    - [Instance](#instance)

<!-- /MarkdownTOC -->

## Basic

Redux 不局限于使用，它可以在任何框架内使用，它的出现主要是为了解决**多交互，多数据源下的代码结构和组件通信**

从组件角度看:

- 某个组件的状态，需要共享
- 某个状态需要在任何地方能够拿到，即一个全局状态
- 一个组件可以改变全局状态
- 一个组件需要改变另一个组件的状态

之前用react的props来实现通信，父组件向子组件通信方便，但是兄弟组件和子组件向父组件通信的话，前者需要提升状态至其公共父组件，后者需要声明一些额外的函数，不是很优雅

Redux 的设计思路：

- Web 应用就是一个状态机(store)，视图(view)和状态(state)一一对应
- 所有的状态都保存在一个对象内
- 用户在视图层产生交互事件，触发actions，导致store的state发生变化，从而引起视图的更新

### Store

可以看成一个容器，用来保存数据，整个应用只能有一个 Store，它通过 `createStore()` 方法进行创建，它可以接受的参数：

- Reducer，响应数据变化
- defaultState
- applyMiddleware()

Store 的职责：

1. 维持应用的 state
2. 提供 `Store.getState()` 来获取 state
3. 提供 `Store.dispatch(action)` 来通知 reducer 根据 action 更新 state，是 View 发出 Action 的唯一方式
4. 通过 `subscribe(listener)` 来注册监听器和通过其返回函数销毁监听器，表示一旦 state 发生变化，立即调用监听函数，在 React 项目中，只要把 `render()` 或者 `setState()` 方法放入监听函数中，就可以实现 View 的自动渲染

### State

> "建议你尽可能地把 state 范式化，不存在嵌套。把所有数据放到一个对象里，每个数据以 ID 为主键，不同实体或列表间通过 ID 相互引用数据"

State 可以看作是对 Store 对象内某个时间点的数据的一次快照，一个应用只有一个 Store，只要 state 相同则可以判定其视图相同


### Action

**Action仅仅用来描述有事情发生这一事实，并不会更新 state**

一般来说，用户接触不到 Store，自然也无法改变它，用户接触到的是视图，所以改变 Store 内 state 是用户通过视图发起的，而这个过程的媒介就是 Action

Action 就是 View 发起的通知，来通知 state 需要变化

Action 是一个对象，`type` 属性为必需属性，用来表示 Action 名字

只有两个对象完全相同时，则两个 Action 才相等，否则为独立的 Action，因此随着传递信息的不同，会产生很多个 Action，这时需要封装一个函数来作为 Action Creater(即 Action 生成器，用来简化代码结构)


### Reducer

Store 收到一个新的 Action 后，通过 Reducer 进行相应的计算，返回一个新的 state

Reducer 可以简单表示为 `Reducer(currentState, action) -> newState`，它是一个纯函数(即输入相同，则输出一定相同)，接受 Action 和 当前 State 作为参数，返回一个新的 State

在实际应用中，Reducer 不用手动调用，在生成 Store 实例时，将其作为参数传入，之后每当 `store.dispatch(action)` 传递来一个新的 action 时，就会自动调用 Reducer

**reducer 一定要保持纯净**，可以理解为：只要传入参数相同，返回计算得到的下一个 state 就一定相同，没有特殊情况、没有副作用、没有 API 请求、没有变量修改，单纯执行计算，因此，在 reducer 一定不可以：

- 修改传入参数 state，可以利用 `Object.assign({}, state)` 来进行拷贝，也可以使用展开运算符进行拷贝
- 执行有副作用的操作，比如 API请求和路由跳转
- 调用非纯函数，比如 `Date.now()`，`Math.random()` 等
- 一定要返回 state，如果遇到未知的 action，可以直接返回旧的 state


### Redux Work Flow

了解以上几点概念之后，可以对 redux 的工作流程做一个梳理：

1. 用户在 React Components 通过视图层发出 Action，即 `dispatch(action)`
2. Store 接受到 Action 之后调用 Reducer，向其传递 state 和 action 参数，并且接收 Reducer 返回的新 State
3. State 一旦发生变化，就会调用 `subscribe(listener)` 监听函数，listener 通过 `getState()` 获得当前的 State，再利用 React 的 setState() 来重新渲染

### Middleware

中间件就是一个函数，对 `store.dispatch(action)` 进行改造，在发出 Action 和执行 Reducer 之间，添加其他功能

在 Redux 中，在创建 Store 时，通过传递 `applyMiddleware(middleware1,...)` 参数来引入中间件

注意：中间件的引入也需要注意顺序


## React-Redux

### Store 传递

要使每个组件都能够获取到 Store

1. 第一种办法，将 store 作为 props 属性传递到每一个被 `connect()` 包装的组件内
2. 更加推荐的做法，是通过 `<Provider store={store}>` 组件来包裹根组件

方法2的原理是将 Store 挂载到 React 组件的 context 属性上，所以可以通过 `const { store } = this.context` 来获取 store 对象


### Connect

`Connect()` 用来连接 React 组件和 Redux Store，连接操作不会更改原来组件，返回值为一个新的与 Redux Store 连接的组件类

作用是将视图组件转换为容器组件，作为容器组件，其需要定义输入和输出：
1. 输入逻辑：外部数据（即 state 对象）如何转换为视图组件的参数
2. 输出逻辑：用户动作如何转变为 Action，从视图组件传出

#### mapStateToProps

mapStateToProps 参数负责输入逻辑，本质是一个函数，输入为 state，输出为 state 对象到当前组件 props 对象的映射关系，返回值是一个对象，每一个键值对都表示一组映射

mapStateToProps 第一个形参一定是 state，但是其还可以接受 `ownProps`，其代表容器组件的 props 对象，使用 ownprops 作为参数后，如果容器组件的参数发生变化时，也会引发 视图组件的重新渲染

mapStateToProps 不是必需的，如果不传，则表示 Store 的更新不会引起当前视图组件的更新

#### mapDispatchToProps

mapDispatchToProps 负责输出逻辑，用来建立视图组件参数到 `store.dispatch()` 方法的映射，它可以是一个函数，也可以是一个对象

作为函数，接受 `dispatch` 和 `ownProps` 作为形参，返回值是一个对象，每个键值对都是一个映射，定义视图组件的参数怎样发出 Action

更多的用法是作为对象，其键名（比如 xxx）对应视图组件的同名属性名（对应 `this.props.xxx`），其键值为一个 Action Creator，是一个函数


### Instance

`store.js`，用来生成 store 实例，添加中间件和集成 reducer

```javascript
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import * as dashBoard from '@/store/dashBoard/reducer';

let store = createStore(
    combineReducers({...dashBoard}),
    applyMiddleware(thunk)
);

export default store;
```

`actionType.js`，用来规定一些 types

```javascript
const dailyCharts: string = 'DAILYCHARTS';
export {dailyCharts};
```

`dashBoard/reducer.js`，DashBoard 模块的 reducer，用来根据action，返回新的 state

```javascript
import * as Type from './actionType';

// default
let defaultState = {
    dailyList: [],
    sumMap: {},
};

export const dashBoardData = (state = defaultState, action = {}) => {
    switch(action.type) {
        case Type.dailyCharts:
            return {...state, ...{
                dailyList: action.dailyList,
                sumMap: action.sumMap
            }};
        default:
            return state;
    }
}
```

`dashBoard/action.js`，action genertor，action 生成器，用来返回 action

```javascript
import * as Type from '@/store/dashBoard/actionType';

const changeChart = (dailyList, sumMap) => {
    return {
        type: Type.dailyCharts,
        dailyList,
        sumMap,
    }
}

export { changeChart };
```

`dailyView.jsx`，state 在组件内的使用

```javascript
import { connect } from 'react-redux';
import { changeChart } from '../../store/dashBoard/action';
// statements
export default connect(state => ({
    dashBoardData: state.dashBoardData
}), {
    changeChart
})(DailyView);
```
