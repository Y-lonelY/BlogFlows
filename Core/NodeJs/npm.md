# NPM



## Travia

1. 在项目根目录下，通过 `npm ls antd` 来查看 antd 的依赖关系，如果一个项目内多个 package 同时依赖同一个 package，则可能发生依赖引入错误，此时可以先卸载 `npm uninstall --save antd` ，之后执行 `npm i antd --save` 重新引入