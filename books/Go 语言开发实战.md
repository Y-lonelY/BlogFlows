# Go

**大神保平安：**

- Robert Griesemer（罗伯特-格利茨默）是 Google V8, Chubby, HotSpot JVM 主要贡献者
- Rob Pike 是 UNIX, UTF-8, plan9 的作者
- Ken Thompson 是 B 语言, C 语言的作者, UNIX 之父



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
- `rune`，4个字节，表示单个 unicode 字符

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



