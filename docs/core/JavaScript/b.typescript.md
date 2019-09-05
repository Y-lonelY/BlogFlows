# TypeScript

> TypeScript 是作为 JavaScript 的一个超集存在，这意味着 JavaScript 中能够使用的方法在 TypeScript 内同样适用

## DataTypes

**基本类型**

```typescript
// 布尔值
let a: boolean = false

// 数字，支持整数，浮点数，其他进制字面量
let a: number = 6

// 字符串 
let a: string = "123"

// 对象，关键字是对象或者像 swift 一样使用 {} 简写，更推荐后者
let a: object = {} 或者 let a: {} = {}

// 数组，可以使用 [] 或者泛型
let a: number[] = [1,2,3] 或者 let a: Array<number> = [1,2,3]
```


**特殊类型**

- `any` 来标记某些变量不需要进行类型检查，相当于后门，用来关闭类型检查
- `void` 表示没有任何类型，通常用来表示函数的返回值
- `null` 和 `undefined` 只能赋值给 void 和它们自身，项目内不太常见
- `never` 表示用不存在的值的类型，例如抛出异常，不会有返回值额函数表达式和箭头函数表达式的返回值类型


**联合类型**

使用 `|` 来分隔基本类型，表示属性为多种类型之一，常见的就是函数形参接受字符串数组或者字符串，例如 `string[] | string`

:::tip
基本类型都是小写
:::


## Interface

接口是 TypeScript 中的一个核心概念，它用来将多个类型声明合并至一个类型声明，并且不必关心接口内属性的组织顺序

**基本使用**

```typescript
/**
 * Interface 内各个属性通过 `;` 进行分隔
 * `[propName: string]: any;` 来添加一个字符串索引签名
 * 表示的是该interface可以有任意数量的属性，并且只要它们不是其他已经定义的属性，那么就无所谓它们的类型是什么
 */
interface Test {
    x: string;
    y?: string;
    readonly z: number;
    [propName: string]: any;
}

let test: Test = {
    x: "x",
    z: "z"
}
test.z = "newz" -> error
```

通过 `readonly` 关键字来标记某个属性为**只读属性**，表示该属性只能在创建时设置值，一旦赋值，则不能再更改

接口内可以通过 `?` 来标记某个属性为**可选属性**，它用来表示该属性不是必须的，两个好处：

- 可以对可能存在的属性进行预定义
- 可以捕获引用了不存在的属性时的错误

**接口添加属性和接口的继承**

```swift
interface A {
    a: number
}

/**
 * 声明同名接口来实现接口的重写
 * 注意区别接口重写，一个是修改原接口定义，一个是创建一个新的接口
 */
interface A {
    b: number
}
let a: A = {
    a: 1,
    b: 2
}

/**
 * 通过 extends 关键字来实现接口继承
 * 继承可以更灵活地将接口分割到可重用的模块里，并且一个接口可以继承至多个接口
 */
interface B extends A {
    c: number
}
let b: B = {
    a: 1,
    b: 2,
    c: 3
}

/**
 * 通过 `implements` 强制类来符合接口定义
 * 比如定义了一个方法，则必须在 class 内实现该方法，属性同理
 */
class C implements A {
    a: 1;
    b: 2;
}
```

## function

注意区分函数类型和函数返回值类型

如下所示，通过一个变量来承载一个匿名函数，需要为该变量设置其函数类型，同时要给该匿名函数的形参和函数返回值设置类型

注意，有默认值的形参，在函数类型时与可选类型属于同类

```typescript
/**
 * 综合用法
 * 在声明函数时需要考虑到输入和输出类型，在JavaScript的基础上，为形参添加类型
 * TypeScript能够根据返回语句自动推断出返回值类型，因此我们通常省略它
 * 如果带默认值的参数出现在必须参数前面，用户必须明确的传入`undefined`值来获得默认值
 * 函数形参的传递顺序，必选参数>带默认值的参数>可选参数
 */
function sum(x: number, y: number = 1, c?: number): number {
    return x + y;
}

let result = sun(1, undefined);

/**
 * 函数表达式
 * 函数类型返回值的关键字是 =>，必须声明返回值类型，如果函数没有返回任何值，则返回值类型为void
 * 不要混淆了 TypeScript 中的 => 和 ES6 中的 =>
 */
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};

// 利用接口定义函数的形状
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source, subString) {
    return source.search(subString) !== -1;
}

/**
 * 在JavaScript里，你可以使用 arguments来访问所有传入的参数
 * 在 TypeScript 内通过 `...restName: string[]` 的形参来接受剩余参数，关键是三点运算符 `...`
 */
function test(first: string, ...restOfName: string[]) {
  return first + " " + restOfName.join(" ");
}
test("a", "b", "c")
```