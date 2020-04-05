# Git in Project

## 添加license

GitHub添加license
- 登录至github项目，在项目内`create new file`
- 输入 liscense
- 选择通过模板进行创建，选择MIT模板之后，进行commit操作


## 规范git提交内容

通过 commitizen 来提交commit

- 执行 `npm install commitizen --save `
- 在**package.json**内进行如下配置

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
