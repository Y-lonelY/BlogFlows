<!-- MarkdownTOC -->

- [谈谈Vue和React](#%E8%B0%88%E8%B0%88vue%E5%92%8Creact)
	- [一些背景](#%E4%B8%80%E4%BA%9B%E8%83%8C%E6%99%AF)
	- [性能优化](#%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96)
	- [状态管理模式](#%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E6%A8%A1%E5%BC%8F)
	- [插槽内容分发](#%E6%8F%92%E6%A7%BD%E5%86%85%E5%AE%B9%E5%88%86%E5%8F%91)
	- [生命周期](#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
	- [派生数据](#%E6%B4%BE%E7%94%9F%E6%95%B0%E6%8D%AE)

<!-- /MarkdownTOC -->


# 谈谈Vue和React

## 一些背景

2019年11月左右，开始开发和维护Growth项目，项目基于react进行开发，同时兼顾一些面试的事情，随着面试的进行，开始关注react的一些特性和更深一层的东西，面试过程中会经常碰到一个问题：说说react和vue的区别

下面是面试时的一些理解和回答，现在看来的感觉就是，将其理解成了一套生搬硬套的东西，在实际开发过程中没有去主动关注它

```
首先说说相同点：

- MVVM
- 组件化思想
- 虚拟dom

不同点：

- 状态管理不同，Vue 对每个数据进行动态绑定，可以通过直接赋值来触发更新，而React是单向数据流，需要显式调用 `setState()` 来触发组件更新
- 响应机制不同，React 是通过 diff 算法来进行遍历比较，Vue 则是通过数据绑定来实现响应，当处理大型应用或者复杂场景时，Vue会因此带来性能问题
- React 组件是通过class或者 react hook，而 vue 则是通过声明式来创建组件的
- 模版引擎不同，react 是JSX语法来渲染dom，Vue是通过 template 来实现，前者可以直接使用原生JavaScript的语法，后者需要通过指令来实现`v-if`，会显得有点奇怪
```

基于此，在2020-1-1开始的vue重新学习和整理过程中，我会留意这一点，逐步完善对两种框架的比较


## 性能优化

组件性能优化：

- React内通过`shouldComponentUpdate & pureComponent`来控制组件是否重新渲染
- Vue内已经存在组件优化策略，相当于每个组件都添加了shouldComponentUpdate生命周期钩子，值得一提的是，Vue提供`v-once`指令，用于控制Node是否需要重新渲染

## 状态管理模式

实际上就是Vuex和Redux的区别，整体感受是，Vuex将Vue的数据双向绑定重新改造成单向数据流（Vuex更像是全局作用域内的数据双向绑定，这么说的原因是，当设置list.length = 0时，并不能触发view更新）

- store在组件内的映射方式不同，Redux内使用`connect() & mapStateToProps & mapDispatchToprops`来将state和actions进行映射，Vuex使用的是辅助函数`mapState & mapActions` 等来将其映射到Vue的配置中
- Vuex相比Redux，更进一步，将一些公共数据处理的逻辑封装到`getters`内，使用`actions`来支持异步操作
- Redux内actions用来返回带type和data的对象，在reducer内根据type进行state更新，Vuex在mutation内进行state更新，actions可以看作高阶mutation，用来支持异步操作
- reducer内对原state进行拷贝，并且返回一个新的对象，而Vuex则在mutations内直接更改state

## 插槽内容分发

记住，无论是vue还是react，其组件内包裹内容必须通过一种机制来进行承接，作为内容输出出口，否则，组件内的内容会被丢弃掉

- 在vue内，通过[slot机制](../Core/Vue2.x/a.basic.html#slot)来实现内容分发
- 在react内，通过**this.props.children机制**来实现内容分发

对于vue中的具名插槽，在react中可以通过props来实现，即将模版进行传递，相较于vue的插槽，react更加灵活，因为其本质还是props对象，而不需要像vue引入新的指令来实现插槽特性


## 生命周期

> 生命周期是响应机制不同的具体体现

在学习vue官方文档时，看到其生命周期的章节，很直观地感受到[React生命周期](../Core/React/a.basic.html#组件的生命周期)和[Vue生命周期](../Core/Vue2.x/a.basic.html#生命周期)的区别

生命周期的概念得益于框架对MVVM模型的实践，在这个过程中，每个实例被创建都需要经历一系列的初始化过程：初始化数据，编译模版，将实例挂载至DOM并且在数据改变时更新DOM，实例卸载等。但是由于React和Vue对于数据变化的处理方式的区别，其生命周期也产生了区别，具体可以体现在：

- React 的生命周期函数体现在class或者react hook内，贴近原生JavaScript，当使用组件时，实际上是使用其类的实例，所以对于生命周期函数，不必过分考虑this的问题，但是在Vue内，因为组件的声明方式更像是传入一个配置对象，所以其生命周期函数必须通过 `function` 来声明，一般不能通过箭头函数（箭头函数内this为undefined）声明，如果非要使用箭头函数，可以将实例作为参数传入
- 对于Vue来说，其从初始化一个Vue实例作为起点，所以在不同的生命周期内会有不同数据的访问权限，例如在beforeCreate内无法访问到data等数据属性，在mounted之前无法获得element元素，但是对于React，将使用一个组件作为起点，其生命周期内均有对state的访问权限

## 派生数据

对于react的state，如果其中某一项值依赖props或者state，通常通过函数方法来动态更新其值，形成动态绑定的效果，但是在vue内，其本身就实现了一些特性来封装复杂的数据处理逻辑，比如computed，watch，注意其也可以通过函数来实现派生的效果



