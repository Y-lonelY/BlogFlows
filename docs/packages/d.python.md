# Python3

## PyMysql

::: tip
用来连接数据库的中间件
:::

**Install**

在 terminal 内执行命令 `sudo pip3 install PyMysql`，安装 pymysql server

在 .py 中 `import pymysql` 即可

### 基本用法

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