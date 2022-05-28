
## 博客项目
技术栈: Next.js+React+Antd <br/>
后端没想好怎么做，初步采用express实现基本功能 ，后续用Koa重构


```javascript
yarn
```
项目初始化，创建node_mudule依赖
```javascript
yarn dev
```
开发模式启动

### 2022/5/16 
完成首页和文章页面的静态页面的开发<br/>
目前考虑用Mongodb作数据库<br/>
计划采用Next.js配置的后端作开发<br/>


### 2022/5/20
初步用express+mongodb搭建后端，服务器代码在\server 文件夹下

```javascript
cd server
npm start
```
服务端启动<br/>

目前可以在个人首页和文章列表访问信息 后续内容有待开发<br/>
最近在改论文估计代码更新速度较慢<br/>

### 2022/5/22
服务器端可以实现文章的列表查询，文章内容查看等功能<br/>
支持用户评论，下一部计划使用Ip地址区分用户<br/>
前端目前基本页面搭建初步完成<br/>
下一步开始着手后台开发以及用户验证开发<br/>

### 2022/5/23
还在思考如何实现用户认证····脑壳疼<br/>
后台界面没有思路怎么设计····<br/>
采用useContext和useReducer代替redux 作为公共数据管理 这样可以不用对组件再封装<br/>

### 2022/5/24
实现文章列表的时间线页面（但感觉挺丑的后面再优化）<br/>
对路由配置进行优化，全局采用静态渲染 <br/>
实现基于Router对全局路由的监控，实现前端路由切换时的Spin等待界面 (由于路由属性处于组件顶端，为此store只能在顶端组件传入)<br/>

### 2022/5/25
初步实现后端网页布局设计（还是觉得丑，后面再想办法优化）<br/>

### 2022/5/26
对后台界面进行优化，对部分数据放入redux中进行公共管理 完成后台header组件的设计<br/>
实现博客日志页面的设计（最简单部分）对左侧导航栏进行点击优化（antd真的不好用）<br/>

### 2022/5/28
完成文章编辑页面的开发，最后选用marked+highlight.js作为编辑文章的工具<br/>
目前博客支持Markdown格式的编辑，问题来了，前面\article\\[id]代码有待更改<br/>
后续完成新建文章和修改文章功能的实现以及实现数据互通<br/>
