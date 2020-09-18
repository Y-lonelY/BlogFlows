# TypeScript

> TypeScript extends JavaScript by adding types.

本文针对一些重要的知识点进行记录，如果你希望系统地进行学习，你可以从[官方文档](https://www.typescriptlang.org/)开始

之前在开始一个新项目的过程中，一个后端同学希望参与到其中，并且坚持要用 `JavaScript` （其实他都不了解 JavaScript 和 TypeScript，仅仅是厌恶 TypeScript 类型检查所带来的开发成本），所以我们就从介绍 `TypeScript` 的优势开始！

- The main benefit of TypeScript is that it can highlight unexpected behavior in your code, lowering the chance of bugs.
- While the size, scope, and complexity of programs written in JavaScript has grown exponentially, the ability of the JavaScript language to express the relationships between different units of code has not.
- 

如果你是一个初学者，你可以在 [TypeScript Playground](https://www.typescriptlang.org/play/) 上来进行测试和学习🥕



## DataTypes

在 `JavaScript` 内，已经提供了一些原始类型：`boolean`, `bigint`, `null`, `number`, `string`, `symbol`, `object` 和 `undefined`

在此基础上，`TypeScript` 扩展了这个列表：

- `any` allow anything
- `unkonwn` 
  - like you can't predict the user input
  - 用来通知编译器和未来的读者，这个变量可以是任意类型
  - 如果你使用了一个该类型的变量，你可以通过类型判断来进行处理
- `never` it's not possible that this type could happen
- `void` a function which returns undefined or has no return value

同时，TypeScript提供了

1. `interface` 和 `type` 两种语法来创建自定义的 type
2. `union` 和 `generics(范型)` 来创建复杂的数据结构

接下来，我会对一些概念进行选择性地介绍，也许在工作中你已经掌握了它的使用方法，但是你并不清楚它的定义

### Tuple

`Tuple` 允许你声明一个具有特定顺序和数量的类型数组，这意味着你必须按照特定顺序和类型来进行取值和赋值操作

```typescript
let t:[string, number] = ["hello", 1]
// error: Type 'number' is not assignable to type 'string'.(2322)
t = [1, "world"]
```





### Union

For example like below:

```typescript
// define a complex datatype
function testType(value: string | string[]) {
  if (typeof value === 'string') {
    // statement
  } else if (Array.isArray(value)) {
    // statement
  }
}
```



### Generics

For example, we define a generics like below:

```typescript
interface GenericTest<Value> {
  get: () => Value
  set: (type: Value) => void
}

const gen: Generic<string> = {}
```







## Interface

> In JavaScript, some design patterns make it difficult for types to be inferred automatically. 

To cover this case, TypeScript supports an extension of the JavaScript language, which offers places for you to tell TypeScript what the types should be.

就像在 Go 内 `interface` 的语义一样，`interface` 提供了**类似多态**的类型验证



