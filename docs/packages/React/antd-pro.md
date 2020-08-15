# Antd Pro

[antd pro](https://pro.ant.design/index-cn) 开箱即用的中台前端/设计解决方案

Install Error，通过 `npm install` 进行安装会出现在运行时某些依赖包无法加载的错误。
通过 `yarn` 来进行安装，则会直接报错，[相关issue](https://github.com/ant-design/ant-design-pro/issues/2915)
- `npm install -g cnpm --registry=https://registry.npm.taobao.org` 安装 cnpm 和淘宝源
- 在 zsh 内执行 `cnpm install`

## Global Config

### dark theme

1. `npm install @ant-design/dark-theme -S` 安装 dark theme 依赖
2. 在 `config/config.js` 内
   - `*import* darkTheme *from* '@ant-design/dark-theme' 
   - `theme: {...darkTheme}`