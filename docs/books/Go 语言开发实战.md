# Go 语言开发实战

**大神保平安：**

- Robert Griesemer（罗伯特-格利茨默）是 Google V8, Chubby, HotSpot JVM 主要贡献者
- Rob Pike 是 UNIX, UTF-8, plan9 的作者
- Ken Thompson 是 B 语言, C 语言的作者, UNIX 之父

> 这里主要记录 Go 入门的基础知识，结合 JavaScript 对其中概念进行理解

**Go 的优势：**

1. 简单易学。
2. 自由高效。Go 的变异速度优于 JAVA 和 C++，同时拥有接近 C 的运行效率和接近 PHP 的开发效率
3. 强大的标准库
4. 部署方便。不使用虚拟机意味着，Go 应用可以直接输出为目标平台的二进制可执行文件
5. 原生并发支持。Go 的并发基于 Goroutine，成本更低，可以最大限度地使用 CPU 资源
6. 稳定性强。强大的编译检查，严格的编码规范，提供开发过程中各个生命周期的工具
7. 垃圾回收。Go 内置 runtime 来自动管理垃圾回收



**Install**

- `brew install go && brew info go` 在 Mac 系统下直接安装 Go
- win10 系统，在 [Go 官网](https://golang.org/dl/) 下找到对应的安装包进行下载安装
- `go version` 查看是否安装成功



**package**

Go 内常用的内置包

1. `strings` 是字符串切割、比较等基本操作的包，参考 [Y-lonelY/packages/strings](https://github.com/Y-lonelY/study-go/blob/master/package/strings.go) 
2. `strconv` 是一个字符串转换的包，参考 [Y-lonelY/packages/strconv](https://github.com/Y-lonelY/study-go/blob/master/package/strconv.go) 
3. `time` 提供了时间处理类的函数，参考 [Y-lonelY/packages/time](https://github.com/Y-lonelY/study-go/blob/master/package/time.go) 
4. `math` 提供了基本的数学处理函数和能力，同时你也可以利用 `math.rand` 来生产随机数，参考 [Y-lonelY/packages/math](https://github.com/Y-lonelY/study-go/blob/master/package/math.go) 



## Base



先来看一个 hello world 的小程序

```go
// 定义包名，表示该文件是一个可独立执行的程序
package main
import "fmt"

// 如果存在 init 函数，会优先执行
func init() {
  fmt.Println("init the application!")
}

/**
  1. 每个 Go 应用都有且仅有一个 main 的 pacakge，该 package 包含一个 main 方法
  2. main.go 是 go 应用的入口文件，通过 go run main.go 执行
  3. main 函数既不能带参数，也不能定义返回值
 */
func main() {
	fmt.Println("Hello, World!")
}
```



### Variable

先简单解释一下变量是什么?

变量（关键字为 `var`）是计算机内存储数据的基本单元，变量可以通过标识符访问。其本质是计算机分配的一块内存，用于存放指定数据

在 Go 中，标识符是可以有字母，数字，下划线组成，注意：

- 首个字符不能为数字
- 局部变量如果没有使用在编辑过程时会报错

**Go 内的命名规范及大小写的访问权限**

在 go 内，通过首字母的大小写来确定访问的权限。无论是常量，变量，方法还是结构体的名称，如果首字母大写，则可以被其他的包访问；如果首字母小写，则只能在本包内访问

在结构体内如果字段的首字母大写，则数据可以被解析到（比如 JSON 解析，将结构体作为请求访问的参数）



**声明变量**

Go 内既可以主动声明变量类型，也可以让编译器自动推断类型，具体可以参考 [Y-lonelY/variable](https://github.com/Y-lonelY/study-go/blob/master/base/variable.go) 

Go 内，海象表达式，形如 ` a := 1` 为声明变量的首选形式，但是**它只能被用在函数体内，不可以用于全局变量的声明和赋值**

在 Go 内，未初始化的变量的**默认值**：

- Int, float 类型默认值为 0
- string 类型默认值为空字符串
- boolean 类型默认值为 false
- 函数、指针变量、切片默认值为 nil

**变量多重赋值**

回想一下，在 JavaScript 内，如果需要交换两个变量的值，你需要声明一个临时变量，进行三次赋值过程，才能达到最终目的，但是在 Go 里面，支持多个变量同时赋值

```go
func setValue () {
	// 声明两个变量
	a, b := 1, 2
	// 变量多重赋值，从左到右依次进行赋值
	b, a = a, b
}
```



**匿名变量**

一个函数可能返回多个值，但是不是每个值我们都需要用到，这时通过 `_` 来表示不需要使用的变量，从而减少内存，因为匿名变量既不占用命名空间，也不会分配内存



### Constant

Go 内常量（关键字为 `const`）的数据类型只可以是布尔、数字型和字符串，同样，在声明时也可以忽略类型说明符，交由编译器自动推断。

参考 [Y-lonelY/constant](https://github.com/Y-lonelY/study-go/blob/master/base/constant.go) 进行理解

Go 内没有枚举类型，可以利用常量来模拟枚举

常量组内如果不指定类型和初始值，则默认与上一行非空常量的值一致

`iota` 是 Go 内定义的一个特殊常量值，它在每个 `const` 关键字出现时，都被重置为 0，可以看作是常量组内的常量计数器



### Type of data

相较于 JavaScript，Go 内复杂类型新增的语言类型：切片（slice）、结构体（struct）、通道（channel）、接口（interface）和指针（pointer）

Go 也支持通过反斜杠进行转义，参考 [Y-lonelY/dataType](https://github.com/Y-lonelY/study-go/blob/master/base/dataType.go) 和 [值的格式化打印](https://github.com/Y-lonelY/study-go/blob/master/base/fmt.go) 进行学习

在 Go 内，布尔类型只可以是 `true` 或者 `false`

多行字符串，通过反引号 **`** 进行包裹

字符串内的每一个元素叫做 **字符**，定义字符时使用**单引号**，在 Go 内字符有两种类型：

- `byte`，1个字节，表示 UTF-8 字符串的单个字节的值
- `rune`，4个字节，表示单个 unicode 字符，**如果字符串内涉及到中文，推荐使用 rune，因为 byte 存不下一个汉语文字的 Unicode 值**

这里，拓展一下，计算机是二进制的，字符最终也是转换成二进制保存起来的

- Unicode 就是一个字符集，为每个字符定义了一个用来表示该字符的数字
- UTF-8 规定了对于 Unicode 值的二进制保存方式

再深入一点，在 Go 中， string 是采用 UTF-8 编码的字节切片，因此通过 `len` 函数获取到的是字节个数，`for` 循环遍历输出的也是各个字节，针对字符，通常将 `byte` 转换为` rune` 来解决乱码问题，这意味着任何一个字符都是用 4 个字节来存储 Unicode 值，表示一个汉字需要 2 个字节 



### Type Transform

类似 JavaScript，通过 `T(标识符)` 的形式来进行数据类型的强制转换，T 表示要转换的类型：表达式包括变量、数值、函数返回值等

参考 <a href="https://github.com/Y-lonelY/study-go/blob/master/base/transform.go">Y-lonelY-Transform</a> 进行理解，需要注意的是：

- 整数类型转字符串，会根据 ASCII 字符集去进行对应，而不是直接将 100 转换成 "100"，这点区别于 JavaScript
- 浮点数转换时需要注意每个类型的精度范围，注意精度丢失的问题
- 浮点数转整形，会直接截取整数部分



### Operator

运算符之间空格分隔，其他和 JavaScript 区别不大，注意

- 位运算符
- 指针运算符

```go
func main() {
  // * 指针变量
  var a *int
  var b = 4
  // & 返回变量
  a = &b
}
```



### Conditional Judgement

具体可以参考 [Y-lonelY/Condition-Judge](https://github.com/Y-lonelY/study-go/blob/master/base/condition_judge.go) 进行理解

在 `if` 语句的使用过程中，应该注意以下细节

- 条件语句**不需要**括号进行包裹
- 大括号必须存在
- 左括号必须在 `if` 或 `else` 同一行
- 在 `if` 之后，条件判断语句之前，可以添加变量初始化语句，通过 `;` 进行分隔
- `if...else` 内定义的变量只能在其块内使用，类似 JavaScript 的块级作用域概念

在 `switch` 语句的使用过程中，应该注意以下细节

- 匹配项内无须使用 `break`，因为 Go 语言中默认给每个 `case` 带 `break`
- 可以添加 `fallthrough` 强制执行后面的 `case` 分支，且 `fallthrough` 必须放在 `case` 分支的最后一行
- `case` 和判断条件必须是同类型或最终结果为相同类型的表达式



### Loop

`for` 是 Go 语言中唯一的循环语句，Go 内没有 `while`、`do...while` 循环

参考 [Y-lonelY/loop](https://github.com/Y-lonelY/study-go/blob/master/base/loop.go) 进行理解

基本语法结构通过初试语句、条件表达式和结束语句组成，在 Go 内可以对基本组成进行组合，从而衍生出一些不同的写法

1. 省略初试语句、条件表达式的写法
2. 类 `while` 写法，将结束语句放在循环体内
3. `for` 关键字后无表达式，此时执行无限循环，通过 `break` 跳出循环
4. 通过 `range` 关键字对 array, string 等可迭代对象进行循环，注意与 JavaScript 不同的是 `index && value` 的占位顺序



## Function

函数是组织好的、可重复利用的执行特定任务的代码块。函数是编程语言中一个绕不开的话题。

结合 JavaScript 内的函数进行理解，可以发现一些相似的概念：

- 函数作用域，参看 [Y-lonelY/function/scope](https://github.com/Y-lonelY/study-go/blob/master/function/scope.go) 进行理解
- 函数作为值传递
- 闭包
- 匿名函数
- 递归函数

在 Go 内的函数声明 `func funcname(参数列表)(返回值列表) { 函数体 }`



### 函数传参

函数传参分为**值传递**和**引用传递**，在 Go 内，使用的是值传递，即在调用过程中，会将实参复制后进行传递，不会影响到原内容数据

在 Go 内也可以进行引用传递，即将实参地址进行传递，这样做的好处：

- 指针更轻量，可以降低内存开销、时间开销和性能消耗
- 指针传递可以使得多个函数操作同一个对象

总结一下，Go 内所有的传参都是值传递

- 对于值类型为（int, string, bool, array, struct）的，在函数中无法修改原始值
- 对于值类型为（pointer, slice, map, chan）的，可以修改原始数据





### 函数变量（函数作为值）

在 Go 内，函数也是一种类型，通过 `type` 关键字定义类型，在使用时形如 `int` 等，可以结合 typescript 的 `interface` 进行理解

同一类型的函数，如果形参类型，大小，顺序一致，则输出结果一致

参看 [Y-lonelY/function/asValue](https://github.com/Y-lonelY/study-go/blob/master/function/asValue.go) 进行理解

函数变量的使用步骤：

1. 定义一个函数类型
2. 实现定义的函数类型（的函数）
3. 将其作为参数调用



### 匿名函数

回想一下，在 JavaScript 内，匿名函数机会无处不在

```javascript
// case 1 自执行
(function hello(data) {
  console.log(data)
})("hello world")

// case 2 函数声明时赋值给一个变量，arrow function 尤为流行
const hello = () => { statement }

// case 3 作为回调函数进行参数传递，node 中比较常见 
function hello(str, callback) {
  callback(str)
}
hello('hello world', (str) => { console.log(str) })
```

在 Go 内，匿名函数的使用方法也类似，参考 [Y-lonelY/anonymous](https://github.com/Y-lonelY/study-go/blob/master/function/anonymous.go) 进行理解

匿名函数可以理解为在需要时才被定义的函数，没有函数名，只有函数体



### 闭包

结合 JavaScript 来理解，闭包并不是一个陌生的东西，这里加深几个概念：

1.  闭包是由函数与其相关的引用环境组合而成的实体（**闭包 = 函数 + 引用环境**）。因此，**函数 ≠ 闭包**，函数是可执行的代码块，其在定义之后就不会发生改变，而闭包在运行时可以有多个实例，不同的引用环境和相同的函数表达式可以组合产生不同的实例
2. 函数本身不存储任何信息，闭包具有**记忆性**。因此可以将闭包理解为 `runtime` 的概念
3. **对象是附有行为的数据，而闭包是附有数据的行为**

闭包的优势：

- 模块化，以简单的方式来开发较小的模块，提高开发效率
- 抽象，闭包是数据和行为的组合
- 简化代码



### 可变参数

类似 JavaScript 内的 `arguments` 概念，支持可变参数。在 Go 内，如果一个函数的参数、类型一致，但是个数不定，可以采用可变参数

参看 [Y-lonelY/function/scope](https://github.com/Y-lonelY/study-go/blob/master/function/scope.go) 进行理解

通过三点运算符来表示可变参数，使用可变参数注意以下细节

- 一个函数最多只能有一个可变参数
- 如果参数列表还有其他类型参数，则可变参数应该放在形参最后

```go
// 可变参数实现，形参解构
func varParams(data ...float64) (sum, avg float64, count int)  {
	for _, value := range data {
		sum += value
		count++
	}
	avg = sum / float64(count)
	return sum, avg, count
}

func main() {
	source := []float64{4,5,6}
  // 传递参数解构
	fmt.Println(varParams(source...))
}
```



## ContentType

在 Go 内的集合类型

### Pointer

指针是存储另一个变量的内存地址的变量

例如，变量 a 的值为 6，存储地址为 0x777777，变量 b 值为变量 a 的地址，则 b 指向 a

参考 [Y-lonelY/pointer/define](https://github.com/Y-lonelY/study-go/blob/master/pointer/define.go) 进行理解

在 Go 内：

- 通过取地址符 `&` 来获取变量的内存地址
- 指针不能运算

通过 `var pointerName *pointerType` 来**声明一个指针**，例如 `var p *int = &a`，指针的使用流程：

1. 声明一个指针变量
2. 为指针变量赋值
3. 访问指针变量指向的地址值
4. 获取指针变量指向的变量值，通过 `*` 获取

**空指针**，指的是当一个指针被定义后没有分配到任何变量，其值为 `nil`，通过 `p == nil` 来判断是否为空指针

使用指针的场景：

1. 通过指针修改变量的值
2. 将指针作为函数参数进行传递，作为函数参数传递时，在函数体内，复制一个指针，但是**指针指向的内存没有发生改变**，从而可以实现对传入数据的修改



### Array

数组是**相同类型**的一组数据构成的**长度固定**的序列。与 JavaScript 不同，数组内可以存放不同类型的数据（但是不建议这样做）

因为数组的内存是一段连续的存储区域，因此数组的索引速度非常快，但是数组也有一定的缺陷，就是定义后长度不能改变

基本定义方式 `var 变量名 = [数组长度]数据类型{value}`，比如 `var nums = [2]int{1,2}`

参考 [Y-lonelY/containerType/array](https://github.com/Y-lonelY/study-go/blob/master/containerType/array.go) 进行理解

关于数组定义，注意：

- 数组长度必须大于 0，未初始化的数组不等于 `nil`
- 初始化数组 `{}` 内元素个数不能大于定义的数组长度
- 数组长度在定义时可以忽略，用 `...`（或者不设置） 来让编译器自动计算
- 通过 `len()` 来获取数组长度

在 Go 内，数组并非引用类型（这点区别于 JavaScript），**而是值类型**，这代表将一个数组作为参数进行传递时，会将原始数组复制出一份并分配给新的变量，两者最直观的区别就是，在函数内改变值，原数据是否会发生改变

- 当数组内为引用类型时，比如一个二维数组，如果改变其某项值，仍然会改变原始数据，这点和 JavaScript 一致



### Slice

与 JavaScript 一个很大区别就是，在 Go 内数组的长度不可变。但是在很多场景中，需要动态改变该数组

针对这类场景，Go 提供了另一种内置类型，切片（Slice）来覆盖这个场景。从底层来看，切片引用了数组的对象，因此与数组的语法有很多相似之处

注意，**切片是引用类型**，可以这样理解：切片没有任何自己的数据，它只是底层数组的一个引用，对切片所做的任何修改都将反映在底层数组内

- 修改切片的值时，当多个切片共享同一个底层数组时，对每个元素所做的更改将在数组中反映

切片的数据结构可以理解为一个结构体，这个结构体包含三个元素

- 指针，指向数组中切片指定的开始位置
- 长度，即切片的长度（切片内元素的数量）
- 容量，也就是切片起始位置的长度（从创建切片的索引开始的底层数组中元素的数量）

参考 [Y-lonelY/containerType/slice](https://github.com/Y-lonelY/study-go/blob/master/containerType/slice.go) 进行理解

- 当使用 `append()` 追加元素时，如果容量不够 `(cap-len == 0)` 时，Go 就会创建一个新的内存地址来存储元素
- `copy()` 不会简历源切片与目标切片之间的联系，修改一个不会影响另一个

**初始化**

1. 通过 `var s = []int{1,2,3}` 直接初始化切片
2. 从数组内截取产生切片，语法为 `s = arr[startIndex:endindex]`, 注意**包前不包后**，且 `startIndex` 和 `endIndex` 可以作为缺省值
3. 类似 2，也可以从切片内截取产生切片



### Map

Go 提供内置类型 `Map`，用来形成字典（也叫做集合），在 Go 内，**Map 是引用类型**

参考 [Y-lonelY/containerType/map](https://github.com/Y-lonelY/study-go/blob/master/containerType/map.go) 进行理解

对 `map` 的理解可以基于 JavaScript 的 `object` 和 `map` 进行思考

`Map` 是一种集合，可以对其进行遍历，但是由于 `map` 是由 **hash 表实现**的，因此其并不保证读取顺序

`Map` 长度不固定，通过 `len()` 方法获取其键值对个数，同一个 `map` 中的 `key` 必须唯一

在 `Map` 类型取值过程中，如果 key 不存在时，会得到该 value 值类型的默认值，比如：`string` 类型会返回空字符串，`int` 类型会返回 0，同时 **会返回一个该 key 是否存在的标识**，通过该标识我们可以做一些操作

通过 `delete(m, key)` 来删除指定键值对，通过 `m = make(map[type]type)` 来清空 map



## OOP

面向对象程序设计（`Object Oriented Programming`）是一种对现实世界进行理解和抽象的方法

 理解面向对象的关键点在理解：**属性和行为**

与其他编程语言一个较大的区别就是：其他编程语言大多使用关键字 `class` 来定义封装对象，但是 **Go 并不是一个纯面向对象的编程语言**，在 Go 内，采用更加灵活的结构体来代替类

结构体提供了捆绑数据和方法的行为，Go 虽然没有直接对于继承和多态的实现，但是可以通过匿名字段实现继承，通过接口实现多态，学习 Go 内的面向对象编程，一定要了解：

1. `struct` 结构体
2. `method` 方法
3. `interface` 接口

目前，我是这样理解的 `struct` 用来对应类中的属性（继承和封装的基础），`method` 和 `interface` 共同定义类的行为（多态的实现基础）



### Struct

Go 提供结构体来定义复杂的数据集合，结构体是由一系列相同类型或者不同类型的数据构成的数据集合

参考 [Y-lonelY/oop/struct](https://github.com/Y-lonelY/study-go/blob/master/oop/struct.go) 理解结构体的声明和使用方式

在使用结构体时，应该注意：

1. 在同一个包内，类型名不能重复，类型名用来唯一标识结构体
2. 结构体的属性，也叫字段，必须唯一
3. 同类型的成员属性可以写在一行

这里注意结构体的声明和使用区别：结构体的定义只是一种内存布局的描述，只有当结构体实例化时，才会真正地分配内存，这也意味着只有在定义结构体并且实例化之后才能使用结构体

**结构体是值类型，复制或者传递到函数体内都会重新分配内存**，基于此，我们可以思考一下结构体的深拷贝和浅拷贝：

- 如果结构体不是通过 `new()` 进行实例化，则复制/重新赋值都是深拷贝
- 要实现浅拷贝，可以通过 `new()` 来进行实例化或者对实例的地址进行复制



### Method

参考  [Y-lonelY/oop/method](https://github.com/Y-lonelY/study-go/blob/master/oop/method.go) 理解方法的声明方式和函数的区别 

Go 语言内同时有函数和方法，**方法的本质是函数**，但是它们又存在一些区别：

1. 含义不同。函数是一段独立功能的代码块，可以实现复用；方法用来表示一个类的行为功能，只有该类的对象才能调用
2. 方法有接受者，而函数没有。Go 内方法是一种作用于特定类型变量的函数，类似 JavaScript 中的 `this` 关键字
3. 函数不可以重名，而方法可以。只要接受者不同，方法名可以相同

Go 内在有函数的前提下，还要设计方法的实现，其原因不外乎：

- Go 不是一种纯粹面向对象的编程语言，它不支持类，因此方法意在实现类似于类的行为
- 相同名称的方法可以在不同类上进行定义，这一点很大程度区别于函数，比如你可以对不同形状的图形定义不同的求面积的方式

方法可以随着结构体继承而实现方法继承，即如果匿名字段实现了一个方法，那么包含这个匿名字段的 struct 也可以调用该匿名字段内的方法



### Interface

面向对象语言中，接口用于定义对象的行为。接口只指定对象应该做什么，实现这种行为的方式（实现细节）由对象自己决定

参考  [Y-lonelY/oop/interface](https://github.com/Y-lonelY/study-go/blob/master/oop/interface.go) 理解接口的声明和使用方式，以及和类的多态特性的联系 

`duck typing` 是描述事物的外部行为而不是内部结构，对于动态类型的语言来说，“一只鸟看起来像鸭子，那它就是鸭子”，反之，则归为静态类型语言，比如 Java

以 `Java` 为例，一个类必须显式地声明“类实现了某个接口”，然后这个接口才可以被使用，因此错误往往在编译时就被发现了。但是对于动态类型的语言来说，它并不要求一个类显式地声明它实现了某个接口。但是这样带来的缺陷也是显而易见的：**错误往往要在运行时才能被发现**

在 Go 内，采取了一个折中的办法：

1. 结构体类型 T 不需要显式地声明它实现了接口 I。只要类型 T 实现了接口 I 所规定的所有方法，它就自动实现了接口 I。这样就像动态语言一样省去了很多声明的代码，少了许多使用限制；
2. 将结构体类型的实例显式或者隐式地转换为接口 I 类型的实例 i，这样就可以像静态语言一样，在编译时检验其合法性



## Database

完整的结构化查询语句包括：

| 简称 | 全称                         | 名称         | 用途                                                 |
| ---- | ---------------------------- | ------------ | ---------------------------------------------------- |
| DQL  | Data Query Language          | 数据查询语言 | 从表中获取数据                                       |
| DML  | Data Manipulate Language     | 数据操作语言 | 添加、修改、删除表中的行                             |
| DDL  | Data Define Language         | 数据定义语言 | 创建、删除数据库和表                                 |
| TPL  | Transaction Process Language | 事务处理语言 | 同时执行多条 SQL 的情况                              |
| DCL  | Data Control Language        | 数据控制语言 | 获得许可，确定单个用户和用户组对数据库对象访问的限制 |
| CCL  | Cursor Control Language      | 指针控制语言 | 用于对一个表或者多个表进行单独额操作                 |