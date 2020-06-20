# Mac OS

## command

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

在终端执行命令
- `open .`  打开当前目录文件
- `cd Desktop` 进入桌面目录

telnet
- `brew telent` 安装 telnet 服务， telnet命令用于登录远程主机，对远程主机进行管理，需要手动安装是由于telnet因为采用明文传送报文，安全性不好，很多Linux服务器都不开放telnet服务
- `telnet 122.51.215.237 21` 登录远程主机进程
- `close` 关闭当前连接
- `quit` 退出 


## 配置 zsh

`cat /etc/shells` 查看当前系统已安装的 shell

`brew install zsh` 安装 zsh

`echo $SHELL` 查看当前系统默认的 shell

`sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"` 安装 [Oh My Zsh](https://github.com/robbyrussell/oh-my-zsh)，它是一个开源的，社区驱动的用来管理 zsh 配置的框架

之后可以通过 `brew --version` 查看 brew 是否安装成功，安装成功之后可以通过 `brew install [name]` 来安装相应的服务，并进行管理

## 解决系统占用100多G问题

查看 系统 -> 当前用户 -> 显示隐藏文件 -> 资源库，在资源库内进行查找，查看哪些大文件占用了系统内存

主要原因是 Xcode 的支持iOS版本、模拟器、已经打包的资源文件占用过高，通过 `cmd - shift - g` 前往目标文件夹

`iOS DeviceSupport -- ~/Library/Developer/Xcode/iOS DeviceSupport` 建议删除不常用的iOS版本

`iPhone Simulator -- ~/Library/Application Support/iPhone Simulator` iPhone 模拟器路径

`Archives -- ~/Library/Developer/Xcode/Archives` 打包生产的 Archives 文件

`DerivedData -- ~/Library/Developer/Xcode/DerivedData` 可重新生成；会删除build生成的项目索引、build输出以及日志，重新打开项目时会重新生成