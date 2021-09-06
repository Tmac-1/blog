### 什么是webpack
> webpack 是一个打包模块化的JavaScript的工具，它会从入口模块出发，识别出源码中的模块化导入语句，
递归的找出入口文件的所有依赖，将入口和其他所有的依赖打包到一个单独的文件中

1. webpack是基于nodejs的,所以要基于CommonJS规范导出一个对象
2. webpack不适用于构建JavaScript库，因为不够纯碎，会打包出来一个bootstrap函数

### Plugins
Plugins可以在webpack运行到某个阶段的时候，帮你做一些事情，类似于生命周期的概念
扩展插件，在webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或者你想做的事情。
作用于整个构建过程

> Plugin:开始打包，在某个时刻，帮助我们处理一些什么事情的机制
plugin要比loader稍微复杂一些，在webpack的源码中，用plugin的机制还是占有非常大的场景，
可以说plugin是webpack的灵魂
设计模式
  事件驱动  发布订阅
plugin是一个类，里面包含一个apply函数，接收一个参数，compiler

### Loaders
> babel-loader 负责和webpack搭建桥梁
babel-core 是核心代码，提供很多api，转ast语法树等
babel-preset-env 负责真正的转换工作，兼容各版本的语法特性，把es6转es5，但是支持的并不全
babel-polyfill 提供更多语法转换

多页面打包 ：entry可以定义一个对象，plugins可以写多个htmlWebpackPlugins

- ##### module chunk bundle 区别
  module，chunk 和 bundle 其实就是同一份逻辑代码在不同转换场景下的取了三个名字，我们直接写出来的是 module，webpack 处理时是 chunk，最后生成浏览器可以直接运行的 bundle。
   > https://www.cnblogs.com/skychx/p/webpack-module-chunk-bundle.html

- ##### compiler 和 compliation 区别
 不同点是 Compiler 是每个 Webpack 的配置，对应一个 Compiler 对象，记录着整个 Webpack 的生命周期；在构建的过程中，每次构建都会产生一次Compilation，Compilation 则是构建周期的产物。
 https://blog.csdn.net/weixin_42614080/article/details/110507675
 
> 参考链接 
>  1. 面试题 https://mp.weixin.qq.com/s/wm_7RvwIQxSow2K5IxZDvw
>  2. b站基础知识点 http://www.woc12138.com/article/45
>  3. b站进阶知识点 https://juejin.cn/post/6909719159773331463/#heading-7
>

### 构建性能优化  
1.减少loader处理，给loader配置include（实质上就是减少对文件的处理）
2.配置noparse选项（如jqery,lodash等模块在生产环境直接引用cdn地址）
3.ignorePlugin忽略一些不需要的模块（如moment里面的国际化模块） 
>https://www.bilibili.com/video/BV1Pf4y157Ni?p=52&spm_id_from=pageDriver
4.DllPlugin第三方不容易变动的库单独打包成动态链接库 （先用DllPlugin构建出dll和manifest文件，再用DllReference插件建立引用）

  