# !/usr/bin/env sh

# 执行之前请设置 .vuepress/config base 
# 原因在于 github page 使用的是子路径，需要通过 base 来设置其路径
# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:Y-lonelY/BlogFlows.git master:gh-pages

cd -