<!-- MarkdownTOC -->

- [父选择器](#%E7%88%B6%E9%80%89%E6%8B%A9%E5%99%A8)
- [属性嵌套](#%E5%B1%9E%E6%80%A7%E5%B5%8C%E5%A5%97)
- [variable](#variable)

<!-- /MarkdownTOC -->


## 父选择器

`&` 父选择器，可理解为直接父元素所代表的字符串，例如

```scss
.main {
  &-sider: {
    color: #ef613e;
  }
}

<!-- 被转译为 -->

.main {
  .main-sider: {
    color: #ef613e;
  }
}
```

## 属性嵌套

一些 css 属性遵循相同的命名空间，scss 可以提取公共部分作为命名空间，例如 `font-size, font-weight`

```scss
.main {
  font: {
    size: '12px';
    weight: '600';
  }
}
```

## variable

通过 `$` 关键字来定义变量，例如 `$width: 12px`，变量支持 **块级作用域**，类似 ES6 的 `let, const`

在局部定义的变量可以通过 `!global` 来转换为全局变量