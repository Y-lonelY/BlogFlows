# Medium



#### [How To Delete All The Node_Modules Folders On Your Computer](https://medium.com/frontend-digest/how-to-delete-all-the-node-modules-folders-on-your-computer-b8103c2ea272)

作为一个前端开发者, 我们通常使用 npm 来管理我们的开发和 runtime 依赖. 当我们执行 npm install 或者 yarn 时, 我们会下载数百兆的依赖项, 并将其存储在 node_modules 目录下

随着接手项目越来越多, 我们需要删除已完成项目 node_modules 来释放更多空间, 可以手动删除, 但是不够优雅

这里有一个更好的方式: 通过执行 npx npkill 来当前目录下所有的 node_modules, 然后通过空格来选择删除, 你也可以通过 npx npkill --directory ~/dev 来指定目录

[项目地址](https://github.com/voidcosmos/npkill)

