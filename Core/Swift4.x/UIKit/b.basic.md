<!-- MarkdownTOC levels="2,3"  -->

- [UIKit](#uikit)
- [Views and Controls](#views-and-controls)
- [UIView](#uiview)
	- [Cluster](#cluster)
	- [子视图常用操作](#%E5%AD%90%E8%A7%86%E5%9B%BE%E5%B8%B8%E7%94%A8%E6%93%8D%E4%BD%9C)
	- [animate](#animate)
	- [bounds](#bounds)
	- [UIScreen](#uiscreen)
- [UIConrol](#uiconrol)
	- [Event](#event)
	- [UIDevice](#uidevice)
	- [Keyboard](#keyboard)
	- [Print Log](#print-log)
- [UIViewController](#uiviewcontroller)

<!-- /MarkdownTOC -->

> Application

## UIKit

*What's UIKit?*

简单理解，UIKit 就是一个核心组件库，提供了许多应用程序的核心对象，包括：

1. 与系统交互的对象
2. 运行应用程序的主事件循环
3. 在屏幕上展示内容

*UIKit Apps*

通过Xcode新建的App是一个单页应用，使用最简单的文件结构，当引入 UIKit 后，UIKit 应用程序的机构基于MVC，其中对象按其用途划分

1. Model 管理应用程序的数据和业务逻辑
2. View 对象提供数据的可视化展示，促进用户交互，视图控制器可以管理视图和界面结构
3. Controller 充当模型和视图对象之间的桥梁，再合适的时机移动数据

无论什么UIKit内容，都需要一个矩形区域（CGRect()）来承载


## Views and Controls

Views 和 Controls 共同构建用户界面的视图，且视图可以相互嵌套从而形成父子关系

我理解的视图就是：视图更像是一个图层管理器，通过设置属性来进行管理，访问它实际上就是在访问其属性

视图上可以执行以下任何操作：

1. 对触摸和其他动作做出反应
2. 使用Core Graphics 或 UIKit 类绘制自定义类容
3. 支持拖拽
4. 对焦点变化做出反应
5. 为视图大小、位置和外观属性设置动画

UIView 是所有视图的根类，定义了它们的常见行为

UIControl 定义了特定于按钮、开关和为用户交互设计的行为

通过 `addSubview(view)` 和 `addChild(viewController)` 分别将子视图和子视图控制器实例添加到父视图，否则在子视图内添加的方法（比如按钮点击事件）不会触发


## UIView

> UIKit defines the UIView class, which is usually responsible for displaying your content onscreen && An object that manages the content for a rectangular area on the screen

UIView 有点类似 HTML 的 div 块的概念，其表现更像是 Vue 或者 React 内的模版内容，每一个组件都通过 UIView 来进行包裹（类比其模版内容必须有一个根Div块），组件内容可以是其他 UIKit 的组合（类比 HTML 其他标签），而 UIView 之间可以形成父子（children && parent）或者兄弟(siblings)关系

视图类的职责：

1. Drawing and Animation
2. Layout and Subview management
3. Event Handling

视图是按需绘制的，类似 V8 的重绘机制，当视图的实际内容发生变化时，会触发重绘机制，通过 `setNeedsDisplay()` 来告知下次绘制时该视图需要重绘，且可以在下个重绘周期更新视图时，同时更新多个内容

### Cluster

`view.tag` 为视图添加标志符，可以在需要的时候，通过标志符来找到该视图，类似 HTML 中 id && class 的概念，不过用 Int 类型表示，更加简洁，通过 `viewWithTag(Tag: int)` 来获取相应的 view

`view.isHidden` 来返回和设置视图的显示和隐藏

`view?.removeFromSuperview()` 从父视图内删除当前视图

### 子视图常用操作

针对父子关系视图的常用操作
- `superView.addSubview(view)` 新增视图默认放在所有兄弟视图的顶部
- `superView.insertSubview()` 来向指定的位置插入视图
- `superView.exchangeSubview()` 交换子视图的位置
- `self.view.sendSubviewToBack(view)` 将指定视图移到主视图后面（z轴）
- `self.view.bringSubviewToFront(view)` 将指定视图移到主视图前面
- `subView.removeFromSuperview()` 将视图从父视图内移除

### animate

通过 `UIView.animate()` 结合 `layoutIfNeeded()`（立即对子视图进行更新）实现子视图重新定位后的动画过渡

```Swift
UIView.animate(withDuration: 1, delay: 0, options: .curveEaseInOut, animations: {
    self.box2.snp.updateConstraints {(make) -> Void in
        make.size.equalTo(CGSize(width: 50, height: 50))
    }
    self.box2.superview?.layoutIfNeeded()
}, completion: nil)
```

**注意** `superView.layoutIfNeeded()` 需要显式调用

### bounds

一个比较晦涩的概念，首先抛出比较重要的点：

- `frame` 表示该视图在其父视图坐标系的位置和大小，参照点是父坐标系
- `bounds` 表示该视图在本地坐标系统的位置和大小，参照点是本地坐标系

通过修改 `bounds` 来修改本地系统的原点位置，所以知道当前视图原点相对于父视图的坐标系的原点位置至关重要

设置 `viewTwo.bounds = CGRect(x: -20, y: 200, width: 400, height: 200)`，我的理解就是，将当前原点位置设置为 (-20, 200)，那么其新的原点位置实际上相对于原视图向右偏移20，向上偏移200，如果当前视图的 frame（即相对父视图的坐标系）为 (0,0)，则当前视图的原点位置被重新设置为 (20, -200)（相对父视图的坐标系）,因此如果在当前视图再添加子视图的话，就是相对 (20, -200) 进行设置
概括起来就是，设置 `bounds` 之后，其原点位置被重新设置为 (-x, -y)

### UIScreen

通过 `let screenRect: CGRect = UIScreen.main.bounds` 获取当前屏幕尺寸


## UIConrol

> The base class for controls, which are visual elements that convey a specific action or intention in response to user interactions.

控件的基类，是为响应用户交互而传达特定操作或者意图的可视元素，其继承至 `UIView`

控件通过 Target-Action 机制来将用户交互传达至应用

### Event

Event 是描述控件可能发生的事件类型的常量，通过 `addTarget(_: action: for:)` 来讲控件和多个控制事件关联起来

1. `touchDown` 在手指触碰按下时触发
2. `touchUpInside` 在容器边界内，完成一次点击操作时触发，即按下-松开
3. `touchUpOutside` 在容器内部按下，在容器外部松开时触发

**UITextField**

1. `editingDidBegin` 手指触摸到输入框边界内时触发
2. `editingChanged` 编辑时触发
3. `editingDidEnd` 手指触摸到输入框边界外时触发
4. `editingDidEndOnExit` 目前来看在点击右下角 “前往” 时触发

**注意**

1. 在 Swift4 中，UITextField 不支持 `touchUpInside` 但是可以支持 `touchDown` 事件
2. `editingDidBegin` 在键盘弹起事件 `keyBoardWillShow` 之前触发
3. `editingChanged` 注意不仅仅是输入框内容改变时触发，在打字时也会触发，注意会改变 `UITextField.text` 的值，中文输入法会自动填充空格
4. `editingDidEnd` 注意会在键盘收起事件 `keyBoardWillHidden` 之前触发

### UIDevice

通过 `let device = UIDevice.current` 获取当前运行的设备

`device.orientation` 获取当前屏幕展示模式，Swift 内屏幕模式是一个枚举类型，包括：

- faceUp：设备平放，home 在上
- faceDown：设备平放， home 在下
- landscapeLeft：面向设备，保持垂直，home 在右
- landscapeRight：面向设备，保持垂直，home 在左
- portrait：面向设备，保持垂直，home 在下
- portraitUpsideDown：面向设备，保持垂直，home 在上
- unknown：方向未知

概括来说，`landscape` 表示景观，理解为机器头部摄像头位置，景观模式即为横屏，`portrait` 表示肖像模式，为竖屏

### Keyboard

对键盘事件进行监听

- `UIResponder.keyboardWillShowNotification` 键盘将要弹出
- `UIResponder.keyboardWillHideNotification` 键盘将要隐藏
- `UIResponder.keyboardDidShowNotification` 键盘弹出后立即发送通知
- `UIResponder.keyboardDidHideNotification` 键盘隐藏后立即发送通知

```Swift
// 添加 observer 监听键盘即将弹出
NotificationCenter.default.addObserver(self, selector: #selector(keyBoardWillShow(note:)), name: UIResponder.keyboardWillShowNotification, object: nil)
```

### Print Log

1. `print(item: Any)` 直接打印
2. `debugPrint(item: Any)` 该输出语句可以根据内容的类型，在控制台打印相应格式的内容，比如字符串会添加引号
3. `CFShow("this is CFShow" as CFTypeRef)` 用来发送描述文字给其显示对象
4. `dump()` 打印一个对象的详细信息


## UIViewController

> An object that manages a view hierarchy for your UIKit app

UIViewController 类是用来管理视图层次结构的对象，定义了所有视图控制器的公共行为，其职责主要包括

1. 更新视图内容，通常用来响应对基础数据的更改
2. 响应用户与视图的交互
3. 调整视图大小并管理整个页面的布局
4. 在应用程序中与其他对象（包括视图控制器）协调

每个视图控制器都管理一个视图层次结构，其根视图存储在此类的 `view` 属性中，比如 `self.view`，根视图可以理解为一个容器，用来存放其他视图

窗口拥有的视图控制器是应用程序的根视图控制器，其视图的大小会填充窗口

UIViewController 对视图的加载机制是懒加载，在首次访问 view 属性时，才会加载或者创建视图，几种指定视图的方式：

1. 官方首选 `storyboard` ，通过配置属性来展示不同的视图控制器
2. 通过 Nib File 来指定视图控制器的视图，利用 nib 文件初始化视图控制器对象，再通过 `init(nibName: bundle: )` 对其初始化，请求视图时，视图控制器从 nib 文件内进行加载
3. 通过 `loadView()` 方法来指定视图控制器的视图

一般都是通过 storyboard 来创建视图控制器，对里面视图进行管理，多页面应用的入口视图控制器通常为 `Navigation Controller`，用来控制导航栏，通过设置 `Is Initial View Controller` 来设置其为初始视图控制器

**设置当前页面的视图控制器**

1. 视图控制器文件和 storyboard 相互配合，可以在 storyboard 内 `Show the Identity Inspector - Custom Class - Class` 来设置当前页面的视图控制器

2. 在 `AppDelegate.swift - application` 方法内 `let vc = pageViewController()` 声明视图控制器实例，然后通过 `self.window?.rootViewController = vc` 来设置根视图控制器

**注意**

1. 视图控制器是其视图及视图的子视图的唯一所有者，它负责创建这些视图并在适当的时机释放
2. 如果使用 `storyboard` 或者 nil 文件的方式来创建视图控制器，则每个视图控制器对象在请求时自动获取视图的拷贝
3. 如果手动创建视图，则每个视图控制器都必须具有自己的唯一视图集，无法在视图控制器之间共享视图

