# DevelopTools

> 记录开发过程中使用的开发工具

## Mac OS

### command

`cmd - Q` 关闭当前 app

`cmd - W` 关闭当前文件

`cmd - M` 最小化当前 app

`cmd - control - f` 全屏/退出全屏使用应用（如果应用支持）

`shift - cmd - .` 打开/关闭当前文件目录下的隐藏文件

`ctrl - ⬅️ || ➡️` 切换应用

`ctrl - ⬆️ || ⬇️` 在 Finder 中切换上下级目录

`cmd - space` 打开聚焦搜索spotlight

`ctrl - cmd - space` 打开 emoji

`ctrl - shift - G` 前往文件夹，比如 private/etc, private/var 等

`:terminal` 打开终端

解决端口占用

- `ps` 查看所有系统进程
- `sudo lsof -i :7177` 查看占用7177端口的进程
- `sudo kill -9 [pid]` 关闭指定pid的进程

### terminal command

`open .`  打开当前目录文件

`cd Desktop` 进入桌面目录

`cd ～` 进入根目录

`ls -al` 查看目录下文件的详细信息

`du -sh *` 查看每个目录的大小

为文件设置最高权限，在文件的上级目录内执行 `sudo chmod -R 777 [targetFileName]`，然后输入密码即可

### 配置 zsh

`cat /etc/shells` 查看当前系统已安装的 shell

`brew install zsh` 安装 zsh

`echo $SHELL` 查看当前系统默认的 shell

`sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"` 安装 [Oh My Zsh](https://github.com/robbyrussell/oh-my-zsh)，它是一个开源的，社区驱动的用来管理 zsh 配置的框架

### 解决系统占用100多G问题

查看 系统 -> 当前用户 -> 显示隐藏文件 -> 资源库，在资源库内进行查找，查看哪些大文件占用了系统内存

主要原因是 Xcode 的支持iOS版本、模拟器、已经打包的资源文件占用过高，通过 `cmd - shift - g` 前往目标文件夹

`iOS DeviceSupport -- ~/Library/Developer/Xcode/iOS DeviceSupport` 建议删除不常用的iOS版本

`iPhone Simulator -- ~/Library/Application Support/iPhone Simulator` iPhone 模拟器路径

`Archives -- ~/Library/Developer/Xcode/Archives` 打包生产的 Archives 文件

`DerivedData -- ~/Library/Developer/Xcode/DerivedData` 可重新生成；会删除build生成的项目索引、build输出以及日志，重新打开项目时会重新生成


## Windows

### question && answer

windows 10 下搜索栏搜索失效

[2019-05-10 update] 一个更棒的解决方案

1. 打开“服务”，找到 `window search`，查看其依存关系
2. 遍历每个依存关系，设置其启动为 **自动**

暂时解决办法解决，重启后会失效

1. `windows - x` 打开 windows powershell 管理员
2. 输入 `Get-AppXPackage -Name Microsoft.Windows.Cortana | Foreach {Add-AppxPackage -DisableDevelopmentMode -Register "$($_.InstallLocation)\AppXManifest.xml"}`

### 文件共享给 Mac

1. 确保 windows 和 Mac 在同一局域网内
2. 在 Windows 下找到需要共享的文件夹，右键 **属性->共享->高级共享->共享此文件夹**
3. 在 Mac 内，**finder->前往->连接服务器->smb://windows's ip address**
4. 使用 Windows 账号和密码登录，就可以操作共享文件夹了

## VS Code

> 通常用来开发 react, TypeScript 应用

### HotKey

`ctrl - B` 显示/隐藏 侧边栏

`ctrl - O` 打开文件

`ctrl - K - O` 打开文件夹

`ctrl - N` 新建文件

`ctrl - \` 分屏

`ctrl - NUM` 切屏

`ctrl - TAB` 在当前屏内切换文件

`ctrl - ~` 调用 TERMINAL

`ctrl - P` 快速打开文件

`ctrl - F` 当前文件搜索

`ctrl - shift - F` 当前文件夹搜索

`ctrl - shift - P` 打开命令列表

`ctrl - F2` 替换当前文件所有字符

### Cluster

**vscode 修改默认shell**

`ctrl - shift - P` 打开命令列表，输入 Ternimal: select default shell，选择相应的 shell

### Panel

OPEN EDITORS - 代表之前打开过的文件

SOURCE CONTROLLER - git GUI 

### extension

[官网](https://marketplace.visualstudio.com/vscode)


## Chrome

> web端主力开发浏览器

### windows 10

`shift - ESC` 打开 chrome 任务管理器

`ctrl - shift - i` 打开控制台

`ctrl - shift - b` 切换标签栏展示/隐藏

`ctrl - tab` 切换下一个窗口

`ctrl - shift -tab` 切换前一个窗口

`console.log('%c1.当前时间的moment对象', 'text-shadow: 0px 1px 1px #eee; color: #7fffd4');` 通过 %c 关键字为输出添加 css 样式

### Mac OS

`option - command - i` 打开控制台

`command - shift - b` 切换标签栏展示/隐藏

`option - command - b` 打开书签管理器

`option - command - ⬅️ || ➡️` 切换窗口


## Xcode

> Swift Project With Xcode

### Import a New Project

1. 选择正确分支，import
2. 登陆开发者账号

### Hotkey

`⌘ - L` 跳转至指定行

`⌘ - [` 左移一行或者多行代码

`⌘ - /` 注释

`⌘ - ,` 对编辑器样式，声音进行设置

`⌘ - R` 编译并运行项目

`⇧ - ⌘ - O` 快速查询文件，双击或者 enter 打开

`⌥ - ⌘ - F` 对当前文件指定内容进行替换

`⌥ - ⌘ - ← || →` 折叠或者展开代码

`⌥ - ⌘ - ⇧ - ← || →` 折叠或者展开全部函数方法

快速对项目内所有同名的变量进行**重命名**操作：在项目文件内选中需要重命名变量，[Editor -> Refactor -> Rename]

快速将项目内代码段抽成**独立方法**：在项目文件内选中代码块，[Editor -> Refactor -> Extract Method]，之后对抽离的方法进行重命名

### Create a new Xcode Project

1. 选择模版，其中 `cross-platform` 意味着可以为苹果移动设备、手表、电视和桌面四个平台创建游戏和应用
2. 选择模版之后，需要配置项目的基本信息，`Include UI Tests` 是界面测试框架，是一种新的方法来管理应用界面的测试工作，其允许对界面元素进行查找、交互、验证属性和状态
3. 接着选择项目的存放路径
4. Build && Stop 来编译运行和终止运行项目模拟器

### Set Project Properties

在 `Identity` 设置应用程序的名称，标志符，版本号和编译号

- `Display name` 设置应用程序在设备上显示的名称
- `Bundle Idetifier` 设置应用程序的唯一标志符，如果需要发布到 App Store，则需要和苹果管理后台创建的产品标志符保持一致
- `Version` 版本号
- `Build` 编译号，同一个版本号可以有不同的编译号，例如当一个版本在审核失败时，可以修改编译号，再次打包提交审核

`Deployment Info`

- `Deployment Target` 指定编译后的应用可以在哪些系统版本上运行，选择低版本可以适配更多的用户，但是可能无法使用一些新的接口
- `Devices` 选择发布后的程序在什么类型设备上运行，`Universal` 表示通用
- `Main Interface` 选择程序启动的主接口，即程序启动时，首先运行哪个故事版中的初始化视图控制器，系统提供两个选择：`Main.storyboard` 程序主视图，`launchScreen.storyboard` 启动主视图
- `Device Orientation` 设备朝向设置区，设置应用程序支持的设备方向，肖像模式，景观模式
- `Status Bar Style` 设置页面顶部的状态栏

### Debugger

在行号处单机来设置断点

直接拖动则可以移除该断点

通过 `po` 关键字在控制台打印关键信息

### Pannel

Xcode 控制面板介绍

#### Left Pannel

从左往右：

1. 文件结构
	- 右键/左下角➕，可以对文件进行操作
	- 一个比较新的概念：`Group`，在 Xcode 中，组并不是真实的文件夹，它在硬盘上并不存在，组是一个用来组织管理文件的虚拟概念
	- 下方 filter可以筛选文件，同时可以点击时间按钮来快速筛选近期编辑的文件，点击版本按钮来快速筛选处于版本控制状态的文件
2. 版本管理(类似gitbash)
3. 层级面板，展示项目内的类列表以及类下的方法，点击方法可以进行快速跳转
4. 搜索，允许通过关键字进行全局搜索
5. 状况面板，展示项目中的代码问题，黄色警告，红色错误
6. 测试面板，展示项目的测试用例
7. 调试面板，可以观察app运行时，设备的处理器，内存，硬盘读写以及网络请求状态
8. 断点，可以记录项目内的所有断点
9. 日志，记录当前项目所有的历史动作

#### Right Pannel

从左往右：

1. Library
2. 标准编辑器，编辑视窗代码区域为一块
3. 辅助编辑器，将代码区域切换为左右两个区域，再次点击可以对视窗的展示形式进行配置，例如左右，上下展示
4. 显示版本编辑器，可以查看代码的历史状态，提交信息和log
5. 编辑器左侧区域显示/隐藏
6. 编辑器底部区域显示/隐藏
5. 编辑器右侧区域显示/隐藏

### File Structure

以 DemoApp 为例

**DemoApp**

1. `AppDelegate.swift` 选择编辑应用代理文件。应用代理文件是系统运行应用的委托，定义如程序的生命周期（如进入和退出），设备屏幕旋转等全局方法
2. `ViewController.swift` 视图控制器，创建和管理视图，也可以监听设备方向的变化，并调整视图大小以适应屏幕，以及在模型和视图之间进行数据传递
3. `Main.storyboard` 故事板，用来展现所有视图控制器以及它们之间的关系，故事板同时也是适配多个分辨率设备的利器
4. `Assets.xcassets` 资源文件夹，用来方便进行图片管理，并且在加载图片时，不需要加上图片后缀，提高了软件的安全性，同时可以将图片都加密解压，并保存到 `Assets.car` 文件内，通过点击底部的 `+` 号
	- 选择 `import` 来引入一个资源
	- 选择 `New Folder` 来新建文件夹用于资源管理，通过拖拽将资源放进不同的文件夹内
5. `LaunchScreen.storyboard` 启动场景故事板，可以帮助您设计和适配程序的启动页
6. `Info.plist` 信息属性列表文件，存储项目配置信息，例如程序的版本号、显示用的图标、支持的设备方向等

**Products**

在产品目录中，存放项目编译后生成的文件包，可以在此生成适合发布到苹果市场的应用压缩包

### Simulator

创建一个 Project 后会产生一个模拟器，模拟器就是模拟正常设备

`⌘ - k` 快速调出/隐藏键盘

#### Hardware

用来模拟手机物理操作，值的注意的是：

1. `Erase All Content and Settings...` 还原按钮，将清除模拟器上所有的测试应用

#### File

当向苹果提交应用时，同时也需要提交应用的截图，所以需要对当前页面进行截图，快捷键为 `⌘ - s`，也可以选择 `File - New Screen Shot` 进行截图

