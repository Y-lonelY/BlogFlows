module.exports = {
	// 页面 title 类似 logo 角色
	title: "LoreFlows",
	description: "Welcome To The Knowledge Palace!",
	head: [
	// logo
		['link', { rel: 'icon', href: '/logo.ico'}]
	],
	port: 7727,
	markdown: {
		lineNumbers: true
	},
	themeConfig: {
		// github 地址
		repo: 'https://github.com/yanGo1221',
		// 标题栏导航
		nav: require('./nav.js'),
		// 文档根目录
		docsDir: 'docs',
		lastUpdated: 'Last Updated',
		sidebar: {
			'/core/': getCoreSide('JavaScript', 'Swift4.x'),
			'/project/': getProjectSide('Swift4.x'),
			'/normalize/': getNormalizeSide('Normalize'),
			'/concept/': getConceptSide('Concept'),
			// '/tools/': getToolsSide('tools'),
		}
	}
}

function getNormalizeSide(groupA) {
	return [
		'/normalize/',
		{
			title: groupA,
			collapsable: false,
			children: [
				'css'
			]
		}
	]
}

function getConceptSide(groupA) {
	return [
		'/concept/',
		{
			title: groupA,
			collapsable: false,
			children: [
				'network'
			]
		}
	]
}

function getProjectSide(groupA) {
	return [
	'/project/',
	{
		title: groupA,
		// 表示不会关闭
		collapsable: false,
		children: [
			'Swift/a.swift'
		]
	}]
}

function getCoreSide(groupA, groupB) {
	return [
	'/core/',
	{
		title: groupA,
		// 表示不会关闭
		collapsable: false,
		children: [
			'JavaScript/a.esx',
			'JavaScript/b.typescript'
		]
	}, {
		title: groupB,
		collapsable: false,
		children: [
			'Swift/a.swift',
			'Swift/b.uikit'
		]
	}]
}
