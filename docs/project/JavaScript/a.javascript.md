# JavaScript

> 用来记录在使用JavaScript进行实际开发过程中遇到的综合性较强的问题

## 函数节流与防抖

**underscore函数节流**

1. 通过判断两次调用函数的时间戳，根据时间间隔来判断是否执行
2. 设置定时器，如果当前缓存存在该定时器，则不执行函数；否则执行该函数并设置新的定时器

```javascript
// `{trailing: false}` 禁用最后一次执行
// `{leading: false}` 禁用第一次执行
var throttled = _.throttle(updatePosition, 100, {trailing: false});
```

## 全屏切换

用代码实现类似 F11 效果

```javascript
  //切换全屏效果
  toggleFullScreen = function(element) {
    //判断是否为全屏模式
    if (!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)) {
      //进入全屏模式，分别为W3C标准，谷歌，火狐，IE
      if (element.requestFullscreen) {
          element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
      }
    } else {
      //退出全屏模式
      if (document.exitFullscreen) {
          document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
      }
    }
  },
  troggleScreen = function() {
      //document.documentElement 为整个页面的元素
      toggleFullScreen(document.documentElement);
  },
```