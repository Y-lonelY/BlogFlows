# JavaScript 内的奇技淫巧

> 记录开发和解题过程中“惊艳”的小技巧



## 位运算的应用

[位运算](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)在实际开发过程中可能运用的较少，但是掌握并在特定场景运用它，是一件很有成就感的事情

### &（与运算）

& 运算表示相同位上都为 1 时，运算结果为 1

通常我们用 `num % 2 === 0` 来判断数字奇偶， 然而 `&` 运算符为我们提供另一种思路

因此，如果任意一个数 `& 1` 的话，原数为奇数，则运算结果为 1，否则为 0，利用此特性也可以用来进行奇偶判断

```javascript
// 66 & 10 = 2
   100 0010 
+  000 1010
=  000 0010

// 12 & 1 = 0
   1100
+  0001
=  0000

// 11 & 1 = 1
   1011
+  0001
=  0001
```



### ^ （异或运算）

`^` 运算符表示，当相应的比特位上有且仅有一个 1 时，结果为 1，否则为 0

异或运算有一个特性，就是 `a ^ b ^ b = a` ，利用这个特性我们可以：

- `[1,2,3,2,1]` 如果快速找出独立的那个数字：对每项进行异或运算即可
- 将 `b` 作为公钥，就是一个简单的加密算法

```javascript
// 7 ^ 16 = 23
   0 0111
+  1 0000
=  1 0111

// 23 ^ 16 = 7
   1 0111
+  1 0000
=  0 0111
```





## Operator

### void

`void expression` 运算符用来对给定的表达式进行求值，然后返回 `undefined`

**通常利用 `void 0` 来获取 `undefined` 的原始值**

```typescript
// TypeScript `?` operator
let a = a?.length
// after compiling
var a = a === null | a === void 0 ? void 0 : a.length

// 阻止默认行为
<a href="javascript: void(0)">hello</a>

// 用来确保返回值为 undefined, 防止泄漏，防止返回值改变导致非预期的副作用
button.onclick = () => void doSomething()
```

