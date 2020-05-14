<!-- MarkdownTOC -->

- [sleep](#sleep)
- [元素轮廓线](#%E5%85%83%E7%B4%A0%E8%BD%AE%E5%BB%93%E7%BA%BF)
- [对象](#%E5%AF%B9%E8%B1%A1)
- [清空元素](#%E6%B8%85%E7%A9%BA%E5%85%83%E7%B4%A0)
- [数组的集合操作](#%E6%95%B0%E7%BB%84%E7%9A%84%E9%9B%86%E5%90%88%E6%93%8D%E4%BD%9C)
- [快速排序](#%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F)
- [处理url](#%E5%A4%84%E7%90%86url)

<!-- /MarkdownTOC -->

## sleep

执行等待

```js
function sleep(t) {
    var label = Date.now();

    while(Date.now() - label < t) {
        continue;
    }
}
```

## 元素轮廓线

在浏览器上为每个元素添加轮廓线

```javascript
function addEleOutline() {
    [].forEach.call($$("*"), function(a) {
        a.style.outline = "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
    });
}
```

## 对象

```js
/**
 * 判断是否为空对象
 * 可以通过 for in 判断
 * 也可以通过 object.keys().length 进行判断
 */
function isEmptyObject(obj) {
    for (let i in obj) {
        return false;
    }
    return true;
}
```


## 清空元素

类似 jquery 的 empty()

```javascript
function empty(ele) {
    while (ele.hasChildNodes()) {
        ele.removeChild(ele.firstChild);
    }
}
```


## 数组的集合操作

两个数组的交叉并补操作

```javascript
/** 求两个数组的交集，差集，并集，补集
 *  ES5方法
 *  实现原理：结合 Array.filter() && Array.concat() 实现
 */
function arraySetbyES5(arr1, arr2) {
    var params = {};
    // 交集
    var interSet = arr1.filter(function(v) {
        var label = arr2.indexOf(v) > -1;
        return label;
    });
    // 差集
    var diffSet = arr1.filter(function(v) {
        var label = arr2.indexOf(v) === -1;
        return label;
    });
    // 补集
    var comlSet1 = arr1.filter(function(v) {
        var label = !(arr2.indexOf(v) > -1);
        return label;
    });
    var comlSet2 = arr2.filter(function(v) {
        var label = !(arr1.indexOf(v) > -1);
        return label;
    });
    var compSet = comlSet1.concat(comlSet2);
    // 并集
    var unionSet = arr1.concat(arr2.filter(function(v) {
        var label = !(arr1.indexOf(v) > -1);
        return label;
    }));

    params['interSet'] = interSet;
    params['diffSet'] = diffSet;
    params['compSet'] = compSet;
    params['unionSet'] = unionSet;

    return params;
}
```

## 快速排序

```js
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    // 获取第一个变量，作为比较标记值
    var index = Math.floor(arr.length/2);
    var label = arr.splice(arr, 1);
    var left = [];
    var right = [];
    // 根据与 label 比较情况进行分组
    for (let i = 0; i < arr.length; i += 1) {
        const item = arr[i];
        if (label > item) {
            left.push(item);
        } else {
            right.push(item);
        }
    }
    return quickSort(left).concat(label, quickSort(right));
}
```

## 处理url

```js
/** 获取 url 里面的查询参数
 *  query - 查询参数对象
 *  hash - hash 值
 */
function getUrlParams() {
    let params = {};
    const urlStr = window.location;
    const hashStr = urlStr.hash; // #then-done
    const queryStr = urlStr.search; // ?query=test02

    params['query'] = {};
    params['hash'] = '';

    // deal query
    if (queryStr !== '') {
        let query = queryStr.split("?")[1];
        let queryArr = query.split("&");
        let queryObj = {};

        queryArr.forEach(function(item) {
            var q_key = item.split('=')[0];
            var q_val = item.split('=')[1];
            queryObj[q_key] = q_val;
        });

        params['query'] = queryObj;
    }

    // deal hash
    if (hashStr !== '') {
        const hash = decodeURI(hashStr);
        const oriHash = hashStr;
        params['hash'] = hash;
        params['oriHash'] = oriHash;
    }

    return params;
}
```