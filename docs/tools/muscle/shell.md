# Shell

## Linux 常用命令

解决端口占用

- `ps` 查看所有系统进程
- `sudo lsof -i :7177` 查看占用7177端口s的进程
- `sudo kill -9 [pid]` 关闭指定pid的进程

目录相关

- `cd ～` 进入根目录
- `ls -al` 查看目录下文件的详细信息
- `du -sh *` 查看每个目录的大小
- 为文件设置最高权限，在文件的上级目录内执行 `sudo chmod -R 777 [targetFileName]`，然后输入密码即可

文件操作

- `pwd` 打印当前文件路径
- `find -name [name]` 全局搜索
- `whereis [filename]` 查看路径
- `mkdir [filename]` 在当前目录下创建一个文件夹
- `rm -rf [filepath]` 删除指定目录下的文件夹及其目录下的所有文件
- `rm -f [file]` 删除文件
- `cp [filename] [path]` 复制指定文件到指定目录

创建用户

- `useradd user` 使用 useradd 指令所建立的帐号，实际上是保存在 /etc/passwd 文本文件中
- `useradd -m -d /home/blog -s /sbin/nologin blog` m-自动建立用户的登入目录，d-指定用户登入时的起始目录，s-指定用户登入后所使用的shell，使用 nologin 使用户即不能登录系统，还能使用一些系统服务，比如 ftp 服务
- `userdel blog` 删除用户 blog
- `passwd blog` 为用户 blog 设置密码

`cat /etc/shells` 查看当前系统已安装的 shell

`nslookup` 查看 DNS 地址

`netstat` 用于显示与IP、TCP、UDP和ICMP协议相关的统计数据，一般用于检验本机各端口的网络连接情况
- `netstat -tunlp` l:listening   n:num   t:tcp  u:udp  p:process


## Create start.sh

`touch start.sh` 创建一个 shell 脚本

`chmod 755 start.sh` 赋予脚本可执行权限

`./start.sh` 或者将 start.sh 文件拖入 terminal 内来执行脚本


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
