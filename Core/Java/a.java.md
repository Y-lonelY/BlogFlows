## basic

### cluster

1. 长整型 long，数据类型是 64 位、有符号的以二进制补码表示的整数，格式 `1L`

### JSONArray

1. 拼接数组

```java
JSONObject params = new JSONObject();
Joiner.on("`,`").join(params.keys());
```

### JSONObject

1. JSONObject fastjson 获取键值

```java
JSONObject params = new JSONObject();
// 获取 key list
params.keySet();
// 获取 value
params.values();
```

2. 将字符串类型转 JSONObject: `JSONObject paramsObj = JSON.parseObject(params);`

3. fastjson 遍历 JSONObject

```java
JSONObject params = new JSONObject();
for (Map.Entry<String, Object> entry : params.entrySet()) {
    // coding
    System.out.println(entry.getKey() + ":" + entry.getValue());
}
```

### String

1. 去除字符串最后一个字符 `str.substring(0,str.length()-1)`
