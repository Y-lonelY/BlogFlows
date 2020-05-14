<!-- MarkdownTOC -->

- [面向对象编程](#%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%BC%96%E7%A8%8B)
	- [访问限制](#%E8%AE%BF%E9%97%AE%E9%99%90%E5%88%B6)
	- [class && instance](#class--instance)
- [切片](#%E5%88%87%E7%89%87)
- [迭代](#%E8%BF%AD%E4%BB%A3)
- [列表生成式](#%E5%88%97%E8%A1%A8%E7%94%9F%E6%88%90%E5%BC%8F)
- [generator](#generator)
- [迭代器](#%E8%BF%AD%E4%BB%A3%E5%99%A8)
- [枚举](#%E6%9E%9A%E4%B8%BE)
	- [枚举类](#%E6%9E%9A%E4%B8%BE%E7%B1%BB)
	- [面向对象和面向过程](#%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E5%92%8C%E9%9D%A2%E5%90%91%E8%BF%87%E7%A8%8B)
	- [继承和多态](#%E7%BB%A7%E6%89%BF%E5%92%8C%E5%A4%9A%E6%80%81)
	- [@property](#property)
	- [多重继承](#%E5%A4%9A%E9%87%8D%E7%BB%A7%E6%89%BF)
	- [定制类](#%E5%AE%9A%E5%88%B6%E7%B1%BB)
- [函数式编程](#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B)
	- [高阶函数](#%E9%AB%98%E9%98%B6%E5%87%BD%E6%95%B0)
	- [装饰器](#%E8%A3%85%E9%A5%B0%E5%99%A8)

<!-- /MarkdownTOC -->

> Advanced Features

## 面向对象编程

面向对象中需要重点理解两个东西：类（class）和实例（instance）

就比如：人是一个class，人具有年龄，爱好等属性，同时人可以制造工具或者进行其他活动，这可以视为人的属性和方法，而地球上的每一个人就是人这个类的 instance

类是抽象的模版，实例是类的具体表现

面向对象的**核心思想**是抽象出 class，再利用 class 创建出 instance

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

'wakatime scripts'

__author__ = 'Y-lonelY'

import json
import requests

class Person(object):
	# 普通成员变量
	url = 'https://wakatime.com/api/v1/users/current/summaries'
    cache = True
    # 私有成员变量
    __api_key = 'xxx'

    def __init__(self, start, end):
        self.start = start
        self.end = end

    def getData(self):
    	try:
    		print(self.start)
    	except Exception as e:
    		raise
    	else:
    		pass
    	finally:
    		pass

    # 通过 classmethod 来声明静态方法，通过 cls 来取代 self
    @classmethod
    def get_lang_sql(cls, lang, date):
    	# statement

if __name__ == "__main__":
	person = Person('2019-10-10', '2019-10-20')
	person.getData()

```

### 访问限制

限制访问的目的在于不让类外部方法随意更改类的内部属性，保护内部状态

类比私有属性的概念，关键字为 `__`，比如 `self.__name`，这样实例对象就不能访问到 `__name` 这个属性，这个属性仅在类的内部使用

可以通过内部定义的 `get || set` 方法，将私有变量返回或者修改

写法比较

- `_name` 这种写法，在类外部是可以访问的，但是它按照python习惯，表示“可以访问，但是不要随意改变”

- `__name__` 表示特殊变量，在类外部是可以访问的

### class && instance

python 中的类通过 `class` 关键字声明，类的完整声明 `class Person(object):` 表示 person 这个类继承至 object，**注意**，所有的类本质上都继承至 object

通过 `__init__(self, params)` 来约定创建实例时，强制需要传入的参数，作用是将属性绑定到 `self` 上，`__self__` 就是实例本身，不用传入，且默认为第一个参数，可以类比 es6 的 `constructor()` 方法

通过 `self` 是给类的生成实例绑定属性，在类里面直接声明变量就是直接给类绑定属性，如果绑定了同名的属性，python3 会优先选择实例属性，所以一般不要声明同名属性

数据封装：因为实例在声明时就已经有了声明的数据，所以可以直接在类的内部去访问这些数据，而没必要去再在外部通过函数去访问（这意味着你需要维护实例初始化的数据，来随时作为参数传入函数）

**注意**

1. class 的名字第一个字母约定为大写
2. 类中定义方法的第一个参数必须是 `self`，可以类比 javascript 中的 `this` 关键字，指向实例本身
3. 与 javascript 不同之处之一在于：python 中创建一个实例不需要使用 `new` 关键字



## 切片

切换用于取 list 或者 tuple 部分元素

切片操作符（slice）可以用于 str(str 也可以看成一个 list), list, tuple

截取出来的元素类型由原元素决定，这里需要注意例如 “params[-1:] 和 params[-1]” 的区别在于返回值类型不同

可以通过 `[:]` 直接复制原list

`[n:m:i]` 这样的写法表示从原 list 的 n-m 范围内，每隔 i 取一次值


## 迭代

python 中只要是可迭代的对象都可以通过 `for...in...` 来遍历，比如字符串，list，dict

通过引入collections模块的Iterable类型判断对象是否可以迭代

通过内置方法 `enumerate(list)` 可以把list转换成键值对的形式


## 列表生成式

通过列表生成式，可以直接创建一个列表，但是由于内存限制，列表容量有限，对于仅用访问部分元素却要创建一个大数据量元素的列表，很容易会造成资源浪费

关键表达式：`[表达式 for i in item 判断条件]` 可以读作：for i in item，根据判断条件对 i 进行筛选，然后将 i 代入表达式得到计算结果，return 出最终结果，其中 for 循环可以存在多个(相当于嵌套循环)

列表生成式，所以其关键字为 `[...]`


## generator

生成器针对列表生成器的缺点，提出了一种更好的解决方案：generator 不必创建完整的 list，它的机制是一边循环一边计算，通过算法推算出下一个元素

生成器的关键字为 `(...)` 或者 `yield`

通过 `next(generator)` 可以计算出生成器下一个元素值，直到计算到最后一个元素，抛出 `StopInteration` 错误，不过 `next()` 几乎不会用到

generator 是一个迭代器，所有通过可以通过迭代方法来遍历，而不需要关心 `StopInteration` 错误

`yield` 关键字用在函数方法中，表示该函数是一个生成器

包含 `yield` 的 generator 与函数最大的区别在于执行机制

- 函数会按照顺序依次执行，直到 return 或者执行到最后一行语句返回，直接返回结果
- generator 遇到 `yield` 返回，遇到 `next()` 语句继续执行，且从上次返回的 `yield` 语句出开始，返回一个 generator


## 迭代器

可迭代对象（Interable）和迭代器（Interator）:

- 可以直接迭代（for循环遍历）的对象就是可迭代对象
- 不但可以迭代，还可以被 `next()` 函数调用的就是迭代器
- Interator 一定是 Interable，反之却不一定成立

生成器就是一个迭代器，迭代器的计算是惰性的，只有在需要时才会计算下一个数值，因此它可以用来表示一个无限大的数据流，只是不知道其长度

通过 `list()` 来强制计算 Interator 并返回一个 list

通过 `iter()` 来将 Interable 转换成一个 Interator

python3 的 for 循环本质上是通过 `iter()` 函数结合 `next()` 来实现的


## 枚举

枚举类是用来管理同类型不同值的常量的定义

Python 提供 `Enum` 关键字来实现枚举类，通过枚举类型来定义一个 class 类型，这个 class 不可改变，每个常量都是这个 class 的唯一实例，实现方法很简单：

```Python
from enum import Enum

Month = Enum('Month', {'Jan', 'Feb', 'Mar'})

# 获取枚举值
for name, menber in Month.__members__.items():
	# statements
```

枚举类的 `value` 默认从 1 开始赋值给各个变量，如果想要自定义枚举类型的值，可以通过从 `Enum` 派生出自定义类：

```Python
from enum import Enum, unique

# @unique 用来帮助检查是否有重复值
@unique
class Week(Enum):
	Sun = 0
	Mon = 1
```

通过 `Week.Sun` 和 `Week.Sun.value` 来访问枚举常量和值

### 枚举类

枚举类的作用就是将一组相关常量定义在一个 class 中

枚举类的声明方法有两种：

1. 通过 `Enum(classname, tuple)` 方法直接生成，相当于调用 `Enum` 类的 `__call__()` 定制方法，其 `value` 从 1 开始累加

2. 通过继承 `Enum` 类来实现枚举类，此时可以利用装饰器 `unique` 来保证没有重复值


### 面向对象和面向过程

面向过程的程序设计是把计算机程序视为**一系列的命令集合**，维护的是其执行顺序

面向对象的程序设计是把计算机程序视为**一组对象的集合**，维护的是消息在对象之间的传递

面向对象的抽象程序要比函数高，因为一个class既包含数据，又包含操作数据的方法


### 继承和多态

在面向对象中，一个类可以直接从另一个类中继承，形成子类与父类（或者说超类）的关系，子类会继承父类的所有属性和方法

子类可以重写父类方法，python 会优先执行子类方法

**在 python 中创建一个类，实际上就是创建了一个数据结构**，可以通过 `isinstance(instance, class)` 来判断

多态：因为类实际上定义了一种数据类型，所以我们可以在函数中将 instance 作为参数传入，从而可以直接调用父类的方法，而不必关心子类如何定义

“开闭原则”：

- 对扩展开放：允许新增子类
- 对修改封闭：不需要修改依赖父类实现的方法，子类即可调用

作为动态语言 python 的特别之处，**鸭子类型**：

- 在静态语言中，规定传参为 class，则必须为 class 或者其子类，否则报错
- 对于动态语言，只需要你传入的对象内也定义了某个方法，则可以执行完整的方法。即“看起来像鸭子，走起路来像鸭子，则它就是鸭子”


### @property

`@property` 可以理解为类的“装饰器”，它用于将一个**方法变成属性**调用，这样做的目的是避免通过 `__init__()` 方法定义的属性直接暴露出去，从而被任意修改，保证对参数进行必要的检查

`@property` 通过对变量进行赋值操作，完成对方法的传参操作


### 多重继承

在设计类的继承关系时，一般都是主线单一继承，但是如果需要混入额外的类的功能时，则需要用到多重继承，关键字是 `MixIn`

MixIn 的目的就是给一个类增加多个功能，这样可以避免设计出多层次的复杂继承关系，有效减少代码的复杂性和冗余

一般在以 `classnameMixIn` 的形式来定义 MixIn 类


### 定制类

python3 中通过定义形如 `__xxx__` 的方法来表示一组在 class 中有特殊用途的函数，用来帮我们定制类

实际表现就是，python3 定义了一批函数名，然后用户为其添加具体方法，最终在实例以某种形式就可以调用其函数方法，目的是为了让实例调用方法更加简单

如果没有定义这些特殊方法，python3 就会按照之前定义的执行

1. `__str__()` 在用户在调用 `print(Instance)` 时执行此

2. `__repr__()` 在直接打印 Instance 时调用，区别于 `__str__()` 它是为调试服务

3. `__iter__()` 方法返回一个迭代对象，使 Instance 能够作为迭代对象被 `for...in` 循环，同时还需要定义一个 `__next__()` 方法，使每次迭代时都调用此方法来返回下一个值，直到遇到 `StopInteration` 错误时退出循环

4. `__getattr__()` 方法用于实例调用属性或者方法时，如果原先没声明而直接使用就会调用该方法，利用 `__getattr__()` 结合返回函数可以生成**链式方法**

5. `__call__()` 用来直接调用实例，就像调用函数一样，本质上函数和类是同类，可以通过 `callable()` 方法来判断函数还是实例，因为如果一个对象能够被调用，那么它就是一个 **Callable对象**


## 函数式编程

一个命名函数可以理解为：函数名为一个指向函数方法的变量

函数式编程就是指高度抽象的编程范式

### 高阶函数

一个函数（A）可以接受另一个函数（B）作为传参，则该函数（A）为高阶函数，有点像 JavaScript 中的回调函数

类似 JavaScript，python 内建的 `map()`, `reduce()`, `filter()` 就是典型的高阶函数，不过需要注意，其返回值是迭代器，所以一般通过 `list(Interator)` 将其转换为 list

高阶函数不仅可以接受一个函数作为参数，同时可以将函数作为返回值返回，所以高阶函数可以理解为**接受函数作为传参或者返回值的一类函数**

匿名函数关键字为 `lambda`

匿名函数有个限制，就是只能有一个表达式，不要写 `return`，返回值就是该表达式的结果

### 装饰器

举个例子：让一双 yeezy 具有防水功能，一个思路是添加各种科技，这可能会使 yeezy 变得不再轻便和耐看，更聪明的办法是套上一层鞋套。此时，yeezy 还是 yeezy，这层鞋套就相当于装饰器，在不改变 yeezy 的情况下，为其添加了防水功能

装饰器可以理解为函数增强的实现，它在不改变原函数的情况下，为其增加功能，不同于java纯面向对象的编程，python 装饰器是基于返回函数实现的，本质上，python 装饰器的返回值也是一个函数对象

> “在面向对象（OOP）的设计模式中，decorator 被称为装饰模式。OOP 的装饰模式需要继承和组合来实现，但是 python3 除了支持 OOP 的装饰器外，还可以直接从语法上支持（即函数编程）装饰模式”

decorator 的关键字为 `@xxx`，`@` 是 python3 的语法糖，实际作用就是将函数的引用重新赋值

`wrapper(**args, **kw)` 是装饰器函数的标准写法，目的是为了 `wrapper()` 函数能够接受任何参数的调用

为了防止依赖函数签名的代码执行出现错误，通常通过 `@functools.wraps(func)` 来将原始属性写入新的函数中

`functools.partial()` 偏函数，起作用就是更改一个函数的原始默认值，同时返回一个新的函数

