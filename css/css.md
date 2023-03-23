### requestAnimationFrame
https://www.cnblogs.com/goloving/p/14073738.html
与 setTimeout 相比，rAF 最大的优势是 由系统来决定回调函数的执行时机。具体一点讲就是，系统每次绘制之前会主动调用 rAF 中的回调函数

### requestIdleCallback
https://www.cnblogs.com/goloving/p/14074006.html
requestAnimationFrame 每一帧必定会执行不同，requestIdleCallback 是捡浏览器空闲来执行任务

### uno css
https://antfu.me/posts/reimagine-atomic-css-zh
- windi css更快的加载体验，解决Tailwind css在项目大的时候编译时间和热更新过长
  Tailwind 生成了许多没使用到的css，没有做到按需，在开发环境中文件大影响加载速度
  Tailwind 配置更加繁琐，windi则是预设了实用工具类
  1.自动值推导
  2.可变修饰组
  3.属性化模式
  4.shortcuts ...
- uno 高性能、更灵活的css引擎 
  @unocss/preset-uno 预设css通用超集
  @unocss/preset-attributify 属性化模式
  @unocss/preset-icons Icon预设
### 回流和重绘
https://www.cnblogs.com/chris-oil/p/10800961.html
css3的transform会开启硬件加速，不会引起回流和重绘

### BFC 块级格式化上下文
https://juejin.cn/post/6950082193632788493
一句话：css的块级作用域（一个独立的布局空间，让里面的元素不影响到外面的布局）
``` c
overflow: hidden
display: inline-block
position: absolute
position: fixed 
display: flex
设置上面css属性会触发BFC
```
1. 使用inline-block解决浮动元素高度塌陷问题
2. 包裹一个元素设置overflow：hidden解决 margin边距重叠问题
   
### 主题换肤功能实现
1. 使用css变量var(),通过document.body.style.setProperty('--foo', '#666')
来遍历配置文件，设置主题色
https://juejin.cn/post/7195592508495102009#heading-8
2. 实现多套 CSS 主题样式，根据用户切换操作，通过 link 标签动态加载不同的主题样式