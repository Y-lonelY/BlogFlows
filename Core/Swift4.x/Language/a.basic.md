<!-- MarkdownTOC levels="1,2,3" -->

- [Organizational structure](#organizational-structure)
- [The basics](#the-basics)
	- [声明变量](#%E5%A3%B0%E6%98%8E%E5%8F%98%E9%87%8F)
- [简单数据类型](#%E7%AE%80%E5%8D%95%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B)
	- [Integers](#integers)
	- [Floating-Point Numbers](#floating-point-numbers)
	- [Number](#number)
	- [Bool](#bool)
	- [💥Tuples](#tuples)
	- [💥Optionals](#optionals)
	- [nil](#nil)
- [String](#string)
	- [基本操作](#%E5%9F%BA%E6%9C%AC%E6%93%8D%E4%BD%9C)
	- [基础知识](#%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86)
	- [常用属性](#%E5%B8%B8%E7%94%A8%E5%B1%9E%E6%80%A7)
	- [核心方法](#%E6%A0%B8%E5%BF%83%E6%96%B9%E6%B3%95)
- [Collection Types](#collection-types)
	- [Array](#array)
	- [Sets](#sets)
	- [Dictionaries](#dictionaries)
- [Basic Operator](#basic-operator)
	- [赋值运算符](#%E8%B5%8B%E5%80%BC%E8%BF%90%E7%AE%97%E7%AC%A6)
	- [常用运算符](#%E5%B8%B8%E7%94%A8%E8%BF%90%E7%AE%97%E7%AC%A6)
	- [💥Range Operators](#range-operators)
	- [Logical Operators](#logical-operators)
- [💥Control Flow](#control-flow)
	- [gurad](#gurad)
	- [For in](#for-in)
	- [While](#while)
	- [Switch](#switch)
	- [Control Transfer Statements](#control-transfer-statements)
- [错误处理](#%E9%94%99%E8%AF%AF%E5%A4%84%E7%90%86)

<!-- /MarkdownTOC -->


> Recording Swift basics

## Organizational structure

- 基本概念
- 声明
- 常用属性
- 核心方法

图标含义：

🌝 - 概念晦涩，留待观察，不太常用<br />
💥 - 重要、常用概念

## The basics

### 声明变量

在声明变量时不必总是显式声明值的类型，编译器会自动进行识别，但是如果初始值不能提供足够的信息（大部分情况是没有设置初始值），就需要在变量后声明值类型

```Swift
// `let` 用来声明一个常量，`var` 用来声明一个变量
// 声明数据类型，格式：关键字 变量名: 类型 = 值，注意 : 后面需要加一个空格
let constant: Double = 17.00
var str = "Hello, world"

// 可以通过 `,` 分隔来在一行声明多个变量，多个同类型变量可以在最后一个变量后添加数据类型
var sum, num: Int
```

一些注意点：

- 变量名不能包含空格，数字符号，箭头，Uicode等，不能以数字开头，一般用下划线和英文字符组合
- 变量只能被声明一次，且不能改变其**类型**，也不能进行常量和变量之间的互相转换
- 已经声明类型的值不会像 JavaScript 那样进行隐式转换，需要显式地进行转换，比如 `String(num)`

**全局和局部变量**

全局变量是定义在任何函数、方法、闭包等之外的变量，局部变量与之相反

这些变量都是存储变量，即为特定类型的值提供存储并且允许这个值被设置和回收

由于其为存储变量，因此可以为其定义计算属性或者属性观察者

全局变量和常量永远是延迟计算的，即延迟存储变量

**注释**

单行注释：`//...`<br />
多行注释：`/*...*/`

**分号**

单行只有一个方法可以不需要分号，多行合并到一行，需要将各个方法用分号分隔


## 简单数据类型

> Swift 内简单数据类型及其强制转换方法

Type safety and Type inference
- Swift 类型安全表现在它是一种“强类型”语言，在声明变量是需要同时声明类型，同时不同类型之间可以相互转换，但是不可以随意赋值
- 但是，Swift 本身又具有类型推断，这使得不必在所有的变量声明时都声明其类型，而是由 Swift 进行推断
- Swift 总是会将小数推断为 double 类型而不是 float 类型

类型转换
- 通过 `typealias` 来为已经存在的类型设置别名，一旦为类型设置了别名，就可以在任何使用原始类型的地方使用别名

### Integers

Swift 内通过 `Int` 来声明整型，其大小与计算机的字大小相同，比如64位机器，实际就是代表 `Int32`

`UInt` 代表无符号整数，仅当您特别需要与平台的本机字大小相同的无符号整数类型时才使用 UInt

整形大小范围为 -2,147,483,648 到  2,147,483,647 ，对于累计的值，比如充值金额，建议用更大范围的数据类型而不是 Int 类型

### Floating-Point Numbers

具有小数分量的数字类型叫做浮点数，浮点数具有比 Int 类型更大的范围

### Number

Swift 内表示整数有四种方式：

1. `let a = 17` 10进制表示
2. `let a = 0b10001` 2进制表示
3. `let c = 0o21` 8进制表示
4. `let d = 0x11` 16进制表示

浮点数划分为10进制和16进制，10进制通过 `e` 来计算，16进制通过 `p` 来计算

**数字类型转换**

Swift 内数字类型一般使用 Int 类型，除非是数值溢出、性能、内存优化等需要使用到其他数字类型

- 常用强制转换类型：Double, Int(Int8、Int16等),
- Int 类型下有很多子类型，子类型之间不能直接运算，需要类型强制转换
- 整形和浮点型运算需要强制转换
- 将浮点数转换为整数时，会对小数位进行截断

```swift
// 无符号，0-(2^8-1)
let n_max: UInt8 = UInt8.max
// 符号 (-2^7)-(2^7-1)
let num: Int = Int.max - Int.min
```

### Bool

Swift 提供一个基础的布尔值类型，可以被作为逻辑值来使用，其值为 `true` 或者 `false`

对于 `if...else...`  判断一定要为布尔类型，不然不能编译通过，这点不同于 JavaScript 的隐式转换，可以自动将字符串识别为 true

### 💥Tuples

元组一个比较重要的概念，可以结合 ES6 的变量的解构赋值和 Python.tuple 来理解

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
 * 利用解构，类似 ES6 解构的概念，通过对 Tuples 进行解构来直接为变量赋值，当遇到不需要的数据，可以用 `_` 代替，按照顺序进行取值
 */
let (a, b, _) = tuple_case 相当于 let a = tuple_case.0
print(a) -> 200
```

#### 元组比较

如果两个元组内对每个数据类型都可以比较大小（比如 Int, String），则可以对这两个元组进行大小比较

- Swift 会依次比较元组内每个值，如果全部通过，则返回 true，否则，返回 false
- 因为 `Bool` 类型不能比较，所以意味着包含布尔类型的元组不能比较
- Swift 标准库仅支持比较小于**七个**元素的元组进行比较，大于七个时需要自己实现比较规则

### 💥Optionals

Swift 内一些值可能缺失，为了不报错，通过返回 nil 来兼容这种情况，就是可选变量

可选变量用来处理值可能缺失的情况，其意味着：

1. 如果有有效值，则返回有效值
2. 如果根本没有值，则返回 nil

一个比较典型的例子就是 `Int()` 方法，其返回值就是一个可选变量，`Int("hello") => nil; Int("123") => 123`

#### 可选项的声明和取值

1. 在**声明**时，通过 `?` 来标记当前变量为一个可选变量
2. 在**取值**时，通过 `!` 来强制展开可选变量，为了避免无值的情况，每次强制取值时，通过 `if nil {...}` 进行判断
3. 同时，Swift 提供一种隐式展开可选项，其在**声明**时，类型后添加 `!`，表示其一定会有值（不会为 nil），不用进行检查，因此在取值时，不用再添加 `!`

在可选项被定义时，就能确定其有值的情况下，常用隐式展开可选项，相当于每次访问可选变量时，都赋予其自动进行展开的权限

**注意**

- 一个变量不可以直接声明为 `nil`，需要配合 `?` 来将其转换为可选变量
- 如果声明隐式可选项时没有赋值，而立即对其进行调用，会导致编译错误
- 如果一个变量在其生命周期内可能会为 nil，则使用普通可选项

#### 可选项绑定

除了利用 `!` 来展开可选变量，还可以利用可选项绑定来获得可选项变量，通过将可选项变量强制转换后赋值给一个变量（或者常量），通过判断变量是否为 nil 来执行判断体内容

**注意，在判断体内声明的变量只能在判断体内使用**

在一个判断体内可以包含多个可选项绑定，通过 `,` 分隔，如果任一可选项绑定为 nil 或者 false，那么整个判断被看作 false

```Swift
let opt_case = "7"

if let bind_case = Int(opt_case) {
    print(bind_case + 10)
}
```

### nil

结合可选类型可以为一个变量赋值为 nil，表示其没有值

nil 不能用于非可选的变量或者常量

如果在声明一个可选变量时没有设置默认值，则其值默认为 nil

在 Swift 内，nil 是值缺失的一种特殊类型，任何类型的可选项都可以设置为 nil 而不仅仅是对象类型


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

### 基础知识

多行字符串：
- 类似 Python，多行字符串字面量通过三个连续的双引号来进行开始和结尾的标记
- 多行文字会自动换行，最后一行不会自动添加换行符
- 如果不希望多行字符串换行，而是希望其为一行，可以在每行结尾（除最后一行外）添加反斜杠标记 `\` 来告知编辑器不用添加换行符
- 如果希望字符串起始或者结束换行，在相应地方添加空行即可
- 字符串字面量每行会相对结束标记进行空格缩进

通过 `\` 对字符串字面量内的特殊字符进行转义，比如 `\t, \n, \r, \", \', \0, \\` 以及 `\u{Unicode}`

**扩展字符串分隔符**：如果在字符串内需要展示某个特殊转义字符，通过 `#` 关键字来进行标记

```swift
// 声明一个空字符串，约定使用简写方法来声明空字符串
var str = ""
var str = String()

// 字符串统计
str.count // 5

/**
 * 字符串拼接
 * 1. 通过 `+` 或者 `+=` 来拼接两个字符串
 * 2. 通过 `append()` 来向字符串内添加字符字面量
 * 3. 注意，不可以向 Character 类型内添加，因为字符字面量只能包含一个值
 */
```

### 常用属性

有个比较重要的点就是，由于 Character 字面量使用**扩展字形集群**，所以创建和修改可能不是总是影响字符串统计

- 扩展字形集群能够组合一个或者多个 Unicode 标量，这意味着，相同字符的不同表示对应不同的 Unicode 组合，即产生不同的内存空间
- Swift 在计算 count 属性时，会遍历整个字符串的 Unicode 标量，来确定其 count 属性

### 核心方法

#### 字符串插值

字符串插值，通过 `\(value)` 关键字，类似 ES6 内的 `${value}`，在 Swift 内，括号中可以是一个变量或者是一个表达式

**注意**
1. 在使用扩展分隔符的字符串内使用字符串插值，需要在反斜杠后添加匹配首尾井号数量相同的井号
2. 作为插值写在圆括号中的表达式不能包含非转义的反斜杠，并且不能包含回车或者换行符

#### 访问和修改字符串

字符串是遵循 `Indexable` 协议的数据类型，因此其可以使用 Indexable 协议支持的方法，如下：

**访问索引**

1. 通过 `String[index]` 或者 `String.index[range]` 来访问字符串内 index 位置的字符或者一段区间的字符串
2. `String.startIndex` 返回字符串内第一个字符的位置(index)，如果需要取出其字符，参考1
3. 与2对应，通过 `String.endIndex` 获取字符串内**最后一个字符后**的位置，因此不能通过 `String[String.endIndex]` 来获取字符串最后一个字符，但是如果字符串为空，`String.startIndex` 和 `String.endIndex` 相等
4. 通过 `String.index(before: i)` 和 `String.index(after: i)` 来访问 i 之前和之后的索引
5. 比4更灵活的方法，通过 `String.index(i, offsetBy: n)` 来访问 i + n 位置的索引
6. `String.indices` 属性返回字符串内每个字符的索引
7. `String.index(of: Character)` 返回字符串内某个字符的首次出现位置

**指定位置插入**

1. `String.insert(Character, at: index)` 表示向字符串指定 index 位置之前插入字符
2. `String.insert(contentsOf: String, at: index)` 表示向字符串指定 index 位置之前插入一段字符串

**指定位置删除**

1. `String.remove(at: index)` 表示从字符串指定 index 位置删除字符
2. `String.removeSubrange(range)` 表示从字符串内删除一段字符，range 是一个区间表达式

整个逻辑是：`Indexable` 拥有上述的属性和方法，String 类型是 Indexable 的，所以它也可以使用其方法和属性，同样的集合类型还有 `Array`, `Dictionary`, `Set`等

- 可以将 index 理解为一个类，通过 `index(method: )` 来调用其不同的方法
- 理解可以参考 Python 的 Interable 类型
- 其插入和删除方法可以参考 JavaScript 的 `splice()` 方法

#### Substrings

子字符串，就是一个原字符串的子集，通过 `String.index[range]` 来返回

在 Swift 内，子字符串的运作机制：

- 与字符串一样，子字符串也有一块内存用来保存其字符，但是，为了性能上的优化，子字符串可以重用一部分原字符串的内存
- 这意味着，在使用字符串或者子字符串之前，都不需要花费拷贝内存的代价
- 但是，随之而来的问题就是，只要字符串有子字符串在使用，那么这个字符串就一直保存在内存中

因此，更好的使用办法是，通过 `String()` 方法，为子字符串重新声明一块内存，来长期使用

#### Comparing Strings

字符串比较，常用方法：

1. `==` 和 `!=` 用来判断两个 string 的扩展字形集群（即 Unicode 表示）
2. `hasPrefix()` 用来检查一个字符串是否拥有特定前缀，类似 JavaScript 的 `startWith()` 方法
3. `hasSuffix()` 用来检查一个字符串是否拥有特定后缀，类似 JavaScript 的 `endWith()` 方法


## Collection Types

在 Swift 内，有常用的三种集合类型，都是基于泛型集合实现

1. array，有序的值的集合，可以结合 Python 的 list 和 JavaScript 的 Array 概念进行理解
2. set，唯一值的无序集合，更像 Python 的 Set 数据结构，因为两者都是无序，而 ES6 的 Set 数据结构是有序的
3. dictionary，无序的键值对的集合，可以结合 Python 的 dict 字典概念和 JavaScript 的 Object 概念来理解

### Array

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


### Sets

合集用来存储**相同类型**且无序的唯一值

需要注意的是，合集是无序的，这意味着对合集的每一次操作都可能影响其元素顺序

由于合集和数组的基本属性和核心方法大致相同，所以不再累述，重点关心其差异性

#### 声明

1. Swift 的合集类型写做 `Set<Element>`，不同于 Arrays，Sets 方法没有简写
2. `let newSet = Set<Int>()` 来声明一个 Int 类型的空合集
3. 通过数组字面量来初始化一个合集，`let newSet: Set<String> = ["a"]`

#### 遍历合集

通过 `for value in sets` 遍历值

由于在 Swift 内合集是无序的，如果要以特定方法遍历合集，可以先排序，例如： `for value in sets.sorted()` 对排序后的合集进行遍历

#### Set Operations

可以利用合集来执行交集，并集，补集等集合操作，假设有a, b两个合集 

1. `a.union(b)` 并集
2. `a.intersection(b)` 交集
3. `a.symmetricDifference(b)` 相当于两个集合交集的补集，再求并集
4. `a.subtracting(b)` 相当于两个集合的并集减去b集合（a集合减去a和b的交集）

超集和子集的判断

1. 通过 `==` 来判断两个集合是否有相同值
2. `a.isSubset(of: b)` 判断a集合是否被b集合完全包含
3. `a.isSuperset(of: b)` 判断a集合是否完全包含b集合
4. `a.isStrictSubset(of: b)` 判断a集合是否为b集合的子集
5. `a.isStrictSuperset(of: b)` 判断a集合是否为b集合的超集
6. `a.isDisjoint(with: b)` 判断两个集合内所有值是否都不相等


### Dictionaries

字典用来存储无序的相互关联的同一类型的键和同一类型的值

由于字典和数组的基本属性大致相同，所以不再累述，重点关心其差异性

#### 声明

1. `var dic = [Int: String]()` 来声明一个空字典
2. `var dic: [Int: String] = [1: "june", 2: "july"]` 字典字面量来声明一个字典

字典字面量声明，每个键值对的键和值通过 `:` 进行分隔，键值对通过 `,` 进行分隔，最终用中括号包裹所有键值对

#### 核心方法

**访问字典**

类似 JavaScript 的 Object，通过形如 `dict[key]` 的方式进行访问

**更新字典**

1. 通过为字典某个元素重新赋值
2. 通过 `updateValue(newValue, forKey: Key)` 为 Key 重新赋值为 newValue，如果字典中能够找到 Key 则更新它，如果找不到，则进行添加操作，更新操作最终返回旧的值，这允许你检查更新操作是否成功

**移除键值对**

1. 通过给某一项赋值为 `nil` 来删除该键值对
2. 通过 `removeValue(forKey: Key)` 来删除移除键名为 Key 的键值对，并返回移除的值

#### 遍历字典

可以类比 ES6 的 `Object.keys()` 和 `Object.values()` 进行理解

`for (key, value) in dictionary` 进行键和值的遍历

`for key in dictionary.keys` 仅对键进行遍历

`for key in dictionary.values` 仅对值进行遍历

通过 `let arr = [String](dictionary.keys)` 来获取键的数组，值获取同理

## Basic Operator

运算符是用于检查，更改或组合值的特殊符号或者短语

按照参与值个数来分：

- 一元运算符，对一个目标进行操作，比如 `!a`
- 二元运算符，对两个目标进行操作，比如 `a + b`
- 三元运算符，对三个目标进行操作，比如 `a ? b : c`

### 赋值运算符

`=` 即为赋值运算符，几个特性：

- 与 javascript 不一样，Swift 内赋值运算符没有返回值，即不能在判断语句（比如 if 判断体内）进行赋值操作
- 通过赋值运算符可以自动解析元组内值

### 常用运算符

`+ - * /` 对应 加、减、乘、除

加法运算符还可以用于字符串拼接、数组的合并，可以组合使用赋值运算符，例如 `a += 1`

**注意，Swift 内运算符操作不允许值溢出，但是可以使用溢出运算符来行使值溢出操作**

`%` 取余运算符

Swift 也提供类似 JavaScript 的比较运算符，在 Swift 内 `===` 和 `!==` 用来判断两个对象的引用是否相同 

**合并空值运算符**，针对可选类型，使用 `??` 来标记

- `a ?? b` 等同于 `a != nil ? a! : b`，表示如果 a 有值，则强制展开，a 无值（即为 nil），则返回 b

### 💥Range Operators

区间运算符用来表示一个值范围，在循环体内比较有用，需要重点 mark 下，有点类似 Python 的 `range()` 方法

1. 闭区间运算符：`1...5` 表示 >=1 && <=5
2. 半开区间运算符：`1..<5` 表示 >=1 && <5
3. 单侧区间：`list[1...]` 表示从索引 1 直到数组结束

**注意不同区间表达式的 . 个数差异**

### Logical Operators

逻辑运算符，三个经典逻辑：

1. 与 `&&`
2. 或 `||`
3. 非 `!`，用来转换布尔值类型

Swift 语言中逻辑运算符 `&&` 和 `||` 是左相关的，这意味着多个逻辑运算符组合的表达式会首先计算最左边的子表达式


## 💥Control Flow

控制流，主要包含遍历，条件判断

因为 `if  else` 在各个语言都差不多，这里不再展开，Swift 内重点对 `switch` 进行了优化，可以重点了解

### gurad

`guard` 是一个新的概念，它与 `if` 类似，使用 `guard` 语句要求一个条件为真才会继续执行之后的代码，且 `gurad` 必须带一个 `else` 语句

```Swift
// "correct"
guard 3 > 2 else {
	print("error")
}

print("correct")
```

相比于 if 语句，guard 语句能够增强代码的可读性

### For in

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

### While

while 循环执行一个合集的语句，知道条件变为 false 时结束循环，Swift 提供两种 `while` 循环：

1. `while` 循环在每次开始时计算判断条件
2. `repeat-while` 循环在每次结束时计算判断条件，类比 JavaScript 内的 `do while`

```Swift
// while 通用格式
while condition {
	statements
}

// repeat-while 通用格式
repeat {
	statements
} while condition
```

从官网上例子来看，对 `while` 和 `repeat-while` 的选择使用，主要看其对数据溢出或者数组边界检查的处理

### Switch

Switch 语句将一个值和多个模块进行匹配，然后执行成功匹配模块的代码，一般判断超过三种情况，就不建议用 `if` 条件语句了，而更建议使用 `switch`

```Swift
// switch 通用格式
switch value to consider {
	case value1:
		statements-1
	case value2,
	value3:
		statements-2 or statements-3
	default:
		other-statements
}
```

#### switch with Swift

1. 每个 case 都必须包含可执行的代码，不可以为空，否则会导致编译错误
2. 一个 case 可以匹配多种情况，多个值通过 `,` 分隔，并且在合适的地方换行（换行是为了支持 Swift 规范化）
3. 一旦某一种 case 的情况被匹配到，剩下的其他情况都会被忽略
4. 关于 `break`

	- 在 Swift 内，switch 语句不再会隐式贯穿到下一个 case 内，即不需要主动添加 `break` 来分隔各个 case，这点很大程度区别于 JavaScript
	- 尽管在 Swift 内 break 语句不是必须的，但是仍然可以添加 break 来主动中断某些语句的执行
	- 如果需要在某些情况下进行贯穿操作，使用 `fallthrough` 关键字
5. 关于 `value`

	- 用于匹配的 value 可以是基本类型，比如 Int, String等，就像其他语言一样
	- 在 Swift 内，可以匹配区间表达式，比如 `case 1...5:`
	- 还可以匹配元组，用 `_` 来表示匹配所有可能的值，比如 `case (_, 5)` 可以用来匹配 y=5, x 为任意值的坐标点 
6. 值绑定，是一个很棒的特性，相当于在判断体内执行了赋值操作，且绑定值仅在执行语句内生效
	
	- switch 可以将匹配到的值绑定为一个临时的变量（或者常量），来给函数体使用
	- 配合 `where` 关键字，可以利用绑定值在判断体内做更深一层的判断，例如 `case let (x, y) where x == y: `
7. 如果用 switch 来控制一个枚举类的时候，需要覆盖到枚举类的所有成员，否则会产生编译错误

### Control Transfer Statements

**控制转移语句**

1. `continue` 与 JavaScript 类似，表示跳出当前循环，进行下一次循环
2. `break` 与 JavaScript 类似，表示立即结束当前循环的执行（即跳出当前循环），由于 switch 语句内不允许为空，所以可以通过使用 `break` 来指明忽略某种情况
3. `fallthrough` 用来标识，在 switch 语句执行完某一匹配情况后，不再直接跳出循环，而是继续执行下一种情况
4. `return`
5. `throw`

**label**

在多层嵌套中，`label` 会非常有用，个人认为这是 Swift 语言一个比较棒的点

通过类似 `labelName: while` 的形式给每个条件判断或者循环打上标记，那么就可以利用控制转移语句，**显示**地控制条件语句的终止 


## 错误处理

错误处理一般针对函数方法，当一个函数遇到错误情况，它会抛出一个错误，这个函数的访问者会捕获这个错误，并作出反应，因此在函数声明时，在其函数名后添加 `throws` 来表明其会抛出错误

不同于其他语言的 `try...catch...` 形式，Swift 使用的是:

```Swift
// 声明函数
func a() throws {
	...
}
do {
	try a()
} catch Error.somethings(let error) {
	b(error)
} catch {
	c()
}
```