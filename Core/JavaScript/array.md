# Array

> Array 对象是类似于列表的高阶对象，是在 JavaScript 内用于构造数组的全局对象

Array是一组有序列表，与其他语言相比，JavaScript内数组可以存放人意类型的数据，且数组大小可以动态调整

关注数组支持的方法，其实现效果，返回值，以及是否修改原数组

会修改原数组的方法（即指向同一引用）：`Array.pop()`, `Array.shift()`, `Array.push()`, `Array.unshift()`, `Array.reverse()`

返回一个新数组的方法（即指向不同引用）：`from()`, `map()`


## map() && async/await

将 `map()` 和 `async/await` 结合起来使用会有一点复杂，关键在于 `Promise.all()` 方法

```js
const anAsyncFunction = () => {
	return Promise.resolve('ok')
}

const getData = async () => {
  return Promise.all(list.map(item => anAsyncFunction(item)))
}

// 遍历所有异步请求的请求数据
const data = await getData()
```