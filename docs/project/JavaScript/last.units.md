# Units

> JavaScript 工具类


## 元素轮廓线

在浏览器上为每个元素添加轮廓线

```javascript
function addEleOutline() {
    [].forEach.call($$("*"), function(a) {
        a.style.outline = "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
    });
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