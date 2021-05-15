# Shell

## 字符串判断

```shell
a="abc"
b="cde"
# = / != 判断是否相等
[$a=$b]

# -z 判断字符串长度是否为 0
[-z $a]

# -n 判断字符串长度是否不为 0
[-n $a]

# $ 判断字符串是否为空
[$a]
```







## Client 的 url 工具 -- curl

执行 `curl https://www.xxx.com` 就可以发出一个 GET 请求，服务器返回值会在命令行内输出

- `-A` 表示请求头内 `user-agent`
- `-H` 表示请求头
- `-b` 用来像服务器发送 cookie，比如 `curl -b 'key=value' https://www.xxx.com`
- `-d` 用来表示 post 请求的 body 内容
- `-G` 用来构造 URL 的查询参数，比如 `curl -G -d 'key1=v1' -d 'k2=v2' https://www.xxx.com`，表示发送一个 GET 请求，`https://www.xxx.com?key1=v1&key2=v2`，如果不指定  -G，则会发送一个 POST 请求



### 解决端口占用

**查看端口占用情况**

`ps` 查看系统内进程，可以看到 pid 信息

- `ps -e` 展示所有进程
- `ps -aux` 显示所有包含其他使用者的进程

`lsof` （list open files）列出当前系统打开文件的工具

- `lsof -i:3000` 查看 3000 端口占用情况

`netstat -tunlp` 用于显示 tcp，udp 的端口和进程等相关情况

- `t(tcp)` 展示 TCP 相关的选项
- `u(udp)` 展示 UDP 相关的选项
- `n` 拒绝显示别名，能显示数字则展示数字
- `l` 列出在 Listen 的服务状态
- `p` 显示相关链接的程序名 

上述命令结合 `grep` 来查找指定信息

执行 `kill -9 [pid]` 来关闭指定 pid 的进程



### 格式化时间

`time=$(date "+%Y%m%d-%H%M%S")` 格式化当前时间，注意 `date` 后面加空格


### 文件可执行权限

系统内，读、写和可执行权限对应的数字如下所示：

- `r(read)` = 4
- `w(write)` = 2
- `x(execute)` = 1
- no permissions = 0

权限的设置实际上就是上面的数字求和，比如：

- 7(4 + 2 + 1) 读、写、可执行

为文件设置最高权限，在文件的上级目录内执行 `sudo chmod -R 777 [targetFileName]`， `-R` 表示递归（recursive），即所有子文件同步设置权限



### 目录相关

1. `cd ～` 进入当前用户目录，`cd /` 进行系统根目录
2. `ls -al` 查看目录下文件的详细信息
3. `du -sh *` 查看每个目录的大小


### 文件操作

1. `pwd` 打印当前文件路径
2. `find -name [name]` 全局搜索
3. `whereis [filename]` 查看路径
4. `mkdir [filename]` 在当前目录下创建一个文件夹
5. `rm -rf [filepath]` 删除指定目录下的文件夹及其目录下的所有文件
6. `rm -f [file]` 删除文件
7. `cp [filename] [path]` 复制指定文件到指定目录
8. `mv filename newfilename` 重命名文件或者文件目录

**压缩 / 解压文件**

1. `zip -r xxx.zip xxx` 压缩指定文件夹为 .zip 文件
2. `unzip xxx.zip` 直接解压指定文件，输出到当前目录
3. `zip xxx.zip 1.txt 2.txt` 将 1.txt 和 2.txt 压缩为 xxx.zip
4. `unzip xxx.zip -d /home` 将 xxx.zip 解压到 /home 目录下

### 创建用户

- `useradd user` 使用 useradd 指令所建立的帐号，实际上是保存在 /etc/passwd 文本文件中
- `useradd -m -d /home/blog -s /sbin/nologin blog` m-自动建立用户的登入目录，d-指定用户登入时的起始目录，s-指定用户登入后所使用的shell，使用 nologin 使用户即不能登录系统，还能使用一些系统服务，比如 ftp 服务
- `userdel blog` 删除用户 blog
- `passwd blog` 为用户 blog 设置密码

`cat /etc/shells` 查看当前系统已安装的 shell

`nslookup` 查看 DNS 地址

`netstat` 用于显示与IP、TCP、UDP和ICMP协议相关的统计数据，一般用于检验本机各端口的网络连接情况
- `netstat -tunlp` l:listening   n:num   t:tcp  u:udp  p:process



## Declare Varibale

### 命名规则

命名只能使用英文字母，数字和下划线，首个字符不能以数字开头

中间不能有空格，可以使用下划线

不能使用标点符号

不能使用bash里的关键字（可用help命令查看保留关键字）

### 基本操作

`$?` 获取上一步返回参数

变量是一个键值对，直接访问变量名返回的是变量名，通过 `${变量名}` 访问其值

```sh
name = "YlonelY"
# 通过 ${...} 使用变量
echo ${name}
# readonly 设置变量只读
readonly read_name = "cool"
# 删除变量，只读变量不能删除
unset name
# 定义数组，通过换行或者空格进行分隔
array=(value0 value1 value2 value3)
# 获取元素个数
length=${#array[*]}
# 获取所有元素
${array[*]}
# 获取元素值
valuen=${array[n]}
```


## Judgement

### 大小判断

大于(greater than) `-gt`

小于(less than) `-lt` 

大于或等于(greater than or equal) `-ge`

小于或等于(less than or equal) `-le`

不相等(not equal) `-ne`

### 数字类型判断

```sh
# 判读输入值是否为一个数字，如果为0，则证明是一个数字类型
expr $sort "+" 10 &> /dev/null
if [[ $? -eq 0 ]]; then
	# statements...
```

### if elif 判断

`fi` 用于终止代码块

```sh
if [[ $option_select -eq 1 ]]; then
	# statements...
elif [[ $option_select -eq 1 ]]; then
	# statements...
fi
```


## Function

1. 函数传参通过空格进行分隔
2. 函数内通过 `$` 来获取传递参数，比如 `$1` 用来获取第一个传参

```sh
# declare function
# 3 params 1. title 2. array options 3. array's length
function READ_USER_INPUT() {
  title=$1
  options=$2
  maxValue=$3
  echo "${title}"
  for option in ${options[*]}; do
    echo "${option}"
  done
  read sort
  return ${sort}
}

# call the function
options_value=("1.start" "2.stop" "3.list")
READ_USER_INPUT "this is title" "${options_value[*]}" ${#options_value[*]}

# get the return value
option_select=$?
```

## 创建并行命令

例如两个命令 `npx babel src --watch --out-dir dist` 和 `npx nodemon dist/index.js` 都不会主动退出，会继续保持，监听相应文件的变化

此时如果希望在一个脚本是同时执行上面的两个命令，只需要用到并行命令

一个解决方案是：将 `&` 放在一个命令末尾，可以将这个命令放到后台执行。放到后台后主进程将继续向下执行，后台命令将与主进程并行执行

与 `&` 相对，将 `&&` 放在一个命令末尾，与什么都没有单纯换行实际效果相同，等待这个命令执行完后才继续执行下面的命令

