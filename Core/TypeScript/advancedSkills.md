# TypeScript - Advanced - Part II

> Typed JavaScript at Any Scale.

TypeScript 提供一系列高级的用法来对类型进行建模，本文就是希望对其适用的**场景**和**解决方案**进行探索

在开始之前，请确保你已经掌握了 TypeScript 的[基础知识](./index,md)



## Type Guards

现在我们思考一下，在 TypeScript 内：

- 什么是 Type Guards ?
- 什么场景下我们需要使用 Type Guards ?
- 如何使用 Type Guards ?

毫无疑问，`union` 在 TypeScript 内为我们提供了很多便利，但是我们需要确定当前的值是哪个确切类型，并且在正确的时机使用其属性和方法时，`union` 就显的不那么“友善”了

[Type Guards](https://github.com/Y-lonelY/study-typescript/tree/master/advance/typeGuards.ts) 就是为了解决这类问题

> A type guard is some expression that performs a **runtime check** that guarantees the type in some scope.

**我理解 `Type Guards` 是在 runtime 时执行类型检查的表达式（简单来说就是区分类型的手段），目的就是区分当前的变量类型，一般利用不同类型中字段差异来实现**

我们从如下例子开始

```typescript
interface SuperMan {
  age: number
  power: boolean
}

interface IronMan {
  age: number
  tech: boolean
}

let man: SuperMan | IronMan = {
  age: 12,
  power: true
}
```

那么问题来了，如何确定 man 是 SuperMan 还是 IronMan，从而使用不同类型内的属性呢?

1. 通过 `in` 操作符结合不同类型变量的**字段差异**来进行判断，如下所示

```typescript
// in poerator
if ("power" in man) {
  // ok
  console.log(man.age)
  // error: Property 'tech' does not exist on type 'SuperMan'
  console.log(man.tech)
}
```

2. 如果你确切知道该变量的类型，可以使用 `as` 来进行断言，**但是通常不建议这么做**

```typescript
let temp = man as SuperMan
console.log(temp.power)
```

3. 自定义的类型判断方法，通常返回一个 `boolean` 

```typescript
function isSuper(man: SuperMan | IronMan): man is SuperMan {
  return (man as SuperMan).power !== undefined
}

if (isSuper(man)) {
  console.log('man is superMan')
} else {
  console.log('man is ironMan')
}
```

4. 通过 `typeof` 关键字来判断类型。但是其作用范围有限：`undefined`, `number`, `string`, `boolean`, `bigint`, `symbol`, `object`, `function`，这种通常用于基本类型的判断
5. 通过 `instanceof` 通过构造函数来缩小判断范围



### Type Assertions Operator

TypeScript 内也提供 `?`, `??` 和 `!` 操作符来进行类型的断言，从而达到类型判断的目的（注：ES2020 也推出了一样的语法）

从使用方法上很好理解，现在我们来看看各个操作符是如何实现的？

```typescript
// `?` operator
const len = a?.length
// after compiling
// void 0 === undefined
var len = a === null || a === void 0 ? void 0 : a.length;

// `??` operator
const len = a ?? b
// after compiling
var len = a !== null || a !== void 0 ? a : b

// `!` operator
const len = a!.length
// after compiling
var len = a.length
```



## Type Alias

`type` 和 `interface` 在用法上有太多相似之处，但是它们也存在一些微妙的区别，这也正是我们需要弄清楚的

- TypeScript 推荐优先使用 `interface` 来自定义类型，因为 `interface` 更加贴近 JavaScript 内的 `object` 用法
- 理论上，`interface` 的所有特性，`type` 都能够实现
- `type` 能够命名其他需要手写的类型，比如 `type MyNumber = number`

它们最大的区别在于继承方式和定义方式的不同，`type` 不能被重复定义，其属性扩展方式也不同于 `interface`，参考[Y-lonelY/InterfaceVsType](https://github.com/Y-lonelY/study-typescript/blob/master/advance/interfaceVsType.ts)

我们先来看看 `type` 的使用方式，我们从定义行为、继承方式和重复定义的行为来进行比较

```typescript
// define a type
// `=` is required
type Person = {
  name: string
}

// type extend Person
type SpiderMan = Person & {
  age: number
}

// error: Duplicate identifier 'SpiderMan'.
type SpiderMan = {}

let a: SpiderMan = {
  name: 'ylonely',
  age: 18
}
```

再来看看 `interface` 的使用方法

```typescript
// define interface
interface Animal {
  name: string
}

// extend to Animal
interface Panda extends Animal {
  age: number
}

interface Panda {
  weight: number
}

let p:Panda = {
  name: 'kitty',
  age: 18,
  weight: 100
}
```



## Index Type

索引类型通常用在范型中，它的两个关键点：

- `keyof` 索引搜索操作符，将类似对象的属性转换成 `union` 类型
- `O[K]` 索引访问操作符，用来访问属性值，编译器会根据返回值自动判断类型

其语法类似 object，我们通过一个例子来进行观察：

```typescript
// 这里利用 keyof 来获取所有的键
function get<T, K extends keyof T>(o: T, targets: K[]): T[K][] {
  return targets.map(item => o[item])
}

interface Indexs {
  a: string
  b: number
}

let a: Indexs = {
  a: 'a',
  b: 7
}

// res type will be recongnized as union type: (string | number)[]
let res = get(a, ['a', 'b'])
```

其实这也很好理解，对于 `index type` 我们只需要将关注线放在键/值上，通过 `keyof` 获取键，通过 `T[K]` 获取值

回想一下，在 JavaScript 内，键有两种类型：`string` 和 `number`，比如 `a["5277"] or a[5277]`，当我们需要定义一个接受任何属性名的对象时，我们通常利用 `{[key: string | number]: any}` 来表示一个值为任何类型，键为字符串或者数字的 object



## Conditional Types

条件类型的标准形式为: `T extends U ? X : Y` ，它表示：如果 U 能够被分配给 T（暂时理解成 U 是 T 的一个成员），则返回 X，否则返回 Y

比如官网上的一个例子：

```typescript
decalare function f<T extends boolean>(x: T): T extends true ? number : string

// correct
f(true)

// error: Argument of type 'number' is not assignable to parameter of type 'boolean'.
f(1)
```

- 如果 x 为一个 number 类型，则其无法被分配给 boolean 类型，会直接抛出编译错误

- 如果 x 为 true，则函数返回值类型为 `number`，否则为 `string`

思考一下这种设计的目的？

基于这种模式，我们可以结合范型，通过改变范型的形参 `T` ，达到同一个入口进入，返回不同的 `type` 的效果

**注意，这种方式不同于 union**

