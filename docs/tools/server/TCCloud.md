# 腾讯云服务器



## 环境和工具

### wget

`wget --version` 查看是否安装 wget，
wget 是一个从网络上自动下载文件的自由工具，支持通过 HTTP、HTTPS、FTP 三个最常见的 TCP/IP协议 下载，并可以使用 HTTP 代理



### FTP 服务

[Linux 云服务器搭建 FTP 服务](https://cloud.tencent.com/document/product/213/10912)

两个 FTP 客户端工具
- [Cyberduck](https://cyberduck.io/)
- [FileZilla](https://filezilla-project.org/download.php?platform=osx)



### 安装服务/环境/cli

这里以安装 node 环境为例进行说明，其他环境的安装类似

**node --version** 查看是否安装 NodeJS，如果没有安装，可以参考[自定义安装](https://cloud.tencent.com/document/product/213/38237)

- `cd root` 进入根目录
- `wget https://nodejs.org/dist/v12.13.1/node-v12.13.1-linux-x64.tar.xz` 下载安装包
- `tar xvf node-v12.13.1-linux.tar.xz` 解压 node 文件
- `ln -s /root/node-v12.13.1-linux-x64/bin/node /usr/local/bin/node` 建立 node 命令的软链接
- `ln -s /root/node-v12.13.1-linux-x64/bin/npm /usr/local/bin/npm` 建立 npm 命令的软链接



### 软硬链接

在上文中，我们通过软链接来做了一个指向绝对路径的“快捷方式”，这里我们简单区分一下软/硬链接的概念：

- 硬链接：其 `inode`(可以理解为指针) 都指向同一个文件在内存中的区块，这意味着改变链接文件，另一个文件也会同步改变，`ln file hard`
- 软链接：保存了其代表文件的绝对路径，在内存上有自己独立的区块，访问时会替换自身路径



## Q&&A

Q1: 服务器上，安装 pm2 时，npm install 卡在 sill install loadIdealTree？

```
1. 更换 npm 源 `https://registry.npm.taobao.org/` 
2. 删除 package-lock.json, node_modules 后，重新安装
```

Q2: [NPM not installing package. Hostname/IP address doesn't match certificate's altnames?](https://stackoverflow.com/questions/52128212/npm-not-installing-package-hostname-ip-address-doesnt-match-certificates-altn)

```shell
# 获取 www.npmjs.com ip
dig www.npmjs.com @1.1.1.1
# 配置 hosts 文件
vim /etc/hosts
```

Q3: 在服务器上拉取代码特别慢？

```
解决思路类似 Q2，通过配置 hosts 来指定 ip
通过 https://fastly.net.ipaddress.com/ 来查看：
1. github.com
2. github.global.ssl.fastly.net
的 ip 地址

之后将其添加到 hosts 文件内，最后执行 `sudo /etc/init.d/network restart` 刷新设置
```

Q4: 如何查看 npm 全局的安装路径？

```shell
# 通过 npm 配置信息进行查看
npm config get registry
```

