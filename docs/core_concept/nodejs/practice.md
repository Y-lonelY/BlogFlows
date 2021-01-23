# Practices



### 执行脚本

在 node 内执行脚本，通过 [child_process](http://nodejs.cn/api/child_process.html#child_process_child_process_execfile_file_args_options_callback) 来实现

看一下这个示例：

```javascript
// 需求：执行根目录下的 bash control.sh build 命令
build(params = 'build') {
  // 注意设置可执行路径，同时设置 control.sh 拥有最高权限
  const execPath = path.resolve(__dirname, '../../control.sh')
  execFile(execPath, [params], null, (err, stdout, stderr) => {
    console.log(err, stdout, stderr)
    if (err) return
  })
}
```



### 格式化时间

`time=$(date "+%Y%m%d-%H%M%S")` 将当前时间赋值到 time 变量，**特别注意 date 后面要加空格**

