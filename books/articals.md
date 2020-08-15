# Articals

## WEB

### Semver

[Semver（语义化版本）扫盲](https://juejin.im/post/6844903591690534926)，官网参考 [semver.org](https://semver.org/lang/zh-CN/)

- Semver 出现的背景
- Semver 用来解决什么问题

在 package.json 文件内通常会看到 `~` 和 `^`：

- `~` 会匹配最新的小版本依赖包（修订号），比如 `~1.2.3` 会匹配最新的 `1.2.x` 版本
- `^` 会匹配最新的次版本号的依赖包，比如 `^1.2.3` 会匹配所有 `1.x.x` 版本

