# Git in Project



## 添加license

GitHub添加license
- 登录至github项目，在项目内`create new file`
- 输入 liscense
- 选择通过模板进行创建，选择MIT模板之后，进行commit操作



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
- `git tag -d v0.1` 删除**本地 **tag
- `git push origin --delete v0.1` 删除**远程** tag
- `git checkout v0.1` 切换到指定 tag



## push

试想一个场景，如果你在本地 `reset head` 到一个历史 commit，同时在此基础上进行开发，然后不希望再使用 `remote/master` 上的一些提交，跳过他们直接覆盖本地提交，则可以使用 `git push --force` 将本地 commit 强行推送至服务端

- 这种操作带来的风险点：如果另一个人在该分支上也提交了内容，那么会将他的提交内容也覆盖（清空）