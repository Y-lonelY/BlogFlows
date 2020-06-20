# Windows

## question && answer

windows 10 下搜索栏搜索失效

[2019-05-10 update] 一个更棒的解决方案

1. 打开“服务”，找到 `window search`，查看其依存关系
2. 遍历每个依存关系，设置其启动为 **自动**

暂时解决办法解决，重启后会失效

1. `windows - x` 打开 windows powershell 管理员
2. 输入 `Get-AppXPackage -Name Microsoft.Windows.Cortana | Foreach {Add-AppxPackage -DisableDevelopmentMode -Register "$($_.InstallLocation)\AppXManifest.xml"}`

## 文件共享给 Mac

1. 确保 windows 和 Mac 在同一局域网内
2. 在 Windows 下找到需要共享的文件夹，右键 **属性->共享->高级共享->共享此文件夹**
3. 在 Mac 内，**finder->前往->连接服务器->smb://windows's ip address**
4. 使用 Windows 账号和密码登录，就可以操作共享文件夹了