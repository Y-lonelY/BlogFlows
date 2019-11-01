# ES6

## class

在ES6中，通过 `class` 定义一个类的时候，其通过 `constructor` 构造方法内定义的属性和方法是实例对象自己的，而 `constructor` 外定义的方法和属性则是所有实例对象可以共享的

### super 关键字

ES6 中 `super` 关键字有两种存在形式：

1. 作为函数，即 `super()`

通过 `super()` 调用，super() 代表父类的构造函数，但是其内部 this 指向当前子类实例

这是因为子类本身不具有this对象，而是继承父类的this对象，然后对其进行加工，如果不调用 `super()`，子类就无法得到this对象

ES6的继承机制，实质上是先创造父类的实例对象this，然后再用子类的构造函数修改this

注意：子类的构造函数内必须调用一次super()，且只能在 constructor() 内调用

```js
// new.target 指向当前正在执行的函数
class A {
  constructor() {
    console.log(new.target.name);
  }
}
class B extends A {
  constructor() {
    super();
  }
}
new A() // A
new B() // B
```

2. 作为对象，即 `super`，在普通方法内，指向父类的原型对象（即 `SuperClass.prototype`，可以结合 swift 内 super 来理解，访问超类的方法，属性和下标），在静态方法内，指向父类（即 `SuperClass`）

在子类普通方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类实例

```js
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
  }
}

let b = new B();
b.m() // 2
```


## Array

> Array对象是类似于列表的高阶对象，是在JavaScript内用于构造数组的全局对象

Array是一组有序列表，与其他语言相比，JavaScript内数组可以存放人意类型的数据，且数组大小可以动态调整

关注数组支持的方法，其实现效果，返回值，以及是否修改原数组

会修改原数组的方法（即指向同一引用）：`Array.pop()`, `Array.shift()`, `Array.push()`, `Array.unshift()`, `Array.reverse()`

返回一个新数组的方法（即指向不同引用）：`Array.from()`

### 初始化数组

```javascript
/**
 * 通过数组声明
 * 1. 可以通过 new Array() 来声明，其中 new 可以省略
 * 2. 更加常用的方法是通过 [] 操作符来声明
 * 3. ES6 提供 Array.of() 方法来声明数组 
 */
let arr1 = new Array() || new Array(10) || new Array("a", "b", "c")
let arr2 = ["a", "b", "c"]
let arr3 = Array.of("a", 1) -> ["a", 1]

/**
 * Array.from() 
 * 将 array-like 和 interable 对象(比如字符串)转换为数组
 *  array-like 要求很严格，必须key为从0开始的数字，且包含length属性
 * 常用在 DOMNodeList 来生成可遍历对象
 */
let pList = Array.from(document.querySelectorAll("p")); ->[p,...]
let strList = Array.from("123") -> ["1", "2", "3"]

/**
 * Array.fill()
 * 通过指定值来填充一个数组，原数组会被重新赋值，但是保持其数组长度不变
 */
arr2.fill(1) -> [1, 1, 1]
```

### 数组常用的操作方法

```javascript
/**
 * 通过索引访问数组
 * 在 JavaScript 中，以数字开头的属性不能用点号引用，必须用方括号
 * 下面的方法以 arr2 最为初始化对象
 */
let arr2 = ["a", "b", "c"]
arr2[arr2.length - 1] -> "c"

/**
 * 删除元素
 * pop() 删除最后一个元素，返回被删除元素的值，直接修改原数组
 * shift() 删除第一个元素，返回被删除元素的值，直接修改原数组
 * splice(start, nums) 来删除指定位置的元素，返回删除元素的数组，直接修改原数组
 */
arr2.pop() -> "c"
arr2.shift() -> "a"
// indexOf() 获取指定元素位置，返回一个Int类型
const index = arr.indexOf("a") -> 0
// 示从 index 开始，向后删除 1 个元素
arr2.splice(index, 1) -> ["a"]

/**
 * 添加元素
 * push() 在数组最后位置添加元素，返回添加元素后的数组长度，直接修改原数组
 * unshift() 在数组第一项前添加元素，返回添加元素后的数组长度，直接修改原数组
 */
arr2.push("d") -> 4
arr2.unshift("d") -> 4

/**
 * 截取数组
 * 如果是从数组开始位置进行截取，可以直接重新复制length来实现截取，返回新的数组长度，直接修改原数组
 */
arr2.length = 1 -> 1
```

使用 `arr1.push.apply(arr1, arr2)` 来合并数组，可以减少内存消耗，`arr1.concat(arr2)` 会创建一个新的数组并消耗内存

### 遍历

foreach 是遍历数组的一个常用方法，但是其有一个特性很容易引起错误：即在 `foreach` 循环内，只能通过抛出异常能够跳出循环

如果需要跳出循环，其替代方法：

- 简单循环
- `for...of` 循环
- `Array.prototype.every()`
- `Array.prototype.some()`
- `Array.prototype.find()`
- `Array.prototype.findIndex()`

foreach 是按照 index 来进行遍历的，forEach 不会在迭代之前创建数组的副本，这意味着如果在遍历过程中添加或者删除，会影响其他元素的行为

```js
// 如果数组在迭代时被修改了，则其他元素会被跳过
var words = ['one', 'two', 'three', 'four'];
words.forEach(function(word) {
  console.log(word);
  if (word === 'two') {
    words.shift();
  }
}); // -> 'one' 'two' 'four'
```
