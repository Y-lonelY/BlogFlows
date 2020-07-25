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


## Mac discard all

在 Mac 上，如果文件未 commit 或者 stash 而直接 **discard all changes**，则会失去所有内容，且这个过程不可逆，因此需要格外注意
