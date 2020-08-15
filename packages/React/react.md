<!-- MarkdownTOC -->

- [Node-Sass 安装问题](#node-sass-%E5%AE%89%E8%A3%85%E9%97%AE%E9%A2%98)
    - [配置淘宝镜像源](#%E9%85%8D%E7%BD%AE%E6%B7%98%E5%AE%9D%E9%95%9C%E5%83%8F%E6%BA%90)
- [Create React App](#create-react-app)
    - [Travia](#travia)
    - [Install && Update](#install--update)
    - [Config](#config)
    - [File Structure](#file-structure)
    - [style && assets](#style--assets)
- [Antd](#antd)
    - [表单综合使用](#%E8%A1%A8%E5%8D%95%E7%BB%BC%E5%90%88%E4%BD%BF%E7%94%A8)
        - [Form.Item 剖析](#formitem-%E5%89%96%E6%9E%90)
- [Bizcharts](#bizcharts)
    - [scale](#scale)
- [React Hot Loader](#react-hot-loader)
    - [Use In App](#use-in-app)

<!-- /MarkdownTOC -->

> Record React Materials In Project

## Node-Sass 安装问题

clone 一个 react 项目后，在执行 `npm install` 之后，发现 node-sass 安装出现问题，原因是无法自动下载相应的文件

解决办法：

- 注意要先将之前安装的错误的 node-sass 进行删除
- 在错误日志内查看需要的版本，在[官网](https://github.com/sass/node-sass/releases)下载相应的版本
- 将下载文件放在nodejs的根目录下
- 进入项目根目录，设置 sass 路径，`set SASS_BINARY_PATH=[file path]`
- 继续执行 `sudo npm i node-sass -D -verbose` 即可


### 配置淘宝镜像源

```shell
npm install -g mirror-config-china --registry=http://registry.npm.taobao.org
npm install node-sass
```







## Antd

> antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品

### 表单综合使用

表单是频繁使用的一个控件，有一定复杂度，这里直接介绍结合 TypeScript 使用

```js
import React from 'react';
import { Form, Input } from 'antd';
// 注意引入才能使用 this.props.form
import { FormComponentProps } from 'antd/es/form';

// 继承接口，实现 form 的继承
interface DrawerViewProps extends FormComponentProps {
    type: string;
}

class DrawerForm extends React.Component<DrawerViewProps, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        const type = this.props.type;
        /**
         * 常用方法
         * getFieldDecorator 用来对原组件进行包装，表单控件自动添加 value, onChange，数据同步不再单独维护，统一由 Form 组件接管 
         * resetFields 通常重新渲染列表时，或者每次重新打开表单内容时调用，否则会遗留上次的填写内容
         * validateFields 提交表单时，用于获取所有的表单键值对
         */
        const { getFieldDecorator, resetFields, validateFields } = this.props.form;
        return (
            <div className={this.props.className}>
                <Form.Item>
                    {getFieldDecorator('title', {
                        rules: [{
                            required: true,
                            message: 'title is required!'
                        }]
                    })(<Input placeholder='title' />)
                </Form.Item>
            </div>
        );
    }
}

// 通过 Form.create 生成一个 form 实例，其 name 属性为 drawerForm
const DrawerView = Form.create<DrawerViewProps>({
    name: 'drawerForm',
})(DrawerForm);

export default DrawerView;
```

#### Form.Item 剖析

多个 `Form.Item` 需要用一个根元素进行包裹

```js
normalizeFunc = (value, preValue) => {
	console.log(value, preValue);
	return value;
}

/**
 * label 用来描述
 * labelCol label 占位，类似 Col，可以设置 span 和 offset
 * wrapperCol 控件的占位
 */
<Form.Item label='title' labelCol={{ span: 4 }} wrapperCol: {{ span: 20 }}>
	/**
	 * id 为必填项，例如 'title'
	 * initialValue 设置初始值
	 * rules 为一个 object[]，为输入值添加校验规则
	 * normalize 为一个function，用来更改返回值，比如“全选”的逻辑
	 * valuePropName: 'checked', 例如 Switch 组件其值不是放在 value 字段内，此时就需要用该属性来进行指定
	 */
    {getFieldDecorator('title', {
        rules: [{
            required: true,
            message: 'title is required!'
        }],
        initialValue: 'hello',
        normalize: normalizeFunc
    })(<Input placeholder='title' />)
</Form.Item>
```


## Bizcharts

### scale

```js
const scale = {
	// 针对 date 数据列
    date: {
        // 数据类型，非连续的时间类型
        type: 'cat',
        /**
         * range 用来控制坐标轴两边的留白
         * 对于分类数据的坐标轴两边默认会有留白
         * 连续数据的坐标轴的两端没有空白刻度
         * 留白程度通过 range 来控制
         */
        range: [0.1, 0.9]
    }
};
```

## React Hot Loader

> React Hot Loader is a plugin that allows React components to be live reloaded without the loss of state

[React-hot-loader](https://github.com/gaearon/react-hot-loader) 是一个插件，允许 React 组件在不丢失状态的条件下进行实时重新加载操作

webpack-dev-server 也实现了热加载，但是是在代码改动后，经过重新打包，进而重新刷新整个页面

不同于 webpack-dev-server，react-hot-loader 不会刷新整个页面，它只替换修改的代码，进而做到了页面的局部刷新，其需要依赖 webpack 的 HotModuleReplacement 热加载插件

### Use In App

1. `npm install react-hot-loader --save` 引入 react-hot-loader
2. 配置 .babelrc 文件，启用相关插件，在 create react app 且 `npm run eject` 之后，可以直接在 package.json 内进行 babel 相关配置

```json
"babel": {
	"presets": [
	  "react-app"
	],
	"plugins": [
	  "react-hot-loader/babel"
	]
},
```

3. webpack 进行相关文件配置，用来保证 react-hot-loader 在引入 `react` 和 `react-dom` 之前加载

```javascript
// webpackDevServer.config.js
module.exports = function(proxy, allowedHost) {
	return {
		hot: true
	}
}

// webpack.config.js
entry: [
	'react-hot-loader/patch',
]
```

4. 在项目文件内使用

```javascript
// App.js
import { hot } from 'react-hot-loader/root';
const App = () => <div>Hello World!</div>;
export default hot(App);
```