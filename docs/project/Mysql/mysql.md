# MySQL

## mysqlbinlog revert

> mysqlbinlog 是 DB 附带的一个实用程序，用于处理 binary log 和 relay log.
结合 binlog 和 mysqlbinlog 可以进行一些回滚操作，能够恢复表结构之类的，但是好像对恢复数据支持一般

进入 mysql 环境，这里的目的是为了方便查看 log

- `show variables like '%bin_log%';` 查看 mysql 内 binlog 相关配置，包括位置等信息
- `show master status;` 查看当前 binlog 文件的状态
- `show binlog events in 'binlog.000336';` 查看指定文件的 log，在这里可以查看其 position id 

在 cmd 环境

- `mysqlbinlog --version` 查看当前版本
- `mysqlbinlog --start-position=124 --stop-position=24057 data/binlog.000336 | mysql -u root -p` 恢复指定 position id 之前的操作
- `mysqlbinlog --start-datetime="2020-07-03 13:18:54" --stop-datetime="2020-07-03 13:21:53" --database=zyyshop binlog.000002 | mysql -uroot -p` 恢复指定数据库和指定时间段内的数据