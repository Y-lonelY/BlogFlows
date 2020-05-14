# Web安全


## CSRF

CSRF，跨站请求伪造，攻击方式是窃取你在正常网站内的一些请求细节，将其放在黑客自己网站上，当你访问到黑客网站上，实际上就会触发一些请求，比如付款什么的

常用的攻击方式，利用get和post请求：

- get请求就是直接利用url进行请求，可以通过a,img,script标签等，jsonp也会有此类风险
- post请求复杂一点点，可以通过表单来进行提交

如何防范呢，防范的要点在于识别这次提交是来源于你的网站，因此：

- 可以通过在自己网站上添加验证方式，比如验证码等
- 在访问网站上添加token，后端先对token进行验证，验证不通过则不会继续执行


## XSS

XSS跨站脚本攻击，简单来说就是JavaScript脚本注入，利用一些手段在网站上执行恶意的JavaScript代码，比如通过请求，获取你的私密信息（document.cookie）等

XSS 常用的测试语句：

- `<script>alert(1)</script>`
- `<img src='' onerror='alert(1)' />`
- `<svg onload='alert(1)' />`
- `<a href='javascript: alert(1)' />`

XSS根据类型可以分为三类：

- 反射型XSS攻击，非持久攻击，即直接通过输入script脚本来执行
- 存储型，比如在一个博客评论内输入脚本，网站将其存入数据库，之后每次访问展示时都会执行植入的脚本
- DOM型，即通过输入或者改变DOM元素，通常是通过img标签来执行恶意脚本

避免XSS攻击的手段：

- 对输入进行验证，过滤掉敏感字符
- 对输出进行HTML实体编码，比如 `<` 可以使用 `&#60` 来表示
- react 实际上针对XSS攻击做了很多工作，比如会对内容进行HTML实体编码，填入文本内容而不是html元素，如果需要填入html元素，可以通过 `dangerouslySetInnerHTML` 属性来设置
- 设置 http 请求，`httponly=true` 来阻止js读写cookie