# React Advanced

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