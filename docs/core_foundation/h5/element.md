# HTML5 Elements

## Handle DOM Element

```js
// 查询元素
const ele = document.querySelector('.target')
// 添加 class
ele.classList.add('add-class')
// 设置属性
ele.setAttribute('name', 'hello')
```



## fieldset && legend

`<fieldset>` 元素将 HTML 表单的一部分组为一组，内置一个 `<legend>` 元素作为 `<fieldset>` 的标题

```html
<fieldset>
	<legend>
    Hello world form title!
  </legend>
  <input type="radio" id="kraken" name="monster">
  <label for="kraken">Kraken</label>
</fieldset>
```



## figure

HTML 元素 `<figure>` 代表一段独立的引入内容，通常配合 `<figcaption>` 使用（对引用内容的说明）。
这个标签通常用于在主文内引用图片、文段、代码段、表格等

```　　html
<!-- 代码块 -->
<figure>
	<figcaption>Figure Element!</figcaption>
	<code>hello world!</code>
	<pre>
	let me = 'like 77!'
	</pre>
</figure>

<!-- 引用 -->
<figure>
	<figcaption><cite>Hello World!</cite></figcaption>
	<blockquote>
		Why so serious?
	</blockquote>
</figure>
```
