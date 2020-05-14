<!-- MarkdownTOC levels="2" -->

- [App's Life Circle](#apps-life-circle)

<!-- /MarkdownTOC -->

> 弄清楚 Swift 内app 和 viewController 的生命周期

## App's Life Circle

app 的生命周期定义一般放在 `AppDelegate.swift` 文件内，它是选择编辑应用代理文件。应用代理文件是系统运行应用的委托，定义如程序的生命周期（如进入和退出），设备屏幕旋转等全局方法

1. `application` 应用程序启动后，完成初始化配置，即程序完成加载后触发

2. `applicationWillResignActive` 当程序由活跃状态转为非活跃状态时，调用此方法。这类的场景：对于某些类型的临时中断（例如来电或SMS消息）或当用户退出应用程序并且它开始转换到后台状态时，可能会发生这种情况。此时，可以暂停正在进行的任务，禁用计时器以及使图像渲染回调无效，如果是游戏则可以暂停

3. `applicationDidEnterBackground` 当程序被推送到后台时，调用此方法。使用此方法释放共享资源，保存用户数据，使计时器无效，并存储足够的应用程序状态信息，以便将应用程序恢复到当前状态，以防以后终止，如果程序支持后台执行，该方法会被调用而不是 `applicationWillTerminate`

4. `applicationWillEnterForeground` 程序从后台推回到前台时，调用此方法。从后台到活跃状态的一个过渡，可以在此方法内终止某些后台的方法

5. `applicationDidBecomeActive` 当程序进入活跃状态时，调用此方法。通常在此方法内，在应用程序处于非活动状态时重新启动暂停（或尚未启动）的任何任务，如果应用程序以前在后台，则可以选择刷新用户界面

6. `applicationWillTerminate` 程序将要退出时，调用此方法。通常用来保存数据和一些退出时的清理工作

