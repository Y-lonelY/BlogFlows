# React Hook

> 它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性


## Why?

在之前版本，只有通过 `class` 关键字声明的组件才能够使用 state 等 react 特性，通过函数声明的组件通过常常用来渲染简单的 `react dom`

React Hook 的出现就是为了解决这一现状, **最直接的优点就如 Ryan 所说：减少了大量重复代码**

在使用过程中，通过 class 来创建组件的劣势慢慢显露出来，主要表现在：

1. **在组件之间复用状态逻辑很难**，即不同组件之间需要用到同一个 state 及其处理方法
2. **复杂组件变得难以理解**，即不同的生命周期函数（同一个方法）内需要执行多个任务，
比如监听事件，获取数据等，此时又无法再将组件进行更小粒度的拆分
3. **class 本身难以理解**，主要是关于 this 的概念，它是复用父类的this，并在此基础上进行改写
4. 对于 TypeScript 更加友好

基于此，使用 react hook 来改变这一状态


## Trivia

Hook 是一个特殊的函数，它可以让你“钩入” React 的特性，也就是说，可以让本身不具备 state 属性的函数组件，能够使用 state 等 react 特性

`useState` 和 `useEffect` 之所以能够在单个组件内多次使用，是因为 React 保证 HooK 的调用顺序在每次渲染中是相同的，如果通过判断语句等来调用 HooK，则会引起 HooK 不能按照顺序执行，从而引起 bug，因此 React Hook 方法放在函数作用域的最外层

自定义 Hook 更像是一种约定而不是功能，在 React 内，如果一个函数以 `use` 开头并调用其他 React Hook，其就是一个自定义 hook

**使用原则**

- 仅在 **函数最外层** 使用 Hook，不要在循环，条件和嵌套函数内调用 Hook
- 仅在 **函数组件** 内调用 Hook



## useEffect

如何在 `useEffect` 内发起一个异步请求？

```typescript
	/**
	 * 查询数据的写法
	 * 通过设置 ignore 保证在组件卸载后，不会再重新设置组件状态，通过 return 一个清理函数来实现
	 * 仅当 query 发生变化时，才会重新调用该 useEffect
	 */
	useEffect(() => {
		let ignore = false;
    (async () => {
      const result = await axios('https://hn.algolia.com/api/v1/search?query=' + query);
	    if (!ignore) setCount(result.count);
    })()
	    return function cleanup() { ignore = true; }
	}, [query]);
```

这里通过局部变量 `ignore` 来处理：<b>异步请求返回结果前，组件已经销毁了</b>的场景。当组件已经销毁了，我们不应该继续使用 `useState` 方法来继续为其赋值（没啥大的影响，但是会有 warning 信息）。此时通过一个局部变量来进行标记，当组件卸载后不再执行后续步骤。



## useState

> 用来解决在函数组件内使用 state 特性的问题

**知识要点**

1. 一般来说，函数执行完毕，其作用域内的变量等会被回收掉，但是通过 `useState` 设置的变量会被 React 保留

2. 可以这么读：向 `useState()` 内传入一个参数作为初始化数据，其会返回两个参数: state 和 setState，即当前的 state 和改变它的方法

3. 不像 class 中的 `this.setState`，**更新 state 变量总是替换它而不是合并它**

```js
import React, { useState, useEffect } from 'react';

interface Data {
	name: string;
	age: number;
}

// 这里结合 typescript 来使用
function Test() {
	const [data, setData] = useState<Data>({
		name: '',
		age: 17
	});

	/**
	 * 和 class 的 `setState()` 方法不同
	 * 通过 hook 来更新 state 是直接替换，而 `setState()` 是合并操作
	 * 这意味着 setData 时要传入完整的 state
	 */
	useEffect(() => {
		const { age } = data;
		setData({
			...data,
			age: age + 1
		});
	}, []);
}
```

---

我们接下来来讨论，`useState` 一些特性带来的"麻烦"

 React 在设计时出于性能的考虑，将多个状态的改变放在一个队列内，争取只重绘一次就能够解决问题。这样子就意味着，`useState` 本身是异步的，直接表现就是，当你调用 `setState` 方法之后，立即读取 `state` 仍为旧值，即读取不同步。

看下面一个例子：

```typescript
const [timer, setTimer] = useState<number>(0)

function handleTimer() {
  const v = setTimeout(() => {}, 0)
  setTimer(v)
}

useEffect(() => {
  return function cleanup() {
    // 仍为 0
    clearTimeout(timer)
  }
}, [])

```

在上面的例子中，**并不能清除当前的定时器任务**，原因在于：timer 是 useState 的一个返回，读的是旧值，写的是新值，不是同一个值（即不同引用）。

要解决这个问题，我们可以设置一个局部变量来保持同一引用，或者可以尝试一些更 React 的方式，使用 useRef 来保持其实例引用：

```typescript
const timer = useRef(0)

function handleTimer() {
  timer.current = setTimeout(() => {}, 0)
}

useEffect(() => {
  return function cleanup() {
    // correct!
    clearTimeout(timer.current)
  }
}, [])
```





## useRef

useRef 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数。
本质上来说就是在变量的 `.current` 保存了一个指向子组件实例的值

```ts
function Test() {
	const helloRef = useRef(null)
	// 使用
	helloRef.current.focus()
	return (
		<input ref={helloRef} />
	)
}
```



## useReducer

useReducer 可以看作是 `useState` 的进阶版本， 在 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等场景中更加适用

useReducer 的 state 和 dispatch 方法仅在当前声明组件内使用，在另外的组件内不能够访问到，一个解决办法是通过 useContext 来进行共享

```js
import React, { useState, useEffect, useContext, useReducer } from 'react';
import { TriviaState } from '@/index.d.ts';

/**
 * 声明 reducer 方法，处理 action，返回新的 state
 * 这里结合 typescript 使用，需要在 reducer 方法内指定 state 的类型和返回值类型
 */
function reducer(state: TriviaState, action): TriviaState {
    switch (action.type) {
        case 'showPanel':
            return {
                ...state,
                visible: true,
                current: action.current ? action.current : -127
            };
        default:
            break;
    }
}

function Test(props) {
	// 初始值
	const initState = {
        triviaList: [],
        current: -127,
        visible: false
    };
    // 声明 state 和 dispatch 方法，同时初始化 state
	const [state, dispatch] = useReducer(reducer, initState);

	const initTriviaList = async () => {
        const params = {
            group: state.group
        };
        const res = await getTriviaList(params);
        if (res.success) {
        	// 触发 state 更新
            dispatch({
                type: 'triviaList',
                triviaList: res.data.list
            });
        }
    };

    // 直接使用 state.triviaList 等
}
```


## useContext

接受一个 context 对象，并返回该 context 的当前值，当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 value 决定

调用了 useContext 的组件总会在 context 值变化时重新渲染

useContext(MyContext) 能够读取 context 的值以及订阅 context 的变化

下面将演示，如何将 useContext 和 useReducer 两者结合，从而达到共享 state 和 dispatch 方法的目的

```js
/**
 * 声明一个 Context 对象，用来承载和订阅 state 和 dispatch
 * 这里结合了 typescript
 */
import React from 'react';

interface TriviaContext {
    state: {};
    dispatch: React.Dispatch<any>
}

export const TriviaContext = React.createContext<TriviaContext>({
    state: {},
    dispatch: () => {}
});

/**
 * 组件A，提供 useReducer 内的 state 和 dispatch 方法 
 */
import React, { useState, useEffect, useContext, useReducer } from 'react';
import { TriviaState } from '@/index.d.ts';

function reducer(state: TriviaState, action): TriviaState {
    // statement
}

function A(props) {
	// 初始值
	const initState = {
        triviaList: [],
        current: -127,
        visible: false
    };
    // 声明 state 和 dispatch 方法，同时初始化 state
	const [state, dispatch] = useReducer(reducer, initState);

	return (
		将 state 和 dispatch 方法提供呗 context
		<TriviaContext.Provider value={{ state, dispatch }}>
		// statement
		</TriviaContext.Provider>
	);
}
```

准备就绪后，在组件B内，对该 context 进行消费

```js
import React, { useContext, useEffect, useState } from 'react';
import { TriviaContext } from './context';

function B(props) {
	// 获取 context 订阅内容，进行消费，对于 state 和 dispatch 可以直接使用
	const { state, dispatch } = useContext(TriviaContext);

	const cancel = () => {
        dispatch({
            type: 'closePanel'
        });
    };

    useEffect(() => {
        console.log(state);
    }, [state.current]);

    // statement
}
```


