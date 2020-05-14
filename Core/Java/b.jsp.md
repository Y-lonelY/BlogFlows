<!-- MarkdownTOC -->

- [jsp 原理](#jsp-%E5%8E%9F%E7%90%86)
- [jsp basis](#jsp-basis)
	- [jsp 内置对象](#jsp-%E5%86%85%E7%BD%AE%E5%AF%B9%E8%B1%A1)
	- [jsp 动作元素](#jsp-%E5%8A%A8%E4%BD%9C%E5%85%83%E7%B4%A0)
	- [scriplet](#scriplet)
- [jsp to html](#jsp-to-html)
- [jsp 跳转](#jsp-%E8%B7%B3%E8%BD%AC)

<!-- /MarkdownTOC -->

### jsp 原理

JSP（Java Server Pages）是运行在服务端的动态网页开发技术，它使用JSP标签在HTML网页中插入Java代码，标签通常表示为 `<%java code%>`，可以看成一个简化的Servlet设计

### jsp basis

#### jsp 内置对象

- request对象用于封装请求的数据
- response对象用于封装响应数据，其作用域是本页面
- session对象是会话对象，用来记录每个客户端的访问状态

#### jsp 动作元素

- `<jsp:include page='' flush=''></jsp:include>` 是包含标签，page指定包含文件的路径，flush指定当缓冲区满的时候，是否将其清空
- `<jsp:forward page=''></jsp:forward>` 是重定向标签，page 指定重定向的地址
- `<jsp:param name='' value=''></jsp:param>` 是传递参数的标签，以键值对形式传递，被 `<jsp :include>` 包裹

#### scriplet

`scriplet` 是最简单的JSP元素，他只需要在HTML插入 `<% %>`，就可以在标记中编写Java代码

`<%@ include file='url' %>` 指令用来包含其他文件，被包含文件可以是HTML文件、JSP文件或者文本文件

表达式是形如 `<%= %>` 的代码，注意这段Java代码必须有返回值且结尾不能有`;`

JSP声明，`<%! java code %>` 声明全局变量或者方法

`<%@ page %>` 指令常用属性

- import 用来导入包，从而在 scriplet 中使用
- contentType 用来指定当前JSP页面的MIME类型和字符编码，处理服务器发送给客户端时的内容编码
- errorPage 指定当JSP页面发生异常时需要转向的错误处理页面
- language 定义JSP页面所用的脚本语言，默认为Java
- pageEncoding 指定JSP页面本身的编码

### jsp to html

1. 浏览器发送HTTP请求给服务器
2. Web服务器识别出这是一个对JSP网页的请求，将该请求传递给JSP引擎
3. JSP引擎从磁盘中载入JSP文件，并将其转化成Servlet(.java)，JSP引擎将Servlet编译成可执行类(.class)，并将原始请求传递给Servlet引擎
4. Web服务器的某组件将会调用Servlet引擎，然后载入并执行Servlet类，在执行过程中，Servlet产生HTML格式的输出并将其内嵌于HTTP response中上交给Web服务器
5. Web服务器以静态HTML网页的形式将HTTP response返回给浏览器

### jsp 跳转

- `request.getRequestDispatcher().forward(request,response)` 属于转发，服务器跳转，相当于方法调用，在执行当前文件的过程中转向执行目标文件，当前文件和目标文件都属于同一次请求，共用一个 request

- `response.sendRedirect()` 属于重定向，客户端跳转，相当于客户端向服务器发送一个请求之后，服务器返回一个响应，客户端在接收到响应之后再次向服务器发送请求，一共是两次请求，前后页不共用一个request

- `application.getContextPath()` 定位到当前路径的根路径，即 `WebContent\`

- `application.getInitParameter("page-title")` 用来设置标签卡标题

