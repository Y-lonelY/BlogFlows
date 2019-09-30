# JQuery

> 记录在使用Jquery进行实际开发过程中的应用


## wisdomTree 插件开发

jquery插件的开发模式一般而言，有三种：

- `$.extend()`来扩展jQuery
- `$.fn` 向jQuery添加新的方法
- `$.widget()`应用jQuery UI的部件工厂方式创建

整个插件开发思路就是创建一个对象，并将该对象挂载至jQuery的命名空间，从而在各个模块能够调用

### $.extend()

`$.extend()`函数用于将一个或多个对象的内容合并到目标对象并返回目标对象（第一个对象）

`$.extend()` 基本用法，可以看出`$.extend()`返回对象中的所有属性（可理解为属性求和），且属性值向后取值

```javascript
// 对象属性相同，属性值不同
$.extend({name:'yh',num:9},{name:'ylone',num:22},{name:'ylone666',num:666})
// {name: "ylone666", num: 666}

// 对象属性不同，且目标对象<其他对象
$.extend({name:'yh',num:9},{name:'ylone',num:22,cool:true},{name:'ylone666',num:666})
// {name: "ylone666", num: 666, cool: true}

// 对象属性不同，且目标对象>其他对象
$.extend({name:'yh',num:9,cool:true},{name:'ylone',num:22},{name:'ylone666',num:666})
// {name: "ylone666", num: 666, cool: true}


// 对象属性各不相同
$.extend({name:'yh',cool:true},{num:22},{run:199}) 
// {name: "yh", cool: true, num: 22, run: 199}

// 将对象合并到jquery的全局对象中，可以在全局对其进行调用
$.extend({test:function(){console.log("test")}})
$.test  // ƒ (){console.log("test")}
$.test() // "test"

// 重载原型,选择进行深度拷贝，第一个参数配置是否进行深度拷贝,可以看出，深度拷贝对对象里面的对象（即所有属性及其子属性）都进行了 `$.extend()` 操作
$.extend( true, {}, 
    { name: "yh", location: {cool: false,num:"1"} }, 
    { last: "ylone", location: {state: "well",county:"China", cool: true} } );
// {name: "ylone", location: {cool:true,county:"China",num:"1",state:"well"}}
```

### $.fn

`$.fn` 是指jquery的命名空间，加上fn上的方法及属性，会对jquery实例每一个有效,可以简单理解为在全局范围写函数方法

如下相当于是对jquery扩展了一个*wsTree*方法,那么后面你的每一个jquery实例都可以引用这个方法了. 
那么你可以这样子：$("#div").wsTree();

```javascript
$.fn.wsTree = function(options) {
    var wisdomTree = new WISDOMTREE(this, options);
    return wisdomTree.init();
}
```

查看jquery源码, `jQuery.fn = jQuery.prototype = {...}`,向全局对象添加属性和方法,通过 `$(dom).jquery` 即可看到jquery的版本号

```javascript
jQuery.fn = jQuery.prototype = {
// The current version of jQuery being used
jquery: version,
constructor: jQuery,
// The default length of a jQuery object is 0
length: 0,
toArray: function() {
    return slice.call( this );
}
// statement
```

### 面向对象

这次开发过程对于面向对象的三个基本特性（封装，继承，多态）有了更深的理解

使用面对对象的开发模式，方便管理，更重要的是不会污染外部的命名空间，实际上，我们只需要在全局命名空间上声明一个对象初始化的方法，然后将函数和变量写在对象的内部，变成对象的方法和对象的属性就好了

### 自调用匿名函数包裹代码块

一个自我调用的匿名函数在创建时自动,立即运行，并且没有名字，因此被称为**自调用匿名函数**

基本格式：`;(fucntion($, window, document, undefined){ code... })(jQuery, window, document)`

作用原理：函数可以形成一个作用域，域内的代码是无法被外界访问的，如果我们将自己的代码放入一个函数中，那么就不会污染全局命名空间，同时不会和别的代码冲突。另外一个好处就是，自调用匿名函数里面的代码会在第一时间执行，页面准备好后，上面的代码就将插件准备好了，以方便在后面的代码中使用插件

函数前的 `;` 作用：自调用匿名函数与上一段代码相连，如果上一段代码没有以分号结束，而我们又没有主动地加上分好，那么会导致函数编译出错

将系统变量以参数形式传递到插件内部，可以提高对系统变量的访问速度，其中 `undefined` 的妙处在于：为了得到没有被修改的  `undefined`，我们并没有传递这个参数，但却在接收时接收了它，因为实际并没有传，所以`undefined`那个位置接收到的就是真实的`undefined`


## Highcharts

### 两个散点图的 tooltips 联动

思路就是将两个散点图数据的共有属性之一传入ID，当在chart1上hover点位的时候，获取该点ID，然后通过ID获取到chart2的highchart对象，获取对应点位以及tooltip对象，通过 `point.setState()` 和 `tooltip.refresh()` 来响应事件

```javascript
point: {
    events: {
        mouseOver: function(e) {
            var id = this.series.data[0].id;
            var targetChart = $(elseEle).siblings().highcharts();
            var pointer = targetChart.get(id);
            var tooltip = targetChart.tooltip;
            pointer.setState('hover');
            tooltip.refresh(pointer, e);
        }
    }
},
```

### 处理由于词段太长导致 legend 展示不下的问题

解决思路：放置在图形下方，根据 item-nums 来动态设置 itemWidth

```javascript
// legend 属性设置
// 根据图例数量来动态设置 itemWidth
let legend =  {
    align: 'left',
    verticalAlign: 'bottom',
    x: -10,
    y: 0,
    floating: false,
    maxHeight: 120,
    itemWidth: 80
}
```


## ajax

### 多个 ajax 请求问题

同一个方法里面如果有两个 ajax 请求，两个ajax异步请求冲突，因为异步问题，在onload方法中调用两个ajax异步，其实相当于同时发送两个请求。执行的快与慢，要看响应的数据量的大小及后台逻辑的复杂程度，若后者快于前者，则会出现错误

解决办法

- Ajax2()方法的执行放到Ajax1()的success回调函数的最后一行
- Ajax1()的异步请求方法中，增加一个回调函数 ：complete : Ajax2
- 把Ajax1()的异步设为同步：async : false

对于两个 ajax 请求冲突的情况，上述代码是可行的，但是对于多个，利用 ES6 的 `Promise.all(array)` 语法糖会更简洁