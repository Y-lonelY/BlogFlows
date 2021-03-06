# Git Standard

## Commit Rules

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
- 一般在 package.json 内配置 `"changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0"`，来指定使用 angular 规范，且重新生成CHANGELOG.md文件
- 通过 `npm run changelog`来执行


## 添加license

GitHub添加license

- 登录至github项目，在项目内`create new file`
- 输入 liscense
- 选择通过模板进行创建，选择MIT模板之后，进行commit操作



## 添加 SSH keys

rsa(非对称加密)

执行 `ssh-keygen -t ras -C "your_email@example.com"`

- `-t` 表示制定加密类型
- `-C` 表示注释内容

之后到指定目录内复制 `pub` 内容到 github 即可

<b>如果不希望内次提交都输入密码，在生成 keys 时直接 enter</b>

### 切换当前项目 http to ssh

一般而言，当你配置好 SSH 验证方式之后，将之前 https 的连接方式切换成 ssh 是更优的选择

- `git remote -v` 查看当前协议
- `git remote set-url origin git@gitlab.xxxxxxx` 切换当前的连接方式
- `git pull origin master` 验证是否成功





## rebase

### 合并多个 commit

1. 通过 `git log` 查看提交历史，找到需要合并的 commit 段
	- `git rebase -i HEAD~3` 表示合并最新的三个 commit
	- `git rebase -i xxxxxx` 通过版本号控制合并，注意标识版本号（即 xxxxxx）的 commit 不参与合并

2. 接着，再次确认需要合并的分支，将 `pick` 变更为 `squash`，注意第一行提交信息必须为 `pick`，保存后退出
	- `git rebase --continue` 在当前修改上继续操作
	- `git rebase --abort` 撤销当前的 rebase 操作

3. 再次编辑提交信息后提交



## Tag

`tag` 常用命令，主要用于记录里程碑事件，又可以参看 [git-tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging) 来获取更多细节

- `git tag -a v0.1 -m "add a tag named v0.1"` 在本地添加一个带有 message 的 tag 标签
- `git push origin v0.1 || --tgas` 将本地 tag 推送到远程分支上
- `git tag` 查看所有 tag
- `git tag -d v0.1 v0.2` 删除**本地**tag
- `git push origin --delete v0.1 v0.2` 删除**远程** tag
- `git checkout v0.1` 切换到指定 tag



## push

试想一个场景，如果你在本地 `reset head` 到一个历史 commit，同时在此基础上进行开发，然后不希望再使用 `remote/master` 上的一些提交，跳过他们直接覆盖本地提交，则可以使用 `git push --force` 将本地 commit 强行推送至服务端

- 这种操作带来的风险点：如果另一个人在该分支上也提交了内容，那么会将他的提交内容也覆盖（清空）


