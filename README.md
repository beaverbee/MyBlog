
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


