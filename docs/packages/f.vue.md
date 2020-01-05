# Vue

## Vue-cli2

`sudo npm install -g @vue/cli` 安装最新的 vue-cli，安装完成之后通过 `vue --version` 来看当前安装的版本

`vue create [app name]` 来创建一个新项目


## VuePress

> 基于 Vue 的静态博客搭建框架

### Install

[VuePress](https://vuepress.vuejs.org/zh/guide/deploy.html#github-pages)

执行 `sudo npm install -g vuepress` 全局安装 vuepress，这意味着可以在全局使用 vuepress 定义的命令，注意 node 版本保持在v8以上

接着新建一个文件夹，执行 `npm init -y` 来初始化项目，会输出一个 package.json 文件

执行 `mkdir docs` 新建 docs 文件夹，用来存放 .md文件和 .vuepress文件夹

进入 `docs` 目录后，执行 `mkdir .vuepress` 来新建一个 .vuepress 文件夹，用来存放相关配置文件，进入 .vuepress，执行 `touch config.js` 新建一个 config.js 文件，编辑该文件进行相关配置

至此，一个基本的系统搭建完成，接着可以执行 `vuepress dev docs` 相关命令来查看

### Basics

> 静态资源引用

所有的 .md 文件都会被编译成 vue 组件，因此在 .md 文件内尽量使用相对路径来引用静态资源

还有一种解决方案，利用 `~` 关键字来指出这是一个 webpack 模块请求，可以配置别名来利用别名引用静态资源，别名在 config.js 内进行配置

公共文件放在 `.vuepress/public` 内进行引用，比如 icon，pwa 图标等，打包出来之后会放在.vuepress/dist/的根目录

### Config

package.json 文件配置

```json
{
  "name": "BlogFlows",
  "version": "1.0.0",
  "description": "A Summary",
  "main": "index.js",
  // 自定义脚本
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    // 本地环境启动项目
    "server": "vuepress dev docs",
    // 输出 dist
    "build": "vuepress build docs",
    "docs:build": "vuepress build docs"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/yanGo1221/BlogFlows.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/yanGo1221/BlogFlows/issues"
  },
  "homepage": "https://github.com/yanGo1221/BlogFlows#readme"
}
```

.vuepress/config.js 用于配置主要内容

```js
module.exports = {
	// 页面 title 类似 logo 角色
	title: "LoreFlows",
	description: "Welcome To The Knowledge Palace!",
	head: [
	// logo
		['link', { rel: 'icon', href: '/logo.ico'}]
	],
	// github 仓库名
	base: '/BlogFlows/',
	// 本地运行端口
	port: 7727,
	markdown: {
		lineNumbers: true
	},
	themeConfig: {
		// github 地址
		repo: 'https://github.com/yanGo1221',
		// 标题栏导航
		nav: require('./nav.js'),
		// 文档根目录
		docsDir: 'docs',
		lastUpdated: 'Last Updated',
		sidebar: {
			'/tools/': getToolsSide(),
			// statements
		}
	}
}

function getToolsSide() {
	return [
		'/tools/',
		{
			title: 'Tools',
			collapsable: false,
			children: [
			// 即 /tools/a.babel.md
				'a.babel',
				'b.shell',
				'c.developTools',
				'd.nginx'
			]
		}
	]
}
```

.vuepress/nav.js 用于配置 homepage

```js
module.exports = [{
	text: '核心',
	link: '/core/'
}, {
	// 子菜单
	text: '工程',
	items: [
		{
			text: '项目',
			link: '/project/'
		},
		{
			text: '规范',
			link: '/normalize/'
		}
	]
}];
```

### 部署到GitHub Page

`.vuepress/config.js` 内添加 bash 参数，用来表示 github 仓库名，例如 `base: '/BlogFlows/',`

根目录执行 `touch deploy.sh` 用来添加发布脚本，具体配置如下：

```shell
# !/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:Y-lonelY/BlogFlows.git master:gh-pages

cd -
```

在 `package.json` 内添加相应的执行脚本，`"docs:build": "vuepress build docs"`

接着 `./deploy.sh` 执行脚本，注意在执行脚本之前，通过 `chmod 755 deploy.sh` 为其赋予可执行权限