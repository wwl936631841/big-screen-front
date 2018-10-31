# web基础应用平台

项目运行打包 依赖node
node v8.6 以上 LTS 版本 
下载地址:
https://nodejs.org/en/

# 项目生成

1. 首先在管理员权限下执行 
```
> (c)npm install git+http://192.168.37.5/nenv/nenv.git -g
```

2. 新建工程目录
选取任何路径作为工程目录，假设为A路径

3. 克隆 nenv 脚手架并安装好依赖
```
> git clone http://192.168.37.5/nenv/nenv.git
> cd nenv
> (c)npm install
```

4. 生成项目
在工程目录A路径，执行 
```
> nenv init -n 工程名称B
```
即可生成项目

5. 安装依赖
```
> cd 工程名称B
> (c)npm install
```


# 开发生产

1. 开发  在项目路径内执行 npm run current/current-dev

2. 生产  在项目路径内执行 npm run current-build

## vue 代码规范

``` bash
# vue -eslint
https://github.com/vuejs/eslint-plugin-vue-libs

```


## 项目结构参考:
```
layouts 项目导航,可依据情况修改或增加
   |--components 导航公工组件
   |--frame 顶部侧边栏导航
   |--halo 顶部导航
   |--hola 侧边栏导航
   |--mixins 导航公共混入
   |--styles 导航公共样式

modules 项目功能模块
   |-- autoLogin 自动登陆
   |-- notification 消息通知
   |-- theme 主题模块
packages 组件库
   |-- ...
pages 页面所在目录
static 静态资源目录
styles 全局样式
entry.js 程序入口
nenv.config.js 项目配置文件
server.js mock服务



### 项目中常见问题和解决方案
1.npm 安装一直报错 ?
  > 注意node的版本 推荐使用LTS版本
  使用阿里镜像地址安装
  删除项目中的node_modules 重新安装

2.端口号冲突 listen EADDRINUSE 
直接任务管理器中停用node进程即可
或 netstat -nao    找到冲突端口pid   taskkill /PID /F ${pid} 即可

3.项目更新后 编译失败 请查看错误 
4.代码不规范 eslint报错 请按照要求 更正代码规范


### 所用到的技术栈
* vue vue-router vuex element-ui axios npm node 
* es6 主要是let const 解构 promise 等
* node 命令 `npm run dev` `npm run build` `npm install`等
* 项目结构约定

### 主题修改
1. 定义好主题名称${THEME-NAME}
2. 存入到store app theme中 
3. 如果有背景 存入到 store app appStyle中
4. http://element.eleme.io/#/zh-CN/component/custom-theme 让UI配合修改全局的element-variables.css et 编译
5. 生成 theme 找到theme/index.css 全局替换`.el-`  为 `.${THEME-NAME}  .el-` 并考入项目目录中 入口引入即可



### 兼容IE10+  请求暂时不能兼容IE9(20171011)
 




### 需要思考和解决的问题 todo 

store 本地化 ??? syncStore

