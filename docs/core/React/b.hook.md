# React Hook

> 它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性


## Why?

在之前版本，只有通过 class 关键字声明的组件才能够使用 state 等 react 特性，通过函数声明的组件通过用来渲染简单的 react dom

但是，在使用过程中，通过 class 来创建组件的劣势慢慢显露出来，主要表现在：

1. 在组件之间复用状态逻辑很难，即不同组件之前需要用到同一个 state 及其处理方法
2. 复杂组件变得难以理解，即不同的生命周期函数（同一个方法）内需要执行多个任务，比如监听事件，获取数据等，此时又无法再将组件进行更小粒度的拆分
3. class 本身难以理解，主要是关于 this 的概念，它是复用父类的this，并在此基础上进行改写

基于此，使用 react hook 来改变这一状态

## Basic

Hook 在 class 内部是不起作用的，所以要么是函数组件，要么是 class 组件

Hook 是一个特殊的函数，它可以让你“钩入” React 的特性，也就是说，可以让本身不具备 state 属性的函数组件，能够使用 state 等 react 特性

仅在函数组件最外层使用 Hook，不要在循环，条件和嵌套函数内调用 Hook

`useState` 和 `useEffect` 之所以能够在单个组件内多次使用，是因为 React 保证 HooK 的调用顺序在每次渲染中是相同的，如果通过判断语句等来调用 HooK，则会引起 HooK 不能按照顺序执行，从而引起 bug

```js
import React, { useState, useEffect } from 'react';

function Test() {
	/**
	 * 设置一个变量名为 count 的 state，并规定其初始值为 0
	 * useState() 方法传参就是初始 state，且该方法可以调用多次
	 * useState() 方法返回值为：当前的 state 和更新 state 的函数
	 * 返回值通过数组解构获取
	 */
	const [count, setCount] = useState(0);
	const [query, setQuery] = useState('react');

	// 打印当前的 count
	useEffect(() => {
		// 可以直接使用 count 而不用 this.state.count
		console.log(count); // 0...
	});

	// 订阅某个事件
	useEffect(() => {
		// 假如订阅了某个事件，则需要在退出时销毁它，防止内存泄漏
		subscribeFromFriendStatus();

		return function cleanup() {
			// 在组件销毁时，取消订阅事件
			unsubscribeFromFriendStatus();
		}
	});

	// 查询数据的写法
	// 通过设置 ignore 保证在组件卸载后，不会再重新设置组件状态，通过 return 一个清理函数来实现
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

### useState

> 用来解决在函数组件内使用 state 特性的问题

一般来说，函数执行完毕，其作用域内的变量等会被回收掉，但是通过 `useState` 设置的变量会被 React 保留

和 class 的 `setState()` 方法不同，通过 hook 来更新 state 是直接替换，而 `setState()` 是合并操作

### useEffect

> 类似 class 内的生命周期，useEffect 可以看作 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合

useEffect 用来告知 React 组件需要在渲染后执行某些操作，且 useEffect 会在每次 `render()` 之后执行，保证执行 useEffect 时， DOM 已经渲染完毕

useEffect 的清除机制：通过在 `useEffect` 内返回一个清除函数来实现，告知 React 在组件卸载的时候执行清除操

Hook 允许我们按照代码的用途分离他们，即一个组件内可以多次调用 useEffect，React 会按照顺序依次执行


