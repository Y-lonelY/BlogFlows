# Nginx

> Nginx是一款轻量级的HTTP服务器，采用事件驱动的异步非阻塞处理方式框架，这让其具有极好的IO性能，时常用于服务端的反向代理和负载均衡

## Install

在 Mac OS 上进行安装

- `brew update` 查看 brew 安装是否成功
- `brew search nginx` 查看 nginx 信息
- `brew install nginx` 安装 nginx
- `nginx -v` 查看 nginx 版本

安装成功之后

- `cd /usr/local/var/www` 查看主页内容
- `cd /usr/local/etc/nginx/nginx.conf` 修改配置文件（ubuntu 在 `/etc/nginx` 目录下）
- `nginx` 启动 nginx server
- `nginx -s stop` 终止 nginx server
- `nginx -s reload` 重启 nginx server



<b>查看 nginx logs</b>

- `cat /etc/nginx/nginx.conf` 查看 log 文件地址
- `cat [log address]` 查看日志



<b>解决 80 被 nginx welcome 页面默认占用的问题</b>

你希望把自己的主站绑定到 80 端口，但是发现 80 端口对应的页面已经被 nginx welcome 页面占用了，此时需要修改 `/etc/nginx/sites-enabled/default` 文件，将 80 端口换成其他端口，重启 nginx 即可



### 通过二进制编译 nginx

一般而言，我们可以通过模块管理工具来引入 nginx，比如 brew、apt-get 等。但是，当我们需要引入第三方模块时，我们需要结合二进制文件和第三方模块进行编译后替换原文件，这里我们以 [nginx-upload-module](https://github.com/fdintino/nginx-upload-module) 作为案例对其步骤讲解

1. 安装之前，配置相应的环境：`yum -y install gcc gcc-c++ make libtool zlib zlib-devel openssl openssl-devel pcre pcre-devel`

2. 查看当前 nginx 版本及其配置：`nginx -V` ，注意将其配置拷贝出来

3. 根据步骤 2 的版本号到官网上下载相应的二进制包：`wget http://nginx.org/download/nginx-1.14.0.tar.gz` ，并解析道指定目录：`tar -xvf nginx-1.14.0.tar.gz`

4. 下载第三方模块的源码到指定目录：`git clone https://github.com/fdintino/nginx-upload-module.git`

5. 进入指定目录，添加编译时配置：`sh configure [configs]`，注意添加 `--add-module=/home/pkgs/nginx-upload-module` 和 `--sbin-path=/home/pkgs/nginx` 来指定第三方模块和输出内容路径

   ```nginx
   root@VM-0-6-ubuntu:~# nginx -V
   nginx version: nginx/1.14.0
   built by gcc 7.5.0 (Ubuntu 7.5.0-3ubuntu1~18.04)
   built with OpenSSL 1.1.1  11 Sep 2018
   TLS SNI support enabled
   configure arguments: --sbin-path=/home/pkgs/nginx --with-cc-opt='-g -O2 -fdebug-prefix-map=/build/nginx-GkiujU/nginx-1.14.0=. -fstack-protector-strong -Wformat -Werror=format-security -fPIC -Wdate-time -D_FORTIFY_SOURCE=2' --with-ld-opt='-Wl,-Bsymbolic-functions -Wl,-z,relro -Wl,-z,now -fPIC' --prefix=/usr/share/nginx --conf-path=/etc/nginx/nginx.conf --http-log-path=/var/log/nginx/access.log --error-log-path=/var/log/nginx/error.log --lock-path=/var/lock/nginx.lock --pid-path=/run/nginx.pid --modules-path=/usr/lib/nginx/modules --http-client-body-temp-path=/var/lib/nginx/body --http-fastcgi-temp-path=/var/lib/nginx/fastcgi --http-proxy-temp-path=/var/lib/nginx/proxy --http-scgi-temp-path=/var/lib/nginx/scgi --http-uwsgi-temp-path=/var/lib/nginx/uwsgi --with-debug --with-pcre-jit --with-http_ssl_module --with-http_stub_status_module --with-http_realip_module --with-http_auth_request_module --with-http_v2_module --with-http_dav_module --with-http_slice_module --with-threads --with-http_addition_module --with-http_geoip_module=dynamic --with-http_gunzip_module --with-http_gzip_static_module --with-http_image_filter_module=dynamic --with-http_sub_module --with-http_xslt_module=dynamic --with-stream=dynamic --with-stream_ssl_module --with-mail=dynamic --with-mail_ssl_module --add-module=/home/pkgs/nginx-upload-module
   ```

   

6. 执行 `make && make install` 来编译 nginx

7. 拷贝 nginx 副本：`cp /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx.bak` ，替换 nginx：`cp ./nginx /usr/local/nginx/sbin/`

8. 重启 nginx：`nginx -s reload`，验证配置： `nginx -V`




## Config

观察下面的配置:

- 开启 gzip
- 将 80 端口代理到 443, 支持 SSL 证书验证, 支持 https
- 访问 80 端口会被重定向到 443 端口
- 将静态文件代理到 443 端口
- 将本地服务占用端口代理到指定端口
- 将不同子域名的访问分发到不同的 location

参考

- [腾讯云 nginx 配置 SSL](https://cloud.tencent.com/document/product/400/35244)

```nginx
#user  ylonely;
worker_processes  1;
events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    # gzip config
    gzip  on;
    # 压缩阈值 小于 10k 不压缩
    gzip_min_length 10k;
    # 分配 4*16k 的内存用于缓存压缩结果
    gzip_buffers 4 16k;
    # 压缩级别，越小越快，但是效果越差
    gzip_comp_level 3;
    # 压缩级别，越小越快，但是效果越差
    gzip_comp_level 3;
    # 设置支持压缩的Content-Type
    gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png application/javascript;


    server {
        # SSL 访问端口为 443
        listen       443 ssl;
        # 绑定证书的域名
        server_name  www.7k7k.life;
        # 证书文件的名称
        ssl_certificate 1_www.7k7k.life_bundle.crt;
        # 私钥文件
        ssl_certificate_key 2_www.7k7k.life.key;
        ssl_session_timeout 5m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        # 套件加密
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        ssl_prefer_server_ciphers on;

        location / {
                root   /root/blog/dist/;
                index  index.html index.htm;
        }

    }

    server {
        listen 80;
        server_name www.7k7k.life;

        location /grow {
            proxy_pass http://localhost:3000/grow;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
         }
    }

    include servers/*;
}
```



### 配置 nginx-upload-module

[Nginx-upload-module](https://github.com/fdintino/nginx-upload-module) 是 nginx 用来处理文件上传的第三方模块

具体编译方法可以参考上文 -- 通过二进制编译 nginx

这里介绍 nginx 的相关配置以及回调处理服务

我建议重新部署一个 server 来专门处理文件上传：

```nginx
	# 文件上传服务
	server {
		listen 8077;
		client_max_body_size 3000m;

		location /upload/ {
    	# 回调服务地址
			upload_pass  /api/upload;

			# 上传文件默认保存地址
			upload_store  /home/apps/crt_images/;
			# 设置上传文件的权限默认为可读可写
			upload_store_access all:rw;
			# 设置 body 内容
			upload_set_form_field $upload_field_name.name "$upload_file_name";
			upload_set_form_field $upload_field_name.content_type "$upload_content_type";
			upload_set_form_field $upload_field_name.path "$upload_tmp_path";
			upload_aggregate_form_field $upload_field_name.md5 "$upload_file_md5";
			upload_aggregate_form_field $upload_field_name.size "$upload_file_size";
			# 支持所有字段回传到回调服务
			upload_pass_form_field "^.*$";
			# 返回值为以下则清除文件
			# upload_cleanup 400 404 499 500-505;
		}

		location /api/upload {
			# rewrite ^ /api/upload$1;
			proxy_pass http://127.0.0.1:7727/api/upload;
		}
	}
```

我通过 nestjs 实现了一个回调服务，用来重命名文件（你可以在这里处理自己的业务逻辑）：

```typescript
  // 基于 nestjs 处理 nginx-upload-module 上传文件回调
  @Post('upload')
  upload(@Headers() h: any, @Req() req: Request) {
    try {
      // nginx-upload-module 的回调信息在 req.body 内，如下所示
      // {
				// "file.name": "logo.png",
				// "file.content_type": "image/png",
				// "file.path": "/home/apps/crt_images/0000000029",
				// "file.md5": "45a6f2a3656de762a590bd80305400b8",
				// "file.size": "29237"
			// }
      const { body } = req
      this.Logger.log(body)
      // 这里对文件进行重命名操作
      const file_path = body['file.path']
      const file_name = body['file.name']
      const dir = dirname(file_path)
      renameSync(file_path, join(dir, file_name))
      return success({ req })
    } catch (error) {
      return success({
        error,
      })
    }
  }
```





### 理解 alias root location

nginx 指定文件路径有两种方式 root 和 alias

- alias 配置段仅为 location
- root 配置段为 http、server、location、if

两者的区别在于如何解释 location 的 uri 值，导致两者分别以不同的方式将请求映射到服务器文件上

- alias的处理结果是：使用 alias 替换 location，注意，使用 alias 时，目录名后面一定要加 /，否则会找不到文件
- root的处理结果是：root＋location



## Q && A

1. `Incompatible SockJS! Main site uses: "1.4.0", the iframe: "1.3.0".`

解决：添加如下配置

```
location / {
    proxy_pass our_server;
    proxy_redirect off;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

2. `CreateDirectory()...failed (3: The system cannot find the path specified)` 

nginx 对于某个文件夹没有访问权限，无法创建 temp 文件夹

解决办法，添加如下代码，同时在nginx根目录手动创建temp及子文件夹

```
http {
		client_body_temp_path temp/client_body_temp;
		proxy_temp_path temp/proxy_temp;
    	fastcgi_temp_path temp/fastcgi_temp;
	}
```



## What's nginx?

nginx 可以简单理解成一个服务器

- 在处理高并发比apache更具优势
- 在底层服务端资源处理（静态资源处理转发、反向代理、负载均衡等）比node.js更具优势

### nginx 的研究方向

不同的 nginx 配置可以实现同样的功能，但是他们的效率会有较大差别，所以需要了解 nginx 的最优解

### 正向代理和反向代理

代理指的是代理服务器，介于客户端和服务器之间

- 正向表示代理的是客户端
- 反向表示代理的是服务器

![正向代理](../assets/server.png)

正向代理

- 客户端和代理服务器之间可以相互访问，属于一个 LAN
- 代理对于用户是非透明的，即用户需要自己操作或者感知得到自己的请求被发送到代理服务器
- 代理服务器通过代理客户端的请求来向域外服务器请求响应内容


![反向代理](../assets/reverse-server.png)

反向代理

- 代理服务器和内部服务器同可以相互访问，属于一个 LAN
- 代理服务器会向客户端提供一个统一的代理入口，客户端请求由代理服务控制
- nginx 充当的就是代理服务器的角色

反向代理的好处

- 安全和权限，可以在 nginx 层将危险和无权限的信息过滤掉，保证服务器的安全
- 负载均衡，nginx 可以将客户端请求合理分配到各个服务器上，同时可以通过轮询提供服务器安全检测服务，如果某个服务器异常，则不会为其分配请求，保证客户端访问的稳定性