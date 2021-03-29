# Packages

## PM2


> Advanced, production process manager for Node.js. It can keep your application online 24/7

github: [pm2](https://github.com/Unitech/pm2)

Install -> `npm i -g pm2@latest` or `npm i -D pm2@latest`

Update pm2 version -> `pm2 update`

[CLI completion](https://pm2.keymetrics.io/docs/usage/auto-completion/) -> `pm2 completion install` and `source ~/.zsh`

Start with PM2 apis -> see `pm2.js` and `package.json` for details

---
**Cluster mode**

解决了一个困扰几天的问题，在集群模式下，我设置了实例数为 4，然后发布到**1核2G**的机器上，`pm2 start cms-api` 执行没问题，并且可以看到拉起了四个实例，但是，当我执行 `pm2 reload cms-api` 之后，发现只有一半的实例被重置，导致接口进程在负载均衡时出现问题（一半跑的旧代码，一半跑的新代码）

之后，考虑到可能是 CPU 突然飙高影响，因此尝试了一系列的手段（包括休眠之后再重新启动）仍然不能解决问题，最终考虑是 CPU 核心数的问题，因此设置 `instances: 'max'`，让其在集群模式下自由分配，解决！

### pm2-logrotate

[pm2-logrotate](https://github.com/keymetrics/pm2-logrotate) 用来扩展 pm2 的日志管理功能

想象这样一个场景：pm2 本身没有日志分割功能，会将所有日志都写入到一个文件内，这样会产生一些麻烦：时间久了，日志文件会非常大，增加排查的难度，并且有些日志已经没用了，浪费了内存空间。为此，pm2-logrotate 用来进行日志管理，根据配置规则对日志进行合理切割

```shell
# install 
pm2 install pm2-logrotate

pm2 set pm2-logrotate:max_size 100M
```


## cross-env

> Run scripts that set and use environment variables across platforms.

github: [cross-env](https://github.com/kentcdodds/cross-env)

解决了 node 的环境变量在不同平台的 (eg: `NODE_ENV=production`) 的设置兼容性问题

KYE(keep your eyes): `corss-env` 放在命令的前面, 即 `"dev": "cross-env SERVER_NODE_ENV=development nest start --watch"`

之后，通过 `process.env.SERVER_NODE_ENV` 可以进行访问