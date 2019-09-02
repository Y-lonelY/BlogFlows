# Swift4.x

test

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