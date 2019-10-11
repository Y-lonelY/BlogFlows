# Swift4.x

## String

Swift 内 String 类型是一种值类型，会在赋值操作和函数传递过程中被复制一次，传递走的是拷贝而不是原本，同时，Swift 编译器优化了字符串资源的使用，只会在你调用的时候才会实际进行拷贝操作

字符类型在 Swift 内通过 Character 来标记，一般来说，字符组成字符串，所以可以对字符串进行遍历，每个遍历项就是字符

字符串字面量（即字符串的值）通过**双引号**来包裹

可以使用 Character 类型标注来从单个字符字面量创建，再通过 `String()` 来进行强制转换为 String 类型

### 基本操作

**字符串转换**

```swift
let value = 0.123
// 强制转换
String(value) // "0.123"

// 保留相应位数
String(format: "%.1f", value) // "0.1"
```

**字符串判断**

```swift
// 判断字符串是否为空，返回一个布尔值
str.isEmpty

// 判断字符串是否以指定字符串开头，返回一个布尔值
str.hasPrefix("test") 
```

**切割字符串，类似 JavaScript 的 split() 方法，返回一个数组**

```swift
var str = "1?2"
str.components(separatedBy: "?") // ["1", "2"]
```


## Tuple

元组一个比较重要的概念，可以结合 ES6 的变量的解构赋值和 `Python.tuple` 来理解

在 Swift 内，在临时的值组合中很有用（比如作为函数的返回值），但是它不适合用来装载复杂的数据结构，Swift 内复杂的数据结构一般用类或者结构体来承载

```swift
/**
 * 声明
 * Tuples 是将多个值合并成一个组合值的数据结构，其值类型是各个基本类型的排列组合
 */
let tuple_case = (200, "success", ["a", "b", "c"])

/**
 * 取值
 * 1. 利用角标（index）来进行取值，类似数组方法
 * 2. 在声明元组时，为其元素添加变量名（key），通过key来取值，类似对象方法
 * 注意，两种方式都通过点语法 `.` 来连接
 */
print(tuple_case.1) -> "success"

/**
 * 解构
 * 利用解构，类似 ES6 解构的概念，通过对 Tuples 进行解构来直接为变量赋值
 * 当遇到不需要的数据，可以用 `_` 代替，按照顺序进行取值
 */
let (a, b, _) = tuple_case 相当于 let a = tuple_case.0
print(a) -> 200
```

## Array

Swift 内数组是用来存放**相同类型**的有序值，Swift 对于数组内类型的控制，是有别于JavaScript等弱语言的

对于JavaScript，数组内可以存放任意类型的值，更像是将Swift内tuple和array结合的产物

> Arrays同样遵循Indexable协议


**项目内的数组常用操作**

```swift
// 声明一个 Int 类型的空数组，更复杂的数据结构可以对结构进行拆分或者通过Any来声明
var arr = [Int]()

/**
 * 利用Array类型提供的初始化方法来声明一个确定大小且元素值相同的默认数组
 * 类似 ES6 的 let arr = new Array(3).fill(7) 实现
 */
var arr = Array(repeating: 7, count: 3)

/**
 * 添加元素
 * 通过 `+` 来连接两个数组，并返回一个新数组
 * 类似 ES6 的 `Array.concat(arr)` 方法
 */
let arr1: [Int] = [1, 2]
let arr2: [Int] = [3, 4]
arr1 + arr2 -> [1, 2, 3, 4]
// 通过append()来向数组内添加元素
arr1.append(5) -> [1, 2, 5]


/**
 * 插入元素
 * 通过`insert(element, at: index)`方法来向数组指定位置插入元素
 * 类比 Python 的`insert(element, index)`方法
 * 类比 JavaScript 的`arr.splice(index, 0, element)`方法
 */
arr2.insert(6, at: 1) -> [3, 4, 6]

// 通过下角标（index）对数组进行访问，类似JavaScript
// Swift支持区间表达式，因此可以利用区间表达式访问多个元素
arr1[0] -> 1

// `arr.reverse()` 将原数组倒序排列
arr1.reverse() -> [5, 2, 1]
```

**通常用来进行判断的属性**

- 利用 `arr.count` 来统计数组内元素个数
- 利用 `arr.isEmpty` 来判断数组的count是否为0，返回布尔值
- 利用 `arr.contains(element)` 判断元素是否在数组内，返回一个布尔值

**删除元素**

- `arr.remove(at: index)` 删除指定位置index的元素，类似 Python 的 `pop(index)` 和 JavaScript 的 `splice(1, index)` 方法
- `arr.removeLast()` 删除数组内最后一个元素，等同于 `arr.remove(arr.count - 1)`
- `arr.removeFirst()` 删除数组内第一个元素
- `arr.removeAll()` 删除数组内所有元素


## Loop

### For In

Swift 内通过 `for in` 循环来遍历可迭代（indexable）的数据类型，比如字符串，数据区间，集合，数组

在循环过程中，循环体内的 index 是一个常量，在每次遍历循环开始时被隐式声明


```Swift
/**
 * 数据区间
 * 设置 `stride(from:through:by:)` 或者 `stride(from:to:by:)` 来有规律地跳过某些值
 * 区别在于前者是闭区间，而后者是开区间
 */
for index in stride(from: 0, through: 10, by: 2) {
    print(index) // 0 2 4 6 8 10
}

/**
 * 数组
 * index 会被隐式声明
 * 通过 `for (index, value) in arr.enumerated()` 来遍历索引和值
 * 类比 Python `for i,value in enumerate(list)`
 */
let array: [String] = ["a", "b", "c"]
for value in array {
	print("\(index) is \(value)!")
}

/**
 * 字典
 * 省略键
 */
let dict: [String: String] = ["a": "hi", "b": "nihao"] 
for (_, value) in dict {
	print(value)
}
```