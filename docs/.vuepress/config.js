module.exports = {
	// 页面 title 类似 logo 角色
	title: "LoreFlows",
	description: "The Knowledge Palace!",
	head: [
	// logo
		['link', { rel: 'icon', href: '/logo.ico'}]
	],
	port: 7727,
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
		}
	}
}

function getCoreSide(groupA, groupB) {
	return [
	'/core/',
	{
		title: groupA,
		// 表示不会关闭
		collapsable: false,
		children: [
			'js-esx',
			'js-typescript'
		]
	}, {
		title: groupB,
		collapsable: false,
		children: [
			'sw-swift',
			'sw-uikit'
		]
	}]
}

function getProjectSide(groupA) {
	return [
	'/project/',
	{
		title: groupA,
		// 表示不会关闭
		collapsable: false,
		children: [
			'sw-swift'
		]
	}]
}