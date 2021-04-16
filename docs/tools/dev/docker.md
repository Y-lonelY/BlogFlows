# Docker

## Composition

### damon

Docker daemon 是服务器组件，以 Linux 后台服务的方式运行，是 Docker 最核心的后台进程，我们也把它称为<b>守护进程</b>

它负责响应来自 Docker Client 的请求，然后将这些请求翻译成系统调用，完成容器管理操作

## Install

在 centOS7 上安装 docker

1. ran `curl -sSL https://get.daocloud.io/docker | sh` 一键安装
2. ran `service restart docker` 重启 docker 服务
2. ran `docker run hello-world` 验证安装是否成功



