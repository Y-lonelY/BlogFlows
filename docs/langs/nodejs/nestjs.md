# NestJs



## Cores

Nest 生命周期

<img src="../assets/nodejs/nest-lifecycle.jpg" alt="nest-lifecycle" />



## QA

### 解决 @Body() 解析为空的情况

在 nestJs 内，`@Body()` 无法解析 form、text/plain 等 <b>readable === true</b> 的内容类型，因此需要利用 buffer 来进行解析处理，核心代码如下：

```typescript
  @Post()
  postPerf(@Body() d: any, @Req() req: Request) {
    if (req.readable) {
      const buffer = []
      // 监听 onData 事件，将其写入 buffer
      req.on('data', (buff) => {
        buffer.push(buff)
      })
      // 数据上传结束，解析 buffer 对象
      req.on('end', () => {
        const crt = Buffer.concat(buffer).toString('utf-8')
        const data = JSON.parse(crt)
        console.log(data)
      })
    } else {
      // 直接通过 @Body() 方法解析
      console.log(d)
    }
    return success()
  }
```



## Queues

参考[Queues](https://docs.nestjs.com/techniques/queues)，我从以下四个方面进行解读：

1. 什么是队列？
2. 为什么要用队列，队列能解决什么问题？
3. 用 redis 实现队列的优势？
4. 如何在 NestJs 内进行实践？
5. 使用队列的注意点

---

队列是一种强大的设计模式，能够帮助我们处理应用程序扩展和应对性能挑战。这里介绍了三种场景：

1. 平滑削峰，比如，当客户端发起了一个资源密集型的操作，此时，你就可以将这些任务放到队列中，而不是直接同步处理。放在队列之后，可以启动一个进程在后台对其进行消费，并且可以根据任务消耗资源的程度，动态扩展消费进程！

2. 拆解大任务，防止执行该任务阻塞 NodeJs 的事件循环。如果客户端请求需要 CPU 密集型的任务，比如音视频转码，此时可以用其他进程来处理该任务，用户交互仍然能够正常进行。

3. 提供跨各种服务的可靠通信渠道。最常见的，就是在一个服务内将任务写入队列，在另一个服务进行消费，通过监听任务在队列中的生命周期事件来实现。<b>当队列的生产者或者消费者处理失败时，任务的状态会被保留，当节点重启时，队列服务也会自动重启！</b>

---

通用的队列库 [Bull](https://github.com/OptimalBits/bull) 基于 Redis 实现。带来的好处就是：我们的队列架构能够是完全分布式和平台独立的，<b>这意味这我们可以在多个节点上分别部署 Producer、Listener 和 Consumers。</b>

### usages

安装

```shell
npm i --save @nestjs/bull bull
npm i -D @types/bull
```

下面提供一个快速入门的例子，注意：

- 在根 module 内注册 Redis
- 在业务 module 内注册队列
- 在业务 controller 内生产 task
- 在消费服务内对队列 task 进行消费

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
    await this.testQueen.add(
      { ...data },
      {
        // 默认会保存 job 在 completed 或者 failed set 内，通过设置以下参数不再存储
        removeOnComplete: true,
        removeOnFail: true,
        // 设置多少毫秒后任务失败
        timeout: 300 * 1000,
      }
    )
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

### QA

#### 写入队列

在使用 `@nest/bull` 时，注意对于不需要存储的数据及时进行清理，参考 [reference-add](https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueadd) 进行了解

下面提供一个简单例子：

```typescript
// 写入队列
async postSentryQueue(data: { [index: string]: any }) {
  if (!data || Object.keys(data).length === 0) return
  await this.testQueen.add({ ...data }, {
    // 默认会保存 job 在 completed 或者 failed set 内，通过设置以下参数不再存储
    removeOnComplete: true,
    removeOnFail: true,
    // 设置多少毫秒后任务失败
    timeout: 300 * 1000
  })
}
```

#### 清除指定队列

如果在写入队列时没有设置相应配置，可能会造成队列不断堆积，导致 Redis 不断扩容，因此，这里提供方法来清理指定队列

参考 [clean](https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueclean) 进行理解

```typescript
// ...
clearQueue() {
  return Promise.all([
    this.sentryQueen.clean(100, 'completed'),
    this.sentryQueen.clean(100, 'failed')
  ])
}
```
