<!-- MarkdownTOC levels="1,2,3" -->

- [Importants](#importants)
- [Cluster](#cluster)
- [Enumeration](#enumeration)
    - [声明](#%E5%A3%B0%E6%98%8E)
    - [赋值](#%E8%B5%8B%E5%80%BC)
- [Structures && Class](#structures--class)
    - [声明](#%E5%A3%B0%E6%98%8E-1)
- [Properties](#properties)
    - [Stored Properties](#stored-properties)
    - [Computed Properties](#computed-properties)
    - [Type Properties](#type-properties)
- [Methods](#methods)
- [Subscripts](#subscripts)
- [Inheritance](#inheritance)
    - [声明](#%E5%A3%B0%E6%98%8E-2)
- [🌝Initialization](#%F0%9F%8C%9Dinitialization)
    - [自定义初始化](#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%88%9D%E5%A7%8B%E5%8C%96)
    - [初始化器委托](#%E5%88%9D%E5%A7%8B%E5%8C%96%E5%99%A8%E5%A7%94%E6%89%98)
    - [类的继承和初始化](#%E7%B1%BB%E7%9A%84%E7%BB%A7%E6%89%BF%E5%92%8C%E5%88%9D%E5%A7%8B%E5%8C%96)
- [Deinitialization](#deinitialization)

<!-- /MarkdownTOC -->

> Class and Structures and Enumeration 

## Importants

1. 类型属性（方法，下标）的理解：`static` && `class`

2. 点语法和下标语法的差异

3. 计算属性和下标语法的差异


## Cluster

**内嵌类型** 就是在支持类型中嵌套枚举、类及结构体，从而形成嵌套关系


## Enumeration

枚举为一组相关值定义了一个公共类型，在 Swift 内，枚举类的值可以是任意类型，并且枚举是具有自己权限的一类类型(即每个枚举都定义了一个全新的数据类型)，可以结合 Python 的 enum 集合类进行理解

有个不同点是，在 Swift 内，枚举成员在创建时不会自动分配一个默认的整数值

我的理解：枚举是一种数据类型，其值可以是任意类型，因此在将枚举赋值给变量时，可以省略类型进行声明

### 声明

枚举可以看成是一个特殊的类，所以在声明时，首字母要大写

- 通过 `enum` 关键字来进行声明
- `case` 为其设置枚举类的成员变量
- 通过 `CaseIterable` 来设置枚举类可迭代，在 遍历时，通过 `.allCases` 来取得所有枚举类实例（可以看作一个集合），遵循 `caseIterable` 协议

```Swift
// 声明一个枚举类
enum Brand: CaseIterable {
    case vlone, supreme
    case yezzy
}

// vlone supreme yeezy
for brand in Brand.allCases {
    print(brand)
}

// 获取枚举成员
let vlone = Brand.vlone
```
### 赋值

**关联值**

枚举类型关联值的赋值很简单

1. 在声明时，为各个成员变量声明其数据类型，**注意，一旦为其声明类型，则不再遵循 CaseInterable 协议，这意味着不能再进行遍历**
2. 直接为变量赋值，例如 `let sun = Week.sun(7)`，则此时 sun 被赋值为 sun(7)
3. 如果利用成员变量为之前已赋值变量重新赋值，该变量会保留最新的赋值（重新赋值时可以省略枚举类名，直接用 `.` + 枚举变量表示）

结合赋值的枚举类型的变量，可以利用 `switch` 语句来进行匹配，注意，switch 需要覆盖所有枚举情况，否则会产生错误

**原始值**

枚举类的元素值在声明枚举类时进行定义，通过 `rawValue` 来访问枚举成员的值，例如

```Swift
// 原始值
enum Food: Int {
    case beef = 1
    case chicken = 2
}
// beef
print(Food.beef)
// 1
print(Food.beef.rawValue)
```

原始值不同于关联值，原始值是在枚举类声明时预先填充的，关联值是基于枚举成员其中之一创建新的常量或者变量是设定，并且每次赋值后其关联值可以不同

原始值可以隐式指定，与基本声明方法的区别在于，需要为枚举类指定类型，比如 `enum Week: Int { statements }`

- Int 类型，默认从 0 开始，如果给第一个值显式设置为一个数字，则后面值做 +1 操作
- String 类型，默认原始值为成员变量名

如果一个枚举类已经声明了原始值，那么可以通过值来获取枚举成员，例如 `let sun = Week(rawValue: 1)`，其返回值是一个可选类型，即如果可以找到枚举成员，则返回该成员，否则返回 nil


## Structures && Class

类和结构体是程序的基础，在 Swift 中，不需要为自定义的类和结构体创建独立的接口和实现文件，系统会自动生成面向其他代码的外部接口

类的实例被称为对象

类是引用类型，而结构体是值类型

通过 `.` 语法来访问实例内的属性

通过 `===` 和 `!==` 来判断两个变量是否引用自同一实例

**类和结构体的共同点**

1. 定义属性来存储值，定义方法来提供功能，通过下标语法来访问值和方法
2. 定义初始化器用于初始化状态
3. 可扩展，即添加属性和方法
4. 遵循协议来针对特定类型提供标准功能

**类相比结构体，特有的功能**

1. 类可以继承另一个类的特征
2. 类型转换可以在运行时检查和解释类实例的类型
3. 反初始化器允许一个类实例释放任何其所被分配的资源
4. 引用计数允许不止一个对类实例的引用

在实际开发中领悟，当前 mark

### 声明

类通过 `class`，结构体通过 `struct` 关键字来进行声明

类似函数调用，通过 `()` 来创建一个类/结构体实例，此时实例的任何属性都被初始化为其默认值

**所有结构体都有一个自动生成的初始化器**，因此结构体可以在初始化实例时，来为类的属性设置初始值，例如 `let instance1 = Screen(width: 1000)`，但是类不行，类不会接受默认的成员初始化器，类的初始化器通过 `init()` 来声明

类比 ES6 的 `class` 和 Python 的 `class`，在声明时有一点不同的是，ES6(constructor) 和 Python 都需要构造函数来定义属性，而在 Swift 内直接可以通过为变量赋值来定义

JavaScript：

```JavaScript
// 通过 this 来赋值
class Eye {
	constructor {
		this.size = 1
	}
}

let eye = new Eye();
// 1
console.log(eye.size)
```

Python:

```Python
# 利用 self 来赋值
class Eye:

	def __init__(self, size):
		self.size = size

eye = Eye(1)
# 1
print(eye.size)
```

Swift:

```Swift
class Eye {
	var size: Int = 1
}

var eye = Eye()
// 1
print(eye.size)
```

## Properties

在 Swift 内属性分为三类：存储属性，计算属性，类型属性

存储属性：类，结构体
计算属性：类，结构体，枚举

### Stored Properties

类或者结构体内定义的常量和变量就是存储属性

注意，由于结构体是值类型（当一个值的类型被定义为常量时，该实例的其他属性也均为常量），所以如果其实例通过 `let` 来声明的话，不能再更改其存储属性，而类是引用类型，所以可以对其存储属性重新赋值

存储属性允许在声明时为**无值**，即声明该属性为可选类型，在创建实例时，该属性会自动分配 `nil` 作为默认值，表明当前还没有值

**延迟存储类型**

通过 `lazy` 关键字来表明一个存储属性是延迟存储属性，其初始值在其第一次使用时才进行处理，而不是在声明时就进行处理

注意，延迟存储属性必须为变量（即通过 var）来声明，`lazy var width = Width()`，因为常量必须在初始化后有值，而延迟存储属性可能没值

延迟存储属性使用的场景一般是：一个属性的初始值可能依赖于某些外部因素，而这些外部因素只能在实例初始化完成之后才能取得，比如存储属性的值是一个类的实例，需要等类完成初始化之后，才可以取得，此时就是使用延迟存储属性的好时机

#### properties Observers

属性观察者，有点类似 Vue 或者 React 声明周期的意思，属性观察者会观察属性变化情况，并作出反应，可以类比JavaScript的 `Object.defineProperty` 来进行理解，观察者为：

1. `willSet` 会在值被存储之前调用，新的属性值会以常量形式参数进行传递，默认使用 newValue
2. `didiSet` 会在一个新值被存储之后调用，包含旧属性值的常量形式参数会被传递，默认使用 oldValue

除了延迟存储属性外，可以为任意**存储属性**添加属性观察者，这意味着不能为计算属性添加属性观察者，其已有 `set` 和 `get` 方法

如果将一个拥有属性观察者的属性，传递给一个输入输出形参的函数，其 `willSet` 和 `didSet` 一定会被调用

### Computed Properties

计算属性能够被定义在类，结构体和枚举，它实际并不存储值，而是通过 `get && set` 方法，利用存储属性来获取和改变值

计算属性必须声明为变量，因为其值能够改变

一些简写：

1. `get` 简写，如果整个 getter 是一个单一表达式，可以省略 return 
2. `set` 简写，如果没有设置变量来承接传参，则默认用名为 `newValue` 的变量来承接，即 `set(newValue)` 可以简化成 `set`
3. 如果一个计算属性只有 getter 方法，即该属性是只读的，则可以去掉 `get` 关键字和他的大扩号来简化只读计算属性的声明

```Swift
// 计算属性
struct HalfScreen {
    var screen = Screen()
    var half: Screen {
        get {
            let width = Int(screen.width / 2)
            let height = Int(screen.height / 2)
            return Screen(width: width, height: height)
            // return Screen(width: Int(screen.width / 2), height: Int(screen.height / 2))
        }
        
        set(newValue) {
            screen.width = newValue.width * 2
            screen.height = newValue.height * 2
        }
    }
}

var halfScreen = HalfScreen(screen: Screen(width: 800, height: 800))
var half = halfScreen.half
// Screen(width: 400, height: 400)
print(half)
halfScreen.half = Screen(width: 1600, height: 1600)
// Screen(width: 3200, height: 3200)
print(halfScreen.screen)
```
### Type Properties

类型属性用来标志该属性绑定在类，结构体或者枚举上，而不是它们的实例上

一般属性都是绑定在实例（或者对象）上，一旦你创建了这个实例，就会对其属性进行拷贝，而类型属于绑定在类型（类，结构体，枚举本身就是一种数据类型）上，无论创建多少个实例，都只有一个拷贝，类似C中的静态变量

通过 `static` 关键字来标记类型属性，在 class 中，还可以通过 `class` 关键字来允许子类重写符类的实现

**类型属性的访问和设置都是基于类（结构体，枚举）本身，而不是其实例**

## Methods

在 Swfit 内，你可以为类，结构体，枚举来定义方法，方法和属性概念相似，一个是关联特定类型的值，一个是关联特定类型的函数

**实例方法**

实例方法是属于特定类（结构体或枚举）的函数（比如对实例属性进行增删改查），实例方法默认可以访问类中其他的方法和属性

通过 `.` 语法来调用实例方法

默认情况下，结构体和枚举（因为它们是值类型）的实例方法不能更改实例属性，可以通过在实例方法前添加 `mutating` 来允许这种行为，Swift 称其为 **方法异变**，可以在方法异变的方法内 1.直接修改实例属性，2.通过 self 来调用自身，从而间接改变实例属性

**self**

每一个实例（或者对象）都绑定一个 self 属性，类似 JavaScript 类中的 `this` 或者 Python 类中的 `self`，它指向实例本身，从而可以调用实例中的其他方法和属性

self 关键字一般不可以省略，因为可能存在实例属性和函数形参同名的情况

**Type Method**

类型方法，类似类型属性，绑定在类（结构体或者枚举）上，通过 `static` 来标示其为类型方法，通过 `class` 来允许子类重写父类对该类型方法的实现


## Subscripts

下标通常用在集合，列表或者字典内元素的快捷方式，同时，下标语法也可以使用在类（结构体和枚举）中，来提供合适功能，有点类似计算属性

- 声明的关键字是 `subscripts(形参)-> Type {...}`
- 取值的关键字是 `[实参标签]`

**注意不要将下标语法和点语法混为一谈**，例如

```Swift
struct HalfScreen {
    var screen = Screen()
    var half: Screen {
        get {
            let width = Int(screen.width / 2)
            let height = Int(screen.height / 2)
            return Screen(width: width, height: height)
            // return Screen(width: Int(screen.width / 2), height: Int(screen.height / 2))
        }
        
        
        set(newValue) {
            screen.width = newValue.width * 2
            screen.height = newValue.height * 2
        }
    }
    
    subscript (two times: Screen) -> Screen {
        return Screen(width: times.width * 2, height: times.height * 2)
    }
}

var halfScreen = HalfScreen(screen: Screen(width: 800, height: 800))
// Screen(width: 400, height: 400)
var half = halfScreen.half

// 下标语法
print(halfScreen[two: Screen(width: 800, height: 800)])
```

可以看出下标语法和点语法：计算属性的值通过点语法来获取，而下标语法通过 `[]` 来取值

下标类似函数，可以接受任意数量和类型的传参，同时返回任意类型，下标可以使用变量形参和可变类型形参，**不可以使用输入输出形参和为形参提供默认值**

可以通过 `static` 或者 `class` 来将下标语法绑定到类（结构体或枚举）上，称为类型下标，就像类型属性，类型方法一样


## Inheritance

在面向对象中，继承是基本概念，即一个类可以从另一个类中继承其属性，类型和方法，从而形成父子类的关系，在 Swift 内，类可以对特定的属性方法，下标进行重写，也可以向继承的属性添加属性观察器，从而监听其值的改变

整个继承的概念可以参考 ES6 的类的继承来理解

**基本概念**

基类：任何不从另一个类继承的类就是基类
子类：基于现有类创建的类

**访问**

通过 `self` 关键字来访问本身，类似JavaScript中的`this`
通过 `super` 关键字来访问父类

### 声明

子类继承的常用格式：

```Swift
class SubClass: SuperClass {
    statements
}
```

**重写**

通过 `override` 关键字来重写实例方法，属性或者下标脚本的实现，通过这样的方式来向 Swift 说明，这不是一次意外重新声明而是一次重写

通过 `final` 关键字来阻止重写，可以在属性，方法，下标脚本的关键字或者整个类型前添加 `final` 来阻止子类对其进行重写

不能给继承来的常量存储属性和只读的计算属性添加属性观察器，这些属性不能被设置


## 🌝Initialization

初始化是为类（结构体和枚举）准备实例的过程，通过定义初始化器来实现初始化的过程，Swift 的初始化器不返回值

在创建类（或者结构体）实例时，**存储属性** 必须有合适的初始值

**init()**

初始化器通过 `init()` 关键字来实现，它在创建实例时被调用，类和结构体都适用，只不过结构体可以自动生成初始化器，而类需要手动 `init()`

如果一个属性一直保持相同的初始值，则此时更好的方式是直接声明而不是在初始化器内赋值，因为这样代码更加清晰

一个类（或者结构体）内可以有多个初始化器

### 自定义初始化

自定义初始化实际就是通过一个或者多个定义形参，接受不同的参数的 `init()` 来实现初始化

初始化器虽然与函数类似，但是由于没有函数名来区分，所以此时只能通过初始化器的形参来辨别使用哪个 `init()`，因此，如果需要通过传递参数来实现初始化，一定要设置形参，当然也可以通过 `_` 语法来表明该初始化器不需要实参标签

### 初始化器委托

初始化器可以调用其他初始化器来执行部分实例的初始化，这个过程就是初始化器委托，目的是减少代码冗余

初始化器委托对于值类型和引用类型有着不同的表现，其主要区别在于值类型不能继承，而引用类型可以继承，因此会更加复杂

**值类型的初始化器委托**

很简单，就是当定义多个 `init()` 时，可以在其中某个 `init()` 内通过 `self.init()` 来调用其他的 `init()`，从而达到对值进行初始化的目的

### 类的继承和初始化

在初始化时，类的所有存储属性（包括继承来的属性）都必须声明一个初始值，Swift 为类定义了两种初始化器来确保这个过程：指定初始化器和便捷初始化器

指定初始化器是类的主要初始化器，一个类通常只有一个指定初始化器

便捷初始化器是次要的，为一个类的支持初始化器，如果不需要可以不定义

其语法分别为：

```Swift
// 指定初始化器，与值类型的简单初始化器一致
init(parameters) {
    statements
}

// 便捷初始化器，需要 convenience 关键字来声明
convenience init(parameters) {
    statements
}
```

**调用规则**

1. 指定初始化器必须总是向上委托
2. 便捷初始化器必须总是横向委托

对于调用规则的理解就是，便捷初始化器是在同一个类中进行委托，而指定初始化器是基类或者继承自父类

**两段式初始化**

所谓两段式初始化就是：

1. 第一阶段为每一个存储属性被引入类，并分配初始值
2. 第一阶段完成后，开始第二阶段，每个类能够在新的实例使用之前来定制其存储属性

Swift 通过四种检查来确保两段式初始化的有效执行：



## Deinitialization

类的实例同样可以实现一个反初始化器，它会在这个类的实例被释放之前执行任意的自定义清理




