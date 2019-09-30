# Nginx

> Nginx是一款轻量级的HTTP服务器，采用事件驱动的异步非阻塞处理方式框架，这让其具有极好的IO性能，时常用于服务端的反向代理和负载均衡

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

![正向代理](./assets/server.png)

正向代理

- 客户端和代理服务器之间可以相互访问，属于一个 LAN
- 代理对于用户是非透明的，即用户需要自己操作或者感知得到自己的请求被发送到代理服务器
- 代理服务器通过代理客户端的请求来向域外服务器请求响应内容


![反向代理](./assets/reverse-server.png)

反向代理

- 代理服务器和内部服务器同可以相互访问，属于一个 LAN
- 代理服务器会向客户端提供一个统一的代理入口，客户端请求由代理服务控制
- nginx 充当的就是代理服务器的角色

反向代理的好处

- 安全和权限，可以在 nginx 层将危险和无权限的信息过滤掉，保证服务器的安全
- 负载均衡，nginx 可以将客户端请求合理分配到各个服务器上，同时可以通过轮询提供服务器安全检测服务，如果某个服务器异常，则不会为其分配请求，保证客户端访问的稳定性

### config

基本配置

```sh
server {
    listen       1717;
    server_name  10.249.41.99;

	charset utf-8;
	
	gzip on;
	gzip_http_version 1.0;
	gzip_vary on; 
	gzip_comp_level 6; 
	gzip_proxied any; 
	gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript image/jpeg image/gif image/png; 
		gzip_buffers 16 8k;
	
	location / {
		root   C:/Users/yanghao02/Desktop/github/ylonePlugins/reveal;
        index  index.html index.htm;
    }
}
```

### Q&A

1. `CreateDirectory()...failed (3: The system cannot find the path specified)` 

nginx 对于某个文件夹没有访问权限，无法创建 temp 文件夹

解决办法，添加如下代码，同时在nginx根目录手动创建temp及子文件夹

```
http {
		client_body_temp_path temp/client_body_temp;
		proxy_temp_path temp/proxy_temp;
    	fastcgi_temp_path temp/fastcgi_temp;
	}
```