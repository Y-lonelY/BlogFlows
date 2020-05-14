<!-- MarkdownTOC -->

- [Use In SublimeText3](#use-in-sublimetext3)
	- [Install](#install)
	- [Config](#config)
	- [Build](#build)

<!-- /MarkdownTOC -->


## Use In SublimeText3

Package Control: LaTexTools (Sublime Text 3 插件，用于编译 LaTex 的 build 系统)

[MikTex](https://miktex.org/download) (Window平台下的 LaTex 工具套件，包含 Tex 及相关程序)

[Sumatra PDF](https://www.sumatrapdfreader.org/download-free-pdf-viewer.html) (PDF阅读器，LaTexTools 默认使用它预览生成的 PDF)

### Install

MikTex 和 SumatraPDF 直接通过软件包安装即可，LaTexTools 通过 Package Controller 安装即可

### Config

`Sublime Text 3 > Preferences > Package Settings > LaTexTools > Setting User`

打开配置文件，对 `texpath` 和 `sumatra` 进行配置

```JSON
"windows": {
    // Path used when invoking tex & friends; "" is fine for MiKTeX
    // For TeXlive 2011 (or other years) use
    // "texpath" : "C:\\texlive\\2011\\bin\\win32;$PATH",
    "texpath" : "C:\\Users\\dell\\AppData\\Local\\Programs\\MiKTeX 2.9\\miktex\\bin\\x64;$PATH",
    // Command to invoke Sumatra. If blank, "SumatraPDF.exe" is used (it has to be on your PATH)
    "sumatra": "cd C:\\Program Files\\SumatraPDF\\ && SumatraPDF",
},
```  

此外，对于 SumatraPDF 的预览还可以通过配置环境变量来实现,则此时配置项 sumatra:''

配置环境变量：`path: C:\Program Files\SumatraPDF\`，之后可以通过 `sumatrapdf.exe -inverse-search "\"C:\Program Files\Sublime Text 3\sublime_text.exe\" \"%f:%l\""` 则会打开 SumatraPDF

### Build

在 sublime 中新建一个文件并设置其类型为 latex

编写内容后保存

`ctrl-b` 进行编译（会在文件夹内生成 .aux, .log, .pdf, .gz 文件）并预览文件内容