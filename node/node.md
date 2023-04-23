### 常用node模块
chokidar 文件监听模块
minimist 参数解析模块 minimist(process.argv)
execa    脚本执行模块 execa('rollup',['-wc'],{stdio: 'inherit'}) // --watch --config 
shelljs  脚本命令执行 
import { program } from 'commander' 命令行解析工具
inquirer 可交互式的查询（带提示）
chalk 改变console输出的颜色
log-symbols 图标
ora 添加loading效果
rimraf 文件夹删除模块
### 执行npm run 时候做了什么
当使用 npm run serve 执行 vue-cli-service  serve 时，虽然没有安装 vue-cli-service的全局命令，但是 npm 会到 ./node_modules/.bin 中找到 vue-cli-service 文件作为  脚本来执行，则相当于执行了 ./node_modules/.bin/vue-cli-service serve（最后的 serve 作为参数传入）

链接：https://juejin.cn/post/7078924628525056007

### package.json 中字段含义
1. sideEffects: 告诉webpack哪些文件是有副作用的，不应该被tree-shaking
   https://blog.csdn.net/jexxx/article/details/128850519
2. main和moudle作用:
   如果它已经支持 pkg.module 字段则会优先使用 ES6 模块规范的版本，这样可以启用 Tree Shaking 机制。
   如果它还不识别 pkg.module 字段则会使用我们已经编译成 CommonJS 规范的版本，也不会阻碍打包流程
   browser -> module -> main
   ``` c
  "main": "dist/dist.js",  // es5编译入口
  "module": "dist/dist.es.js" // es6编译入口
   ```
3. 在workspaces声明目录下的package会软链到最上层root package的node_modules中
4. pnpm -w 安装到项目根目录下
5. files npm发包时候要发的文件
6. bin: 用来指定各个内部命令对应的可执行文件的位置