// concept - projects - assets - standard

const nodeConfig = [
  {
    title: 'NodeJs',
    collapsable: false,
    children: ['concept', 'projects', 'package', 'nestjs', 'express'],
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

const envsCloudConfig = [
  {
    title: 'Cloud',
    collapsable: false,
    children: ['tencent', 'ubuntu'],
  },
]

const envsCommonConfig = [
  {
    title: 'Common',
    collapsable: false,
    children: ['docker', 'git', 'nginx', 'shell', 'package', 'ide'],
  },
]

const notesEnsConfig = [
  {
    title: 'Ens',
    collapsable: false,
    children: ['term'],
  },
]

const notesPiecesConfig = [
  {
    title: 'Pieces',
    collapsable: false,
    children: ['medium', 'module'],
  },
]

const notesReadingsConfig = [
  {
    title: 'Readings',
    collapsable: false,
    children: ['算法优化', '从入门到微前端'],
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

  // ENV MODULE
  '/envs/cloud/': envsCloudConfig,
  '/envs/common/': envsCommonConfig,

  // NOTES MODULE
  '/notes/ens/': notesEnsConfig,
  '/notes/pieces/': notesPiecesConfig,
  '/notes/readings/': notesReadingsConfig,

  // core
  '/core/server/': coreServerConfig,
  // PRACTICE MODULE
  '/practice_packages/': setPackages(),
  '/practice_project/': setProject(),

  // CORE MODULE
  '/core_foundation/': setCoreFoundation(),
  '/core_concept/': setCoreConcept(),
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
        'wpm/React-Error-Catcher',
        'wpm/performance',
        'wpm/GROWTH性能优化实践',
        'wpm/sentry',
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
