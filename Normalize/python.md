# Python3

> python3 编码规范

## Basic

选择四个空格的缩进，不要使用 Tab，更不要混用 Tab 和空格

每行字符限制在 79 个以内

函数形参通过逗号分隔，逗号后面跟一个空格，运算符两端添加空格，# 注释后面跟一个空格

命名规范：

- 变量使用小写，通过下划线串联，例如 `origin_name`
- 在迭代内可以使用单字符
- 常量使用全部大写，通过下划线串联，例如 `WAIT_TIME`
- 函数名和变量一样
- 类型遵循 camel 命名规范

函数遵循一个函数仅处理一个事务作为原则

类中很多属性可以抽出相同的特性单独作为类

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

'normalize scripts'

__author__ = 'Y-lonelY'


# 全局的类和函数需要两个空行隔开，类的函数之间需要一个空行隔开
class Normalize(object):
	"""一句话简单介绍类
	详细解释
	Arguments:
		参数列表
		name: balabal
	Input shape:
		参数格式
	Output shape:
		返回值格式
	"""
	# 定义基本属性
	age = 0
	# 定义私有属性，私有属性在外部无法直接访问
	__api = '123'
	def __init__(self, name):
		self.origin_name = name

# map 类型键名为字符串
params = {
    'start': self.start,
    'end': self.end,
    'cache': self.cache,
    'api_key': self.__api_key
}

if __name__ == "__main__":
	# statements

```



