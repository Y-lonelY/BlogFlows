<!-- MarkdownTOC -->

- [flatpickr](#flatpickr)
- [jQgrid](#jqgrid)
- [requireJs](#requirejs)
- [layer](#layer)
- [handlebarsjs](#handlebarsjs)
- [jQueryLangJs](#jquerylangjs)
- [ECharts](#echarts)
- [pin](#pin)
- [revaelJs](#revaeljs)
- [material-icon](#material-icon)
- [Bootstrap Multiselect](#bootstrap-multiselect)

<!-- /MarkdownTOC -->


> *some jquery plugins are used for labelMangerSystem,some things may not be complete,ehhhh...,just leave them to perfection!*


## flatpickr

INTRODUCTION
 
 - 轻量级(6k)，功能强大的日期选择器，兼容**chrome**和**firefox**

 - 不依赖于其他库，UI少，使用SVG作为界面的图标

 - 兼容JQuery

 - 在配置参数中，所有的类型为 string 或 boolean 的参数都可以通过data-属性在HTML标签中进行设置,例如：*data-min-date、data-default-date、data-default-date..*

 - 月份可以滚动，年份可以手动输入

CONFIG

**option.enableTime**

    enableTime: true||false;//是否启用日期选择

**option.enableSeconds**

    enableSeconds: true||false,//是否启用秒选择器

**option.dateFormat**
    
    dataFormat: "Y-m-d"||"d.m.Y";//设置日期显示格式    

**option.(minDate&maxDate)**
    
    minDate: "today"||"2016-10-20 15:30"..//可选择的最小/最大时间，与dataFormat格式一致

**option.weekNumbers**

    weekNumbers: true||false;//是否显示周数

**option.disable**
    
    disable: ["2017-03-30","2017-05-1"..]||
             [{form: "2017-04-01", to: "2017-05-01"}..]||
             [function(data){
                return (data.getMonth()%2===0)
                }]
    //禁选日期，具体的值、日期范围或者函数，其余日期启用

**option.enable**

    enable: ["2017-03-30","2017-05-1"..]||
            [{form: "2017-04-01", to: "2017-05-01"}..]||
            [function(data){
                return (data.getMonth()%2===0)
                }]
     //启用日期，其他日期禁选 

**option.mode**

    mode: "single"||"multiple"||"range";
    //分别表示只能选一个日期/可选多个日期/可选一个日期范围

**option.inline**
 
    inline: true||false;//日期选择器常开或者点击触发

USAGE

 - 在页面中引入flatpicker.css和flatpicker.js文件

 - 解决于layer同用时，日历显示在layer层下，将 *flatpicker.min.css* 内 *.flatpickr-calendar.open* 的 *z-index* 属性值改为 9999999

① HTML

    <input id="flatpickr" placeholder="请选择截止日期">

② JS

    _initFlatPickr = function() {
        $("#flatpickr").flatpickr(
            //some options...
            );
    }, 

## jQgrid

INTRODUCTION

 - JQGrid是一个在jquery基础上做的一个表格控件，以ajax的方式和服务器端通信

 - jqGrid使用jQuery Java脚本库，并作为该包的插件编写

CONFIG

**option.url 设置数据地址,直接获取数据**
    
    url: "/api/task/list-task-for-applicant",

**option.datatype 数据传输格式**

    datatype: "json",

**option.showLoadtext 读取数据或者排序时所显示的文字内容,比如loading...**
    
    showLoadtext: false,

**option.showCellTips 显示单元格的提示信息，用 `HTML:title` 属性就行了**

    showCellTips: false,
    
**option.altRows 设置为交替行表格**
    
    altRows: false,

**option.colNames 表头**    

    colNames: ["A","B","C"],

可以为表头设置样式，一般通过函数统一设置

    var getHeadContent = function(arr) {
        var result = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            result.push('<span style="color:#666;" lang="cn";>' + arr[i] + '</span>');
        }
        return result;
    };

此时表头设置为如下所示

    colNames: getHeadContent(["A","B","C"]),

**option.colModel 设置 每一列 参数列表**

    colModel: [{
        name: 'name', //设置列在表格中的唯一名称，此属性是必须的
        index: 'name', //通过sidx参数设置排序时的索引名
        fixed: isFixed, //若设为true，列宽不允许重新计算。GridWidth方法改变表格宽度时，列宽也不会改变。
        width: 120, //设置列的初始宽度，可用pixels和百分比
        align: "center", //定义表格单元格（非表头）的对齐方式，可取值：left, center, right
        classes: "hello", //此属性用于定义列的类名，当有多个类名时，用空格间隔
        formatter: format4List
    }]

**option.rowNum 表格中可见的记录数。此参数通过url传递给服务器供检索数据用。注意：若此参数设置为10，而服务器返回15条记录，将只有10条记录被装入。若此参数被设置为-1，则此检查失效**

    rowNum: 7,

**option.width 表格的宽度为colModel中定义的所有列宽度的总和,若设置了该项,每列的初始宽度按照shrinkToFit 设置的值**

    width: 1180,

**option.mtype 定义提交类型POST或GET**   

    mtype: "post",

**option.pager 定义分页浏览导航条。必须是一个HTML元素**

    pager: '#dataPager',

**option.height**

    height: 'auto',
    
**option.hoverrows 表行是否有鼠标悬停效果**

    hoverrows: false,

**option.sortorder 排序规则**

    sortorder: 'desc'||'asc',

**option.viewsortcols 定义表头中排序图标的外观和行为。缺省为[false,'vertical',true]**
    
    viewsortcols: [true, 'vertical', true],

**event.onCellSelect 当点击单元格时触发。rowid：当前行id；iCol：当前单元格索引；cellContent：当前单元格内容；e：event对象** 

    onCellSelect: function(rowid, iCol, cellcontent, e) {
        //coding...
    }
**event.loadComplete 服务器返回响应的回调函数, `xhr：XMLHttpRequest` 对象**

    loadComplete: function(xhr){
        var total = xhr.records;//表示返回的记录数
        //coding...
    }

**event.loadError 请求服务器失败的回调函数**

    loadError: function(xhr, status, error){
        //coding...
    }

**event.loadBeforeSend 此事件发生在XMLHttpRequest被发送前,用于修改对象属性（如headers）**

    loadBeforeSend: function(xhr, settings) {
        var header = JwtTool.createAuthorizationTokenHeader();
        if (header.hasOwnProperty("Authorization")) {
            xhr.setRequestHeader("Authorization", header.Authorization);
        }
    }

USAGE

CSS

    <link href="/css/ui.jqgrid.css" rel="stylesheet" type="text/css" />

HTML创建一个承载表格的TABLE元素

    <table id="taskConfigGrid"></table>
   
JS

    <script src='/Scripts/js/jquery-2.0.3.min.js' type="text/javascript"></script>
    <script src='/Scripts/js/jqGrid/jquery.jqGrid.min.js' type="text/javascript"></script>
    <script src='/Scripts/js/jqGrid/i18n/grid.locale-en.js' type="text/javascript"></script>
    $("#taskConfigGrid").jqGrid({
        //options...
        //events...
    });

## requireJs

INTRODUCTION

 - JavaScript模块只是遵循SRP(Single Responsibility Principle单一职责原则)的代码段,传统通过 `<script>` 标签来进行加载,这就需要持续不断的关注模块之间的依赖性，按照一个特定的顺序加载这些模块,否则运行时将会发生错误(这种错误我经常遇到)

 - AMD（异步模块定义）就是这样一种对模块的定义，使模块和它的依赖可以被异步的加载，但又按照正确的顺序

 - RequireJS是一个Javascript 文件和模块框架，使用RequireJS,你可以顺序读取仅需要相关依赖模块。RequireJS所做的是，在你使用script标签加载你所定义的依赖时，将这些依赖通过head.appendChild()函数来加载他们。

 - 当依赖加载以后，RequireJS计算出模块定义的顺序，并按正确的顺序进行调用。这意味着你需要做的仅仅是使用一个“根”来读取你需要的所有功能，然后剩下的事情只需要交给RequireJS就行了。

CONFIG

**option.data-main 用来引入 入口文件（当requireJS被加载完成后立即调用的文件称为入口文件）**

    <script data-main="/require-config" src="/libs/require/require.js"></script>

**require-config.baseUrl 用于加载模块的根路径**

    baseUrl: '/',

**require-config.paths 用来配置别名，用别名来代替模块名，注意被替代的模块名不需要.js后缀**

    paths: {
        //moduleID:路径(注意moduleID后缀不需要.js)
        //建议一个moduleId对应一个单独的文件夹，因为可能因为版本不同产生差异
        'jquery': 'libs/core/jquery.min'
    }

**require-config.shim shim配置可简单设置为依赖数组,设置shim本身不会触发代码的加载,想要实际加载shim指定的或涉及的模块，仍然需要一个常规的require/define调用**

    shim: {
        'jquery': {
            //加载依赖关系数组
            deps: ['css!/libs/jquery/jquery.css']
        }
    },

**require-config.deps 加载依赖关系数组**

    deps: [
        "app"
    ]        

**define 利用它来编写模块，然后在相应的地方进行引入**

    define([
        'jquery',
        'text!module/config/task-config-applicant/tpl/task-config-tpl.html'
    ], function(jQuery, Tpl) {
        //coding...
    }

**require 通过它将写好的模块进行引入，并根据这些模块编写我们的主代码**

    require(['jquery'], function ($) {
        //jQuery was loaded and can be used now
    });

USAGE

主页面引入JS文件

    <script data-main="/require" src="/libs/require/require.js"></script>

配置 `require.js` 文件

    require.config({
        urlArgs: "v=" + (new Date()).getTime(),
        waitSeconds: 0,
        baseUrl: '/',
        paths: {
            'jquery': 'libs/core/jquery.min',
            "multiselect": "libs/multiselect/bootstrap-multiselect"        
            },
        shim: {
            'multiselect': {
                deps: ['css!/libs/multiselect/bootstrap-multiselect.css']
            },
            'echarts_theme': {
                deps: ['echarts']
            }
        },
        deps: [
            "app"
        ]
    });

相应页面引入并使用

    define([
        'jquery',
        'text!module/config/task-config-applicant/tpl/task-config-tpl.html'
    ], function(jQuery, Tpl) {
        //coding...
    }

## layer

INTRODUCTION

 - 可做独立组件，一款优秀的弹出层组件

CONFIG

**option.type**

    type:0 //信息框，默认
    type:1 //页面层
    type:2 //iframe层
    type:3 //加载层
    type:4 //tips层

**option.title String/Array/Boolean，默认：'信息'**

    title :'我是标题'
    title: ['文本', 'font-size:18px;']
    title: false
**option.content String/DOM/Array，默认：''**

    content: '传入任意的文本或html'
    content: $('#id')
    content: html //可以结合 HandlebarJs 使用

**option.skin String 目前layer内置的skin有：layui-layer-lanlayui-layer-molv**

    skin: 'layui-layer-rim',

**option.area String/Array，默认：'auto'**

    area: '500px'//只定义宽度，高度自适应
    area: ['500px', '300px']

**option.btn**

    btn: ['确定', '取消'],
    btn1: function(index, layero) {
        var num = $("#submitNum").val();
        _controller.updatePassNum(v1, num).done(function(res) {
            if (res.code == 0) {
                layer.close(index);
                layer.msg("提交成功！");
                scope.refreshGrid();
            }
        });
    },
    btn2: function(index, layero) {
        layer.close(index);
    }

**option.zIndex 默认：19891014 一般用于解决和其它组件的层叠冲突**

**option.success**

    success: function(layero, index){
        console.log(layero, index);
    }

**layer.open**

    layer.open({
        option...//上述配置
    });

**layer.msg**
    
    layer.msg('hello',function(){
        //do something or not 
        });

**layer.close 一般结合 btn 回调函数进行使用**

    layer.close(index)

USAGE

直接引用 *layer.js* 即可 

    <script src="layer.js"></script>
    <script>
    layer.msg('hello'); 
    </script>

## handlebarsjs

INTRODUCTION

 - *Handlebars* 是JavaScript一个语义模板库，通过对 **view** 和 **data** 的分离来快速构建Web模板，意义在于让你的 **html** 和 **js** 充分解耦，它在加载时被预编译，而不是到了客户端执行到代码时再去编译，这样可以保证模板加载和运行的速度。

 - *Handlebars.js* 是一个由Javascript构建的编译器，它接收任意HTML与Handlebars.js表达式并将它们编译为Javascript函数。这个派生出来的Javascript函数接着接收一个参数或者一个对象（即你的数据 ），然后它返回一个包含HTML以及被插值在HTML中的对象属性值的字符串。因此，你最终可以得到一个对象属性值位于相应地方的字符串（HTML），你可以将这个字符串插入到页面中。

 - 路径：../ 同CSS文件路径选择

 - *Handlebar.js* 模板的三个部分：

     **a.** Handlebars.js表达式：{ { ... } }，内容可以是变量或者函数等。 

     **b.** Date(上下文)：即你想要展示在页面上的内容，你将你的数据作为一个对象（一个正常的Javascript对象）传递给Handlebars函数。这个数据对象叫做上下文。这个对象能够由数组，字符串，数字，其他对象组成，或者是包含所有的东西。如果数据对象拥有一个对象数组，你可以使用Handlebars中的each辅助函数（稍后将讨论辅助函数）去迭代数组，此时的上下文将被设定为数组中的每个对象。 

     **c.** handlebars编译函数：Handlebars编译函数接收模板作为参数并返回一个Javascript函数。

CONFIG

*option.expression* 注意HandlebarJs的标签是内闭合的，对 *if* 和 *unless* 只能判断 **true or false, ''、undefined、null、0、[]等都会被识别为false**

    { { !注释 } }

    { { content } }
    
    { { #if } } { { /if } }

    { { #if } } { { else } } { { /if } }

    { { #if } } { { else if } } { { else } } { { /if } }

    { { #unless } } { { /unless } } //用法同if，与if判断条件相反

    { { #each } } { { /each } } 遍历数组

    { { { richtext } } } 避免转义

**Handlebar.registerHelper 自定义一个 Handlebar 函数，可在html中作为标签直接使用**

    //判断是否为标注管理员
    Handlebars.registerHelper("isTaskManger", function(options) {
        if (_currentUserRole === "ROLE_LABEL_MANAGER") {
            //满足添加继续执行
            return options.fn(this);
        } else {
            //不满足条件执行{{else}}部分
            return options.inverse(this);
        }
    });
    
    //HTML内使用
    { { #isTaskManger } }
    <li>标注任务管理</li>
    <li>提交日志管理</li>
    { { /isTaskManger } }

**Handlebar.compile 对 handlebars.expression 进行预编译，生成一个JavaScript函数**

    var source = $('#template-user').html();//获取到html结构
    var template = Handlebars.compile(source);//编译成模板
    var html = template(data);//生成完成的html结构

USAGE

在页面中引入 *Handlebar.js*

HTML内构建Handlerbar表达式

    { { #each infoList } }
    <div class="single-member effect-3">
        <div class="member-info">
            <h3>{ { uname } }</h3>
            <h5>{ { fname } }</h5>
            <p>{ { taskId } }</p>
            <p>{ { fdesc } }</p>
            <p>{ { machine } }</p>
            <p>{ { update } } / {{sum}}</p>
        </div>
    </div>
    { { /each } }

JS部分：获取数据格式如下

    {
        "code": 0,
        "data": [{
            "taskId": "22000001",
            "uname": "用户1",
            "fname": "PD1",
            "fdesc": "行人检测",
            "machine": "01",
            "update": 50,
            "sum": 100
        },
        {
            "taskId": "22000002",
            "uname": "用户2",
            "fname": "PD2",
            "fdesc": "脸谱检测",
            "machine": "02",
            "update": 20,
            "sum": 100
        }
    ]
    }

JS部分：对HTML进行预编译生成一个JavaScript函数，然后通过生成的函数对数据进行渲染，生成HTML

    var _getLabelInfo = function() {
        _controller.getLabelInfo().done(function(res) {
            var data = {infoList: res.data},
            template = Handlebars.compile(rightTpl)(data);
            $("#right-content").empty();
            $("#right-content").html(template);
        });
    };

## jQueryLangJs

INTRODUCTION

 - 即时语言切换,无需重新加载页面或向服务器发出请求

 - 跨网页的语言持久性和通过cookie重新加载（需要js-cookie.js插件）

 - 自动翻译页面的动态部分（例如通过AJAX加载或通过jQuery添加）

 - 增加了对正则表达式匹配的支持

CONFIG

**en.json 配置语言包，包含短语部分和正则部分**

    {
        "token": {
            "搜索": "searchFor",
            "首页": "first",
            "尾页": "last"
        },
        "regex": [
            ["Budget", "งบประมาณ"],
            ["^Something at start of text", ""],
            ["This will be case insensitive", "i", ""]
        ]
    }

**option.lang 放置在 `HTML` 文件中，用于标记需要翻译的元素**

翻译 `title`、`alt`、`href` 

    <button title="语言" lang="cn">        

翻译内容

    <text lang="cn">标注管理系统</text>

翻译 `alert`

    alert(window.lang.translate('Some text to translate'));

**option.data-lang-token 用于标记长文本，自定义令牌替换原文本内容**   

USAGE

JS部分

js-cookie]

    <script src="js/jquery-lang.js" charset="utf-8" type="text/javascript"></script>
    <script src="js/js.cookie.js" charset="utf-8" type="text/javascript"></script>

初始化

    var lang = new Lang();
    //初始化国际化模块
    _changeLang = function() {
        //定义语言包位置
        lang.dynamic('en', '../../libs/langpack/en.json');
        //定义默认语言
        lang.init({
            defaultLang: 'cn'
        });
    },

切换

    lang.change('en');
  
## ECharts

INTRODUCTION

 - 纯javascript的图表库，支持丰富图表类型，所以下面只对项目所用的图表进行介绍

 - 兼容当前绝大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari等）

 - 底层依赖轻量级的 Canvas 类库 ZRender

 - 可定制，个性化

 - 图表父级DIV需要规定高度，否则显示不出来

CONFIG
 
**option.backgroundColor**

    backgroundColor: '#eee',    

**option.title**

    title: {
            text: '主标题,
            subtext: '副标题',
            textStyle: {...},//设置标题样式
            x: 'center',
            y: 'top'
        },  

**option.tooltip**

    tooltip: {
        trigger: 'item',//触发类型{item/axis}
        formatter: "{a} <br/>{b} : {c} ({d}%)" //提示框浮层内容格式器，支持字符串模板和回调函数两种形式，不同图表类型各个标记代表含义不同
    },

**option.legend**

    legend: {
        orient: 'vertical',//列表的布局朝向{vertical/horizontal}
        left: 'left',//自适应左边距
        data: [{
                name: '系列1',//展示数据['',...]
                icon: 'circle',// 强制设置图形为圆。
                textStyle: {
                    color: 'red'// 设置文本为红色
                }
                }] 
        },

**option.toolbox**

    toolbox: {
        orient: 'vertical',//工具栏 icon 的布局朝向{vertical/horizontal}
        show: true,//默认不显示
        feature: { //各工具配置项
            dataZoom: {yAxisIndex: 'none'}, //区域缩放
            dataView: {readOnly: false}, //查看源数据，false时可更改
            magicType: {type: ['line', 'bar']}, //折线图和柱状图切换
            restore: {}, //刷新
            saveAsImage: {} //保存图像
        }
    },

**option.xAxis**

    xAxis: {
        position: 'top', //X轴位置,default:bottom
        name: 'evsion', //X坐标轴名称
        type: 'category', //坐标轴类型{value,category,time,log}
        boundaryGap: false, //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样
        data: Array//与'category'配合使用,例['2017-4-1', '2017-4-2', '2017-4-3', '2017-4-4', '2017-4-5', '2017-4-6', '2017-4-7']
    },

**option.yAxis**

    yAxis: {
        type: 'value',
        //坐标轴刻度的相关设置
        axisLabel: {
            formatter: '{value}~~~~'
        }
    },

**option.series 系列列表。每个系列通过 type 决定自己的图表类型, 每个 type 对应不同的属性**

**option.radar 雷达图坐标系组件，只适用于雷达图**

    indicator:  [
    { name: '销售（sales）', max: 6500},
    ... 
    ]

**option.visualMap**

    visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%'
    },

**option.calendar 日历**

    calendar: {
        top: 'middle',
        left: 'center',
        orient: 'vertical',
        cellSize: [60], //单元格大小，'auto'||['20','40']
        //是否显示年
        yearLabel: {
            show: true,
            textStyle: {
                fontSize: 30
            }
        },
        //是否显示日
        dayLabel: {
            margin: 5, //星期标签与轴线之间的距离
            firstDay: 1, //从周一开始
            nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        },
        //是否显示月
        monthLabel: {
            show: true
        },
        range: ['2017-01-02', '2017-02-23'] // '2017-02'||2017||['2017-01', '2017-02']
    },

**line**

    series: [{
        name: '登陆量',
        type: 'line',
        data: [11, 11, 15, 13, 12, 13, 10],//实际运用中用数组代替Array
        //描点
        markPoint: {
            data: [
            {
                type: 'max',
                name: '最大值'
            }, {
                type: 'min',
                name: '最小值'
            }]
        },
        //直线
        markLine: {
            data: [{
                type: 'average',
                name: '平均值'
            }]
        }
    },

**pie**

    series: [{
        name: 'XXX',//饼图某部分激活时名称
        type: 'pie',
        radius: '55%',//规定饼图大小
        center: ['50%', '60%'],
        data: [{
            //A部分的值和名称
                value: {A},
                name: category[0]
            }, {
                value: {B},
                name: category[1]
            }, {
                value: {C},
                name: category[2]
            }, {
                value: {D},
                name: category[3]
            }],
            itemStyle: {//激活时样式
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    }; 

**radar**

    series: [{
        name: '系统商品数量统计',
        type: 'radar',
        data : [
            {
                value : gnum,
                name : '库存'
            }, {
                value : snum,
                name : '销售'
            }, {
                value : cnum,
                name : '评论'
            }
        ]
    }]

**map** 注意ECharts3不再支持内置地图，需要到[ECharts-Map][8]按需下载 

    series: [
        {   
            name: 'XXX',
            type: 'map',
            mapType: '湖南',//这里与配置的地图有关，注意省要用中文
            selectedMode : 'multiple',//选中模式，表示是否支持多个选中，默认关闭{single/multiple}
            //图形上的文本标签，可用于说明图形的一些数据信息
            label: {
                //是否在普通状态下显示标签。
                normal: {
                    show: true
                },
                //是否在高亮状态下显示标签。
                emphasis: {
                    show: true
                }
            },
            data:[
                {name:'A', value: 100}//注意A需要与mapType里面的值相对应
            ]
        },   
   
USAGE

*init*

    var myChart = echarts.init(document.getElementById('X'));//JQuery需要($("#X")[0])

*config.option*

    var Xoption = {
        code...//内容既为CONFIG部分
    }
    
*setOption*

    myChart.setOption(Xoption);

*event.click*    
这里params显示点击块的所有配置，然后自动跳转到百度并搜索,params.name代表点击事件触发时的取值

    myChart.on('click', function(params) {
        window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
    });

## pin

INTRODUCTION

它能将任意页面元素“钉”在某个容器顶部，而且在尺寸小的屏幕上能够自动禁用这种效果

CONFIG

**将某元素“钉”在容器内**

        $(".pinned").pin({
              containerSelector: ".container"
        })

**在小尺寸的屏幕上禁用Pin效果**

        $(".pinned").pin({
              minWidth: 940
        })   
     

USAGE

直接引用 *jquery.pin.js* 即可

## revaelJs

INTRODUCTION

 - reveal.js是一个能够帮助我们很轻易地使用HTML来创建漂亮的PPT演示效果

 - reveal.js不依赖其他任何javascript库，是一个独立的javascript插件库

CONFIG

**options** 

    // 是否在右下角展示控制条
    controls: true,

    // 是否显示演示的进度条
    progress: true,

    // 是否显示当前幻灯片的页数
    slideNumber: 'c/t',

    // 是否将每个幻灯片改变加入到浏览器的历史记录中去
    history: false,

    // 是否启用键盘快捷键来导航
    keyboard: true,

    // 是否启用幻灯片的概览模式,开启后，可以使用ESC键查看幻灯片概览
    overview: true,

    // 是否将幻灯片垂直居中
    center: true,

    // 是否在触屏设备上启用触摸导航
    touch: true,

    // 是否循环演示
    loop: false,

    // 是否将演示的方向变成 right to left
    rtl: false,

    // 全局开启和关闭碎片
    fragments: true,

    // 标识演示文稿是否在嵌入模式中运行，即包含在屏幕的有限部分中的
    embedded: false,

    // 标识当问号键被点击的时候是否应该显示一个帮助的覆盖层
    help: true,

    //  两个幻灯片之间自动切换的时间间隔（毫秒），当设置成 0 的时候则禁止自动切换，该值可以被幻灯片上的 ` data-autoslide` 属性覆盖
    autoSlide: 0,

    // 当遇到用户输入的时候停止切换
    autoSlideStoppable: true,

    // 是否启用通过鼠标滚轮来导航幻灯片
    mouseWheel: true,

    //  是否在移动设备上隐藏地址栏
    hideAddressBar: true,

    // 是否在一个弹出的 iframe 中打开幻灯片中的链接
    previewLinks: false,

    // 切换过渡效果
    transition: 'default', // none/fade/slide/convex/concave/zoom

    // 过渡速度
    transitionSpeed: 'default', // default/fast/slow

    // 全屏幻灯片背景的过渡效果
    backgroundTransition: 'default', // none/fade/slide/convex/concave/zoom

    // 除当前可见的之外的幻灯片数量
    viewDistance: 3,

    // 视差背景图片
    parallaxBackgroundImage: '', // e.g. "'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg'"

    // 视差背景尺寸
    parallaxBackgroundSize: '', // CSS syntax, e.g. "2100px 900px"

    // 移动视差背景（水平和垂直）滑动变化的数量, 例如100
    parallaxBackgroundHorizontal: '',
    parallaxBackgroundVertical: ''

**options.transition** None - Fade - Slide - Convex - Concave - Zoom

    <section data-transition="zoom">

**options.theme** Black (default) - White - League - Sky - Beige - SimpleSerif - Blood - Night - Moon - Solarized

    <link rel="stylesheet" href="css/theme/moon.css">

**options.background** #color||image.png(data-background-repeat="repeat" data-background-size="100px)||

    <section data-background="#ff0000">

**option.data-background-video**

    <section data-background-video="video.mp4,video.webm">

**keyboard**
    
    B||.  //pause
    o   //preview
    F11 // full screen                

USAGE

CSS

    <link rel="stylesheet" href="css/reveal.css">
    <link rel="stylesheet" href="css/theme/moon.css">

HTML

    <div class="reveal">
        <div class="slides">
            <section data-background="#ff0000" id="s4">
                <h2>Reveal.js</h2>
                <p>HELLO WORLD!</p>           
            </section>
        </div>
    </div>

JS

    <script src="js/reveal.js"></script>
    //初始化
    Reveal.initialize({
        //options...    
    })

## material-icon

INTRODUCTION

 - 大方，美观，跨平台，易于使用

CONFIG

CSS配置，可根据需求自行调节样式

    @font-face {
        font-family: 'Material Icons';
        font-style: normal;
        font-weight: 400;
        src: local('Material Icons'), local('MaterialIcons-Regular'), url(http://fonts.gstatic.com/s/materialicons/v21/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2) format('woff2');
    }

    .material-icons {
        font-family: 'Material Icons';
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        display: inline-block;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
        -webkit-font-feature-settings: 'liga';
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

USAGE

 - 配置CSS文件即可

DEMO

    <i class="material-icons">event</i>

## Bootstrap Multiselect

INTRODUCTION

 - *Bootstrap Multiselect* 是一个基于JQuery的插件，用于提供直观的用户界面，用于使用具有多个属性的选择输入。

CONFIG

**option.multiple 添加在 `<select>` 中，启用多选**

    <select id="test" multiple="multiple">

**option.maxHeight 下拉框最大高度**

    maxHeight: 300

**option.buttonWidth 触发按钮宽度**

    buttonWidth: '400px'

**option.includeSelectAllOption 全选**

    includeSelectAllOption: true

**option.enableFiltering 启用筛选**

    enableFiltering: true

USAGE

引入 **JS** 和 **CSS** 文件，在CSS文件内进行相关样式的更改

    <link rel="stylesheet" type="text/css" href="./dist/css/bootstrap-multiselect.css">
    <link rel="stylesheet" type="text/css" href="./docs/css/bootstrap-3.3.2.min.css">
    <script type="text/javascript" src="../jquery.min.js"></script>
    <script type="text/javascript" src="./docs/js/bootstrap-3.3.2.min.js"></script>
    <script type="text/javascript" src="./dist/js/bootstrap-multiselect.js"></script>

创建一个下拉选择框

    <select id="test" multiple="multiple">
        <option value="1"> 1 </option>
        <option value="2"> 2</option>
        <option value="3"> 3 </option>
        <option value="4"> 4</option>
        <option value="5"> 5 </option>
        <option value="6"> 6</option>
    </select>

初始化插件

    <script type="text/javascript">
        $(document).ready(function(){
            $("#test").multiselect({
                //options...
                });
        })
    </script>