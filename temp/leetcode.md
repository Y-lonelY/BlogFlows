# Leetcode notes

## Tree

如何生成一个树节点？

```javascript
function buildNode(m) {
  // nums 为数组
  const root = new TreeNode(nums[m])
  root.left = buildNode(m + 1)
  root.right = buildNode(m + 2)
}
```

