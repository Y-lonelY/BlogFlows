# Application Scenarios


### 计算函数执行时间

一般来说，我们可以通过 `console.time(label) && console.timeEnd(label)` 来进行计算，但是在 nodejs 中，存在问题：即 label 必须是唯一的，如果一个接口被多次调用，则会产生不必要的警告

因此，在 nodejs 内提供了 [process.hrtime()](https://nodejs.org/api/process.html#process_process_hrtime_time) 来进行更精确的测量，它能够提供当前高精度的实时时间，通过差值计算方法的执行时间

<b>更推荐使用 `process.hrttime.bigint()` 来返回高精度的实时时间</b>



### 执行脚本

在 node 内执行脚本，通过 [child_process](http://nodejs.cn/api/child_process.html#child_process_child_process_execfile_file_args_options_callback) 来实现

示例：

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