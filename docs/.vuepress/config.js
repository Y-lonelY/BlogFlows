/**
 * 规范：
 * 模块内容大于三个支持关闭
 */

module.exports = {
	// 页面 title 类似 logo 角色
	title: "LoreFlows",
	description: "Welcome To The Knowledge Palace!",
	head: [
	// logo
		['link', { rel: 'icon', href: 'logo.ico'}]
	],
	// base: '/BlogFlows/',
	port: 7727,
	markdown: {
		lineNumbers: true
	},
	themeConfig: {
		// github 地址
		repo: 'https://github.com/Y-lonelY',
		// 标题栏导航
		nav: require('./nav.js'),
		// 文档根目录
		docsDir: 'docs',
		lastUpdated: 'Last Updated',
		sidebar: {
			'/core/': getCoreSide(),
			'/practice/': practice(),
			'/project/': getProjectSide(),
			'/packages/': getPackagesSide(),
			'/normalize/': getNormalizeSide('Normalize'),
			'/concept/': getConceptSide('Concept'),
			'/tools/': getToolsSide('Tools'),
		}
	}
}

function practice() {
	return [
		'/practice/',
		{
			title: 'practice',
			collapsable: false,
			children: [
				'GROWTH性能优化实践',
				'布局方式的实践'
			]
		}
	]
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

function getPackagesSide() {
	return [
		'/packages/',
		{
			title: 'Packages',
			collapsable: false,
			children: [
				'a.cluster',
				'b.react',
				'c.swift',
				'd.python',
				'e.node',
				'f.vue'
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
				'b.network',
				'c.react',
				'd.node',
				'e.css'
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
		collapsable: true,
		children: [
			'JavaScript/a.javascript',
			'JavaScript/b.jquery',
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
			'React/a.redux',
		]
	}, {
		title: 'TypeScript',
		collapsable: false,
		children: [
			'TypeScript/a.typescript'
		]
	}, {
		title: 'HTML5',
		collapsable: false,
		children: [
			'HTML5/a.html5'
		]
	}, {
		title: 'Swift',
		collapsable: false,
		children: [
			'Swift/a.cluster',
			'Swift/b.matters'
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
			'React/a.basic',
			'React/b.advanced',
			'React/c.hook'
		]
	}, {
		title: 'HTML5',
		// 表示不会关闭
		collapsable: false,
		children: [
			'HTML5/a.basic'
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
