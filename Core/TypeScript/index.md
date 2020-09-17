# TypeScript

> TypeScript extends JavaScript by adding types.

本文针对一些重要的知识点进行记录，如果你希望系统地进行学习，你可以从[官方文档](https://www.typescriptlang.org/)开始

之前在开始一个新项目的过程中，一个后端同学希望参与到其中，并且坚持要用 `JavaScript` （其实他都不了解 JavaScript 和 TypeScript，仅仅是厌恶 TypeScript 带来的类型检查），所以我们就从介绍 `TypeScript` 的优势开始！

- The main benefit of TypeScript is that it can highlight unexpected behavior in your code, lowering the chance of bugs.DataTypes



## DataTypes

在 `JavaScript` 内，已经提供了一些原始类型：`boolean`, `bigint`, `null`, `number`, `string`, `symbol`, `object` 和 `undefined`

在此基础上，`TypeScript` 扩展了这个列表：

- `any` allow anything
- `unkonwn` ensure someone using this type declares what the type is
- `never` it's not possible that this type could happen
- `void` a function which returns undefined or has no return value

同时，TypeScript提供了

1. `interface` 和 `type` 两种语法来创建自定义的 type
2. `union` 和 `generics(范型)` 来创建复杂的数据结构

### Union

For example like below:

```js
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

```js
interface GenericTest<Value> {
  get: () => Value
  set: (type: Value) => void
}
```







## Interface

> In JavaScript, some design patterns make it difficult for types to be inferred automatically. 

To cover this case, TypeScript supports an extension of the JavaScript language, which offers places for you to tell TypeScript what the types should be.

就像在 Go 内 `interface` 的语义一样，`interface` 提供了多态的类型验证



