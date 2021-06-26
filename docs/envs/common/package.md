# Package Managers



## npm

<b>更换源库地址</b>

- 临时换源 `npm --registry https://registry.npmjs.org/ install [package]`
- 永久更换  `npm config set registry https://registry.npmjs.org/`
- 查看源地址 `npm config get registry`


<b>查看</b>

`npm list -g --depth 0` 查看全局安装包

- `npm list` 查看安装过的包
- `-g` 指定为全局安装的包
- `--depth 0` 限制输出模块层级


### npm publish 指定文件（或者指定不发布的文件）

开始在使用 npm 进行发布时，会发现总是将一些不需要的文件打包进去，可以通过发布时的 `Tarball Contents` 来观察打包文件，或者在 [npm](https://www.npmjs.com/) 内通过 Total Files 进行查看

当然，打包进去的文件越精简越好，这样能够减少包的大小，更加轻量，那么我们应该怎么达到目的呢？

1. 通过设置 `.gitignore` 使其在 git 代码管理和 npm publish 内同时生效；
2. 通过设置 `.npmignore` ，其设置语法和 `.gitignore` 一致，但是<b>优先级更高！</b>
3. 通过设置 `package.json` 内的 [files](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#files) 字段来选择发布的文件或者目录，其优先级在同级目录下时更高！

