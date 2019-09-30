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
			'/project/': getProjectSide('JavaScript', 'Swift4.x', 'TypeScript'),
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
				'c.developTools'
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

function getProjectSide(groupA, groupB, groupC) {
	return [
	'/project/',
	{
		title: groupA,
		// 表示不会关闭
		collapsable: false,
		children: [
			'JavaScript/a.javascript',
			'JavaScript/b.jquery'
		]
	}, {
		title: groupB,
		// 表示不会关闭
		collapsable: false,
		children: [
			'Swift/a.cluster',
			'Swift/b.matters',
			'Swift/c.library'
		]
	}, {
		title: groupC,
		collapsable: false,
		children: [
			'TypeScript/a.typescript'
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
			'JavaScript/d.javascript',
			'JavaScript/a.esx',
			'JavaScript/b.typescript',
			'JavaScript/c.react'
		]
	}, {
		title: groupB,
		collapsable: false,
		children: [
			'Swift/a.swift',
			'Swift/b.component'
		]
	}]
}
