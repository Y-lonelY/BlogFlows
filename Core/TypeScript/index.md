# TypeScript

> TypeScript extends JavaScript by adding types.

本文针对一些重要的知识点进行记录，如果你希望系统地进行学习，你可以从[官方文档](https://www.typescriptlang.org/)开始

之前在开始一个新项目的过程中，一个后端同学希望参与到其中，并且坚持要用 `JavaScript` （其实他都不了解 JavaScript 和 TypeScript，仅仅是厌恶 TypeScript 类型检查所带来的开发成本），所以我们就从介绍 `TypeScript` 的优势开始！

- The main benefit of TypeScript is that it can highlight unexpected behavior in your code, lowering the chance of bugs.
- While the size, scope, and complexity of programs written in JavaScript has grown exponentially, the ability of the JavaScript language to express the relationships between different units of code has not.
- 

如果你是一个初学者，你可以在 [TypeScript Playground](https://www.typescriptlang.org/play/) 上来进行测试和学习🥕



## DataTypes

> 🌼 We encourage the use of `--strictNullChecks` when possible!

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
3. `as` 通过断言来告诉编译器 `trust me, I know what I’m doing.`

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

Typescript 内的一个核心法则就是：类型检查专注于值具有的类型，类似 `duck typing` 的概念，“如果它走路像鸭子，叫的像鸭子，那么它就是鸭子”

`interface` 作为 TypeScript 新设计的类型，它可以用来描述 JavaScript 内丰富且灵活的类型，为此，它提供了一些很棒的特性：

1. **readonly**
   - 一些属性只有在创建的时候才能够被修改，这时候可以通过 `readonly` 来实现，同时 `TypeScript` 提供 `ReadonlyArray<T>` 类型来处理不可变数组
   - 🌼：声明**不可变属性**时，使用 `readonly` ，当声明一个**不可变变量**时，使用 `const`
2. **过多属性检查**
   - 传递的属性内含有 `interface` 内未定义的属性则会触发 TypeScript 内的过多属性检查，即对传递属性的数量、类型（不包括顺序）进行检查
   - 首选的解决方案：TypeScript 提供了一个好的解决方案 `[propname: string]:any` 来允许任意键值对
   - 同时，通过断言也可以来绕过这种类型检查，同时还有一种比较 hack 方法，将值赋值给一个新的变量来进行传递也可以对该类型检查进行规避
   - 此外，`[index: number]: string` 可以用来表示可索引类型，你应该熟悉 `index` 签名模式，它在开发过程中确实能够带来很多便利
3. 一个 `interface` 可以通过 `extends` 关键字来延伸**多个** `interface`，比如 `interface A extends B,C {}`



## Functions

> TypeScript also adds some new capabilities to the standard JavaScript functions to make them easier to work with.

TypeScript 提供了两种方式来支持 `Function` 类型检查

1. 为每个参数添加类型，同时返回一个类型

```typescript
const add = (x: number, y: number): number {
  return x + y
}
```



2. 编写一个函数类型，此时必须通过 `=>` 来指定 `return` 类型

```typescript
const add: (x: number, y: number) => number = (x: number, y: number) {
  return x + y
}
```



### 形参

在 TypeScript 中，会默认检查每一个形参。这点很明显不同于 JavaScript，在 JavaScript 内，你可以传递任意属性的形参，对于函数内未定义的形参，会被赋值为 `undefined`

在 TypeScript 内，我们可以使用 `?` 关键字 、默认值以及 Rest Parameters（可以看作是无限数量的可选参数） 来进行更加灵活的配置，但是有一些点需要注意：

- 一般将 `?` 表示的可选参数放在参数列表的最后
- 默认值参数可以放在形参列表的任意位置，传参时通过 `undefined` 进行占位
- 在 JavaScript 内，可以通过 `arguments` 来获取传参，TypeScript 同样提供这样的能力，即通过 `(...restOfName: string[])` 这种模式，可以收集那些剩余参数到一个变量内

### 关于 this

> Arrow functions capture the `this` where the function is created rather than where it is invoked

在 TypeScript 内，可以开启 `--noImplictThis` 来通知编译器去检查 `this` 在定义时可能出现的问题

如果没有显示地定义 `this` 类型，会默认其类型为 `any`，因此你可以通过显示地定义 `this` 的类型来避免一些错误

```typescript
interface Demo {
  name: string
  setName(this: Demo): () => void
}
```



### overloads

一个有趣的特性，由于 JavaScript 本质上是一个相当动态的语言，因此一个函数通常可以接受不同类型的参数并且输出不同类型的结果

这个时候，我们如何为函数添加类型验证呢？来看一个官网的例子：

```typescript
// these two are overloads
function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
// this not the overload
function pickCard(x: any): any {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the card
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  // Otherwise just let them pick the card
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}
```

编译器会根据顺序依次进行匹配，因此，通常将复杂的 overloads 放在前面



## Union

个人认为，`union` 是 TypeScript 内一个非常棒的特性，它提供了极大的便利性和兼容性，在学习官方文档的时候，它的一个特性让我对它有了更多的想象，它就是 `Discriminating Unions`

- 这里插一句，TypeScript 同样提供 `&` 关键字（**An intersection type combines multiple types into one**）来对多个类型进行合并操作

```typescript
interface TestA {
    name: "a"
    age: number
}

interface TestB {
    name: "b"
    surname: string
}

interface TestC {
    name: "c"
    height: number
}

type Person = TestA | TestB | TestC

function testPerson(data: Person) {
  	// Property 'age' does not exist on type 'Person'.
  	// Property 'age' does not exist on type 'TestB'.(2339)
    console.log(data.age)
  	
  	// 我们可以利用**文本类型**来进行判断
  	switch (data.name) {
        case 'a': {
            console.log(data.age)
            break
        }
        case 'b': {
            console.log(data.surname)
            break
        }
        case 'c': {
            console.log(data.height)
            break
        }
    }
}
```



## Classes

如果你厌烦了在 JavaScript 内通过函数和原型的方式来创建组件，那么通过类来创建是一个不错的尝试！

我们先从一个简单的例子开始：

```typescript
class Person {
    name: string

    constructor(message: string) {
      	// if you haven't define the name, you will get error
      	// Property 'name' does not exist on type 'Person'.(2339)
        this.name = message
    }

    say() {
        return `hello, ${this.name}`
    }
}

// 通过 extends 关键字来实现继承
class SuperMan extends Person {
    age: number
    
    constructor(name: string) {
        super(name)
        this.age = 10
    }
  	// a case to override the say()
     say () {
          console.log("override the say function")
          return super.say()
      }

      fly() {
          return `${this.name} can fly at the age of ${this.age}`
      }
}

const p1 = new Person("xiaoming")
```



注意：

- 前置成员变量，表示其有成员访问权限，比如上面例子的 `name` 属性
- 在 TypeScript 内，在调用 constructor 内的其他属性之前，必须**强制执行** `super()` 方法