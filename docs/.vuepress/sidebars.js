module.exports = {
  // EXPLORES
  '/explores/': setExplore(),
  // PRACTICE MODULE
  '/practice_packages/': setPackages(),
  '/practice_rules/': setRules(),
  '/practice_project/': setProject(),
  // READING MODULE
  '/reading_literature/': setLiterature(),
  '/reading_article/': setArticle(),
  '/reading_media/': setMedia(),
  // CORE MODULE
  '/core_foundation/': setCoreFoundation(),
  '/core_concept/': setCoreConcept(),
  // TOOL MODULE
  '/tools/': getToolsSide(),
}


function setCoreConcept() {
  return [
    '',
    {
      title: 'JavaScript',
      collapsable: false,
      children: ['js/common', 'js/理解一下this'],
    },
    {
      title: 'React',
      collapsable: false,
      children: ['react/common', 'react/谈谈Vue和React'],
    },
    {
      title: 'Network',
      collapsable: false,
      children: ['network/common'],
    },
  ]
}

function setCoreFoundation() {
  return [
    '',
    {
      title: 'JavaScript',
      collapsable: false,
      children: ['js/common', 'js/array', 'js/es'],
    },
    {
      title: 'React',
      collapsable: true,
      children: ['react/react','react/ans', 'react/advanced', 'react/hook'],
    },
    {
      title: 'TypeScript',
      collapsable: true,
      children: ['ts/common', 'ts/utility'],
    },
    {
      title: 'HTML5',
      collapsable: true,
      children: ['h5/element'],
    },
    {
      title: 'Vue2',
      collapsable: true,
      children: ['vue2/common', 'vue2/advanced'],
    },
    {
      title: 'Python3',
      collapsable: true,
      children: ['python3/common', 'python3/advanced'],
    },
  ]
}

function setMedia() {
  return [
    '',
    {
      title: 'Medium',
      collapsable: false,
      children: ['medium/common', 'medium/callback'],
    },
    {
      title: 'YouTube',
      collapsable: true,
      children: ['youtube/predict2020-2025'],
    },
  ]
}

function setArticle() {
  return ['']
}

function setLiterature() {
  return [
    '',
    {
      title: 'Literature',
      collapsable: false,
      children: [
        'webpack/深入浅出webpack',
        '前端架构--从入门到微前端',
        'Go语言开发实战',
      ],
    },
  ]
}

function setPackages() {
  return [
    '',
    {
      title: 'React',
      collapsable: false,
      children: ['react/common', 'react/react-router', 'react/state-container'],
    },
    {
      title: 'JavaScript',
      collapsable: true,
      children: ['javascript/common'],
    },

    {
      title: 'NodeJS',
      collapsable: true,
      children: ['node/common', 'node/koa'],
    },
    {
      title: 'Vue',
      collapsable: true,
      children: ['vue/common', 'vue/state-container'],
    },
    {
      title: 'Python3',
      collapsable: true,
      children: ['python3/common'],
    },
  ]
}

function setRules() {
  return ['', 'eslint', 'git']
}

function setExplore() {
  return [
    '',
    {
      title: 'Frontend Engineer',
      collapsable: false,
      children: ['engineers/webhooks'],
    },
    {
      title: 'Monitor',
      collapsable: false,
      children: ['monitor/React-Error-Catcher', 'monitor/performance', 'monitor/GROWTH性能优化实践'],
    },
    {
      title: 'Web API',
      collapsable: false,
      children: ['web/page-lifecycle', 'web/navigator', 'web/console']
    },
    {
      title: 'Style',
      collapsable: false,
      children: ['style/布局方式的实践'],
    },
  ]
}

function setProject() {
  return [
    '',
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
      title: 'CSS',
      collapsable: false,
      children: ['Css/a.cluster'],
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

function getToolsSide() {
  return [
    '',
    {
      title: 'Shell',
      collapsable: false,
      children: ['shell/shell'],
    },
    {
      title: 'DB',
      collapsable: false,
      children: ['db/mysql', 'db/redis'],
    },
    {
      title: 'Git',
      collapsable: false,
      children: ['git/git'],
    },
    {
      title: 'IDE',
      collapsable: false,
      children: ['IDE/vim', 'IDE/vscode'],
    },
    {
      title: 'Server',
      collapsable: false,
      children: ['server/TCCloud', 'server/nginx'],
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