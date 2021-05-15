# React Advanced

## HOC

HOC 表示高阶组件，是基于 React 的组合特性而形成的设计模式，是一种对组件的抽象

- 高阶组件是参数为组件，返回值为新组件的函数
- 可以类比函数式编程，其接受一个组件，返回一个新组件
- 通过函数进行封装，实现对组件的抽象
- HOC不会修改原组件，它会返回一个新组件，所以HOC是一个纯函数，没有副作用

回想一下，在项目内什么地方有用到过高阶组件？

- Redux 的 `connect(mapStateToProps, mapDispatchToProps)(FocusView)` 就是一个典型例子，`connect(mapStateToProps, mapDispatchToProps)` 返回一个 enhance 方法，然后将 FocusView 组件作为参数进行传递，最后获得一个新的组件
- react-router 的 `withRouter(FlowHeader)` 为 props 添加了 history 属性
- 再进一步想想，如果不使用 `PureComponent`，可以使用高阶组件来为每个组件添加 `shouldComponentUpdate()` 方法

ok，看一个HOC的例子

```js
// test.js
import React from 'react';

export function enhance(WrappedComponent) {
    return class extends React.PureComponent<{ name: string }, {}> {
        static getDerivedStateFromProps(props, state) {
            console.log(props);
            console.log(state);
        }
        // 根据官方文档约定，不要将多余的 props 进行传递
        render() {
          // 过滤掉非此 HOC 额外的 props，且不要进行透传
          const { extraProp, ...passThroughProps } = this.props;

          // 将 props 注入到被包装的组件中。
          // 通常为 state 的值或者实例方法。
          const injectedProp = someStateOrInstanceMethod;

          // 将 props 传递给被包装组件
          return (
            <WrappedComponent
              injectedProp={injectedProp}
              {...passThroughProps}
            />
          );
        }
    }
}


export class Test extends React.PureComponent<{ name: string }, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>{this.props.name}</div>
        );
    }
}
```

在该组件内，使用HOC

```js
import React from 'react';
import { Test, enhance } from '@/view/Homepage/Focus/test';

// 通过使用HOC，在每次 render 之前，都会打印当前的 props 和 state
const EnhanceTest = enhance(Test);
class FocusView extends React.PureComponent<focusProps, focusState>{
    render() {
        return (
            <Test name='hello' />
        );
    }
}
```

重新再看看 redux 的 connect 函数，`const ConnectedComment = connect(mapStateToProps, mapDispatchToProps)(CommentList);`，实际上它进行了函数柯里化

- `const enhance = connect(mapStateToProps, mapDispatchToProps);` connect 是一个函数，它的返回值为另外一个函数
- `const ConnectedComment = enhance(CommentList);` 返回值为 HOC，它会返回已经连接 Redux store 的组件
- 这样可以利用函数的优势，即通过自由组合来最大化利用

一些注意的地方：

- 不要在 `render()` 方法内使用HOC，因为HOC会返回一个新的组件，根据 diff 算法，每次render都会将其卸载再加载，一方面会有性能问题，更重要的是会丢失组件和其子组件的状态
- 可以将其放在 class 声明外，在极少数情况下，你需要动态调用 HOC。你可以在组件的生命周期方法或其构造函数中进行调用
- 如果原组件有静态方法，则必须将静态方法也进行挂载，如果知道有哪些静态方法，则可以直接挂载，更好的是通过react提供的 ` hoist-non-react-statics ` 来拷贝所有的静态方法

```js
import hoistNonReactStatic from 'hoist-non-react-statics';

function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
}
```

## Ref

### 总结

Ref 可以理解为将DOM元素或者组件实例单独拿出来进行管理，官网上给出了适合使用的时机：

- 管理焦点，文本选择或媒体播放，即一些需要操作dom去完成的事件
- 触发强制动画
- 集成第三方 DOM 库

注意，**避免使用 refs 来做任何可以通过声明式实现来完成的事情**，特别是在使用过程中，结合 typescript 特别麻烦，要根据不同的 ref 使用情况来声明不同的检测方法

Ref 在生命周期内的使用：

- React 在组件卸载时传入 null 值，即 `componentWillUnmount()` 时会将 this.myRef.current 置为 null 来进行垃圾回收
- ref 会在 componentDidMount 或 componentDidUpdate 生命周期钩子触发前更新，这意味着可以在 componentDidMount 和 componentDidUpdate 声明周期函数内获取到 this.myRef.current 的值

Ref 相关的 api:

- `this.myRef = React.createRef()` 创建一个 ref
- `ref={this.myRef}` 将 myRef 挂载到指定元素/组件实例上，建立联系
- `forwardRef((props, ref) => {})` 来将父组件ref和子组件内的dom/组件实例建立联系


### 探索过程

思考一个问题，如果一个输入框需要在渲染完成后，自动获取焦点（参看 antd api 文档，并没有自动获取焦点的介绍），怎么做？

第一个思路，就是通过 `document.querySelect()` 来获取dom元素，再为其触发 `focus()` 事件，这个操作在`render()`执行完之后，即在 `componentDidMount()` 和 `componentDidUpdate()` 生命周期内执行

```js
class Test extends React.PureComponent {
    render() {
        return (
            <input type="text" className='title' />
        );
    }

    componentDidMount() {
        let node = document.querySelector('.title') as HTMLInputElement;
        node.focus();
    }
}
```

第二个思路，通过react提供的 Refs 来执行，这里记录一个真实的案例，有一个表单放在 antd 的 drawer 内，通过点击事件来更改其展示类型，现在通过 ref 方式来为第一个 Input 添加聚焦
- 在 `constructor()` 方法内创建一个 Refs，并挂载到 `this.myRef` 上，将其分发给实例属性，方便在整个组件内都可以使用
- 在指定元素内通过 `ref` 属性来建立 `this.myRef` 和指定元素之间的关系
- 访问 myRef 属性，通过 `this.myRef.current` 来访问 ref 的元素，通常要进行 null 判断
- `this.myRef.current` 会根据 ref 挂载的节点类型的不同而发生改变，当 ref 属性用于HTML元素时，其current值为其底层DOM元素，当 ref 属性为自定义组件（即自定义类型时），其 current 指向该类型的实例对象，相当于完成了一次子组件向父组件的通信
- 你不能在函数组件上使用 ref 属性，因为他们没有实例，但是可以在函数组件内部使用

```js
import React from 'react';

class DrawerForm extends React.PureComponent<DrawerViewProps, DrawerViewState> {
    /**
     * ts 声明 myRef 类型，要注意在 ts 内 ref 的声明方法，放在其生命周期函数外面
     * 这里其范性内存放 antd 的 Input 类型，如果是自定义的组件，这里存放自定义的 class 声明
     */
    myRef: React.RefObject<Input> | null;
    constructor(props) {
        this.myRef = React.createRef();
    }

    render() {
        return (<Input ref={this.myRef} size='small' />);
    }

    componentDidMount() {
        // 执行一些负操作，会导致组件重新渲染，因此将mount阶段的聚焦放在异步事件内
        setTimeout(() => {
            if (this.myRef.current !== null) {
                this.myRef.current.focus();
            }
        }, 0);
    }

    componentDidUpdate(prevProps) {
        // 组件更新之后重新聚焦
        if (this.myRef.current !== null) {
            this.myRef.current.focus();
        }
    }

    componentWillUnmount() {
        console.log('componentWillUnmount', this.myRef); // 此时 this.myRef.current === null
    }
}
```

ok，这里我们已经可以在父组件内通过 ref 拿到dom节点和子组件的实例对象了，进一步思考一个问题，如果在父组件内需要拿到子组件内的dom节点，应该怎么做？

第一个想法是在子组件内通过ref获取指定dom节点，然后将其传递给父组件，react 提供了一个更加直接的办法，即 ref转发
- 子组件通过 React.forwardRef(props, ref) 来接收父组件传值
- 子组件将接收的 ref 挂载到需要solo的节点

```js
// 父组件
import React from 'react';
import Child from './child';

class DrawerForm extends React.PureComponent<DrawerViewProps, DrawerViewState> {
    // 因为 ref 在通过 forwardRef 转发之后实际挂载在 div 节点上，所以此时 ts 类型声明为 HTMLDivElement
    myRef: React.RefObject<HTMLDivElement> | null;
    constructor(props) {
        this.myRef = React.createRef();
    }

    render() {
        return (<Child ref={this.myRef} name='hello' />);
    }

    componentDidMount() {
        console.log(this.myRef.current); // 子组件 div 节点
    }
}

// 子组件
export const Child = React.forwardRef((props: {name: string}, ref: React.RefObject<HTMLDivElement> | null) => {
    return (
        <div ref={ref}>{props.name}</div>
    );
})
```


## Context

> Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法

思考一个场景，实现系统的主题切换：

1. 类似 iOS13 theme 的实现，通过配置 json 文件来管理不同主题的资源，封装一个 theme 类，在各个模块通过引入该类，使用类的成员变量，会有一个问题，就是更换主题之后需要重新加载页面才能够应用新的主题样式

2. 参考[notepad++](https://notepad-plus-plus.org/) 结合 css filter invert 属性来改变颜色，问题就是颜色切换不够灵活

3. 在 react 项目中，可以通过传递 props 来在各个组件内通过 props.theme 属性进行控制各个组件的展示，理论上可以实现，但是会造成各个组件都需要传递 props

4. 通过类似 redux 的状态管理库来管理共享状态

同时，React 提供 context 来解决此类问题：Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props

更具体一点解释就是：有的时候在组件树中很多不同层级的组件需要访问同样的一批数据。Context 能让你将这些数据向组件树下所有的组件进行“广播”，所有的组件都能访问到这些数据，也能访问到后续的数据更新

注意：Context 主要应用场景在于很多不同层级的组件需要访问同样一些的数据。请谨慎使用，因为这会使得组件的复用性变差。如果只是较少的组件需要用到公共数据，可以通过**组合组件**的方式来渲染

所谓组合组件，直观的理解就是将某个需要用到公共元素的组件封装起来，在高层组件内进行引入，并且通过 props 属性将其进行传递

首先封装一个 context 组件，用于在需要用到的组件内引入，Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树

```js
import React from 'react';
import { locale as customizeLocale } from '@/assets/locale';

/**
 * 为当前的 locale 创建一个 context，其值为一个 object，包含三个值
 * 当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值
 */
export const LocaleContext = React.createContext({
	// 当前语言
    locale: 'zh_cn',
    // 语言物料
    assets: customizeLocale.zh_cn,
    // 切换语言方法
    toggleLocale: () => {
        console.log('language checked!');
    }
});
```

之后，通过 LocaleContext.Provider 接受一个 state，将其传递给消费组件

```js
import React from 'react';
// 国际化
import { LocaleContext } from '@/cluster/context';
import { locale as customizeLocale } from '@/assets/locale';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locale: 'en_us',
            assets: customizeLocale.en_us,
            toggleLocale: this.toggleLocal,
        };
    }

    toggleLocal = (lang) => {
        this.setState({
            locale: lang,
            assets: customizeLocale[lang]
        });
    }

    render() {
        return (
        	/**
		     * Provider 接收一个 value 属性，传递给消费组件
		     * 无论多深，任何组件都能读取这个值，在这个例子中，将 this.state 作为当前的值传递下去
		     * 当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染
		     * 使用 Object.is 方法来进行新旧值对比，注意，如果是 value 的值为 object，则将其放在 this.state 内进行管理
		     */
            <LocaleContext.Provider value={this.state}>
                    <div className={`homeBox ${systemConfig.hugeScreen ? 'max' : 'mac'}`}>
					// statement
                    </div>
            </LocaleContext.Provider>
        )
    }
}

export default App;
```

最后，就是如何在组件内使用该 context，对于函数式组件和class组件，使用的方法会有所区别

```js
/**
 * class 组件通过 static contextType = LocaleContext 来引入 context
 * 使用 static 这个类属性来初始化你的 contextType，指定 contextType 读取当前的 context
 * React 会往上找到最近的 theme Provider，然后通过 this.context 使用它的值
 */
import { LocaleContext } from '@/cluster/context';
class ThemedButton extends React.Component {
  static contextType = LocaleContext;
  render() {
    return <Button theme={this.context} />;
  }
}

/**
 * 对于函数式组件通过 LocaleContext.Consumer 来获取 context 值
 */
export function Header(props) {
    return (
        <LocaleContext.Consumer>
            {/* value 在这里代表 this.context，也可以对其进行解构获取值 */}
            {({assets}) =>
                <Row className='module-header' type='flex' justify='space-between'>
                	// statement
                </Row>
            }
        </LocaleContext.Consumer>
    );
}
```


## fragments

通过 `React.Fragments` 来将子元素列表添加到一个分组内，且不会添加额外的 dom节点（一般组件需要封装在一个 div 元素内） 

在表格各组渲染中比较实用，目前仅支持 `key` 一种属性

动机来源：

- 在一个组件内返回一个子元素列表是一种很常见的模式
- 子组件往往需要封装在 div 元素内
- 但是在某些情况下加入 div 元素会产生错误，比如 table 标签内添加

语法：

```js
function childList(props) {
    return (
        <dl>
            {props.list.map(item => {
                <React.Fragment key={item.id}>
                    <dt>{item.name}</dt>
                    <dd>{item.label}</dd>
                </React.Fragment>
                })
            }
        </dl>
    )
}
```