# Swift4.x In Project

## System

记录系统相关问题

### Could not locate device support files

由于手机 ios 升级到13之后，现在版本的Xcode缺少相应的文件，导致无法在真机上进行测试，解决办法：

1. 直接更新 Xcode，时间长，另外通过网盘来安装 Xcode 会出现很多问题，所以一般忽略这种办法；
2. 将相应的 SDK 文件导入，在应用程序内找到Xcode，右键“显示包内容”，根据路径 `Contents-->Developer-->Platforms-->iPhoneOS.platform-->DeviceSupport`，将相应的包复制进去之后重启Xcode