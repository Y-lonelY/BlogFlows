# Nest Concept

> Nest 内一些重要的原理



### 依赖注入

将**依赖关系的实例化操作**委托给 IoC（控制反转技术）容器（可以理解为 nest 运行时系统），而不是自己去生成每个类的实例

我们从 nest 的三驾马车来说起

在 `Service` 内我们通过 `@Injectable` 装饰器将 `Service` 类标记为提供者

```typescript
import { Injectable } from '@nestjs/common'

@Injectable()
export class HooksService {
  sayHello(): string {
    return "success"
  }
}
```



