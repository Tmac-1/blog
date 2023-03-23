### 常用node模块
chokidar 文件监听模块

### 执行npm run 时候做了什么
当使用 npm run serve 执行 vue-cli-service  serve 时，虽然没有安装 vue-cli-service的全局命令，但是 npm 会到 ./node_modules/.bin 中找到 vue-cli-service 文件作为  脚本来执行，则相当于执行了 ./node_modules/.bin/vue-cli-service serve（最后的 serve 作为参数传入）

链接：https://juejin.cn/post/7078924628525056007

### package.json 中字段含义
1. sideEffects: 告诉webpack哪些文件是有副作用的，不应该被tree-shaking
   https://blog.csdn.net/jexxx/article/details/128850519