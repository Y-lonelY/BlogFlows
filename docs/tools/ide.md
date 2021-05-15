# IDE

> Integrated Development Environment

## VIM

命令模式:


[删除]
- `dd` 快速删除当前行
- `ndd` 比如 `3dd` 开始删除当前三行内容

[复制]
- `yy` 快速复制当前行
- `nyy` 快速复制当前 n 行内容
- `p` 粘贴内容
- `ggdG` 删除所有内容，`gg` 光标置于首行，`d` 删除，`G` 光标置于文件末尾行

[回退]
- `u` 回退内容

[搜索]
- 通过 `/` 进入搜索模式，通过 `n/N` 来跳转到下一个/上一个


## Vscode

### Template

利用 vscode 新建指令，用来生成代码模版

例如，在vscode内配置.vue文件的模版

- 安装 vetur 插件
- Code -> Performance -> User Snippets -> Vue.json，对json文件进行配置

```json
// 可以参考，prefix 用于 emmet，相当于口令
// 空格用 “” 来表示
{
	"Print to console": {
	  "prefix": "vue.component",  
	  "body": [
		"<template>",
		"<div></div>",
		"</template>",
		"",
		"<script lang='ts'>",
		"import Vue from 'vue'",
		"export default Vue.extend({",
		"name: '',",
		"data() {",
		"return {}",
		"},",
		"//生命周期 - 创建完成（访问当前this实例）",
		"created() {},",
		"</script>",
		"",
		"<style lang='scss' scoped>",
		"",
		"</style>"
	  ],
	  "description": "template for vue component"
	}
  }
```

## Formatter

修改 vscode 格式化的规则，因为默认在 formatter 时会带上分号，eslint 设置的规则是不带分号

首先安装插件，Vetur, ESLint, Prettier

之后打开系统设置，点击右上角，选择进行文档编辑，添加如下配置

查看[Vetur](https://vuejs.github.io/vetur/formatting.html#formatters) 可以观察格式化的相关配置

```json
{
	// 行末不添加分号
	"prettier.semi": false,
	// 设置默认格式化方式为 prettier-eslint，会默认在函数前添加空格
  "vetur.format.defaultFormatter.js": "prettier-eslint",
  // vetur 的自定义设置
  "vetur.format.defaultFormatterOptions": {
      "prettier": {
      "semi": false
      }
  },
}
```
