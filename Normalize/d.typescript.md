```typescript
// 对于 string, number, boolean, object 等基本类型要使用小写
function reverse(s: string): number;

// 返回值被忽略的回调函数设置void类型的返回值类型，因为这样做更加安全
function fn(x: () => void) {
    x();
}
```

接口命名采用 PascalCase 命名规范

在 `.ts` 文件内，导出模块

```typescript
// bad
enum Exercise {
	Belly = "belly"
}
export {Exercise}

// good
export Exercise {
	Belly = "belly"
}
```