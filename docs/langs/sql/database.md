# Database

## Mysql

## mysqlbinlog revert

> mysqlbinlog 是 DB 附带的一个实用程序，用于处理 binary log 和 relay log.

结合 binlog 和 mysqlbinlog 可以进行一些回滚操作，能够恢复表结构等

进入 mysql 环境，这里的目的是为了方便查看 log

- `show variables like '%bin_log%';` 查看 mysql 内 binlog 相关配置，包括位置等信息
- `show master status;` 查看当前 binlog 文件的状态
- `show binlog events in 'binlog.000336';` 查看指定文件的 log，在这里可以查看其 position id 

在 cmd 环境

- `mysqlbinlog --version` 查看当前版本
- `mysqlbinlog --start-position=124 --stop-position=24057 data/binlog.000336 | mysql -u root -p` 恢复指定 position id 之前的操作
- `mysqlbinlog --start-datetime="2020-07-03 13:18:54" --stop-datetime="2020-07-03 13:21:53" --database=zyyshop binlog.000002 | mysql -uroot -p` 恢复指定数据库和指定时间段内的数据


## Redis

在 MacOS 下通过 `brew install redis` 进行安装

在 CentOS 下通过 `yum install redis` 进行安装

安装完成之后，执行 `redis-server` 启动 redis 服务，通过 `ps -ef | grep redis` 查看服务情况

相关命令参考：[redis 开发运维实战](https://www.w3cschool.cn/redis_all_about/redis_all_about-pf4826ua.html)



### 启动 redis 服务

<b>后台启动</b>

MacOS 下 `vim /usr/local/etc/redis.conf`

- 找到 `daemonize` 选项，将其值设置为 `yes`
- 执行 `redis-server /usr/local/etc/redis.conf` 启动时添加配置
- `ps -ef | grep redis` 查看服务情况


<b>开机启动</b>

1. 执行 `ln -f /usr/local/Cellar/redis/6.0.10/homebrew.mxcl.redis.plist ~/Library/LaunchAgents` 建立软连接，加入到 launchd 进程，当用户登录系统后会自动执行

2. 执行 `launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist` 加载任务


### 批量删除 redis key

在 terminal 内执行 `redis-cli -h 127.0.0.1 -p 6379 keys "bull:q_perf:*" | xargs -r -t redis-cli -h 127.0.0.1 -p 6379 del`

注意：

- `|` 是管道符，需要在 shell 内执行
- `xargs -r` 当 xargs 的输入为空的时候则停止 xargs，不用再去执行了
- `xargs -t` 表示先打印命令，然后再执行