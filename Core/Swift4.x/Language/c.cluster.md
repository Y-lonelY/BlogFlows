<!-- MarkdownTOC -->

- [Cluster](#cluster)
- [Errors](#errors)
- [Thoughts](#thoughts)
- [Q&A](#qa)
	- [Value Types && Reference Types](#value-types--reference-types)
	- [nil && null](#nil--null)

<!-- /MarkdownTOC -->

## Cluster

1. Swift 可以声明数据类型，同时 Swift 内置类型推断，所以一般容易直接推断出的数据类型，比如 bool，不必声明其类型，从而保持代码的简洁性和易读性

2. 布尔类型不能进行比较，即包含布尔类型的元组也不能进行比较

3. 避免在同一行代码内使用多个三元运算符

4. 确保给循环体添加一个显示的循环条件，告诉遍历何时开始，何时结束

5. Swift 内使用双引号，不要使用单引号，否则编译会报错，这点和 Java 类似，不同于 JavaScript-airbnb 规范

6. 在集合（或者其他类型的数据结构）不会发生改变的情况下，通过 `let` 来声明，这样有利于 Swift 编译器的性能优化

7. Swift 内数组的声明方式为 `Array<dataType>` 和简写方法 `[dataType]`，推荐（或者说约定）使用简写方法

8. Set 和 Dictionary 数据类型，因为是无序的，所以其插入元素的次序并不能代表遍历时候的顺序

9. 在 Swift 内 `if` 条件判断，条件体不需要加括号

10. 在 Swift 内约定，定义类或者结构体，相当于定义了一个全新的 Swift 数据类型，用 `UpperCamelCase` 命名规则，定义属性和方法，用 `lowerCamelCase` 命名规则

11. 在实际开发中，变量（或者常量）在声明时，同时声明其类型，加快编译效率


## Errors

1. `Switch must be exhaustive` 枚举条件判断是必须是全覆盖的


## Thoughts

> thinking before coding

1. 声明一个变量或者是一个实例时，需要思考的事情：

	- var or let?
	- Data Types？
	- Value Types or Reference Types?
	- 如果是结构体，是否需要定义初始值（类没有初始化器，无法定义初始值）？


## Q&A

### Value Types && Reference Types

**Swift 内的值类型**

> A value type is a type whose value is copied when it’s assigned to a variable or constant, or when it’s passed to a function

根据官方定义，值类型在被赋值或者作为参数传递时，会先进行拷贝（即申请一块新的内存），将拷贝内容进行传递

实际上，在 Swift 内，所有的简单数据类型都是值类型，同时，枚举和结构体也是值类型

Swift 内的字典是值类型，而 JavaScript 内的 Object 数据类型是类似引用类型（表现在赋值后，改变其中某一属性值，另一个变量的属性值也会被改变）
 
**Swift 内的引用类型**

不同于值类型，引用类型在赋值或作为参数传递时，不会进行拷贝，而是指向同一引用（即同一内存）

注意，可以通过常量来装载引用，此时可以更改引用的属性值等，因为此时更改的是引用的内容而不是常量的值

### nil && null

Swift 内的 `nil` 实际上是一种语法糖

JavaScript 中的 null 特指对象的值未设置，表示缺少标识，指示变量未指向任何对象
