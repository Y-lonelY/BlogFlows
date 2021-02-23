# Leetcode notes

## Tree

如何生成一个树节点？

```javascript
// 通过数组构建树时，通常通过 index 作为游标
function buildNode(index, nums) {
  // 判断终止条件
  if (index < nums.length - 2) return null
  // nums 为数组
  const root = new TreeNode(nums[index])
  // 递归点，这里书写赋值逻辑
  root.left = buildNode(index + 1)
  root.right = buildNode(index + 2)
}
```



中序遍历？

```javascript
const crt = []
// 遵循 left - root - right 的处理顺序，前序/后序类比
function inorder(node) {
  if (node === null) return null
  inorder(node.left)
  crt.push(node.val)
  inorder(node.right)
}
inorder(root)
```

