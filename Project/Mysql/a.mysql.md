<!-- MarkdownTOC -->

- [install](#install)
	- [腾讯云 centos7](#%E8%85%BE%E8%AE%AF%E4%BA%91-centos7)
	- [MacOS](#macos)
	- [修改 mysql 密码](#%E4%BF%AE%E6%94%B9-mysql-%E5%AF%86%E7%A0%81)
- [Q&A](#qa)
	- [Authentication plugin 'caching_sha2_password' cannot be loaded](#authentication-plugin-cachingsha2password-cannot-be-loaded)
	- [DATATIME && TIMESTAMP](#datatime--timestamp)
	- [moment 解析](#moment-%E8%A7%A3%E6%9E%90)
- [Service](#service)
	- [Trivia](#trivia)
	- [start service](#start-service)
	- [delete](#delete)

<!-- /MarkdownTOC -->

## install

### 腾讯云 centos7

MySql5.7 服务安装

注意 mariadb 是 linux 下的一个 mysql 数据库的分支，安装时很容易安装错误，实际上安装了 mariadb 之后，也能够执行 mysql 命令

下面是 mariadb 的安装方法

- `yum install mysql` 安装 mysql
- `yum install -y mariadb-server` 安装 mariadb
- `systemctl start mariadb.service` 启动 mariadb service
- `systemctl status mariadb.service` 查看当前 mariadb service 运行状态，Started MariaDB database server 表示服务已经启动
- `systemctl enable mariadb.service` 将服务添加到开机启动

发现安装错误之后，对其进行删除

- `rpm -qa | grep mariadb` 列出所有 mariadb 的安装包，当执行该命令之后没有返回值，则表示已经删除干净
- `yum remove mariadb` 删除安装的 mariadb 
- `rpm -e --nodeps [软件名]` 强制删除软件

重新安装 mysql

- `wget http://dev.mysql.com/get/mysql57-community-release-el7-8.noarch.rpm` 下载 mysql 源安装包
- `yum localinstall mysql57-community-release-el7-8.noarch.rpm ` 安装 mysql 源
- `yum repolist enabled | grep "mysql.*-community.*"` 查看 mysql 源是否安装成功
- `yum install mysql-community-server` 安装 mysql
- `systemctl start mysqld` 启动 mysql 服务
- `systemctl enable mysqld` 将 mysql 添加至开机自启动

mysql 5.7 会在初始化时添加一个随机密码，但是通过 ` grep 'temporary password' /var/log/mysqld.log` 发现并不能获得随机密码，因此通过另一种办法来解决

- `vim /etc/my.cnf` 添加 `skip-grant-tables=1;` 用来取消权限验证，之后执行 `systemctl restart mysqld` 重启服务
- `mysql> mysql -u root -p` 进入数据库
- `mysql> use mysql` 使用 mysql 这个 database
- `mysql> UPDATE user SET authentication_string=PASSWORD('password')WHERE user='root';` 来修改密码，之后通过 `mysql> flush privileges;` 来刷新权限
- 接着退出 mysql 环境，并且删除 `skip-grant-tables=1` 的权限跳过

通过 update `user` set `host`='%' where `host`='localhost' and `user`='root'; 为 user 用户添加权限，可供任意服务器进行连接

在 navicat 内测试连接可以连接，但是会报 `centos 'performance_schema.session_variables' doesn't exist` 错误，解决办法通过

- `mysql_upgrade -u root -p --force` 来启动 mysql

通过在 navicat 上进行 dump 和 execute 操作来同步两个连接的数据库


### MacOS

在 Mac OS下安装 mysql 8.0.15 安装

下载[mysql依赖包](https://dev.mysql.com/downloads/mysql/)，安装完成之后可以在 “系统偏好设置” 内看到 mysql server

将mysql写入系统的环境变量，如果不执行此操作，在 terminal 内会 `-bash: mysql: command not found`

- `vim ~/.bash_profile` 直接编辑环境变量文件
- 添加多一行 `PATH="/usr/local/mysql/bin:${PATH}"`，保存并退出
- `source ~/.bash_profile` 使改动生效
	
在 terminal 内直接 `mysql -u root -p` 进入 mysql 服务


### 修改 mysql 密码

- 进入 mysql 服务之后执行 `ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'YourNewPasswd';`
- 之后 `flush privileges;`

设置 mysql.service 的软连接

- 执行 `ln -s /usr/local/mysql/support-files/mysql.server /usr/local/bin/mysql.service` 之后可以直接使用 `mysql.service status | start | stop | restart` 来执行相应的命令

## Q&A

### Authentication plugin 'caching_sha2_password' cannot be loaded 

描述：通过 ternimal 能够输入密码进入数据库环境，但是通过 navicat 在测试连接时报错 `Authentication plugin 'caching_sha2_password' cannot be loaded`

原因：在mysql8之前的版本中加密规则为mysql_native_password，而在mysql8以后的加密规则为caching_sha2_password

解决：
- 进入 mysql 环境
- `ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER;` 修改加密规则 
- `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';` 更新用户密码
- `FLUSH PRIVILEGES;` 刷新权限
- `alter user 'root'@'localhost' identified by 'new password';` 重置密码


### DATATIME && TIMESTAMP

|名称|占用字节|取值|受 time_zone 影响|
|:-|:-|:-|:-|
|DATATIME|8|1000-01-01 00:00:00 ~ 9999-12-31 23:59:59|否|
|TIMESTAMP|4|1970-01-01 00:00:00 ~ 2038-01-19 03:14:07|是|

一个重要的区别就是：

- DATATIME 相当于“常量”，检索和保存的值保持一致
- TIMESTAMP 相当于“变量”，保存时数据库服务器将其从 time_zone 时区转换为 UTC 时间后保存，检索时将其转换从 UTC 时间转换为 time_zone 时区时间后返回

相当于，TIMESTAMP 会在数据库服务器进行时区转换，而 DATATIME 则更保持 UTC 格式不变，将转换工作交给客户端

建议优先使用 DATETIME，表示范围大、不容易受服务器的设置影响

使用 DATETIME 则意味着在客户端，需要将其转换为本地时区时间后再进行展示，比如通过 `moment.utc()` 来执行

### moment 解析

```js
import moment from 'moment';

// 对于 DATATIME 类型
var correct_date = moment.utc(origin_date).format('YYYY-MM-DD HH-mm-ss');

// 对于 TIMESTAMP
var correct_time = moment(origin_time).add(8, 'h').format('YYYY-MM-DD HH-mm-ss');
````


## Service

### Trivia

不要轻易使用 `mysql initalized`，这样会初始化数据库

特别注意，因为高版本（version:8）mysql 的加密方式方式升级，由 sha256_password 升级到 caching_sha2_password，而一般的工具，比如 navicat 都还没适配，所以需要执行 `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';` 更改数据库内 mysql_native_password 的密码，来使连接成功

对于 TIMESTAMP 时间戳类型，设置默认值为当前时间戳 `CURRENT_TIMESATMP`，通常用来保存最后一次修改时间




### start service

安装好 mysql server 之后，**可以选择**将 mysql 注册到windows服务中去，从而可以通过 `net start/stop servername` 来方便地开启或者关闭服务（一般在安装时就已经设置好了）

1. 以**管理员**身份运行 terminal，进入到 mysql/bin 目录下

2. 执行 `mysqld --install` 注册 mysql 服务

`mysqld --initialize` 初始化数据库


### delete

在 windows 中，如果不将 MySql 文件清除干净，会导致即使重装 MySql Server 仍然需要输入原始密码

一般需要清除三个位置：

1. `C:\Program Files\MySQL`

2. `cmd regedit` 编辑注册表，清除其 mysql 相关注册表信息

3. `C:\ProgramData\MySQL`


