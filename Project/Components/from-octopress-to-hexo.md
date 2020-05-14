---
title: from octopress to hexo
date: 2016-12-03 18:42:00
tags: ["university"]
---

---
> *y.用octopress和hexo搭建个人博客的经历*
>
> *l.思考与学习*

<!--more-->

 - 2016年，大三，用 [octopress][1] 搭建了自己的第一个个人博客，因为博客内容而直接进了终面并顺利获得了第一份工作

 - 2017年，二月到五月，度过了一个充实的实习期（KP：105/110）

 - 2017年，毕业，进入公司一周后开始做第一个"正式"项目，并被这个项目折磨的死去活来

 - 为了缓解一下心情，又开始折腾起自己的个人博客

 - 2017年，11月，将个人博客框架换成了 [hexo][2]

---
🎈OCTOPRESS
---

 - what's Octopress?

    - Octopress是一个基于Jekyll的静态博客站点生成系统，它很大程度上简化了Jekyll搭建博客的过程

 - why choose octopress?

    - Wordpress: a.买主机，域名,b.Over Featured,c.动态网页速度慢,d.过度依赖数据库,e.可控性差,f.容错性差,g.迁移成本高,h.网页编辑器写BLOG

    - Octopress: a.命令行操作,b.纯文本写blog,c.定制性高,d.纯静态,e.版本化管理,f.迁移成本低,g.简洁的ruby框架,h.MarDown语法

 - 使用流程
 
    - 搭建环境--纯文本写博客--生成静态网页--本地预览--部署

 - 搭建环境(git 用于写命令行，markdownpad2和awesomium_v1只是markdown语法的编辑器)

    - Git-1.9.5-preview20150319.exe

    - markdownpad2-setup.exe

    - awesomium_v1.6.6_sdk_win.exe

 - 搭建好了之后，桌面右键选择git bash，接下来:

    - 设置github的用户名 `git config --global user.name "..."`

    - 设置邮箱 `git config --global user.email "..."`

    - 设置和github进行传输的密钥SSH `ssh-keygen -t rsa -C "2386470745@qq.com"`

    - 回车直到生成RSA的数字指纹；`在C:\Users\yanghaods\.ssh文件夹中的id_rsa.pub`打开后将公钥复制到github ssh 上

    - 检测是否配置成功：`ssh -T git@github.com`

 - 配置Ruby 在git bash 里面 `ruby --version` 可以查看版本来测试是否安装成功           

 - 配置DevKit,安装好了之后在安装目录里面打开 git bash, `ruby dk.rb init` 进行初始化, `vi config.yml`打开配置文件，查看ruby文件是否在配置文件内

###安装 *octopress* 并设置默认主题

 - 克隆 *octopress* 至本地: `git clone git://github.com/imathis/octopress.git octopress` 安装*octopress*

 - 安装完成后，进入 *octopress*: `cd octopress/`,为了保证安装的顺利，抛弃使用国外的源 `gem sources -r https://rubygems.org/ 先移除默认的源地址`

 - 添加新的源地址，在这里很多老的答案是安装 `https://taobao.org/`的源，但是一直失败，后来经过查证,证实 *taobao Gems* 源已停止维护，现由 ruby-china 提供镜像服务, `gem sources --add https://gems.ruby-china.org/ --remove https://rubygems.org/`,在这里我遇到了SSL证书问题，通过用 `http://gems.ruby-china.org` 解决问题

 - `gem sources -l` 查看目前的源，确保只有 `gems.ruby-china.org`

 -  接下里修改 *gemfile* 配置, `vi Gemfile` ,进入编辑模式，修改上面的源网站,：wq保存并退出

 - `gem install bundler`,安装bundler，接下来安装bundler内的软件包

 - `bundle install` 在安装过程中看到两个熟悉的东西：rake, sass
 
 - Public产生目录,`rake generate` 这里出现了错误: *d:/Ruby21-x64/lib/ruby/gems/2.1.0/gems/bundler-1.13.2/lib/bundler.rb:19:in replace': Invalid argument - ruby_setenv(COMPUTERNAME) (Errno::EINVAL)*，弄了很久没解决，这里我先进行下一步；

 - 在这里我认真考虑之后觉得是因为版本太低，导致不兼容的问题，于是我用了最新的版本，完美觉得上述问题；

   - rubyinstaller-2.3.1-x64.exe

   - DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe

   - Git-2.10.1-64-bit.exe

 - `rake generate` ,在public内生成静态文件;


 - `rake preview`,启动一个本地预览的服务器,在浏览器localhost:4000内可以看到简易的blog页面，但是此时需要注意网页加载非常慢，
为了看原因，我看了network，发现一个js文件并没有加载出来，这里是外国的源在这里加载
失败，所以将其改成国内的源文件；

 - C:\Users\yanghaods\Desktop\octopress\source\_include\head.html
将`<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>`
改成`<script src="//libs.baidu.com/jquery/1.9.1/jquery.min.js"></script>`

 - 生成博客与单页面

 - 新建博客 `rake new_post["title"]`,在 *sourec/_post*内可以看到一个新增的日期+名字的.markdown文件, 直接在这个生成的文件里面修改博客内容

 - 新建单页面, `rake new_page[iamevison]`

 - 生成目录结构：`#create/source/iamevison/index.markdown`或者`rake new_page[iamevison/page.html]`

 - 生成目录结构：`#create/source/iamevison/page.html`

 - 所有博客的书写都是在*source/_post*目录下进行的,当你开着本地服务器时，会自动渲染，若没开，写完后
`rake generate`即可

###将blog托管至github

 - 将blog部署至github上,在github上新建一个仓库，命名格式为：*username.github.io* 将来访问你blog的网站

 - `gem update rake` 升级rake版本至最高,但是升级之后发现和Gemfile文件冲突，没办法，还得删除，`gem unstall rake` 选择删除的版本即可

 - `$ rake setup_github_pages`

 - 报错：`rake aborted!
NoMethodError: undefined method []' for nil:NilClass
C:/Users/yanghaods/Desktop/octopress/Rakefile:322:in block in <top (required)>'
Tasks: TOP => setup_github_pages
(See full trace by running task with --trace)
Set the codepage to 65001 for Windows machines
Enter the read/write url for your repository
(For example, 'git@github.com:your_username/your_username.github.io.git)
           or 'https://github.com/your_username/your_username.github.io')`

  - 解决：经过尝试之后的一个解决方法：`$ rake setup_github_pages[git@github.com:iamevison.github.io.git]`
 
  - 之后 `rake generate`, `rake deploy`
 就可以在浏览器上看到网站，相当于将本地的_Deploy push到了仓库中，但是现在branch上只有master一个分支；
 
  - 下面托管源码至github, `git add .` 表示将所有目录托管到github上, `git commit -m "your message"`
 然后 `git push origin source` ,表示将本地的source提交到远程的source分支上

  - 这里报错,通过 `git remote -v` 可以查询你所有远端仓库和权限，发现已经添加了 `url = git@github.com:iamevison/iamevison.github.com.git`
 在经过漫长的尝试之后我发现这个问题是由于我的仓库名为：`iamevison.github.io.git`,但是它自动生成的是`iamevison.github.com.git`;
  - 所以我在 *octopress/.git* 目录下找到config文件，将 *com->io*，问题得以解决；我们之所以将source 整个传到github上，是可以满足我随时随地写blog的需求，同时利用github做好版本管理，使我们的blog永远不会丢失；
 
  - 博客的自定义设置
 
 *config.yml*

  - 原：`url: http://iamevison.github.io.git.github.io/git@github.com:iamevison`
    改：`url: http://iamevison.github.io`

  - 原：`title:My octopress blog`
    改：`title: Evison's Blog`

  - 原：`subtitle：A blogging farmework for hacks`
    改：`subtitle: Hava Fun In Coding.`
    改：`author：evison`

  - simple_search: `https://www.baidu.com`

  - twitter:false--关闭推特的使用
  
###使用第三方插件
  
   - 多说添加评论功能,先在多说注册账号，然后在config.yml内添加开关

   - *# duoshuo duoshuo_comment: true*

接着将多说代码添加进来 *source/layout/post*

      <section>
        <h1>Comments</h1>
        <div id="disqus_thread" aria-live="polite">{% include post/duoshuo_comment.html %}</div>
      </section>



然后在source/include/post下新建一个duoshuo_comment.html,里面添加duoshuo网站上的源码，注意修改的地方：

    <div class="ds-thread" data-thread-key="{{ page.id }}" data-title="{{ page.title}}" data-url="{{ site.url }}{{ page.url }}"></div>
 
###增加社会化的分享

 - jiathis插件: *config.yml*内添加开关
   
 - *# jiashare
jia_share: true
octopress/source/_includes/post/sharing.html修改配置文件
  {% if site.jia_share %}
    {% include post/jia_share.html %}
  {% endif %}*

    - 然后在source/include/post下新建一个jia_share.html,将jiathis 上的源码拷贝进去

###自定义404页面
 
 - 在source下新建一个404.markdown文件

 - layout: page

 - title: "404 Not Found"

 - date: 2016-10-20 21:31:34 +0800

 - comments: false 

`<script type="text/javascript" src="http://www.qq.com/404/search_children.js" charset="utf-8"></script>`
这里用的是腾讯公益404页面；

###添加About me导航

 - 先在source内生成一个aboutme page, `rake new_page[aboutme]`,接下来将其添加到导航栏
`octopress\source\_includes\custom\navigation.html`, 添加代码如下 `<li><a href="{{ root_url }}/aboutme">AboutMe</a></li>`


---
🐱‍💻HEXO
---

 - what's hexo?

 - Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 Markdown（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页
  
###安装hexo

 - 安装 [node][3],git

 - `$ npm install -g hexo-cli` 安装 *hexo*

接着，通过 *hexo* 在指定目录下新建文件

    $ hexo init <folder> 
    $ cd <folder>
    $ npm install

 - 在 `_config.yml` 内对 *hexo* 进行配置

###生成blog

 - `hexo new <title>` 新建一个文章

 - `hexo generate || hexo g`  生成静态文件

 - `hexo server` 在本地通过4000端口进行预览

 - `hexo deploy` 部署博客至github

 - `hexo clean` 当你删除某些博客，但是发现网站上仍有显示时，可以用此命令清除缓存

###更换hexo主题

 - 以 [next][4] 为例，在github上将此主题 clone 下来

 - 切换自己喜欢的版本

 - 在 `hexo/_config.yml`里对主题进行更换

###添加tags

 - `hexo new page 'tags'` 新建一个tags页

 - 打开tags页，进行配置，`type: 'tags'`

 - 在 `hexo/_config.yml`里对*menu*进行路径配置，`tags: /tags`

---
thoughts
---

 - 两种框架搭建个人博客过程告一段落，综合来看，搭建方法大同小异

    1. 搭建基本环境

    2. 下载博客框架

    3. 进行基本配置

    4. 生成博客，编写，推送至github

  - 对*git&&github*的使用启蒙于此，从此沉迷于全球最大的同性交流社区无法自拔  

[1]:http://octopress.org/
[2]:https://hexo.io/zh-cn/docs/
[3]:https://nodejs.org/zh-cn/
[4]:https://github.com/iissnan/hexo-theme-next

