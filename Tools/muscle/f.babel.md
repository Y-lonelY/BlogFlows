<!-- MarkdownTOC -->

- [Plugins](#plugins)
  - [配置文件别名](#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E5%88%AB%E5%90%8D)
- [install new Version 7x](#install-new-version-7x)
  - [scripts](#scripts)
  - [install old version](#install-old-version)
- [package.json](#packagejson)
- [options](#options)
- [babel in sublime](#babel-in-sublime)

<!-- /MarkdownTOC -->

## Plugins

### 配置文件别名

`npm install babel-plugin-module-resolver --save` 用来配置文件别名

安装完成之后，在 `.babelrc` 内添加 plugins 配置项，如下：

```
{
    "plugins": [
        ["module-resolver", {
            "root": "./",
            "alias": {
                "@": "./src",
                "S": "./src/service",
                "V": "./src/view",
                "C": "./src/components"
            }
        }]
    ]
}
```


## install new Version 7x

Babel 编译器发布 7x 版本之后，不再对旧版本 Node 支持，所以如果按照旧版本方法安装，会报错

现在，介绍 7x 的安装方法

1. 新建文件夹（FileA）
2. 在 FileA 下新建 package.json 文件，并写入一个空对象
3. 在 FileA 当前目录下
	- `npm install --save-dev @babel/core @babel/cli` 安装 babel 核心组件集合和 cli
	- `npm install --save @babel/polyfill` 安装 ES5+ 模拟运行环境，polyfill 表示用 Javascript 来实现一些浏览器不支持的原生API 
	- `npm install --save-dev @babel/preset-env` 安装 ENV 编码规范
		- 对应 .babelrc 中的 `{presets": ["@babel/preset-env"]}`
	- `npm install --save-dev babel-preset-airbnb` 安装 airbnb 编码规范
		- 对应 .babelrc 中的 `{presets": ["airbnb"]}`

### scripts

1. 通过 `--watch` 来实现在每次文件修改后编译该文件，例如 `npx babel src --watch --out-file src/index.js` 表示：每当 src index.js 文件都会自动更新，且为 src 目录下所有文件的合并

2. 通过 `--presets` 来指定编译过程中需要使用的预设，例如 `--presets=@babel/preset-env`


### install old version

 - 下载 `babel-cli` 并添加 `airbnb` 转码规则

在指定文件夹下打开控制台，安装 **babel-cli**，同时添加 **airbnb-babel-cli** 作为转码规则

> **注意**：babel官方不建议在全局环境安装babel-cli，因为不同的项目可能依赖不同版本的babel，所以更好的解决办法是将babel安装在本地项目

```sh
//输入
npm install --save-dev babel-cli babel-preset-airbnb

//输出，包含babel-cli以及airbnb-babel-cli文件
Folder: node_modules
```

## package.json

在当前文件根目录下创建 `package.json` 文件，注意 `json` 代码规范，用于配置项目相关信息以及封装一些 `babel 命令`，其中 `scripts` 用于封装各种 `babel命令`

例如，`"build": "babel origin -d src"` 通过 `npm run build` 可以将 *origin* 文件夹内的 *js* 文件通过 *airbnb* 规范进行转译并生成在 *src* 目录下

> **注意**：'dependencies' 的属性配置可以参考 `/node_modules/babel-cli/package.json`

```json
{
  "name": "BabelTest",
  "version": "1.0.0",
  "scripts": {
    "build": "babel origin -d src"
  },
  "dependencies": {
    "babel-core": "^6.26.0",
    "babel-polyfill": "^6.26.0",
    "babel-register": "^6.26.0",
    "babel-runtime": "^6.26.0",
    "chokidar": "^1.6.1",
    "commander": "^2.11.0",
    "convert-source-map": "^1.5.0",
    "fs-readdir-recursive": "^1.0.0",
    "glob": "^7.1.2",
    "lodash": "^4.17.4",
    "output-file-sync": "^1.1.2",
    "path-is-absolute": "^1.0.1",
    "slash": "^1.0.0",
    "source-map": "^0.5.6",
    "v8flags": "^2.1.1"
  }
}
```

配置 `.babelrc`

在当前文件根目录下创建 `.babelrc` 文件，用于配置转码规则和使用插件，由于 **window下无法直接创建无名文件**，所以通过控制台直接进入当前文件， `type nul>.babelrc` 创建一个后缀为 `.babelrc` 的无名文件

```
{
  "presets": ["airbnb"],
  "plugins": []
}
```

## options

`package.json` 内配置 `babel --help` 命令，通过 `npm run help` 查看 **babel cli** 的使用方法，下面对其中常用的使用方法进行介绍

编译

`babel [fileName]` 配置对文件路径，直接编译文件，并在控制台输出

`babel [fileList] -o [fileName] || babel [fileList] --out-file [fileName]` 可以同时将多个文件输出到一个文件内

`babel [fileName] --watch --out-file [fileName] || babel [fileName] -w -o [fileName]` 监听每次预编辑文件的变化，自动进行编辑，通常配合其他编译命令使用
	
`babel [in] -d [out] || babel [in] --out-dir [out]` 将模块的输入目录内的内容编译成输出目录内的内容


选择	 

`--ignore [fileList]` 忽略部分文件，不对其进行编译，通常配合 `-d` 使用

`--only [fileList]` 选择部分文件，只对其进行编译，通常配合 `-d` 使用	

`--presets=[presetsList]` 针对文件编译，选择转码规则，通常配合编译命令使用

`--plugins=[pluginsList]` 针对文件编译，选择编译插件，通常配合编译命令使用

了解更多 [Babel Options](https://babeljs.cn/docs/usage/api/#options)

## babel in sublime

`ctrl-shift-p -> install ->babel` 在sublime编辑器中支持babel语法，首先在sublime中安装 `babel`			

`ctrl-shift-p -> set Syntax: Javascript(babel)` 安装完之后，只需要在每次生成文件的时候选择babel类型即可
