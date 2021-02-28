# Leetcode notes

## Base

### 递归

> 如果使用循环，程序的性能可能更高；如果使用递归，程序可能更容易理解。如何选择要看什么对你更重要。 
>
> --- Stack Overflow

编写递归函数时，必须告诉它何时停止递归，因此，递归函数通常包含两个部分：基线条件和递归条件

- 递归条件指函数调用自己
- 基线条件则指函数不再调用自己，从而避免形成无限循环

```python
def recursice(i):
  if i <= 0:
    return
  else:
    recursice(i - 1)
```



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

