/**
 * 规范：
 * 模块内容大于三个支持关闭
 */

module.exports = {
  // 页面 title 类似 logo 角色
  title: "YlonelY's Blog",
  description: 'Solo with code, just have fun!',
  head: [
    // logo
    ['link', { rel: 'icon', href: '/logo.ico' }],
  ],
  // base: '/blog/',
  port: 7727,
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    // github 地址
    repo: 'https://github.com/Y-lonelY',
    // 标题栏导航
    nav: require('./nav.js'),
    // 文档根目录
    docsDir: 'docs',
    lastUpdated: 'Last updated at',
    sidebar: {
      '/practice_packages/': setPackages(),
      '/core/': getCoreSide(),
      // '/practice/': practice(),
      '/project/': getProjectSide(),
      '/packages/': getPackagesSide(),
      '/normalize/': getNormalizeSide('Normalize'),
      '/concept/': getConceptSide(),
      '/tools/': getToolsSide(),
      '/books/': setBooks(),
    },
  },
}

function setPackages() {
  return [
    '',
    {
      title: 'JavaScript',
      collapsable: false,
      children: ["javascript/common"]
    },
    {
      title: 'React',
      collapsable: false,
      children: ["react/common", 'react/react-router', 'react/state-container']
    }
  ]
}

function setBooks() {
  return [
    '/books/',
    {
      title: 'Frontend',
      collapsable: false,
      children: ['前端架构--从入门到微前端', 'Go语言开发实战'],
    },
  ]
}

function practice() {
  return [
    '/practice/',
    {
      title: 'practice',
      collapsable: false,
      children: [
        'React-Error-Catcher',
        'GROWTH性能优化实践',
        '布局方式的实践',
        '理解一下this',
        '谈谈Vue和React',
      ],
    },
  ]
}

function getToolsSide() {
  return [
    '/tools/',
    {
      title: 'Muscle',
      collapsable: false,
      children: [
        'muscle/babel',
        'muscle/shell',
        'muscle/nginx',
        'muscle/macos',
      ],
    },
    {
      title: 'Skeleton',
      collapsable: true,
      children: [
        'skeleton/chrome',
        'skeleton/cloud',
        'skeleton/macos',
        'skeleton/vscode',
        'skeleton/windows',
        'skeleton/xcode',
      ],
    },
  ]
}

function getNormalizeSide(groupA) {
  return [
    '/normalize/',
    {
      title: groupA,
      collapsable: false,
      children: ['css', 'git'],
    },
  ]
}

function getPackagesSide() {
  return [
    '/packages/',
    {
      title: 'Packages',
      collapsable: false,
      children: [
        'React/react',
        'React/redux',
        'React/antd-pro',
        'React/react-router',
        'Scenes/a.monitor',
        'Vue/vue',
        'Vue/vuex',
        'Vue/ui-frame',
        'a.cluster',
        'c.swift',
        'd.python',
        'e.node',
        'eslint',
      ],
    },
  ]
}

function getConceptSide() {
  return [
    '/concept/',
    {
      title: 'FE-Concept',
      collapsable: false,
      children: [
        'frontend/javascript',
        'frontend/react',
        'frontend/module',
        'frontend/node',
        'frontend/mvvm',
      ],
    },
    {
      title: 'LF-Concept',
      collapsable: false,
      children: ['network', 'css'],
    },
  ]
}

function getProjectSide() {
  return [
    '/project/',
    {
      title: 'JavaScript',
      // 表示不会关闭
      collapsable: true,
      children: [
        'JavaScript/a.javascript',
        'JavaScript/b.jquery',
        'JavaScript/last.units',
      ],
    },
    {
      title: 'Css',
      collapsable: false,
      children: ['Css/a.cluster'],
    },
    {
      title: 'MySQL',
      collapsable: false,
      children: ['Mysql/mysql'],
    },
    {
      title: 'Git',
      collapsable: false,
      children: ['Git/git'],
    },
    {
      title: 'TypeScript',
      collapsable: false,
      children: ['TypeScript/a.typescript'],
    },
    {
      title: 'HTML5',
      collapsable: false,
      children: ['HTML5/a.html5'],
    },
    {
      title: 'Swift',
      collapsable: false,
      children: ['Swift/a.cluster', 'Swift/b.matters'],
    },
  ]
}

function getCoreSide() {
  return [
    '/core/',
    {
      title: 'TypeScript',
      collapsable: false,
      children: ['TypeScript/basic'],
    },
    {
      title: 'JavaScript',
      // 表示不会关闭
      collapsable: false,
      children: [
        'javascript/javascript',
        'javascript/esx',
        'javascript/typescript',
        'javascript/array',
      ],
    },
    {
      title: 'React',
      // 表示不会关闭
      collapsable: false,
      children: ['React/a.basic', 'React/b.advanced', 'React/hook'],
    },
    {
      title: 'Vue',
      // 表示不会关闭
      collapsable: false,
      children: ['Vue/a.basic', 'Vue/b.advanced'],
    },
    {
      title: 'HTML5',
      // 表示不会关闭
      collapsable: false,
      children: ['HTML5/basic', 'HTML5/elements'],
    },
    {
      title: 'Swift4.x',
      collapsable: false,
      children: ['Swift/a.swift', 'Swift/b.component'],
    },
    {
      title: 'Python3',
      collapsable: false,
      children: ['Python3/a.basic', 'Python3/b.advanced'],
    },
  ]
}
