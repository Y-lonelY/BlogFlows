# Scenes Packages

> 记录开发过程中偏向于特定场景的第三方库

## vis-network

一个偏向于静态展示的[网络拓扑图库](https://visjs.github.io/vis-network/docs/network/)，一般结合其[vis-data](https://visjs.github.io/vis-data/data/index.html)一起使用，来进行数据管理

针对大数据量节点展示做的一些优化：

1. 加载前添加进度条展示；
2. 研究vis-physics模块，调整不同物理模型算法的不同参数，寻找渲染速度和效果的平衡点；
3. 取消edges的smooth过渡效果，采用物理过渡；
4. 取消布局优化措施；


## anime.js

一个动画库，在同一个页面内有多个anime对象进行展示时，会有不同程度的bug，后改为自己通过CSS3来keyframe和animation属性来实现

这里简单介绍一下其使用方法

```js
// code params
if (this.myAnimation) {
    this.myAnimation.restart()
}

var elements = document.querySelectorAll(".line .box")
this.myAnimation = anime({
  targets: elements,
  translateX: 120,
  backgroundColor: "#777",
  duration: 5000,
  loop: true,
  easing: "easeInOutQuad"
})
````
