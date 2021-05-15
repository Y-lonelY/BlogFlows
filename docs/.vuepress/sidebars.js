// concept - projects - assets - standard

const nodeConfig = [
  {
    title: 'NodeJs',
    collapsable: false,
    children: ['concept', 'projects', 'package', 'nestjs'],
  },
]

const reactConfig = [
  {
    title: 'React',
    collapsable: false,
    children: ['concept', 'ans', 'hooks'],
  },
]

const cssConfig = [
  {
    title: 'CSS',
    collapsable: false,
    children: ['concept', 'projects', 'assets', 'standard'],
  },
]

const htmlConfig = [
  {
    title: 'HTML5',
    collapsable: false,
    children: ['concept', 'projects', 'assets'],
  },
]

const coreServerConfig = [
  {
    title: 'Server',
    collapsable: false,
    children: ['cache'],
  },
]

const toolsConfig = [
  '',
  'shell',
  'package',
  'ide',
  {
    title: 'Env',
    collapsable: false,
    children: ['env/docker', 'env/TCCloud', 'env/nginx'],
  },
  {
    title: 'Git',
    collapsable: false,
    children: ['git/usages', 'git/standard'],
  },
]

module.exports = {
  // EXPLORES
  '/explores/': setExplore(),

  // langs
  '/langs/nodejs/': nodeConfig,
  '/langs/react/': reactConfig,
  '/langs/css/': cssConfig,
  '/langs/html5/': htmlConfig,

  // core
  '/core/server/': coreServerConfig,
  // PRACTICE MODULE
  '/practice_packages/': setPackages(),
  '/practice_project/': setProject(),
  // READING MODULE
  '/reading_literature/': setLiterature(),
  '/reading_media/': setMedia(),
  // CORE MODULE
  '/core_foundation/': setCoreFoundation(),
  '/core_concept/': setCoreConcept(),
  // TOOL MODULE
  '/tools/': toolsConfig,
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
      title: 'TypeScript',
      collapsable: true,
      children: ['ts/common', 'ts/utility'],
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

function setExplore() {
  return [
    '',
    {
      title: 'Engineering',
      collapsable: false,
      children: ['engineers/webhooks'],
    },
    {
      title: 'WPM',
      collapsable: false,
      children: [
        'monitor/React-Error-Catcher',
        'monitor/performance',
        'monitor/GROWTH性能优化实践',
      ],
    },
    {
      title: 'Web API',
      collapsable: false,
      children: ['web/page-lifecycle', 'web/navigator', 'web/console'],
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
      title: 'TypeScript',
      collapsable: false,
      children: ['TypeScript/a.typescript'],
    },
    {
      title: 'Swift',
      collapsable: false,
      children: ['Swift/a.cluster', 'Swift/b.matters'],
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
