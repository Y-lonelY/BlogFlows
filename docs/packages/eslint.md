# ESLint

eslint已经在 MVVM 项目被普遍使用，因此了解其在项目内配置和使用显得尤为重要

在项目根目录下:

- `touch .eslintignore` 来跳过指定文件的检查，类比 `.gitignore` 进行配置
- `touch .eslintrc` 进行 ESLint 配置

## Validate In Project


### Compiler

这里主要指通过 VS Code 来进行编译器的校验

添加 ESLint extension

在 VS Code 内集成 ESLint 的检查

`⌘ ⇧ P` 内搜索 setting，打开配置文件，完成配置后会自动检测

添加如下配置，对 .js, .jsx, .ts, .tsx 文件进行检测

```json
"eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescriptreact",
    "typescript"
],
```

### With TypeScript

TypeScript 文件添加 ESLint 检查，前面三步可以根据项目实际情况进行省略（比如 create-react-app 内已经集成了 eslint）

`npm install --save-dev eslint` 添加 ESLint

`npm install --save-dev eslint eslint-loader babel-loader babel-eslint eslint-plugin-react` 在 creat-react-app 内添加

- `eslint` is the core Javascript linter
- `eslint-loader` tells webpack that you want to use eslint in the project
- `babel-loader` transpiles(转换) our code with webpack
- `babel eslint` provides linting for valid ES6 code
- `eslint-plugin-react` extends ESLint rules to cover React

`touch .eslintrc` 新建一个配置文件 

`npm install --save-dev typescript @typescript-eslint/parser` 添加 typescript 检测规则

`npm install --save-dev @typescript-eslint/eslint-plugin` 添加 typescript 检测插件


### Commands

除了通过编辑器进行检测，也可以通过手动触发脚本来进行检测，在 package.json 内添加脚本，检测所有 .ts .tsx 后缀的文件

```json
{
  "scripts": {
    "eslint": "eslint src --ext .ts .tsx"
  }
}
```

## Config

**Where to config?**

在 Vue 项目内，其 `package.json` 文件内会有 eslintConfig 字段，可以更改其值来更新配置

也可以采用另一种方法，即在文件根目录下添加 `.eslintrc` 文件来修改配置

**注意**，如果使用 `.eslintrc.js`，则需要使用 `module.exports = {}` 来进行配置


### Some Rules

1. `no-unsafe-finally`：由于 JavaScript 会暂停 `try catch` 的工作流，直到 `finally` 语句执行完毕，因此如果在 `finally` 内包含 `return`, `throw`,
`break` 或者 `continue` 语句时会打断正常的工作流


### ESLint In React, inclueds .ts, .tsx, .js, .jsx

```js
/**
 * 0 - 禁用此规则   warn or 1 - 输出错误信息，不影响 exit code  error or 2 - 输出错误信息， exit code 置为 1
 * eslint-disable to disable the check
 */

{
  // eslint will stop looking in parent folders once finds a confirguration to avoid unexpected errors
  "root": true,
  "parserOptions": {
    // ES6 version
    "ecmaVersion": 2019,
    // if in ECMAScript modules
    "sourceType": "module",
    // 使用的解析器
    "parser": ["babel-eslint", "@typescript-eslint/parser"],
    // indicate other language features you'd like to use
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true
  },
  // import module recommand rules
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  // use pre-defined rules by plugins
  "plugins": [
    // means eslint-plugin-react
    "react",
    "@typescript-eslint"
  ],
  "rules": {
    // typescript-eslint
    // 不要显示使用 any
    "@typescript-eslint/no-explicit-any": 0,
    // 分隔符样式，none, Semicolon(分号), Comma(逗号)
    "@typescript-eslint/member-delimiter-style": 0,
    // 函数显示返回值
    "@typescript-eslint/explicit-function-return-type": 0,
    // tsx 文件不适用
    // "space-before-function-paren": 1,
    "quotes": [1, "single", "avoid-escape"],
    "semi": [2, "never"],
    "no-var": 2,
    "indent": [2, 2],
  },
  // 对某一类文件的配置进行覆盖
  "overrides": []
}
```