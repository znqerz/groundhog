# 使用 mkdocs 搭建静态站点

其实无论官方还是博客文章都介绍挺多的，这里就随笔记录一下吧

## 准备
开始之前请自行阅读 [mkdocs](https://squidfunk.github.io/mkdocs-material/getting-started/) 官方学习资料。

## 创建项目

```bash
mkdir -p my-site

cd my-site

mkdocs new . 
```
## 加入github workflows
```yaml
name: CI

on:
  push:
    branches: [ master ]

  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-python@v2
        with:
          python-version: 3.x
      - run: pip install mkdocs-material
      - run: mkdocs gh-deploy --force
```

## 提交代码
```bash

# github 上自行创建 repo 然后指定remote
git remote add origin git@github.com:<username>/<projectname>.git

git add .

git commit -m 'init project'

git push origin -u master

```
!!! note
    这里说明一下，提交后workflow会在本项目内产生一个 `gh-deploy` 的新分支

## 配置 Github Page
按照图示顺序进入 `Pages` 配置页面最后保存即可。
[![Settings -> Page][1]][1]

[1]: ../assets/project-gh-settings.png



