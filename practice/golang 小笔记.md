# Golang 小笔记



## Double quotes && Single quotes

双引号(`double quotes`) 用来定义一个字符串，并且支持转义字符，比如 `var a = "hello \n ylonely"`

这里着重说下单引号(`single quotes`)，它用来定义一个 `rune` 或者 `byte` 类型，如果不指定，则默认为 `rune` 类型

一个单引号内只允许有一个字符，如果超过了，编译器会报错

```go
// Too many characters in rune literal
a := 'abc'

// 利用单引号计算字符出现的次数，将 a-z 的字符对应成数字
arr := [26]int{}
for _,char := range a {
  arr[char-'a']++
}

// 将 0-25 的数字对应成 a-z 的字符
i := byte(0)
char = string('a'+i)

```



