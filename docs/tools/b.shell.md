# Shell

## Trivia

1. `$?` 获取上一步返回参数
2. 变量是一个键值对，直接访问变量名返回的是变量名，通过 `${变量名}` 访问其值
3. `ps` 列出系统内正在运行的进程
4. `kill [pid]` 关闭指定 pid 的进程


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

