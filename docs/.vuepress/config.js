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
			'/core/': getCoreSide(),
			'/project/': getProjectSide(),
			'/normalize/': getNormalizeSide('Normalize'),
			'/concept/': getConceptSide('Concept'),
			'/tools/': getToolsSide('Tools'),
		}
	}
}

function getToolsSide(groupA) {
	return [
		'/tools/',
		{
			title: groupA,
			collapsable: false,
			children: [
				'a.babel',
				'b.shell',
				'c.developTools',
				'd.nginx'
			]
		}
	]
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
				'a.javascript',
				'b.network'
			]
		}
	]
}

function getProjectSide() {
	return [
	'/project/',
	{
		title: 'JavaScript',
		// 表示不会关闭
		collapsable: false,
		children: [
			'JavaScript/a.javascript',
			'JavaScript/b.jquery',
			'JavaScript/c.h5',
			'JavaScript/last.units'
		]
	}, {
		title: 'Css',
		collapsable: false,
		children: [
			'Css/a.cluster',
		]
	}, {
		title: 'React',
		// 表示不会关闭
		collapsable: false,
		children: [
			'React/a.library',
			'React/b.redux',
		]
	}, {
		title: 'Swift',
		collapsable: false,
		children: [
			'Swift/a.cluster',
			'Swift/b.matters',
			'Swift/c.library'
		]
	}, {
		title: 'TypeScript',
		collapsable: false,
		children: [
			'TypeScript/a.typescript'
		]
	}]
}

function getCoreSide() {
	return [
	'/core/',
	{
		title: 'JavaScript',
		// 表示不会关闭
		collapsable: false,
		children: [
			'JavaScript/d.javascript',
			'JavaScript/a.esx',
			'JavaScript/b.typescript'
		]
	}, {
		title: 'React',
		// 表示不会关闭
		collapsable: false,
		children: [
			'React/a.basic'
		]
	}, {
		title: 'Swift4.x',
		collapsable: false,
		children: [
			'Swift/a.swift',
			'Swift/b.component'
		]
	}, {
		title: 'Python3',
		collapsable: false,
		children: [
			'Python3/a.basic',
			'Python3/b.advanced'
		]
	}]
}
