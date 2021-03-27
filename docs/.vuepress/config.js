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
    // 侧边栏深度
    sidebarDepth: 2,
    smoothScroll: true,
    lastUpdated: 'Last updated at',
    sidebar: require('./sidebars.js'),
  },
  plugins: ['@vuepress/back-to-top'],
}

