# TypeScript - Basic - Part I

> Typed JavaScript at Any Scale.

![mask](/Users/yango/github/blog/BlogFlows/Core/assets/ts.png)



本文针对 TypeScript 的基础知识进行查漏补缺（可能有些特性你已经在项目内熟练使用了，但是并不清楚它的实际意义和处理方式），如果希望系统地进行学习，你可以从[官方文档](https://www.typescriptlang.org/)开始!

一些题外话：前段时间，在开始一个新项目的过程中，一个后端同学希望参与到其中，并坚持要用 `JavaScript` （相信这种情况只是少数，其实他都不了解 JavaScript 和 TypeScript，仅仅是厌恶 TypeScript 所带来的学习成本），所以这里我们就从介绍 `TypeScript` 的优势开始！

- The main benefit of TypeScript is that it can highlight unexpected behavior in your code, lowering the chance of bugs.
- While the size, scope, and complexity of programs written in JavaScript has grown exponentially, the ability of the JavaScript language to express the relationships between different units of code has not.
- By understanding JavaScript, TypeScript saves you time catching errors and providing fixes before you run code.

简而言之就是，TypeScript 能够在增强代码的健壮性和可读性的同时，降低其可维护成本，尤其是维护一个大型项目时，其优势更为明显！

TypeScript 并不是“洪水猛兽”，我们可以**Gradual Adoption(逐步采用)**，从一些简单的文件开始进行学习和开发！

![](/Users/yango/github/blog/BlogFlows/Core/assets/TypeScriptBasic.png)

🥕如果你是一个初学者，强烈推荐在 [TypeScript Playground](https://www.typescriptlang.org/play/) 上来进行测试和学习



## DataTypes

> 🌼 We encourage the use of `--strictNullChecks` when possible!

在 `JavaScript` 内，已经提供了一些原始类型：`boolean`, `bigint`, `null`, `number`, `string`, `symbol`, `object` 和 `undefined`

在此基础上，`TypeScript` 开发了一些扩展的类型来处理不同的场景：

- **any** 允许任意类型，主要用于兼容第三方库 
- **unkonwn**
  - `like you can't predict the user input`
  - 用来通知编译器和未来的读者，这个变量可以是任意类型
  - 如果你使用了一个该类型的变量，你可以通过类型判断来进行处理
- **never** 用来表示一个不可能出现的值类型，通常用在错误处理
- **void** 用于函数没有任何返回值或者返回值为 `undefined`，`return null` 会报错噢



### Tuple

`Tuple` 应该是开发过程中经常用到的一个类型，它允许你声明一个具有特定顺序和数量的类型数组，这意味着你必须按照特定顺序和类型来进行取值和赋值操作

```typescript
let t:[string, number] = ["hello", 1]
// error: Type 'number' is not assignable to type 'string'.(2322)
t = [1, "world"]
```



### Enums

TypeScript 在其 handbook 内花了一章的篇幅来介绍 [`enums`](https://www.typescriptlang.org/docs/handbook/enums.html#computed-and-constant-members)，以至于我想了解一个**枚举**类型为何有如此魔力

- 它相对于 JavaScript 具备哪些特性？
- 它在开发时能够为我们提供何种便利？

`enums` 允许开发者定义一系列的命名常量，这有助于阅读代码和创建一组不同的案例，先来了解[基本特性](https://github.com/Y-lonelY/study-typescript/tree/master/enums/basic.ts)，**注意 `enums` 的成员变量命名首字母大写**

对于枚举的特性，主要是取值，看一下它的编译文件就很清楚了：

```typescript
// define a easy enums case
enum Hello {
  A,
  B,
  C
}

// after compile
var Hello;
(function (Hello) {
   // Hello["A"] = 0 返回值为 0，这一步的操作，最后输出 Hello {"A": 0, 0: "A"}
    Hello[Hello["A"] = 0] = "A";
    Hello[Hello["B"] = 1] = "B";
    Hello[Hello["C"] = 2] = "C";
})(Hello || (Hello = {}));
```



`emuns` 结合 `keyof` 关键字可以生成一个字符类型的 union，其参数为 `enums` 内的成员变量的名字，参考[transfer-to-union](https://github.com/Y-lonelY/study-typescript/tree/master/enums/transfer-to-union.ts)进行理解，这个特性挺棒的，期待在项目内进行实践



---



此外，`TypeScript` 提供了一些很酷的东西：

1. `interface` 和 `type` 两种语法来创建自定义的 type
2. `union` 和 `generics(范型)` 来创建复杂的数据结构
3. `as` 通过断言来告诉编译器 `trust me, I know what I’m doing.`



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



## Generics

范型和枚举一样，是为数不多的，原生 JavaScript 不具备的特性

> A major part of software engineering is building components that not only have well-defined and consistent APIs, but are also reusable.
>
> Components that are capable of working on the data of today as well as the data of tomorrow will give you the most flexible capabilities for building up large software systems.

范型的设计和实现就是为了解决组件复用的问题，我理解它就是一种抽象，类似函数：接受输入的参数（类型），做一定转换后，输出相应的类型

来看下面这个例子，我们希望定义一个函数，并且保证其输入类型和输出类型保持一致

- 如果参数类型只有一种，我们可以直接用该类型来规约
- 如果输入/输出类型不止一种，你可能会想到用 `union` 或者 `any` 来做这件事，但是这些手段并不能够保证其一致性

所以，看看范型是怎么做的：

```typescript
// 定义一个函数，并且通过范型来保证输入类型和输出类型一致
function test<T>(args: T): T { return args }

// 调用这个函数，当然你也可以省略 `<string>`，将类型推断交给编译器去处理
// 基础类型推荐省略的写法，复杂的类型推荐显示指定
let t = test<string>("hello")

// 定义一个函数类型
interface GenetateTest<U> {
  (args: U): U
}
// 同时，我们也可以这样做
// 弄清楚范型签名放的位置，会给我们提供极大的便利
interface GenetateOtherTest {
  <U>(args: U): U
}
let t2: GenerateTest = t
```



使用范型一个提供了极佳的抽象，但是同时也导致了一些问题，实际上，可以理解 `<T>` 为任意值，但是有些属性只属于特定类型的值，这里就会产生冲突，为此 TypeScript 提供了一些约束条件来保证程序的运行，参考 [Generics Constrait](https://github.com/Y-lonelY/study-typescript/tree/master/generic/constrait.ts) 进行理解





## Union

个人认为，`union` 是 TypeScript 内一个非常棒的特性，它提供了极大的便利性和兼容性，在学习官方文档的时候，它的一个特性让我对它有了更多的想象，它就是 `Discriminating Unions(辨别组合)`

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



## Classes

> A class declaration creates two things: a type representing instances of the class and a constructor function!

如果你厌烦了在 JavaScript 内通过函数和原型的方式来创建组件，那么通过类来创建是一个不错的尝试！

我们先从一个[简单的例子](https://github.com/Y-lonelY/study-typescript/blob/master/classes/define.ts)开始

在这个例子中，我们需要注意：

- 前置成员变量，表示其有成员访问权限
- 在 TypeScript 内，在调用 constructor 内的其他属性之前，必须**强制执行** `super()` 方法

Class 在被声明时会产生两个动作：

1. 创建一个代表类实例的类型，因此可以支持 `interface extends classes` 的写法
2. 创建一个构造函数



### 成员属性

和其他强类型语言一项，TypeScript 内的类也具有成员属性的概念，它提供 `public`、`private`、 `proteced` 以及 `readonly` ，默认为 `public`

这里比较特殊的是 `private`，TypeScript 既支持 ECMAScript 的语法（`#`）也有自己的语法（`private`）

- 相较之下，`#` 的写法内置在 JavaScript 的 runtime，因此它能够更好地保证私有字段的隔离
- `private` 的特点在于，即使两个类一模一样，但是只要包含 `private` 字段，则它们在类型判定上是不相等的，参考 [Y-lonelY/private](https://github.com/Y-lonelY/study-typescript/blob/master/classes/private.ts) 进行理解

关于 `protected` 总结了一些点，具有可以参考 [understanding-protected](https://www.typescriptlang.org/docs/handbook/classes.html#understanding-protected) 来进行理解

- 父类内定义的 `protected` 属性，可以在其子类中进行访问，但是其实例（子类和父类的实例）不能访问
- 如果对父类的构造函数添加 `protected` 标志符，则不能将其进行实例化


### Todo

- Advanced Features
- Compile Configs


**Thanks for reading, solo with code!🍁**