# Swift

## CocoaPods

[CocoaPods](https://cocoapods.org/) 是 Swift 和 Object-C cocoa 项目的包管理器，通过其来管理项目依赖

### Install

1. `sudo gem install cocoapods` 安装 cocoapods
2. `pod init` 初始化一个 Podfile，用来对依赖进行配置
3. `pod --version` 查看当前 cocoapods 版本
4. `pod install` 根据 podfile 安装相关的依赖包

### Update

执行命令 `sudo gem install cocoapods` 进行更新

问题1：如果出现 `Could not find a valid gem 'cocopods' (>= 0) in any repository` 则表示无法访问到当前地址<br>
解决办法：添加或者更改镜像地址，如下：
1. `gem source -l` 查看当前源，如果是 `rubygems` ，则替换成 `https://gems.ruby-china.com`
2. `gem sources --remove https://rubygems.org/` 移除 rubygems 源
3. `gem source -a https://gems.ruby-china.com` 添加 ruby-china 源
4. `sudo gem update --system` 更新系统缓存
5. `sudo gem install cocoapods` 更新 cocoapods

问题2：在执行更新操作时，出现 `ERROR:  While executing gem ... (Gem::FilePermissionError) You don't have write permissions for the /usr/bin directory.`
解决办法：执行 `sudo gem install cocoapods -n /usr/local/bin` 进行更新操作

gem 镜像相关命令

```shell
// 查看当前地址
gem source -l
// 添加一个 source
gem source -a url
// 删除一个 source
gem source -r url
// 更新 source cache
gem source -u 
```


## snapKit

[snapKit](https://github.com/SnapKit/SnapKit) 用来实现 autolayout 布局

1. 在 podfile 内添加`pod 'SnapKit', '~> 5.0.0'` 配置
2. `pod install` 安装依赖
3. 在项目内使用 `import snapKit` 引入 snapKit 库

**注意** 第一次 `pod install` 之后，需要关闭当前打开的 `.xcodeproj` 重新打开目录下 `.xcworkspace` 文件（由 pod install 时生成），否则会报 `framework not found...` 等错误

### Basic Usage

创建约束 `makeConstraints`

```Swift
box1.snp.makeConstraints { (make) -> Void in
    // 相对父视图进行定位方法1
    make.edges.equalTo(self.view).inset(UIEdgeInsets(top: 40, left: 10, bottom: 60, right: 10))
    // 相对父视图进行定位方法2，分开书写
    // 通过 offset 设置边距
    make.top.equalTo(self.view).offset(40)
    make.left.equalTo(self.view).offset(40)
    make.bottom.equalTo(self.view).offset(40)
    make.right.equalTo(self.view).offset(40)

    // 将当前视图相对父视图居中展示
    make.center.equalToSuperview()
    // 设置当前视图size，方法1
    make.width.equalTo(100)
    make.height.equalTo(100)
    // 设置当前视图size，方法2
    make.size.equalTo(CGSize(width: 100, height: 100))
    // 子视图top = 父视图top + 20
    make.top.equalTo(20)
    // >=100
    make.width.greaterThanOrEqualTo(100)
    // <=100
    make.height.lessThanOrEqualTo(100)
    // 优先级
    make.size.equalTo(CGSize(width: 200, height: 200)).priority(200)
    make.size.equalTo(CGSize(width: 100, height: 100)).priority(100)
    // 对象的基线，对于具有多行文本的对象，表示最底部文本的基线
	make.baseline.equalTo(100)

    // 综合使用
    // 设置文本相对box1居中且 padding 20
    // box2.snp.bottom 获取 box2 的 snapKit 相关信息
    make.top.equalTo(box2.snp.bottom).offset(20)
    make.centerX.equalTo(box2.snp.centerX)
}
```

更新约束 `updateConstraints`，`updateConstraints` 只能更新初始化就已经创建的约束，即在 `makeConstraints` 创建的基础上进行更新，**注意必须要完全一致！**

```Swift
box2.snp.updateConstraints {(make) -> Void in
    make.top.equalTo(300)
}
```

重做约束 `remarkConstraints`，相当于先清除之前 `makeConstraints` 所创建的所有约束，再重新创建约束

```Swift
box2.snp.remakeConstraints { (make) in
	make.top.equalTo(300)
}
```

### Key Point

1. 视图定位以第一次为准，如果后面再次定位的话，并不会生效
2. 如果设置 `make.top.equalTo(20)` 可类比 CSS 的绝对定位，如果接着设置 `make.center.equalToSuperview()` 来居中展示，则视图表现会忽略宽高设置，由绝对定位来设置宽高同时居中展示，可以理解为优先级：居中展示 > 绝对定位 > 宽高设置
3. `priority()` 可以用来设置同一语句的优先级，可以用 1-1000 来填充值，通过比较大小来表示优先级，**如果设置数值大于1000，则会引起 crash**
4. 可以利用 `equalTo(view)` 来快速设置当前视图和指定视图具有相同定位，之后再在此基础上进行重新定位
5. `offset()` 和 `inset()` 都可以用来设置边距，后者是前者的高级封装，总结起来就是，描述父子视图时（即equalToSuperview()），使用 `inset()`，描述兄弟视图时使用 `offset()`
6. snapKit 内 leading 和 left 属性的区别：对于从左往右的语言，比如英语，leading 和 left 的表现一致，但是对于从右往左的语言，比如希伯来语，trailing 同比 left 而不是 leading（可以理解为表现相反），因此在代码中应该使用 leading 和 trailing 来展示左右边距


## PromiseKit

[PromiseKit](https://github.com/mxcl/PromiseKit) 用来简化异步编程

1. 在 podfile 内添加`pod "PromiseKit", "~> 6.8"` 配置
2. `pod install` 安装依赖
3. 在项目内使用 `import PromiseKit` 引入 snapKit 库