# TypeScript

> 记录在实际开发过程中，TypeScript与其他语言结合使用的综合性问题

## Assets

[第三方typescript package 网站](https://microsoft.github.io/TypeSearch/)

[Redux With TypeScript官方文档](https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter)

## Questiones

### Import Module

> Error: This module is declared with using 'export =', and can only be used with a default import when using the 'esModuleInterop' flag.

描述：当前引入模块时通过CommonJS（即`export = `）来进行导出的，而不是使用默认导出，因此在使用 esModuleInterop 配置时，只能与默认导入一起使用

解决方案有两种：
1. 将类似 `import React from 'react';` 改写成 `import * as React from 'react';` 即可
2. 在 `tsconfig.js` 内设置 `"esModuleInterop": true`

> Warnings: Could not find a declaration file for module 'react-redux'. '/Users/yango/YlonelY-GrowingUp/react-app/node_modules/react-redux/lib/index.js' implicitly has an 'any' type.

描述：没有发现某个模块的声明文件，该模块文件被隐式转换为 any 类型

解决：
1. 对于第三方库，一般通过重新引入 `@types` 类文件解决，比如 `npm install @types/react-redux --save`
2. 对子自己声明的 js 文件，将文件后缀更改为 `.tsx`

> Property 'dashBoardData' does not exist on type '{}'.

描述：object 上不存在某个属性

解决：使用 any 语法，例如 `let obj = {} as any`

## Create My App

React 项目内引入 TypeScript

- 进入已经建立的 create my app 项目的根目录，执行 `npm install --save typescript @types/node @types/react @types/react-dom @types/jest` 向已存在项目内引入对应的 TypeScript
- 使用文件后缀 `.tsx`（替代 `.ts`, `.js`, `.jsx`）
- 在 `tsconfig.json` 配置文件的 `compilerOptions` 里设置选项 `"jsx": "react"`
- 启动项目，准备开始修正错误

### Config

项目内 tsconfig.json 配置

```json
{
    "compilerOptions": {
        // 指定 jsx 工作模式: 'preserve', 'react-native', or 'react'，影响的是编译策略
        // preserve 模式会在生成代码中保留 jsx
        // react 模式会直接编译成 React.createElement，输出文件格式为 js
        // react-native 模式会保留所有的 jsx，但是其输出文件格式为 js
        "jsx": "preserve",
        // 为运行时babel生态系统兼容性发出'__importStar'和'__importDefault'助手
        "esModuleInterop": true,
        "baseUrl": "./",
        // 模块名到基于 baseUrl 的路径映射的列表
        "paths": {
            "@/*":["src/*"],
        }
    },
    // 用来指定不需要编译的文件
    "exclude": [
        "node_modules"
    ]
}
```

### @types

可以使用类似 `@types/xxx` 来为指定模块 xxx 提供其包含的声明文件，其社区[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)定义了90%以上的 JavaScript 库

例如 `npm install --save @types/react-redux` 来安装 react-redux 的声明文件

安装完成之后，不需要特殊的配置，直接向之前一样进行引入即可，相当于为之前引入的package，添加一个 typescript 的验证文件，它们会放在 node_modules/@types 文件夹下，TypeScript 会自动从这里来获取模块内相关的类型定义，从而使用代码不全，接口提示等功能

如果第三方没有相应的 @types 文件，则需要自己来开发相应的声明文件，比如 `.d.ts` 文件，声明文件会被编辑器自动识别


## Component

对于有状态组件，需要 `props` 和 `state`，对于class写法的组件要泛型的支持，`Component<P, S>`，因此需要传入传入state和props的类型，通常用接口定义好 props 和 state 的数据及类型

```typescript
import * as React from 'react'

// 定义 props 使用的属性
interface Props {
    handleSubmit: (value: string) => void
}

// 定义 state 的属性
interface State {
    itemText: string
}

class TodoInput extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            itemText: ''
        }
    }
	// 大多数情况下，定义方法都是组件的私有方法，要添加 private 前缀
    private updateValue(value: string) {
        this.setState({ itemText: value })
    }
}

// 函数方法定义组件
const Header: React.FC<Props> = (props: Props) => (
  <h1>Hello, {props.name}! Welcome to React and TypeScript.</h1>
);

export { TodoInput }
```

## Redux

这里结合 Grow 项目对关键文件进行说明

**index.d.ts**用于定义好项目内类型声明，放在根目录的原因是放便全局引用，因此需要对文件内容添加清晰的注释，方便查询和模块化

```typescript
// redux
export interface StoreState{
    dailyList?: any[];
    sumMap?: {};
}

// DashBoard module declare
export interface DashBoardData {
    sumMap?: {};
    dailyList?: {}[];
}

// 用于各个模块的action.type类型检查
export enum DailyChartTypes {
    DAILYCHARTS = "dailycharts"
}
```

**reducer.tsx**文件，用来构建各个模块的 reducer，接受一个当前 state 和 action ,返回一个新的 state

```typescript
import { DailyChartTypes, ChangeChart, StoreState, DashBoardData } from '@/index.d.ts';

// default
let defaultState: DashBoardData = {
    dailyList: [],
    sumMap: {},
};

export const dashBoardData: (state: StoreState, action: ChangeChart) => StoreState = (state = defaultState, action) => {
    switch(action.type) {
        case DailyChartTypes.DAILYCHARTS:
            return {...state, ...{
                dailyList: action.dailyList,
                sumMap: action.sumMap
            }};
        default:
            return state;
    }
}
```

各个模块的**view.tsx**文件，关键是对 props 的验证和 redux.connect

```typescript
class DailyView extends React.Component<DashBoardProps> {
	// statements
}

// 建立 state.dashBoardData 和 this.props.dashBoardData 的对应关系
function mapStateToProps({ dashBoardData }: any) {
    return {
        dashBoardData,
    }
}

export default connect(mapStateToProps, {
    changeChart
})(DailyView);
```
