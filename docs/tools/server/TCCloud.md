# 腾讯云服务器

> CentOS 7

## 环境和工具

### wget

`wget --version` 查看是否安装 wget，
wget 是一个从网络上自动下载文件的自由工具，支持通过 HTTP、HTTPS、FTP 三个最常见的 TCP/IP协议 下载，并可以使用 HTTP 代理


### FTP 服务

[Linux 云服务器搭建 FTP 服务](https://cloud.tencent.com/document/product/213/10912)

两个 FTP 客户端工具
- [Cyberduck](https://cyberduck.io/)
- [FileZilla](https://filezilla-project.org/download.php?platform=osx)


### Node

`node --version` 查看是否安装 node，
如果没有安装，可以自定义安装，[具体参考](https://cloud.tencent.com/document/product/213/38237)

- `cd root` 进入根目录
- `wget https://nodejs.org/dist/v12.13.1/node-v12.13.1-linux-x64.tar.xz` 下载安装包
- `tar xvf node-v12.13.1-linux.tar.xz` 在根目录下存在下载文件后，解压 node 文件
- `ln -s /root/node-v12.13.1-linux-x64/bin/node /usr/local/bin/node` 建立 node 命令的软链接
- `ln -s /root/node-v12.13.1-linux-x64/bin/npm /usr/local/bin/npm` 建立 npm 命令的软链接
- `node --version` 查看安装是否成功


### Git

Git环境搭建

- 通过 `yum install git` 安装 git 环境
- `git --version` 查看是否安装成功
- `git config --global user.name ""` 设置用户名
- `git config --global user.email ""` 设置email


### Vuepress

Vuepress环境安装

- `npm install -g vuepress` 安装 vuepress，如果发现 command not found，则可能是环境变了Path路径不对
- `cd /root/node-v12.13.1-linux-x64/bin/` 和 `cd /usr/local/bin/` 查看各自目录下是否有 vuepress，目的是在后者文件内存在 vuepress
- `ln -s /root/node-v12.13.1-linux-x64/bin/vuepress /usr/local/bin/vuepress` 建立 vuepress 命令的软链接


### Nginx

`yum install nginx` 安装 nginx

`whereis nginx` 查看 nginx 安装路径，在 /etc/nginx 内修改配置文件