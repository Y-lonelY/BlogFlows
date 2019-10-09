# ES6

## class

在ES6中，通过 `class` 定义一个类的时候，其通过 `constructor` 构造方法内定义的属性和方法是实例对象自己的，而 `constructor` 外定义的方法和属性则是所有实例对象可以共享的

### super 关键字

ES6 中 `super` 关键字有两种存在形式：

1. 作为函数，即 `super()`

通过 `super()` 调用，super() 代表父类的构造函数，但是其内部 this 指向当前子类实例

这是因为子类本身不具有this对象，而是继承父类的this对象，然后对其进行加工，如果不调用 `super()`，子类就无法得到this对象

ES6的继承机制，实质上是先创造父类的实例对象this，然后再用子类的构造函数修改this

注意：子类的构造函数内必须调用一次super()，且只能在 constructor() 内调用

```js
// new.target 指向当前正在执行的函数
class A {
  constructor() {
    console.log(new.target.name);
  }
}
class B extends A {
  constructor() {
    super();
  }
}
new A() // A
new B() // B
```

2. 作为对象，即 `super`，在普通方法内，指向父类的原型对象（即 `SuperClass.prototype`，可以结合 swift 内 super 来理解，访问超类的方法，属性和下标），在静态方法内，指向父类（即 `SuperClass`）

在子类普通方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类实例

```js
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
  }
}

let b = new B();
b.m() // 2
```