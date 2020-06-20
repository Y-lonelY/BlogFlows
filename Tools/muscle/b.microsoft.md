# Microsoft Tools

## VScode

`⌘ - ,` 打开vscode配置面板，可以点击右上角进行文本编辑

`⌃ - B` 显示/隐藏 侧边栏

`⌃ - \` 分屏

`⌃ - NUM` 切屏

`⌃ - P` 快速打开文件

`⌃ - F` 当前文件搜索

`⌃ - ⇧ - F` 当前文件夹搜索

`⌥ - ⇧ - F` 格式化当前文件

`⌃ - F2` 替换当前文件所有字符

terminal

<pre><code>⌃ ⌘ `<code></pre> 新建终端

<pre><code>⌃ `<code></pre> 打开/关闭终端

vscode 修改默认shell

`⌃ - ⇧ - P` 打开命令列表，输入 Ternimal: select default shell，选择相应的 shell

## Template

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

修改vscode格式化的规则，因为默认在formatter时会带上分号，eslint设置的规则是不带分号

首先安装插件，Vetur, ESLint, Prettier

查看[Vetur](https://vuejs.github.io/vetur/formatting.html#formatters) 可以观察格式化的相关配置

之后打开系统设置，点击右上角，选择进行文档编辑，添加如下配置

```json
{
    "git.autofetch": true,
    "python.jediEnabled": false,
    "python.pythonPath": "/Library/Frameworks/Python.framework/Versions/3.7/bin/python3",
    "material-icon-theme.folders.theme": "specific",
    "workbench.iconTheme": "material-icon-theme",
    "editor.suggestSelection": "first",
    "editor.tabSize": 2,
    "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
    "leetcode.endpoint": "leetcode-cn",
    "leetcode.defaultLanguage": "javascript",
    "explorer.confirmDelete": false,
    "javascript.updateImportsOnFileMove.enabled": "always",
    "workbench.colorTheme": "Material Theme Palenight High Contrast",
    "typescript.updateImportsOnFileMove.enabled": "always",
    "terminal.integrated.rendererType": "dom",
    "leetcode.workspaceFolder": "/Users/yango/Growup/ToyFlows/Leetcode",
    "leetcode.hint.configWebviewMarkdown": false,
    "leetcode.hint.commandShortcut": false,
    "editor.quickSuggestions": {
        "strings": true
    },
    // 取消分号
    "prettier.semi": false,
    "prettier.singleQuote": true,
    "prettier.tabWidth": 2,
    // 设置函数前添加空格
    "vetur.format.defaultFormatter.js": "prettier-eslint",
    // vetur 的自定义设置
    "vetur.format.defaultFormatterOptions": {
        "prettier": {
            "semi": false
        }
    },
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescriptreact",
        "typescript"
    ],
    "[vue]": {
        "editor.defaultFormatter": "octref.vetur"
    },
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[scss]": {
        "editor.defaultFormatter": "sibiraj-s.vscode-scss-formatter"
    },
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[jsonc]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}
```