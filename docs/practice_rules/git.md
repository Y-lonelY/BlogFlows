# Git Rules

## Git commit

通过 commitizen 来提交commit

- 执行 `npm install commitizen --save `
- 在 **package.json** 内进行如下配置

```json
{
  "scripts": {
    "commit": "git-cz",
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-conventional-changelog"
    }
  },
}
```

项目内添加CHANGELOG

- 执行`npm install conventional-changelog-cli --save`
- 通过 `npx conventional-changelog --help` 查看相关命令
- 一般在**package.json**内配置 `"changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0"`，来指定使用angular规范，且重新生成CHANGELOG.md文件
- 通过 `npm run changelog`来执行

## Git branch describtion

分支描述
- **master** 线上稳定版本
- **release** 待发布版本
- **feature** 功能分支
- **dev** 开发分支，每个开发者都有自己独立的分支
- **hotfix** 紧急修复分支