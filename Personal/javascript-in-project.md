---
title: javascript-in-project
date: 2018-05-20 19:00:02
tags: ["javascript"]
top: 98
---

<img src="../../../../images/skin/javascript.jpg">

> Knowledge is about mastering, not understanding.

<!--more-->

### 离线应用

### Object-Oriented

对象的基本定义：无序属性的集合，其属性可以包含基本值、对象或者函数

#### 对象属性

对象有两种属性：数据属性和访问器属性

0. 公共属性

`[[Configurable]]` : 表示该属性是否可配置，具体体现为是否可以通过 delete 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性，默认值为 true

`[[Enumerable]]` : 表示能否通过 `for-in` 循环返回属性，默认值为 true

1. 数据属性：数据属性包含一个数据值的位置，在这个位置可以读取和写入值，数据属性有4个描述其行为的特性

`[[writable]]` : 表示能否修改属性的值，默认值为 true

`[[Value]]` : 包含这个属性的数据值，读取属性值的时候，从这个位置读，写入属性值的时候，把新值保存在这个位置，默认值为 undefined

2. 访问器属性：访问器属性不包含数据值，它会包含一堆 `getter` 和 `setter` 函数，在读取访问器属性时，会调用 getter 函数，这个函数负责返回有效的值；在写入访问器属性时，会调用 setter 函数并传入新值，这个函数负责决定如何处理数据

`[[Get]]` ： 在读取属性时调用的函数，默认值为 undefined

`[[Set]]` : 在写入属性时调用的函数，默认值为 undefined

要修改属性默认的特性，必须使用 `Object.defineProperty()` 方法

#### Object.defineProperty()

`Object.defineProperty()` 接受三个参数： 属性所在的对象、属性的名字以及一个描述符对象，描述符对象通过对象封装，里面的属性为对象属性

```javascript
var person = {};
// 再对 name 属性进行配置或者赋值会抛出错误
Object.defineProperty(person, 'name', {
  configurable: false,
  value: 'ylone'
  })

// 定义其 get 和 set 方法
Object.defineProperty(person, 'name', {
  get: function(){},
  set: function(){},
  })
```
一个有趣的事实是：IE8是第一个实现 `Object.defineProperty()` 方法的浏览器版本，然而，其实现不彻底：只能在DOM对象上使用，且只能创建访问器属性，所以不要在IE8及其之下版本使用该方法

通过 `Object.getOwnPropertyDescriptor()` 方法可以取的给定的属性描述符，其接收参数为属性所在对象和要读取其描述符的属性名称

#### 创建对象

通过对象字面量来创建单个对象的明显缺点在于：使用同一个接口创建很多对象，会产生大量重复的代码。所以JavaScript需要构建一种类似Java类的方法。

工厂模式：用函数来封装以特定接口创建对象的细节

```javascript
function createObject(name, age) {
  var obj = {};
  obj.name = name;
  obj.age = age;
  obj.say = function(){
    console.log(this.name);
  };
  return obj;
}
var person = createObject('ylone', 25);
```

构造函数模式，与工厂模式的区别在于：没有显式地创建对象；直接将属性和方法赋值给this对象；没有return语句；函数名以大写字母开头；使用 `new` 操作符创建实例

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.say = function() {
    console.log(this.name);
  }
}
var person = new Person('ylone', 25);
```

原型模式

[ES6中的class](http://es6.ruanyifeng.com/#docs/class)

### 判断数组和对象

```javascript
var obj = {};
var arr = [];
```
1. 通过 `obj(arr) instanceof Array` 来判断，会分别返回 false 和 true

2. 通过ES5数组对象的方法 `Array.isArray(obj||arr)`，会分别返回 false 和 true

3. 我自己观察得到的，Object.length 属性始终为 `undefined`，而 Array.length 则会返回一个数值，但是这样不好之处在于，如果 `Object` 内自定义了 length 属性，则会引起麻烦

### 浏览器渲染

当你在浏览器内输入一个URL后，会发生什么？

这个问题我觉得可以从两个方面来看：一是计算机网络，二是浏览器的渲染过程。计算机网络可以从DNS解析、TCP建立连接、HTTP获取响应数据以及Cookie去理解。这里主要记录从浏览器渲染过程去理解。

#### 渲染关键路径

浏览器接收到服务器封装并返回的字节数据，将其进行解析并转换为像素的过程被称为渲染关键路径，缩短浏览器页面渲染时间的一个思路就是缩短渲染关键路径

1. 处理HTML标记数据并生成DOM树

2. 处理CSS标记数据并生成CSSOM树

3. 将DOM数和CSSOM树合并生成渲染树

4. 遍历渲染树，计算每个节点的位置信息，进行布局

5. 将每个节点绘制到屏幕

以上的步骤是一个**渐进**的过程，为了提高用户体验，渲染引擎会试图更快呈现渲染结果，这意味着它不会等到所有的HTML文件都被解析完才创建并布局渲染树，它会将先获得的文档内容进行渲染（注意要生成渲染树）

DOM树的构建过程是一个深度优先遍历过程：当前节点的所有子节点都构建好后才会去构建当前节点的下一个兄弟节点

DOM（Document Object Model）文档对象模型，用来描述文档的结构与内容

CSSOM（Cascading Style Sheets Object Model）层叠样式表对象模型，用来描述对文档应用的样式规则

浏览器将字节数据解析成树结构（CSSOM以及DOM树）的过程：字节数据(Bytes) > 语义化字符(Characters) > 令牌(Token) > 节点对象(Nodes) > 对象模型(DOM)

在 chrome 中可以利用开发者工具的 `performance > Event log` 来观察一个页面的渲染细节

想要渲染出页面，就需要将DOM树和CSSOM树结合起来，生成渲染树。浏览器会从DOM树的根节点开始遍历每个可见节点（注意`display:none`和`visibility:hidden`区别，前者不渲染，后者渲染），并找到其对应的CSS样式规则

结合盒子模型，计算每个节点在窗口内的确切位置和大小，也就是布局阶段，布局阶段输出的是一个盒子模型，它会精确捕获每个元素在屏幕内的确切位置和大小，所有相对的测量值也会被转换为屏幕内的绝对像素值

#### 回流和重绘

`reflow`： 回流，当浏览器发现某个节点的变化（比如元素的尺寸，位置，隐藏等）影响了布局，会重新构建受到影响的渲染树（受影响节点对象大于1）

`repaint`: 重绘，元素的改变不会引起整体布局的改变，比如改变元素的背景，颜色等时，仅仅更新元素的属性（受影响节点对象等于1）

<i style="color: #e52325">回流必将引起重绘，重绘不一定会引起回流</i>

现代浏览器会对频繁的重绘和回流进行优化： 浏览器会维护一个队列，把所有引起回流和重绘的操作放入队列中，如果队列中的任务数量或者时间间隔达到一个阈值，浏览器就会进行一次批处理并清空队列。但是在遇到诸如 `clientWidth`、`offsetWidth`、`scrollWidth`、`width`、`getComputedStyle()`以及`getBoundingClientRect()` 等属性或者方法时，会强制清空队列

优化思路：

CSS：

 - 更改子节点元素样式

 - 将动画效果应用到 `position` 属性为 `absolute` 或者 `fixed` 的元素上

JavaScript：

 - 避免频繁操作元素或者元素样式，参考组件化思想，一次写好再进行添加操作

 - 对于复杂动画的元素使用绝对定位，使其脱离文档流，否则会引起其他元素频繁地回流和重绘

 - 缓存会引起浏览器清空队列的属性值

#### 阻塞渲染

这里需要明确一点，JavaScript中通过 `<script>` 引入脚本不是因为其 `src` 属性，而是因为它可能会改变DOM树和CSSOM树

CSS：通过 `<link>` 的 `href` 属性引用，会阻塞渲染，但是不会阻塞HTML文件的解析，这意味着，直至CSSOM树构建完毕，才会生成渲染树

JavaScript: 通过 `<script>` 的 `src` 属性引入，会阻塞HTML解析，其他下载线程以及渲染线程

所以，`<img>` 虽然通过 `src` 属性引入，但是不会阻塞HTML的解析，它会按照正常流程，通过渲染树渲染，如果此时图片还未下载完成，则会等待其下载完成后才渲染

优化思路：

CSS:

 - 设置媒体类型或者媒体查询，使其在特定条件时渲染（会加载但是不会阻塞）

JavaScript：

 - 通过匿名调用函数或者 `window.onload` 方法加载脚本

 - 将 `<script>` 标签放在文档底部

 - `defer` 属性改变脚本的执行时机

 - `async` 属性改变脚本的执行时机

`defer` 属性表示延迟引入脚本，在 `defer-script` 脚本加载的过程中不会阻塞HTML的解析，并且在document解析完成，且所有 `defer-script` 脚本引入完之后，再执行 `defer-script`，且会按照代码顺序执行（也就是说执行阶段会在最后）

`async` 属性表示异步引入脚本，在 `async-script` 脚本加载的过程中不会阻塞HTML的解析，但是一旦 `async-script` 脚本准备就绪，就会立即执行，且谁先加载完谁先执行


### 事件

JavaScript和HTML之间的交互是通过事件实现的。需要了解的几个关键点：事件流，事件处理程序，事件委托

#### 事件流

事件流描述的是从页面接收事件的顺序

IE的事件流是事件冒泡流，即事件开始时由最具体的元素接受，逐级向上传递到最不具体的节点（Document）

Netscape的事件流是事件捕获流，即越不具体的元素越早接收到事件

DOM事件流：**DOM2级事件**规定的事件流应该包含三个阶段：事件捕获阶段、处于目标阶段以及事件冒泡阶段。多数支持DOM事件流的浏览器都实现了一种特定的行为：即使 **DOM2级事件** 明确要求在捕获阶段不会涉及事件目标，但是现在主流浏览器都会在捕获阶段触发对象上的事件，这样造成的结果就是，有两个机会在目标对象上操作事件

#### 事件处理程序

事件就是用户或者浏览器自身执行的某种动作，而响应某个事件的函数就叫做事件处理程序（或事件侦听器）。为事件指定处理程序的方式包括：HTML事件处理程序，DOM0级事件处理程序，DOM2级事件处理程序以及IE事件处理程序

大多数情况下，都是将事件处理程序添加到事件流的冒泡阶段，这样可以最大限度地兼容各种浏览器

---
**HTML事件处理程序**

某个元素支持的每种事件，都可以使用一个与相应事件处理程序同名的HTML特性来指定，可以理解为通过设置元素标签的属性来指定事件处理程序

```javascript
<input type='button' value='Click Me' onclick='try{show();}catch(ex){}'>
```

三个缺点：

1. 存在时差问题，因为用户可能在HTML元素一出现的页面就触发相应的事件，但是如果此时事件通过 `<script>` 来承载，可能脚本还没有下载、编译或者执行，那么就会引发错误，这时的一个优化方法就是如上所示，通过 `try-catch` 语句来封装代码，以便使错误不会浮出水面

2. 不同的JavaScript引擎遵循的标识符解析规则会有差异，可能会在访问作用域内变量时出错

3. HTML会与JavaScript代码紧耦合，那么如果需要修改事件处理程序的话，需要同时修改两个地方

---
**DOM0级事件处理程序**

通过JavaScript指定事件处理程序的传统方法，就是将一个函数赋值给一个事件处理程序属性。这种方式添加的事件处理程序会在事件流的冒泡阶段被处理

```javascript
var btn = document.getElementById('myBtn');
btn.onclick = function() {
  console.log(1);
};
// 删除事件处理程序
btn.onclick = null;
```
缺点在于，元素在页面上优先渲染，如果这段JavaScript代码块在其之后下载、编译和执行的话，就会有一段按钮点击无效

---
**DOM2级事件处理程序**

DOM2级相比DOM0级事件处理程序的区别在于，它有两个方法，`addEventListener()` 和 `removeEventListener()`。所有的DOM节点都包含这两个方法，且它们接受三个参数：要处理的事件名、作为事件处理程序的函数以及一个布尔值

```javascript
var btn = document.getElementById('myBtn');
function handle() {
  console.log(1);
};
btn.addEventListener('click', handle, false); // false 表示在冒泡阶段调用事件处理程序，true 表示在捕获阶段调用事件处理程序
btn.removeEventListener('click', handle, false);
```
可以通过 `addEventListener()` 为同一个对象绑定多个事件处理程序，且按照其绑定顺序执行

通过 `addEventListener()` 添加的事件处理程序必须通过 `removeEventListener()` 来移除，且所传参数一样

注意，这里事件处理程序必须为命名函数，匿名函数将无法移除

---
**IE事件处理程序**

IE实现了DOM中类似的两个方法：attachEvent() 和 detachEvent() 

```javascript
var btn = document.getElementById('myBtn');
var handle = function() {
  console.log(1);
};
btn.attachEvent('onclick', handle);
btn.detachEvent('onclick', handle);
```

在IE中使用 `attachEvent()` 与使用DOM0级事件处理程序的区别在于，其作用于不同，DOM0级作用域在其所属元素的作用域内（this为当前元素），而IE事件处理程序会在全局作用域下运行（this为window）

使用 `attachEvent()` 也可以连续绑定多个事件处理程序，但是其执行顺序与绑定顺序相反

#### 事件委托

在JavaScript中，添加到页面上的事件处理程序的数量会直接影响页面的性能：

1. 每个函数都是对象，都会占用内存，内存中的对象越多，性能就越差

2. 必须事先指定所有的事件处理程序，会延迟整个页面交互的就绪时间

针对事件处理程序过多的一个解决办法就是事件委托，事件委托就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件

另一个优化事件处理程序过多的思路是及时清除那些空事件处理程序

### Cookie && Session

实际上，在计算机网络中已经对Cookie的实现及其运行机制学习，这里补充几点：

 - Cookie 的 maxAge属性（单位秒，int，默认为-1）决定着 Cookie 的有效期，如果其值为正数，则在指定值后失效；如果为负数，则为临时Cookie，关闭浏览器即失效；如果为0，表示删除该Cookie

 - W3C标准的浏览器会阻止JavaScript都写任何不属于自己网站的Cookie，同时，可以设置Cookie的secure属性为true，则浏览器只会在HTTPS&&SSL等安全协议中才会传递Cookie

下面重点介绍Session，Session是服务器端使用的一种记录客户端状态的机制，使用比Cookie更加简单，但是相应的会增加服务器的存储压力。在客户端访问服务器的时候，服务器会把客户端信息以某种形式记录在服务器上。当同一客户再次访问服务器时，只需要从该Session中查找该客户的状态就行了

 - Session在客户第一次访问服务器的时候自动创建，Session生成之后，只要客户继续访问，服务器就会更新Session的最后访问时间，并维护该Session

 - 为了防止服务器内存溢出，服务器会将长时间没有活跃的Session从内存中删除，即如果客户超过一定时间没有访问服务器，Session就会自动失效

### call(), apply() && bind()

JavaScript权威指南上的解释是：`call(),apply()` 可以看作是某个对象的方法，通过调用方法的形式来间接调用函数；`bind()` 则是将某个函数绑定到某个对象上

`call()&&apply()` 就是改变函数的上下文，也就是 this 值，它们是Function对象的方法，因此每个函数都能够调用。其第一部分就是你要指定的执行上下文，第二部分用来传递参数

```javascript
function apply(v1, v2) {
  return fun1.apply(this, [v1, v2]);
}

function call(v1, v2) {
  return fun2.call(this, v1, v2);
}
```
由上代码可以看出，执行环境传参为 `this`，也就是说没有改变函数的执行上下文，同时 `apply()` 和 `call()` 的区别在于，`call()` 的参数需要一个个传，而 `apply()` 则会将参数放在数组内传递

`bind()` 用来实现上下文绑定，bind 后函数不会立即执行，而是会返回一个改变了执行上下文的函数副本

由于 `bind()` 是ES5方法，ie6~ie8不支持该方法，所以需要模拟实现

```javascript
// 首先判断是否支持bind方法
if(!function() {}.bind) {
  // 向Function对象添加 bind 方法
  Function.prototype.bind = function(context) {
    // this 指向调用函数的对象而不是函数本身
    var self = this;
    var args = Array.prototype.slice.call(arguments);
    // 返回一个函数方法
    return function() {
      return self.apply(context, args.slice(1));
    }
  };
}
```
### window.location  

获取当前页面 url 的相关信息。以 https://github.com/YLoNe666 为例

  - `window.location.href`: https://github.com/YLoNe666

  - `window.location.host`: github.com

  - `window.location.hostname`: github.com

  - `window.location.origin`: https://github.com

  - `window.location.pathname`: /YLoNe666

### stringObject.indexOf(searchValue,formIndex) 

返回某个字符串在字符串中首次出现的位置，若不含则返回-1，`formIndex`为可选项，表示开始查找的位置，取值从0-(length-1)，对大小写敏感!

### Math对象

用于执行数学任务

  - `Math.random()` 获取0-1之间随机数

  - `Math.abs(x)` 返回数的绝对值（absolute）

  - `Math.round(x)` 返回四舍五入的整数值

  - `Math.floor(x)` 返回向上取整的整数值

  - `Math.ceil(x)` 返回向下取整的整数值

  - `Math.max(x,y..)` 返回最大值

  - `Math.min(x,y,..)` 返回最小值

如果需要返回数组内的最大值，可以通过ES6语法 `Math.max(...arr)` 或者通过 apply 方法 `Math.max.apply(null, arr)` ，最小值同理  

### 数组去重

因为有些数据本身是不能排序的，所以不能对其进行比较查找。如果数据本身很难比较，即使采用折半查找，要比较的次数也是非常多的。因此，哈希并不查找数据本身，而是先将数据映射为一个哈希值

```javascript
    // 数组去重
    _mergeArray = function(arr) {
      var res = [],
          hash = {};
      for (var i = 0, elem;
          (elem = arr[i]) != null; i++) {
            // 如果hash对象内没有此属性，则返回undefined，此时将此属性值写入数组，并将其映射为一个哈希值
          if (!hash[elem]) {
              res.push(elem);
              hash[elem] = true;
          }
      }
      return res;
    },
```

### .then() && .done()

`.then()` 和 `.done()` 的区别

  - `.then()` 支持持续任务调用模式(eg:promise().then().then().then()),而 `.done()` 不支持

  - `.then()` 会捕获未处理的异常然后把错误状态作为返回值返回，而 `.done()` 则会直接抛出异常

### substring()

`stringObject.substring(start,stop)` 用于提取字符串中介于两个指定下标之间的字符

`substring()` 方法返回的子串包括 start 处的字符，但不包括 stop 处的字符

如果参数 start 与 stop 相等，那么该方法返回的就是一个空串（即长度为 0 的字符串）。如果 start 比 stop 大，那么该方法在提取子串之前会先交换这两个参数

start 与 stop 必须为正整数

### 全屏切换

用代码实现类似 F11 效果

```javascript
  //切换全屏效果
  toggleFullScreen = function(element) {
    //判断是否为全屏模式
    if (!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)) {
      //进入全屏模式，分别为W3C标准，谷歌，火狐，IE
      if (element.requestFullscreen) {
          element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
      }
    } else {
      //退出全屏模式
      if (document.exitFullscreen) {
          document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
      }
    }
  },
  troggleScreen = function() {
      //document.documentElement 为整个页面的元素
      toggleFullScreen(document.documentElement);
  },
```

### JSON.parse()

JSON.parse() 方法用来解析JSON字符串，构造由字符串描述的JavaScript值或对象
JSON.parse(jsonstr, reviver()) 可以接受两个参数

  - jsonstr 表示json字符串，为必填项

  - reviver() 为选填项，如果指定了 reviver() 函数，则解析出的 JavaScript 值（解析值）会经过一次转换后才将被最终返回。

  - 解析值本身以及它所包含的所有属性，会按照一定的顺序（从最最里层的属性开始，一级级往外，最终到达顶层，也就是解析值本身）分别的去调用 reviver 函数，在调用过程中，当前属性所属的对象会作为 this 值，当前属性名和属性值会分别作为第一个和第二个参数传入 reviver 中

  - 如果 reviver 返回 undefined，则当前属性会从所属对象中删除，如果返回了其他值，则返回的值会成为当前属性新的属性值

  - 当遍历到最顶层的值（解析值）时，传入 reviver 函数的参数会是空字符串 ""

```javascript
JSON.parse('{"1": 1, "2": 2,"3": {"4": 4, "5": {"6": 6}}}', function (k, v) {
    console.log(k); // 输出当前的属性名，从而得知遍历顺序是从内向外的，
                    // 最后一个属性名会是个空字符串。
    return v;       // 返回原始属性值，相当于没有传递 reviver 参数。
});

// 1
// 2
// 4
// 6
// 5
// 3 
// ""
```

### JSON.stringify()

JSON.stringify() 方法将一个JavaScript值（对象或者数组）转换成一个 JSON 字符串
JSON.stringify(jsonObj, replace, space) 可以接受三个参数

  - jsonObj 表示一个JavaScript值，即一个json对象或者数组

  - replace参数可以是一个数组或者函数，作为函数，它有两个值，键（key）和值（value）都会被序列化

    - 在对象中，如果返回值是 `undefined`，则该属性值不会在JSON字符串内输出

    - 在数组中，如若返回值是 `undefined` 或者一个函数，将会被null取代

  - space 参数用来控制结果字符串里面的间距。如果是一个数字, 则在字符串化时每一级别会比上一级别缩进多这个数字值的空格（最多10个空格）；如果是一个字符串，则每一级别会比上一级别多缩进用该字符串（或该字符串的前十个字符）

```javascript
// replace 例子
function replacer(key, value) {
  if (typeof value === "string") {
    return undefined;
  }
  return value;
}

var foo = {foundation: "Mozilla", model: "box", week: 45, transport: "car", month: 7};
var jsonString1 = JSON.stringify(foo, replacer);
var jsonString2 = JSON.stringify(foo, ['week', 'month']); 
// 输出 jsonString1 和 jsonString2 值均为：{"week":45,"month":7}
```

### typeof null

typeof 操作符返回一个字符串，表示未经计算的操作数的类型

typeof null 的结果是 'object'，因为在 JavaScript 的最初实现中，JavaScript 中的值是由一个表示类型的标签和实际数值表示的，对象的类型标签是 0，而 null 代表的是空指针，因此 null 的类型标签也成为了 0

暂存死区：var 声明被置于函数作用域的顶部，但是它们的赋值不是，而 const 和 let 在块作用域中，会被置于块的头部的暂存死区，直至它们被初始化，在这期间，如果变量被访问（比如 typeof ），会直接抛出 ReferenceError 错误

```javascript
function test() {
  console.log(a); // => throws a ReferenceError
  console.log(b); // => undefined
  var b = 100;
  console.log(c); // => throws a ReferenceError
  const c = 100;
  let d;
  console.log(d); // => undefined
  d = 100;
}
```

### NaN

NaN（not a number）是数字类型

在 JavaScript 中，NaN 最特殊的地方在于，不能使用 == 或者 === 来判断一个值是否等于 NaN，因为 `NaN ==(=) NaN` 也会返回 false

`window.isNaN()` 方法会强制将非数字类型转换成数字类型，比如 `window.isNaN('1.2')` 会返回 false

相较之下，ES6 提出了一个更好的解决办法，即 `Number.isNaN()`，它不会对参数进行强制转换，只有当类型为数字，且值为 NaN 时才会返回 true

### JavaScript 执行机制

JavaScript是一门单线程语言

Event Loop是 JavaScript 的执行机制

由于JavaScript引擎是单线程机制，它无法执行多段代码，当一段代码执行的时候，所有后续任务必须等待，从而形成一个任务队列。一旦当前任务完成，再从队列中取出下一个任务执行，这也被称为 ‘阻塞式执行’

<img src="../../../../images/eventDeal.png">

`setTimeout()` 设置的延迟参数是从 Event Table 中注册回调函数到 Event Queue 的时延，所有执行其回调函数的时延 >= 其设置的时延

即使主线程执行栈为空，0ms 实际上也是达不到的，根据HTML标准，最低是 4ms

`setInterval()` 会每隔指定的时延将回调函数注册进入 Event Queue 中，一旦 `setInterval` 的回调函数的执行时间超过其设置的延迟，那么完全看不出来有时间间隔

除了广义的同步任务和异步任务，我们对任务有更加精细的定义

 - macro-task(宏任务)：正常执行script、setTimeout()、setInterval()

 - mirco-task(微任务)：Promise、process.nextTick(类似node.js版的setTimeout，其回调函数在事件循环的下一次循环中调用)

整体script作为第一个宏任务执行结束，会在 Event Queue 中检查还有哪些微任务，并对其依次执行，至此完成第一次 EventLoop，然后再在 Event Queue 内检查宏任务，进行 EventLoop

```javascript
console.log('1');

setTimeout(function() {
    console.log('5');
    process.nextTick(function() {
        console.log('7');
    })
    new Promise(function(resolve) {
        console.log('6');
        resolve();
    }).then(function() {
        console.log('8')
    })
});

process.nextTick(function() {
    console.log('3');
});

new Promise(function(resolve) {
    console.log('2');
    resolve();
}).then(function() {
    console.log('4')
});

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('11');
    })
    new Promise(function(resolve) {
        console.log('10');
        resolve();
    }).then(function() {
        console.log('12')
    })
});

// 输出结果
1,2,3,4,5,6,7,8,9,10,11,12
```


### setTimeout()

`setTimeout` 是异步执行函数，但是其并不是真正的异步操作

可以简单理解为：只有在 JavaScript 线程中没有任何同步代码要执行的前提下才会执行异步代码，所以 `setTimeout` 只会在 JavaScript 线程空闲状态下执行

如果调用了 `setTimeout` 方法，那么浏览器会在合适的时间将代码插入任务队列，如果这个时间为0，则代表立即插入队列，但是此时并不代表执行，执行取决于当前 JavaScript 线程是拥挤还是空闲

由 `setTimeout()` 调用的代码运行在与所在函数完全分离的执行环境上，这会导致代码中包含的 `this` 在非严格模式下指向 `window` 对象，在严格模式为 undefined

在浏览器中，`setTimeout()` 最小时延为 4ms

**解决递归导致的堆栈溢出**

堆栈溢出被消除，因为通过事件循环处理递归，而不是调用堆栈

```javascript
// error
var list = readHugeList();
var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        nextListItem();
    }
};

// correct
var list = readHugeList();
var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        setTimeout( nextListItem, 0);
    }
};

```

**按序输出**

使用闭包或者块级作用域来按序输出

```javascript
// 输出 5,5,5,5,5
// 因为循环体内每个函数将在整个循环完成后执行
// 通过 var 声明的变量作用域是整个封闭函数，在执行完毕后 i 会被自动添加到当前的执行环境
for (var i = 0; i < 5; i++) {
    setTimeout(function() { console.log(i); }, 1000 );
}

// 输出 0,1,2,3,4
// 利用闭包，为每次迭代创建一个唯一作用域，并将该变量的每个唯一值存储在其作用域中
for (var i = 0; i < 5; i++) {
    (function(x){
      setTimeout(function() { console.log(x); }, 1000 );
    })(i);
}

// 输出 0,1,2,3,4
// 利用 let 声明块级作用域
for (let i = 0; i < 5; i++) {
    setTimeout(function() { console.log(i); }, 1000 );
}
```

### (ES6) Promise

Promise对象用来提供异步操作的方法，简单来讲，Promise 就是一个容器，里面保存着未来某个时间点才会结束的事件

Promise对象的两个特点

 - 对象的状态不受外界影响，Promise对象代表一个异步操作，有三种状态：pending(进行中)、fulfilled(已成功)和rejected(已失败)，有只异步操作的结果可以唯一决定当初对象的状态，其他操作都不能改变这个状态

 - 一旦状态改变就不会再变，且任何时候都能得到这个结果

```javascript
function testPromise(url) {
  let promise = new Promise(function(resolve, reject) {
    console.log('1');
    const image = new Image();
    image.onload = function() {
      return resolve(image);
    };
    image.onerror = function() {
      return reject(url);
    };
    image.src = url;
    });
  return promise;
};

testPromise('./test.jpg').then(function(image){
  console.log('3');
  const val = image;
  console.log(val)
  }, function(url) {
    console.log('4');
    var val = url;
    const err = new Error(`Could not load image at ${val}`);
    console.error(err);
  });

console.log('2');

// 执行结果
1
2
3（4）
```

上述代码的一些知识点：

 - `resolve` 在异步操作成功时调用，将 Promise对象的状态从 ‘pending’ 变成 ‘fulfilled’

 - `reject` 在异步操作失败时调用，将 Promise对象的状态从 ‘pending’ 变成 ‘rejected’，等同于抛出错误

 - Promise实例生成之后，可以用 `then` 方法可以接收两个回调函数作为参数，分别指定 resolved 状态和 rejected 状态的回调函数

 - Promise对象在新建后就会执行，属于同步任务，但是 Promise对象里面的回调函数（即 resolve 和 reject 代码）属于异步任务

 - 调用 resolve 和 reject 并不会终结 Promise 的参数函数的执行，为了更好的阅读体验，通过 return 语句返回

**Promise.prototype.then()**

`then` 方法是定义在原型对象 Promise.prototype 上的，它的作用是为 Promise 实例添加状态改变时的回调函数

`then` 方法返回一个新的 Promise 实例，因此可以采用链式写法，注意前一个 then 中函数需要返回一个 Promise 对象，否则输出结果为 undefined

```javascript
testPromise('./test.jpg').then(function(image){
  console.log(image);
  return testPromise('./hello.jpg');
  }, function(url) {
    console.error(url);
    return testPromise('./hello.jpg');
  }).then(function(image) {
    console.log(image)
    }, function(url) {
      console.error(url);
      });

// 返回结果
(error) ./test.jpg
(erroe) ./hello.jpg
```

**Promise.prototype.catch()**

`.catch()` 是 `.then(null, reject)` 的别名，用于指定发生错误时的回调函数

```javascript
const test2 = new Promise(function(resolve, reject) {
  // resolve('ok');
  throw new Error('error');
  });
test2.then(function(val) {
  console.log(val);
  })
  .catch(function(error) {
  console.error(error);
  console.log('everything is ok');
    });
setTimeout(() => { console.log(123) }, 2000);

// 返回结果
Error: error
everything is ok
123
```

由上述代码可以看出：

 - promise 抛出一个错误，就会被 `catch` 方法指定的回调函数捕获

 - 如果 Promise 状态已经变成 resolved，再抛出错误是无效的，不会被捕获

 - Promise对象的错误具有冒泡性质，会一直向后传递，直至被捕获

 - 一般来说，不要在 `.then()` 方法内定义第二个函数，而是使用 `.catch()` 方法来响应 rejected 状态 

 - Promise 内部的错误不会影响到 Promise 外部的代码执行，“Promise 会将错误内部消化”

**Promise.prototype.finally()**

finally 方法用于指定不管 Promise 对象最后的状态如何，都会执行的操作

finally 方法的回调函数不接受任何参数，这意味着没办法知道，前面的 Promise 状态到底是 fulfilled 还是 rejected，这表明，finally 方法里面的操作，应该是状态无关的

### Hoisting

> JavaScript Hoisting: In JavaScript, every variable declaration is hoisting to the top of its declaration context.

变量提升（Hoisting）被认为是 JavaScript 中执行上下文（特别是创建和执行阶段）工作方式的一种认识

注意，变量和函数声明在代码的位置是不会动的，而是在编译阶段被放入内存中发生改变

**变量提升**

 - `var`只提升声明，不提升初始化（即变量赋值）

 - `const` 和 `let` 不存在变量提升，它们的声明会被置于一个新概念 TDZ 内

```javascript
// case1
console.log(a); // 👉 undefined
var a = 100;

// case2
console.log(b); // 👉 Uncaught ReferenceError
const a = 100;

// case 3
let c;
console.log(c); // 👉 undefined
c = 100;
```

**函数提升**

记住正确的方式是：先声明，再调用

 - 匿名函数表达式会提升变量名，而不是函数体

 - 命名函数表达式会提升变量名，而不是函数名和函数体

 - 函数声明会提升其名字和函数体

```javascript
// case1
a(); // 👉 Uncaught TypeError: a is not a function
var a = function() {
  console.log('hello world');
};

// case2
b(); // 👉 Uncaught TypeError: b is not a function
test(); // 👉 Uncaught TypeError: test is not a function
var b = function test() {
  console.log('hello world');
};

// case3
c(); // 👉 hello world
function c() {
  console.log('hello world');
};
```

产生上述现象的原因的一个解释：

 - 用函数声明创建的函数可以在函数解析后调用

 - 函数表达式创建的函数是在运行时先进行赋值，要等到表达式赋值完成后才能调用


函数在条件语句中定义时，不会提升

```javascript
console.log(typeof a); // 👉 undefined
if(true) {
  function a() {
    return 1;
  }
}
```

---
### Closure

> 对于那些有一点JavaScript使用经验但从未真正理解闭包概念的人来说，理解闭包可以看作是某种意义上的重生

闭包的理解可以分为三部曲：变量、作用域以及闭包

#### 变量

变量包含两种不同数据类型的值：基本类型值和引用类型值

基本类型值指的是简单的数据段，可以操作保存在变量中的实际的值；引用类型值指的是保存在内存中的对象，并且JavaScript不允许直接操作对象的内存空间

在复制变量上

 - 从一个变量向另一个变量复制基本类型值时，会直接在变量对象上创建一个新值，并将原值复制到为新变量分配的位置上，并且两个值是完全独立的

 - 从一个变量向另一个变量复制引用类型值时，同样也会将存储在变量对象中的值复制一份放到为新变量分配的空间中，不同的是这个值实际上是一个指针，指向存储在堆中的对象，所以两个变量实际上将引用同一个对象

所有的函数的参数都是按值传递的，也就是说，把函数外部的值复制给函数内部的参数，就和复制变量是一样的，可以把函数的参数理解为局部变量，一般情况下，局部变量会在函数执行完毕后立即销毁

其实编译器是这样工作的，在代码执行之前从上到下进行编译，当遇到某个 `var` 声明变量的时候，先检查在当前作用域下是否存在该变量，如果存在，则忽略这个变量，如果不存在，则在当前作用域声明这个变量

以 `var a = 1;` 为例

 - 编译器在当前作用域内声明一个变量 a 

 - 运行时，引擎在该作用域内查找该变量，找到 a 变量并为其赋值

变量的两种查找类型

 - RHS 输出变量值

 - LHS 找到变量并为其赋值

#### 作用域

要弄懂作用域，就必须理解几个关键概念：执行环境、变量对象、作用域链、作用域、词法作用域

**执行环境**

执行环境（execution context）定义了变量或函数有权访问的其他数据，决定了它们各自的行为，用于跟踪代码的运行情况，实际上是一个对象

执行环境与函数的关系

 - 被封装成函数的代码视作一段代码块

 - 一段代码块对应一个执行环境

 - 所以每个函数都有自己的执行环境

 - 全局代码也视作一个代码块

执行环境的工作方式

 - 当程序运行时，进入到某一代码块（即执行函数方法）时，会创建一个新的执行环境，并将其推入一个环境栈中

 - 当程序的代码块中运行到某段代码需要转到另一个代码块时（调用另一个函数），那么当前执行环境状态就被置为挂起，然后产生一个新的执行环境推入环境栈

 - 代码块执行完毕之后，环境栈将其弹出，并将控制权返回给之前的执行环境

 - 执行环境被销毁的同时，保存在其中的所有变量和函数定义也随之销毁（全局执行环境直到应用程序退出，比如关闭浏览器时，才会销毁）

执行环境对象的几个重要属性

 - `[[code evaluation]]` 当前代码块执行的状态

 - `[[Function]]` 如果当前是函数的执行环境，则保存这个函数对象，如果是全局的执行环境，则该值为 null

**变量对象**

每个执行环境都有一个与之对应的变量对象（variable object），用来保存执行环境中定义的所有变量和函数

在代码中无法访问到这个对象，但是可以修改这个对象的属性，解析器在处理数据时会在后台使用它

如果当前执行代码块是函数，则将其活动对象（activation object）作为变量对象，活动对象最初只包含一个 arguments 对象作为其变量

全局环境的变量对象始终存在，局部环境的变量对象只在函数执行过程中存在，调用时创建，不再被任何其他对象引用时销毁


**作用域链**

作用域链（scope chain）用来保证对执行环境有权访问的所有变量和函数定义的有序访问

每个代码块在执行的时候，都会创建变量对象的一个作用域链

作用域链的本质是指向变量对象的指针列表，它只引用单不实际包含变量对象

作用域链的前端始终都是当前执行代码块所在执行环境的变量对象

作用域链的下一个变量对象来自于当前执行环境的包含环境的变量对象，一直向外，直到延续到全局执行环境的变量对象

 - 全局执行环境的变量对象始终都是作用域链中的最后一个对象

标识符解析是沿着作用域链一级一级地搜索标识符的过程，搜索过程始终从作用域链的前端开始，逐级向后回溯

在作用域链中查找变量的过程与原型继承有着相似之处，但是很重要的一点区别就是，在原型链中找不到一个属性时，会返回 `undefined`，而在作用域链中找不到一个属性，会抛出一个 `ReferenceError` 错误

**作用域**

我现在理解的作用域实际上就是变量对象

**词法作用域**

词法作用域是作用域的一种工作模型，即作用域包含的内容完全取决于你的代码

词法作用域就是作用域，是由书写代码时函数声明的位置来决定的，编译阶段就能知道全部标识符位置以及是如何声明的，所以词法作用域是静态的作用域

#### 闭包

闭包是指有权访问另一个函数作用域中的变量的函数，实际上，所有的 JavaScript 函数都是闭包

```javascript
function a() {
  var b = 1;
  return (function(){
    return b += 1;
    })();
}
var val = a();
```
<img src="../../../../images/scope.png">

 - 在创建 a() 函数前，会创建一个预先包含全局变量对象的作用域链，这个作用域链被保存在内部 [[Scope]] 属性中

 - 当调用 a() 时，会为函数创建一个执行环境，然后通过复制 [[Scope]] 属性构建其作用域链，并且创建当前执行环境的变量对象，并将其推入作用域链的前端

 - 再对匿名函数进行调用时，会重复上述动作，此时 [[Scope]] 属性内，包含当前变量对象、a() 的变量对象以及全局变量对象的引用

 - 在 a() 执行完毕之后，其作用域链会被销毁，但是其变量对象不会被销毁，仍然存在在内存中，因为匿名函数的作用域链仍然在引用这个变量对象

 - 直到匿名函数被销毁时，a() 的变量对象才会被销毁，比如通过 `a = null` 的方式解除该函数的引用，通知垃圾回收进程将其清除

### src && href

src(source) 用于替换当前元素，为**引入**，其值指向外部资源的位置，引入的内容会嵌入到文档中当前标签所在位置

 - src 通常用于 `<img>`, `<script>`, `<iframe>` 标签内

 - 当浏览器解析到含有属性 src 的元素时，会暂停其他资源的下载和处理，直到当前资源加载、编译、执行完毕

 - 在 html 中，拥有 src 属性的元素是可以访问跨域资源的

href(Hypertext Reference) 超文本**引用**，其值也指向网络资源的位置，用于建立和当前元素（锚点）和当前文档（链接）之间的联系

 - 如果浏览器识别引用文档为 css 文件，则会并行下载资源而不会停止对当前文档的处理

### Some Pieces

 - JS内对数值判断，不能用 `11 < x < 111` , 应该写成 `x > 11 && x < 111`
  
 - 选择框一般通过 `onchange` 事件监听，`onchange` 在输入框内容改变且 **失去焦点** 的时候触发

 - 用 `(function(){...})` 自调用匿名函数包裹：JavaScript中无法用花括号方便地创建作用域,但函数却可以形成一个作用域，域内的代码是无法被外界访问的,如果我们将自己的代码放入一个函数中，那么就不会污染全局命名空间，同时不会和别的代码冲突。另外还有一个好处就是，自调用匿名函数里面的代码会在第一时间执行，页面准备好过后，上面的代码就将插件准备好了，以方便在后面的代码中使用插件

 - 对于一个对象，如果里面没有某个属性，用 `obj.value` 会报错，而用 `obj['value']` 则会返回 **undefined**

 - 在 JavaScript 源文件开头包含 `use strict` 好处在于在运行时自动执行更高标准的 JavaScript 代码解析和错误处理方式

 - 在 JavaScript 中将一行开头大括号放在行尾的约定的意义在于：JavaScript 遇到包含 return 语句的行时，会在 return 语句之后立即自动插入分号

 - `reverse()` 会颠倒数组本身的顺序，同时返回数组本身的引用，`var arr2 = arr1.reverse()` 则 arr1 和 arr2 指向同一个引用

 - `1 && 2` 返回值为 2：原因在于在 `x && y` 的表达式中，先评估 x 值并将其解释为布尔值，如果布尔值为0，则直接返回 0 ，不用评估 y；但是如果 x 布尔值为 1，则继续评估 y 值，&& 操作符有趣在于，当表达式评估为真时，会返回表达式本身

 - 使用 `!!` 将变量转换为布尔类型，只有 0、null、undefined、'' 以及 NaN 会返回 false，其他均返回 true

 - 使用 `+` 将变量转换为数字，但是其只适用于数字字符串，否则返回 NaN

 - 使用 `+` 也可以作用于 Date，返回时间戳，`console.log(+new Date())`

 - 简单数组截断，如果只希望取得数组的前三个元素，设置其长度为3即可，`array.length = 3`

 - `String.replace()` 本身只能替换第一个匹配的元素，可以在正则表达式末尾添加 `/g` 来模拟 `replaceAll()`

 - 使用 `arr1.push.apply(arr1, arr2)` 来合并数组，可以减少内存消耗，`arr1.concat(arr2)` 会创建一个新的数组并消耗内存

 - 对数组元素乱序 `array.sort(function() {return Math.random() - 0.5})`，回调函数内 return 值为负，表示由小到大；为正，表示由大到小

 - 关于 `Array.length` 的问题，在chrome V8引擎下不建议通过变量缓存其值，因为由于chrome V8在编译时会将循环体内那些不发生变化的语句移到循环体外部，由于这个特性，即使没有缓存 `Array.length`，由于其值不会随着循环次数增多而发生变化，所以 length 属性会被自动移到循环体外缓存起来。但是对于非 chrome V8 引擎的浏览器还是有一定优化的，时间复杂度从O(n^2) 减少到O(n+1)

 

--Respect Javascript-- 