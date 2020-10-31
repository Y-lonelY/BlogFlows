# Python3 Common Packages

**快速索引**

- [PyMysql](https://pypi.org/project/PyMySQL/) 用来连接数据库的中间件
- [sys](https://docs.python.org/3/library/sys.html) 系统特定的参数和方法

**Solo with code✨**


## PyMysql

**Install**

在 terminal 内执行命令 `sudo pip3 install PyMysql`，安装 pymysql server

在 .py 中 `import pymysql` 即可

**基本用法**

**注意：一次只能执行一次插入/更新语句，不能一次执行多条**

```python
import pymysql

config = {
    'host': 'localhost',
    'port': 3306,
    'user': 'username',
    'passwd': 'password',
    'db': 'test',
    'charset': 'utf8'
}

# 数据库连接实例
# 通过添加cursorclass=pymysql.cursors.DictCursor配置将原本返回结果 tuple 转换为 dict 数据类型
conn = pymysql.connect(cursorclass=pymysql.cursors.DictCursor, **config)

# 游标实例
cursor = conn.cursor()

# 判断数据库是否连接成功
versionSql = "SELECT VERSION()"

# INSERT / REPLACE 语句需要 commit() 来提交事务，注意一次只能执行一次插入/更新语句，不能一次执行多条
cursor.commit()

# 执行 SQL 语句
cursor.execute(versionSql)

# 生成一个 tuple 迭代对象
data = cursor.fetchall()

# 关闭数据库连接
conn.close()
```

## sys

sys 能够解决：

1. 通过 `sys.argv` 在脚本内获取外部传递参数

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
wakatime scripts
"""

__author__ = 'Y-lonelY'

import sys

# 例如执行命令 python3 file.py yang 666
# 传递参数通过空格进行分隔
# 则会获取一个 list，其值为 ['file.py', 'yang', '666']
if __name__ == '__main__':
	name = sys.argv[1]
	label = sys.argv[2]
```