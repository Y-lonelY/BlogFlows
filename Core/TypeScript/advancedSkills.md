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

**我理解 `Type Guards` 是在 runtime 时执行类型检查的表达式，目的就是区分当前的变量类型，一般利用不同类型中字段差异来实现**

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

