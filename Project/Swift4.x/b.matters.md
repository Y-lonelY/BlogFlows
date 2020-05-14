<!-- MarkdownTOC -->

- [Could not locate device support files](#could-not-locate-device-support-files)
- [NSInvalidUnarchiveOperationException](#nsinvalidunarchiveoperationexception)

<!-- /MarkdownTOC -->


> 用来记录在使用Swift4进行实际开发过程中遇到的具有代表性或者棘手的问题

## Could not locate device support files

由于手机 ios 升级到13之后，现在版本的Xcode缺少相应的文件，导致无法在真机上进行测试，解决办法：

1. 直接更新 Xcode，时间长，另外通过网盘来安装 Xcode 会出现很多问题，所以一般忽略这种办法；
2. 将相应的 SDK 文件导入，在应用程序内找到Xcode，右键“显示包内容”，根据路径 `Contents-->Developer-->Platforms-->iPhoneOS.platform-->DeviceSupport`，将相应的包复制进去之后重启Xcode
3. 在[开发者官网](https://developer.apple.com/download/) 下载更新的 Xcode beta，一般 Xcode 会和新版iOS一起发布

## NSInvalidUnarchiveOperationException

问题描述：因为测试环境和线上环境的不同，通过更改项目名来进行区别，在升级 Xcode11 之后，app 启动直接 crash，报错 `'NSInvalidUnarchiveOperationException', reason: '*** -[NSKeyedUnarchiver decodeObjectForKey:]: cannot decode object of class (xxx.class) for key (root);`

参考文章[Swift环境下变更Xcode工程名后使用NSKeyedUnarchiver解档引起的崩溃问题](https://juejin.im/post/5c1ba593e51d4546c014dd7d)中，问题出现的原因：

由于 Swift 的**命名空间**机制，创建的类都会带上命名空间（简单理解就是工程名），当改变工程名的同时，意味着命名空间也发生了相应的改变。在上一个package内工程归档自定义类时，使用的是旧的命名空间，因此在新的package内发生解档时，找不到对应的命名空间，导致 crash

除了通过文章的 `try catch` 来捕获错误之外，还需要检查项目内的相关配置是否与之前打包持久化的内容一致，具体如下：

1. `Info.plist > Bundle Display Name`
2. `Build Setting > Product Name`