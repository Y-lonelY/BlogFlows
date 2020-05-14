<!-- MarkdownTOC -->

- [SQL Language](#sql-language)
- [两个表关联查询](#%E4%B8%A4%E4%B8%AA%E8%A1%A8%E5%85%B3%E8%81%94%E6%9F%A5%E8%AF%A2)
- [limit](#limit)

<!-- /MarkdownTOC -->

## SQL Language

`BETWEEN` 关键字来筛选时间范围

`ORDER BY statement DESC` 倒序排列，正序 ASC

```sql
SELECT
	id,
	date,
	`leg-nums` AS leg,
	`belly-nums` AS belly,
	`chest-nums` AS chest 
FROM
	`gro-up`.exc_daily
WHERE date BETWEEN '2019-10-01' AND '2019-10-31'
ORDER BY date DESC 
```

INSERT INTO VALUES 用来插入数据

```sql
INSERT INTO exc_daily ( date, `leg-nums`, `belly-nums`, `chest-nums` )
VALUES
	( '2019-10-09', 50, 40, 40 )
```

查看系统时区

```sql
SHOW VARIABLES LIKE '%time_zone%'
```

## 两个表关联查询

假设存在表1内的 group字段存储的是表2的id，查询时需要取出表2 id字段对应的 name字段进行展示

```sql
SELECT
	t1.id,
	t1.details,
	t1.`group`,
	t2.`name` 
FROM
	trivia t1,
	trivia_group t2 
WHERE
	t1.`group` = t2.id
```

## limit

> limit子句用于限制查询结果返回的数量，常用于分页查询

通过两个参数进行控制，索引值和返回数量，可以类比js `substr(i, n)` 方法

```sql
# 查询8条数据，索引从5到12，第6条记录到第13条记录
select * from t_user limit 5,8;

# 相当于 limit 0,5 从第1条记录到第5条记录
select * from t_user limit 5;
```