<!-- MarkdownTOC -->

- [React Hook](#react-hook)
	- [Why?](#why)
	- [Trivia](#trivia)
	- [自定义 hook](#%E8%87%AA%E5%AE%9A%E4%B9%89-hook)
	- [useState](#usestate)
	- [useReducer](#usereducer)
	- [useEffect](#useeffect)
	- [useContext](#usecontext)

<!-- /MarkdownTOC -->


# React Hook

> 它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性

## Why?

在之前版本，只有通过 `class` 关键字声明的组件才能够使用 state 等 react 特性，通过函数声明的组件通过常常用来渲染简单的 `react dom`，
React Hook 的出现就是为了解决这一现状

在使用过程中，通过 class 来创建组件的劣势慢慢显露出来，主要表现在：

1. **在组件之间复用状态逻辑很难**，即不同组件之间需要用到同一个 state 及其处理方法
2. **复杂组件变得难以理解**，即不同的生命周期函数（同一个方法）内需要执行多个任务，
比如监听事件，获取数据等，此时又无法再将组件进行更小粒度的拆分
3. **class 本身难以理解**，主要是关于 this 的概念，它是复用父类的this，并在此基础上进行改写
4. 对于 TypeScript 更加友好

基于此，使用 react hook 来改变这一状态

## Trivia

Hook 是一个特殊的函数，它可以让你“钩入” React 的特性，也就是说，可以让本身不具备 state 属性的函数组件，能够使用 state 等 react 特性


**使用原则**

- 仅在 **函数最外层** 使用 Hook，不要在循环，条件和嵌套函数内调用 Hook
- 仅在 **函数组件** 内调用 Hook

`useState` 和 `useEffect` 之所以能够在单个组件内多次使用，是因为 React 保证 HooK 的调用顺序在每次渲染中是相同的，如果通过判断语句等来调用 HooK，则会引起 HooK 不能按照顺序执行，从而引起 bug，因此 React Hook 方法放在函数作用域的最外层


## 自定义 hook

> 自定义 Hook 更像是一种约定而不是功能

在 React 内，如果一个函数以 `use` 开头并调用其他 React Hook，则其就是一个自定义 hook


## useState

> 用来解决在函数组件内使用 state 特性的问题

一般来说，函数执行完毕，其作用域内的变量等会被回收掉，但是通过 `useState` 设置的变量会被 React 保留

可以这么读：向 `useState()` 内传入一个参数作为初始化数据，其会返回两个参数: state 和 setState，即当前的 state 和改变它的方法

注意：不像 class 中的 `this.setState`，更新 state 变量总是替换它而不是合并它

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

## useEffect

> React 组件中执行数据获取、订阅或者手动修改 DOM。我们统一把这些操作称为“副作用”，或者简称为“作用”

**useEffect** 就是给函数组件提高操作副作用的能力

useEffect 用来告知 React 组件需要在渲染后执行某些操作，且 useEffect 会在每次 `render()` 之后执行**（注意：初始化后，会执行所有 useEffect）**，保证执行 useEffect 时， DOM 已经渲染完毕

useEffect 的清除机制：通过在 `useEffect` 内返回一个清除函数来实现，告知 React 在组件卸载的时候执行清除操作

Hook 允许我们按照代码的用途分离他们，即一个组件内可以多次调用 useEffect，React 会按照顺序依次执行

React 会等待浏览器完成画面渲染之后才会延迟调用 useEffect

通常根据依赖项（第二个参数），来对应 class component 不同的生命周期：

- 通过设置依赖项为空数组，来钩入 `componentDidMount`
- 依赖项不传，即没有第二个参数，则对应 `componentDidMount` 和 `componentDidUpdate`，即在每次 `render()` 完成之后都会直接执行
- 通过 return 一个方法，来钩入 `componentWillUnmount`
- 设置依赖项为指定 state，表示当该 state 发生变化时，会触发该 useEffect，且优先执行其 return 函数

**⚠︎注意**

1. 不管依赖项如何设置，都会在初始化时执行所有的 useEffect，此时要避免陷入死循环
2. useEffect 在 render 之后一定会调用，并且是同步调用，如果希望某个值变化后立即执行操作，可以利用**设置依赖项为指定 state** 来进行

```js
import React, { useState, useEffect } from 'react';

function Test(props) {
	/**
	 * 设置一个变量名为 count 的 state，并规定其初始值为 0
	 * useState() 方法传参就是初始 state，且该方法可以调用多次
	 * useState() 方法返回值为：当前的 state 和更新 state 的函数
	 * 返回值通过数组解构获取
	 */
	const [count, setCount] = useState(0);

	/**
	 * 利用 useEffect 来执行初始化操作，相当于 componentDidMount
	 * 则其第二个参数必须为 []
	 */
	useEffect(() => {
		// 可以直接使用 count 而不用 this.state.count
		init();
	}, []);

	/**
	 * 如果不传入依赖项，则在 `componentDidMount` 和 `componentDidUpdate` 时触发
	 * 通过在第一个参数 return 一个函数，来表示 `componentWillUnmount` 执行操作
	 * 如果此时依赖项设置为 [count]，则表示 count 变化时触发该 useEffect，且先执行 cleanup()，再执行 subscribeFromFriendStatus()
	 */
	useEffect(() => {
		// 假如订阅了某个事件，则需要在退出时销毁它，防止内存泄漏
		subscribeFromFriendStatus();

		return function cleanup() {
			// 在组件销毁时，取消订阅事件
			unsubscribeFromFriendStatus();
		}
	});

	/**
	 * 查询数据的写法
	 * 通过设置 ignore 保证在组件卸载后，不会再重新设置组件状态，通过 return 一个清理函数来实现
	 * 仅当 query 发生变化时，才会重新调用该 useEffect
	 */
	useEffect(() => {
		let ignore = false;

	    const fetchData = async () => {
	      try {
	        const result = await axios('https://hn.algolia.com/api/v1/search?query=' + query);
	        if (!ignore) setCount(result.count);
	      } catch (e) {
	        console.log(e);
	      };
	    };

	    fetchData();
	    return function cleanup() { ignore = true; }
	}, [query]);

	// 通过返回的 setCount 方法来改变 count 的值
	return (
		<div>
			<button onClick={() => setCount(count + 1)}>click</button>
			<input value={query} onChange={e => setQuery(e.target.value)} />
		</div>
	);
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



