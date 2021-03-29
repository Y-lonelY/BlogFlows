# NestJs

## Queues

参考[Queues](https://docs.nestjs.com/techniques/queues)，我从以下四个方面进行解读：

1. 什么是队列？
2. 为什么要用队列，队列能解决什么问题？
3. 用 redis 实现队列的优势？
4. 如何在 NestJs 内进行实践？

---

队列是一种强大的设计模式，能够帮助我们处理应用程序扩展和应对性能挑战。



### usages

下面提供一个快速入门的例子：

在 <b>app.module.ts</b> 内配置 redis

```typescript
import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'

@Module({
  imports: [BullModule.forRoot({
    redis: {
      host: REDIS_HOST,
      port: REDIS_PORT,
      password: REDIS_PASS,
    }
  })],
})
// ...
```

::: tip 注意
通常队列消费服务和写入队列服务分开部署
:::

在相应的业务模块内声明消费队列，以 `test.module.ts` 为例

```typescript
import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { TestConsumer } from './test.consumer'
import { TestService } from './test.service'
import { TestConsumer } from './test.consumer'

@Module({
  imports: [
    // 注册名为 test 的队列
    BullModule.registerQueue({
      name: 'test',
    }),
  ],
  providers: [TestService, TestConsumer],
})
// ...
```

通常写入队列的方法在 service 内定义：

```typescript
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'

@Injectable()
export class TestService {
  constructor(@InjectQueue('test') private testQueen: Queue) {}

  // 写入队列
  async postSentryQueue(data: { [index: string]: any }) {
    if (!data || Object.keys(data).length === 0) return
    await this.testQueen.add({ ...data })
  }
  // ...
}
```

消费队列模块，通常在 `test.consumer.ts` 内进行定义，注意一定要定义 `@Process()` 方法才能在其他监听事件内获取数据

```typescript
import {
  OnQueueCompleted,
  Processor,
  OnQueueActive,
  Process,
} from '@nestjs/bull'
import { Job } from 'bull'

@Processor('q_sentry')
export class SentryConsumer {

  @Process()
  async transData(job: Job<unknown>) {
    return job.data
  }

  @OnQueueCompleted()
  onQueueCompleted(job: Job, result: any) {
    console.log(result)
  }
}
// ...
```