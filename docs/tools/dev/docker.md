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



### 发布至 DockerHub

参考 [Docker Hub Quickstart](https://docs.docker.com/docker-hub/) 快速入门

1. 注册一个 DockerHub 账号，登陆之后创建 registry
2. 在本地创建 Dockerfile，执行 `docker build -t <your_username>/my-private-repo .` 打包镜像
3. ran `docker run -itd --name [name] -p 8000:8000 <your_username>/my-private-repo` 在本地测试容器实例
4. ran `docker push <your_username>/my-private-repo` 推送到指定 registry
5. ran `docker login` 在命令行内登陆
6. ran `docker pull <your_username>/my-private-repo` 拉取镜像





## Commands

### 删除一个实例实例（container）

- ran `docker ps -a` 查看所有容器实例，包括已经停止的，复制指定的 <b>CONTAINER ID</b>
- ran `docker stop [container id]` 停止运行中的实例，处于 running 状态的实例无法删除
- ran `docker rm [container id]` 删除实例

### 删除一个镜像（image）

- ran `docker images` 查看所有存在的镜像
- ran `docker image rm [image id]` 删除指定的镜像


### 进入容器实例

- ran `docker container ls` 查看所有实例
- ran `docker exec -it [container id] bash` 通过命令行进行容器实例


## Dockerfile

Dockerfile 是一个用来构建镜像的文本文件，包含构建所需的指令

```dockerfile
# From 表示定制的基本镜像，后续操作都是基于 pm2
FROM keymetrics/pm2:12-alpine

# COPY 复制指令，将上下文目录中的文件复制到容器内的执行目录
COPY docs/.vuepress/dist dist/
COPY package.json .
COPY pm2.json .

# ENV 设置环境变量，在后续指令中可以使用，例如 $NPM_CONFIG_LOGLEVEL
ENV NPM_CONFIG_LOGLEVEL warn
# 执行命令，在 docker build 时执行
RUN npm install --production

# Show current folder structure in logs
RUN ls -al -R

# 类似 RUN，但是其在 docker run 时执行
CMD [ "pm2-runtime", "start", "pm2.json" ]
```

Dockerfile 内 RUN 命令每次执行都会在 docker 上新建一层，因此通常通过 `&&` 来连接多个命令，如下：

```dockerfile
FROM centos
RUN yum install wget
RUN wget -O redis.tar.gz "http://download.redis.io/releases/redis-5.0.3.tar.gz"
RUN tar -xvf redis.tar.gz
# 以上执行会创建 3 层镜像。可简化为以下格式：
FROM centos
RUN yum install wget \
    && wget -O redis.tar.gz "http://download.redis.io/releases/redis-5.0.3.tar.gz" \
    && tar -xvf redis.tar.gz
```





