## 微信

在二叉排序树{value:Number, left:Object, right:Object}上面找出第3大的节点。注意：不能把二叉树全量存储到另外的存储空间，比如存储到数组中，然后取出数组的第三个元素

## shopee

箭头函数 this

es6 var let const proxy

setTimeout delay 是如何实现

受控组件和非受控组件

原型链

## 腾讯音乐

`<header>` 相比 `<div>` 标签的优势
- 语义化，开发者亲近，更加直观理解
- SEO 优化，能够被搜索引擎更好的搜索
- 便于浏览器实现特定功能，比如阅读大纲

[错误监听](./javascript.md#前端异常捕获)

[闭包](./javascript.md#作用域和闭包)

[跨域以及跨域处理](./javascript.md#跨域)

[去抖和节流](../Project/JavaScript/javascript.md#函数节流与防抖)


## 今日头条

数据双向绑定，单向数据流，MVVM

js 基本数据类型 手写深拷贝

原型链 作用域

[position定位](../Project/Css/css.md#position)，可以延伸出一些基本知识
- 布局方式：标准流（行内元素，块级元素），浮动，定位

css 左边固定，右边动态适应

```html
<style>
	// 通过 css3 的 flex 进行布局，注意 flex-grow 占满剩余空间
	.test {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
	}
	.parent {
		width: 200px;
		height: 100px;
		background-color: #777;
	}
	.child {
		background-color: #000;
		height: inherit;
		flex-grow: 1;
	}

	// 通过 display: table
	.test {
		display: table;
		width: 400px;
		height: 400px;
	}
	.parent {
		display: table-cell;
		width: 200px;
		height: 100%;
	}
	.child {
		display: table-cell;
		height: 100%;
	}

	// 通过 float 结合 calc 计算 width
	.test {
		width: 400px;
		height: 400px;
	}
	.parent {
		float: left;
		width: 200px;
		height: 100%;
	}
	.child {
		float: left;
		width: calc(100% - 200px);
		height: 100%;
	}
	// bfc
	.test {
		width: 400px;
		height: 400px;
	}
	.parent {
		float: left;
		width: 200px;
		height: 100%;
	}
	.child {
		height: 100%;
		overflow: hidden;
	}
</style>
// html 结构
<div class="test">
	<div class="parent"></div>
	<div class="child"></div>
</div>
```

算法题

```js
var str = `1  2 3  
  4  5   6
    
 7 8        9`;
//输出
var ourput = [
	[1,2,3],
	[4,5,6],
	[7,8,9]
];

function transformArray(data) {
	// 根据换行符进行分隔
	var arr = data.trim().split('\n');
	var list = [];
	arr.forEach(item => {
		if (item.trim().length > 0) {
			var currentData = item.split(' ');
			var currentList = [];
			currentData.forEach(item => {
				if (item.trim().length > 0) {
					currentList.push(Number(item));
				}
			});
			list.push(currentList);
		}
	})
	return list;
}
```

实现钟摆效果，考察 animation 和 transform

```html
div
{
	width:20px;
	height:100px;
	background:red;
	animation:mymove 2s ease-in-out alternate infinite;
}

@keyframes mymove
{
	from {
		transform: rotate(225deg);
	}
	50% {
		transform: rotate(180deg);
	}
	to {
		transform: rotate(135deg);
	}
}

<div></div>
```


