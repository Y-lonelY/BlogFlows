# Redis



## Install

在 MacOS 下通过 `brew install redis` 进行安装

在 CentOS 下通过 `yum install redis` 进行安装

安装完成之后，执行 `redis-server` 启动 redis 服务，通过 `ps -ef | grep redis` 查看服务情况



### 后台启动 redis 服务

MacOS 下 `vim /usr/local/etc/redis.conf`

- 找到 `daemonize` 选项，将其值设置为 `yes`
- 执行 `redis-server /usr/local/etc/redis.conf` 启动时添加配置
- `ps -ef | grep redis` 查看服务情况



### 开机启动 redis server

1. 执行 `ln -f /usr/local/Cellar/redis/6.0.10/homebrew.mxcl.redis.plist ~/Library/LaunchAgents` 建立软连接，加入到 launchd 进程，当用户登录系统后会自动执行
2. 执行 `launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist` 加载任务