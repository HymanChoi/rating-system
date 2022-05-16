# Rating System

💁‍♂️ 项目预览

<div>
<img src="https://s2.loli.net/2022/05/16/mqsSalVJD7bWNnC.png" width="700px" /> 
<img src="https://s2.loli.net/2022/05/16/QqSDE95YhsvJdgZ.png" width="700px" /> 
<img src="https://s2.loli.net/2022/05/16/mAnbJ2g9Ga5i81x.png" width="700px" /> 
<img src="https://s2.loli.net/2022/05/16/R1je6woEdtVMTmS.png" width="700px" /> 
</div>

### 项目介绍

影视作品评分系统

### 相关知识

1. Vue3
2. Typescript
3. Vite
4. Vue-router
5. Pinia
6. Electron
7. Naive UI
8. Apexcharts
9. IndexDB
10. Dexie

### 项目结构

```
|-- rating-system
    |-- .eslintrc.cjs
    |-- .gitattributes
    |-- .gitignore
    |-- index.html
    |-- LICENSE
    |-- package.json
    |-- pnpm-lock.yaml
    |-- README.md
    |-- tsconfig.json
    |-- tsconfig.node.json
    |-- vite.config.ts
    |-- .vscode
    |   |-- extensions.json
    |-- electron
    |   |-- electron.js
    |   |-- preload.js
    |-- public
    |   |-- favicon.ico
    |-- src
        |-- App.vue
        |-- env.d.ts
        |-- main.ts
        |-- api
        |   |-- index.ts
        |-- assets
        |-- components
        |   |-- RankList
        |       |-- index.vue
        |-- db
        |   |-- index.ts
        |   |-- operate.ts
        |-- router
        |   |-- index.ts
        |-- stores
        |   |-- counter.ts
        |-- styles
        |   |-- index.css
        |-- type
        |   |-- index.d.ts
        |-- utils
        |   |-- axios.ts
        |   |-- index.ts
        |-- views
            |-- charts
            |   |-- index.vue
            |-- home
            |   |-- index.vue
            |   |-- components
            |       |-- Statistic
            |           |-- index.vue
            |-- info
                |-- index.vue
```

### 安装依赖

```
$ pnpm install
```

### 运行项目

```
# work with electron in development mode
$ yarn electron:dev

# open vite in browser in development mode
$ yarn dev
```

### 构建应用

```
# build electron app
$ yarn app:build

# build files
$ yarn build
```
