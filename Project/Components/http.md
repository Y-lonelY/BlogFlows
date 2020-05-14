---
title: http
date: 2016-12-08 18:46:29
tags: ["university"]
---

> 最近在弄自己的githubBlog(2016-10-25:大三下通过OCTOPRESS建立自己第一个个人博客)，可是每次打开浏览器进去这个https有点辣眼睛，为什么会出现图中这种情况呢？  

<!--more-->

![https][1]

----------
我打开geogle浏览器的开发者工具，很奇怪我上午查看elements项有报错，但是晚上再看却没有报错，错误重现率并不是100%，我暂时理解为浏览器是接受这个错误的，我打开历史记录，错误信息为：**Blocked loading mixed active content "..."**，我继续查找错误信息，[Mixed Content Blocking][2]，这里我接触到一个**Mixed Content**，那么问题来了：
what's Mixed Content?

> What is Mixed Content? When a user visits a page served over HTTP,
> their connection is open for eavesdropping and man-in-the-middle
> (MITM) attacks. When a user visits a page served over HTTPS, their
> connection with the web server is authenticated and encrypted with SSL
> and hence safeguarded from eavesdroppers and MITM attacks.
> However, if an HTTPS page includes HTTP content, the HTTP portion can
> be read or modified by attackers, even though the main page is served
> over HTTPS.  When an HTTPS page has HTTP content, we call that content
> “mixed”. The webpage that the user is visiting is only partially
> encrypted, since some of the content is retrieved unencrypted over
> HTTP.  The Mixed Content Blocker blocks certain HTTP requests on HTTPS
> pages.

简单来说，当我们访问http页面时，我们的连接是容易遭受被窃听和中间人攻击的，总而言之是很不安全的。但是当我们访问一个https页面时，我们的连接是被SSL验证和加密的，因此能够被保护起来，免受监听者和中间人攻击之害，也就是说，https是安全的连接方式。但是，如果一个https页面中包含有http连接，我们就称这种情况为“mixed”，页面只有部分安全（https部分），还有一部分是不加密的（http部分），那么整个页面也是不安全的。
于是便会出现上面的情况，OK，那我点击那个辣眼睛的东西看看：  

![图片描述][3]  

果然加载了不安全的脚本，    

![图片描述][4]
  
那么接下来的任务很简单，找到那个脚本，然后[fix a website with blocked mixed content][5]，

> The best strategy to avoid mixed content blocking is to serve all the
> content as HTTPS instead of HTTP.
> 
> For your own domain, serve all content as HTTPS and fix your links. 
> Often, the HTTPS version of the content already exists and this just
> requires adding an "s" to links - http:// to https://.
> 
> However, in some cases, the path may just be incorrect to the media in
> question. There are online as well as offline tools (depending on your
> operating system) such as linkchecker to help resolve this.
> 
> For other domains, use the site's HTTPS version if available. If HTTPS
> is not available, you can try contacting the domain and asking them if
> they can make the content available via HTTPS.

经过和localhost:4000生成的页面进行对比，我发现，我所引用的[jiathis][6]并没有生效，
我先尝试第一种方法，将"http"转换成"https",很尴尬，即使是在本地预览都无法加载出来了，上面介绍的第二种方法是通过一些外链检测工具，例如[linkchecker][7]来检查我所引用的连接是否为死链接，结果显然不是。
OK,虽然不成功，但是我注意到它是直接在Script(注意用markdown语法时不要用script的标签形式，会导致后面的内容无法加载出来！)标签中利用src属性引用的外部文件，我觉得这里可以优化一下，让其以无阻塞脚本方式运作：
原代码：

    <script type="text/javascript" src="https://v3.jiathis.com/code/jia.js" charset="utf-8"></script>
改之后：

    <script type="text/javascript">
    var duoshuoQuery = {short_name:"evison"};
        (function() {
            var ds = document.createElement('script');
            ds.type = 'text/javascript';ds.async = true;
            ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//v3.jiathis.com/code/jia.js';
            ds.charset = 'UTF-8';
            (document.getElementsByTagName('head')[0] 
             || document.getElementsByTagName('body')[0]).appendChild(ds);
        })();
    </script>  
这里对https和http做了一个选择判断，但是很遗憾貌似这个插件就是没有https支持，这样改过之后在本地浏览是无误的，但是**deploy**到github上还是**mixed content**状态，百度了一下发现确实现在没有支持https的社会化分享按钮，但是提出了一个解决方案，即将脚本复制到本地，通过路径来引用脚本，我觉得可以尝试一下。结果是连本地都无法加载出来了。下面是一个解决方案--[在https站点使用jiathis][8],但是由于条件限制，留待以后尝试！最后的结果是我把没有在网站上显示的jiathis组件删除。 


----------
2.经过了上面的尝试，虽然最终结果木有成功，但是我仍然想弄懂下面这三个问题.

 - http?
 - https?
 - ssl?

----------
**http的理解**  
http（超文本传输协议）是一种属于应用层的面向对象的协议，是用于从web服务器传输超文本到本地浏览器的的传送协议。http是基于TCP/IP通信协议来传递数据（HTML 文件, 图片文件, 查询结果等）。


----------
**http的特点**

 - 支持客户/服务器模式
 - 简单快速：客户向服务器请求服务时，只需传送请求方法和路径
 - HTTP允许传输任意类型的数据对象，正在传输的类型由Content-Type加以标记
 - HTTP是无连接：无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间。
 - HTTP是无状态：HTTP协议是无状态协议。无状态是指协议对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就较快。


----------
**URL**

 - URL(Uniform Resource Locator) 地址用于描述一个网络上的资源：
   schema://host[:port#]/path/.../[;url-params][?query-string][#anchor] 

    scheme  //有我们很熟悉的http、https、ftp以及著名的ed2k，迅雷的thunder等。  
    host   //HTTP服务器的IP地址或者域名  
    port  //HTTP服务器的默认端口是80，这种情况下端口号可以省略。如果使用了别的端口，必须指明，例如tomcat的默认端口是8080 http://localhost:8080/  
    path   //访问资源的路径      
    url-params  //所带参数  
    query-string    //发送给http服务器的数据  
    anchor //锚点定位


----------
**Get和Post方法的区别**

 - Http协议定义了很多与服务器交互的方法，最基本的有4种，分别是GET,POST,PUT,DELETE. 一个URL地址用于描述一个网络上的资源，而HTTP中的GET, POST, PUT, DELETE就对应着对这个资源的查，改，增，删4个操作。 我们最常见的就是GET和POST了。GET一般用于获取/查询资源信息，而POST一般用于更新资源信息.
 - GET提交的数据会放在URL之后，以?分割URL和传输数据，参数之间以&相连，如EditPosts.aspx?name=test1&id=123456.  POST方法是把提交的数据放在HTTP包的Body中.
 - GET提交的数据大小有限制（因为浏览器对URL的长度有限制），而POST方法提交的数据没有限制
 - GET方式需要使用Request.QueryString来取得变量的值，而POST方式通过Request.Form来获取变量的值
 - GET方式提交数据，会带来安全问题，比如一个登录页面，通过GET方式提交数据时，用户名和密码将出现在URL上，如果页面可以被缓存或者其他人可以访问这台机器，就可以从历史记录获得该用户的账号和密码.


----------
**http状态码**

 - 1xx:信息，服务器收到请求，需要请求者继续执行操作
 - 2xx:成功，操作被成功接收并处理
 - 3xx:重定向，需要进一步的操作以完成请求
 - 4xx:客户端错误，请求包含语法错误或无法完成请求
 - 5xx:服务器错误，服务器在处理请求的过程中发生了错误
[状态码大全][9]


----------
**https**  
先来看看其全称：**Hyper Text Transfer Protocol over Secure Socket Layer**，可以理解为http的安全版。HTTP下加入SSL层，HTTPS的安全基础是SSL，因此加密的详细内容就需要SSL，用于安全的http数据传输。

----------
**区别**  
超文本传输协议HTTP协议被用于在Web浏览器和网站服务器之间传递信息。HTTP协议以**明文方式**发送内容，不提供任何方式的数据加密，如果攻击者截取了Web浏览器和网站服务器之间的传输报文，就可以直接读懂其中的信息，因此HTTP协议不适合传输一些敏感信息，比如信用卡号、密码等，其默认端口号为**80**.
为了解决HTTP协议的这一缺陷，需要使用另一种协议：安全套接字层超文本传输协议HTTPS。为了数据传输的安全，HTTPS在HTTP的基础上加入了**SSL协议**，SSL依靠**证书**（采用https的服务器必须从CA （Certificate Authority）申请一个用于证明服务器用途类型的证书）来验证服务器的身份，并为浏览器和服务器之间的**通信加密**，其默认端口号为**443**。


----------
**ssl**  
**security socket layer**安全套接字层，在传输层对网络连接进行加密。
SSL协议位于TCP/IP协议与各种应用层协议之间，为数据通讯提供安全支持。
SSL协议可分为两层：
**SSL记录协议（SSL Record Protocol**）：它建立在可靠的传输协议（如TCP）之上，为高层协议提供数据封装、压缩、加密等基本功能的支持。
**SSL握手协议（SSL Handshake Protocol）**：它建立在SSL记录协议之上，用于在实际的数据传输开始前，通讯双方进行身份认证、协商加密算法、交换加密密钥等。

--END--
 

  
    
    
    


  [1]: https://sfault-image.b0.upaiyun.com/197/989/1979897842-580db68a876f4_articlex
  [2]: https://blog.mozilla.org/tanvi/2013/04/10/mixed-content-blocking-enabled-in-firefox-23/
  [3]: https://sfault-image.b0.upaiyun.com/256/831/2568317033-580e2be97baa2_articlex
  [4]: https://sfault-image.b0.upaiyun.com/375/521/3755217525-580e2c59cbc36_articlex
  [5]: https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content/How_to_fix_website_with_mixed_content
  [6]: http://www.jiathis.com/
  [7]: http://www.51testing.com/html/90/344690-243044.html
  [8]: https://crzidea.com/2016/08/02/use-jiathis-on-https-site/
  [9]: http://www.runoob.com/http/http-status-codes.html
