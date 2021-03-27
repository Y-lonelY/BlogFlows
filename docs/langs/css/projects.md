# CSS Project's Q&A

### 自定义滚动条样式

webkit-scrollbar 样式优化，用来设置webkit内核浏览器的滚动条样式

```css
<!-- 设置整个滚动条的宽和高，高在横向滚动条的时候体现 -->
div::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
<!-- 滚动条轨道 -->
div::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}
<!-- 滚动条上的滚动滑块 -->
div::-webkit-scrollbar-thumb {
  background-color: #fafafa;
  -webkit-box-shadow: inset 0 0 6px #37474F;
  box-shadow: inset 0 0 6px #37474F;
  border-radius: 8px;
}
```