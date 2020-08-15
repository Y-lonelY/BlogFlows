<!-- MarkdownTOC levels="2,3" -->

- [Command](#command)
	- [stash](#stash)
- [rebase](#rebase)
	- [合并多个 commit](#%E5%90%88%E5%B9%B6%E5%A4%9A%E4%B8%AA-commit)
- [Q&A](#qa)
	- [Failed to compile Module not found...](#failed-to-compile-module-not-found)
- [添加license](#%E6%B7%BB%E5%8A%A0license)
- [Mac discard all](#mac-discard-all)
- [同一台设置配置不同的 git 账号](#%E5%90%8C%E4%B8%80%E5%8F%B0%E8%AE%BE%E7%BD%AE%E9%85%8D%E7%BD%AE%E4%B8%8D%E5%90%8C%E7%9A%84-git-%E8%B4%A6%E5%8F%B7)
	- [Attention](#attention)
- [submodule && subtree](#submodule--subtree)
	- [场景](#%E5%9C%BA%E6%99%AF)
	- [submodule 基本使用](#submodule-%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8)
	- [subtree 基本使用](#subtree-%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8)
	- [submodule vs subtree](#submodule-vs-subtree)
	- [Attention](#attention-1)

<!-- /MarkdownTOC -->

## Command

`git hash-object -w file.txt` 用于保存对象，将 file.txt 压缩成二进制文件（Git对象），并将其保存在 `.git/objects` 目录

文件保存为二进制对象之后，还需要通知 Git 哪些文件发生了改变，所有改动的文件信息，Git 都记录在一个区域，叫做**暂存区**

在暂存区（stage）一般写入文件名，二进制对象名以及文件权限

`git add .` 用于将所有改动文件生成一个Git 对象，并将其放入暂存区

一次 `commit` 就相当于生成了当前项目的一次快照，项目的历史就是由不同时点的快照组成，所谓快照就是保存当前的目录结构以及每个文件对应的二进制对象

`git log` 可以查看当前分支的快照信息

`git commit` 用来同时提交目录结构和说明，生成快照

`(branchA)~git merge branchB` 将 branchB 分支合并到 branchA 分支，**注意要保持两个分支到最新**

配置 `.gitignore` 文件来达到上传时忽略某些文件的目的，比如 push 时忽略 node_module 文件，需要配置 `**node_module`，如果 node_module 已经写入本地缓存，需要先删除当前文件夹，提交之后，再重新 `npm install`


### stash

stash 相关命令，stash 主要体现在切换分支或者 pull 产生 merge时，需要保存当前工作状态

- `git stash` 缓存当前状态
- `git stash list` 展示 stash 列表
- `git stash drop stash@{0}` 删除指定 stash
- `git stash clear` 删除所有的 stash
- `git stash apply stash@{0}` 应用第一个 stash 缓存
- `git stash pop stash@{0}` 应用并删除第一个 stash 缓存



### Tag

`tag` 常用命令，主要用于记录里程碑事件，又可以参看 [git-tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging) 来获取更多细节

- `git tag -a v0.1 -m "add a tag named v0.1"` 在本地添加一个带有 message 的 tag 标签
- `git push origin v0.1 || --tgas` 将本地 tag 推送到远程分支上
- `git tag` 查看所有 tag
- `git tag -d v0.1` 删除**本地 **tag
- `git push origin --delete v0.1` 删除**远程** tag
- `git checkout v0.1` 切换到指定 tag



### push

试想一个场景，如果你在本地 `reset head` 到一个历史 commit，同时在此基础上进行开发，然后不希望再使用 `remote/master` 上的一些提交，跳过他们直接覆盖本地提交，则可以使用 `git push --force` 将本地 commit 强行推送至服务端

- 这种操作带来的风险点：如果另一个人在该分支上也提交了内容，那么会将他的提交内容也覆盖（清空）




## rebase

### 合并多个 commit

1. 通过 `git log` 查看提交历史，找到需要合并的 commit 段
	- `git rebase -i HEAD~3` 表示合并最新的三个 commit
	- `git rebase -i xxxxxx` 通过版本号控制合并，注意标识版本号（即 xxxxxx）的 commit 不参与合并

2. 接着，再次确认需要合并的分支，将 `pick` 变更为 `squash`，注意第一行提交信息必须为 `pick`，保存后退出
	- `git rebase --continue` 在当前修改上继续操作
	- `git rebase --abort` 撤销当前的 rebase 操作
	
3. 再次编辑提交信息后提交


## Q&A

### Failed to compile Module not found...

描述：clone react 项目之后，发现 `Failed to compile Module not found does not match the corresponding path on disk`，即在本地磁盘找不到引入的模块

原因：在 Mac 下文件名不区分大小写，因此 git 无法追踪到文件名大小写的更改，从而无法同步到远程仓库，而在 windows 系统下，是区分大小写的

解决：重新更改文件名大小写即可


## 添加license

GitHub 添加 license
- 登录至 github 项目，在项目内`create new file`
- 输入 liscense
- 选择通过模板进行创建，选择 MIT 模板之后，进行 commit 操作


## Mac discard all

在 Mac 上，如果文件未 commit 或者 stash 而直接 **discard all changes**，则会失去所有内容，且这个过程不可逆，因此需要格外注意

但是，在 Mac 上，有文件复原功能，可以对修改的各个文件依次进行复原操作，如果你记得修改文件的话：
- 关闭 Xcode
- 用**文本编辑**打开需要复原的文件
- 文本编辑器下，依次点击 文件->复原到->浏览所有版本
- 在弹窗内选择相应的版本进行复原


## 同一台设置配置不同的 git 账号

一般的场景是已经在全局配置了一个 git 账号，然后需要另加一个 git 账号，那么：

1. 取消 git 的全局设置

```git
$ git config --global --list
$ git config --unset user.name
$ git config --unset user.email
```

之后根据每个项目，单独设置器用户名和邮箱

```git
$ cd prijectPath
$ git config user.name "yh"
$ git config user.email "some@some.com"
```

2. 新增一个 SSH Key

新增一个 SSH Key，注意需要重新命名，不然会覆盖之前的 id_rsa，然后添加到 git 仓库，并验证添加是否成功

```git
$ cd ~/.ssh
$ ls
$ ssh-keygen -t rsa -C "your email"
<!-- 注意添加新的文件名，不是用默认的 id_rsa -->
$ ssh -T git@github.com
```

3. 私钥添加至本地

ssh 的工作原理就是远程服务器存放公钥，本地存放私钥

```git
ssh-add ～/ssh/id_rsa
ssh-add ~/ssh/id_rsa_work
ssh-add -l
```

4. 配置 config 文件

通过 config 文件来对密钥进行管理，在 .ssh 目录下通过 `touch config` 新建一个 config 文件

配置内容如下，注意不需要添加 ssh 前缀 `git@`，且 Host 最好与 HostName 保持一致

```
Host github // 网站的别名，随意取
HostName github.com // 托管网站的域名
User username // 托管网站上的用户名
IdentityFile ~/.ssh/id_rsa_github // 使用的密钥文件
```

### Attention

1. pull / push 问题

场景：通过 sublime merge 等工具不能直接 pull/push 代码，而可以通过命令行输入密码进行常规操作<br />
原因：可能之前 clone 项目时是用的 https 方式，而配置之后默认使用 ssh 方式，导致出现 `Git Error: Could not read Username for 'https://github.com': ternimal prompts disabled` 等问题<br />
解决：`git config --local --list` 查看本地git配置，如果是 https 方式，则 `git remote rm origin` 清除之前 url 配置，再执行 `git remote add origin [ssh-url]` 来重新设置 url 为 ssh 方式



## submodule && subtree

> 不同仓库，相互引用，独立维护

### 场景

repositoryA 需要引入 repositoryB 内容，同时 repositoryA(developer1, developer2 ...) 和 repositoryB(user1, user2 ...) 都需要维护（即独立的 pull && push 操作），`submodule` 和 `subtree` 用来方便的解决这种情况

### submodule 基本使用

`git submodule add repositoryB' address` 将 repositoryB 引入到 repositoryA 项目内

引入 repositoryB 可以通过 `git status` 看到新增的两个文件 `.gitmodules` 和 `repositoryB`

 - `.gitmodules` 内含 submodule 的主要信息，包括 submodule 的目录和地址信息

修改 repositoryB 内容，首先要判断时候有repositoryB的权限

 - `cd repositoryB` 文件目录内，进行 pull && push 操作（正常进行说明无权限问题）
 - 在 repositoryA 通过 `git status` 查看提交情况，应该会看到 modified 的信息，进行 pull && push 操作

更新

1. 在 repositoryB 的根目录下通过 `git pull` 更新
2. 在 repositoryA 的根目录下通过 `git submodule foreach git pull` 更新
3. 在 repositoryA 的根目录下通过 `git pull` 对 repositoryA 的内容进行更新

clone

两种方式：

1. 通过在 clone 命令后添加 `--recursize` 递归参数
2. clone 父项目之后，再通过 `git submodule init` 和 `git submodule update` 进行初始化和更新

delete

git 不支持手动删除 submodule

 - `cd repositoryB` 进入 repositoryB 的根目录下
 - `git rm --cached repositoryB` 删除缓存，一般需要添加 `-f` 强制执行
 - `rm -rf repositoryB` 删除 repositoryB，此时 .gitsubmodule 仍在项目内
 - `rm .gitmodules` 删除 submodule 配置信息
 - `vim .git/config` 删除 submodule 配置信息
 - 最后进行 pull && push 操作

### subtree 基本使用

拥有根目录权限可以管理整个项目，通过执行 `git push` && `git push --prefix...` 命令来维护当前总项目和子项目

clone

进入 repositoryA 的根目录

`git subtree add --prefix=[repositoryB] [git's address] [branch] --squash`

表示在 repositoryA 的根目录下，添加一个名为 repositoryB 的文件夹，同时在该文件夹下引入新仓库的某个分支内容

`--squash` 表示将 subtree 的所有 commit 合并成一次 commit，目的是不用拉取历史记录

此时通过 `git status` 可以观察到有 commit 内容需要提交，实际就是新创建的 repositoryB

pull

在 repositoryA 内直接执行 `git pull` 只会更新到 repositoryA 的内容，而不会更新到 repositoryA

通过执行 `git subtree pull --prefix=[repositoryB] [git's address] [branch] --squash` 拉去 repositoryB 的内容

在 repositoryA 内执行 `git add . ` && `git commit -m "..."` 操作即可

push

通过执行 `git subtree push --prefix=[repositoryB] [git's address] [branch] --squash` 将代码提交到服务器上，**注意**，git 会遍历所有的 commit 记录，然后找出针对 repositoryB 的更改，**将这些更改提交到repositoryB的服务器上**，即此次提交会改变 repositoryB 内容而不会更改 repositoryA 内容

### submodule vs subtree

submodule 是 git 以前推荐的方案，存在几个缺点：

1. 需要维护 `.gitsubmodule` 
2. 删除时费劲，需要删除项目缓存，项目，同时维护 .gitmodule 和 git config
3. clone 时第二种方案是需要 update && init


subtree 是 git（1.5.2） 之后推荐的方案，解决了 gitmodule 存在的问题：

1. 无感知的，其他成员可以不知道 subtree 的存在
2. 不会新增加 .gitmodule 配置类文件
3. 但是，操作起来感觉 subtree 有点繁琐，需要了解项目的架构情况，需要同时利用 `git push` && `git push --prefix` 将改动分别推送到当前主项目和子项目中去
4. 在子仓库更改了项目之后，在主项目通过 `git pull --prefix...` 执行会产生冲突，需要去解决，解决之后再推到主项目上去

### Attention

subtree 新建目录时需要区分大小写

`git pull --prefix...` 如果遇到 `...tree has modified, can't add.` 一般是因为主项目有改动且未 commit

