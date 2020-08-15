<!-- MarkdownTOC levels="1,2" -->

- [现代化](#%E7%8E%B0%E4%BB%A3%E5%8C%96)
- [安全](#%E5%AE%89%E5%85%A8)

<!-- /MarkdownTOC -->

> Swift5 Learning Story

## 现代化

现代化中的几个点，先 mark 一下，在后续编码工作中去深刻理解:

1. 命名参数以简节语法表示

2. 推断类型让代码更加简节且不易出错

3. 模块提供名称空间

4. 内存采用严谨的确定性引用计数来自动管理，最大程度降低了内存使用量，且不会产生垃圾回收开销

所谓现代化，我的理解就是，语言的设计理念富有前瞻性，能够提供方便，简化代码，同时保证功能强大

## 安全

Swift 是如何从设计层面确保安全性？

1. 从数据类型上来看：
	- 变量在使用前，会始终先进行初始化
	- 数据和整数会进行溢出检查

2. 内存将进行自动管理，强制式独占访问内存功能可以用来防范很多编程错误

3. 通过语法控制：
	- 默认情况下，Swift 对象类型不能定义为 nil，这样做的目的是防止 app 出现大规模运行时崩溃
	- Swift 提供一项新语法--可选类型，通过强制使用 `?` 语法来兼容需要用到 nil 的情况