##### 用户输入url 
(浏览器进程角度)
1. 用户输入url地址 （关键字 会将关键字根据默认的搜索引擎生成地址）浏览器进程里面做 开始导航 
2. 浏览器进程 会准备一个渲染进程用于渲染页面
3. 网络进程加载资源，最终将加载的资源交给渲染进程处理
4. 渲染完毕展示

(模型角度)
- 网络七层模型 （物理层，数据层）网络层（ip）传输层（tcp 安全可靠、分段传输，udp 丢包） （会话层 表现层 应用层）http
1. 先查找缓存，检测缓存是否过期，没有直接返回缓存内容
2. DNS解析 看域名是否被解析过，DNS协议，将域名解析成ip地址 （DNS基于UDP）
3. 如果请求是https SSL协商
4. ip地址用来寻址，排队等候，最多能同时发送6个http请求
5. 创建tcp链接 用于传输（过程中三次握手）
6. 利用tcp传输数据 （拆分成数据包 有序、可靠） 服务器会按照顺序来接受
7. 发送http请求 （请求头 请求行 请求体）http请求keep-alive，默认不会断开， 为了下次传输数据时，可以复用上次的链接
8. 服务器收到数据后（响应行 响应头 响应体）
   301 永久重定向 302 临时重定向 304 查询浏览器缓存进行返回


##### 性能
1. css 放最上面，防止页面重绘（页面是从上往下绘制的）
2. js 放最下面，js会阻塞DOM解析，需要暂停DOM解析去执行js，需要等待css解析完毕才能执行，因为js要操作css的

- Use HTTP/2 与HTTP/1.1相比，HTTP/2提供了许多优点，包括二进制报头和多路复用
- Defer offscreen images 考虑在所有关键资源加载完毕后延迟加载屏幕外和隐藏的图像
- Serve images in next-gen formats 提供下一代格式的图像
- Remove unused JavaScript 删除不必要的js
- Properly size images 节省图片资源大小
- Enable text compression 启用文本压缩
- Ensure text remains visible during webfont load 确保字体加载时可见
- Does not use passive listeners to improve scrolling performance  没有使用被动侦听器来提高滚动性能
- Image elements do not have explicit width and height 图片元素无宽高
- Serve static assets with an efficient cache policy 静态资源无缓存
- Minimize main-thread work 减少主线程的工作
- Background and foreground colors do not have a sufficient contrast ratio 背景和前景颜色没有足够的对比度
- <dl>'s do not contain only properly-ordered <dt> and <dd> groups, <script>, <template> or <div> elements dl中没有包含 dt dt
- <frame> or <iframe> elements do not have a title  iframe没有title
- Image elements do not have [alt] attributes 图片没有alt属性
- Heading elements are not in a sequentially-descending order 标题元素没有按顺序降序排列的
- <html> element does not have a [lang] attribute html没有语言属性
- [user-scalable="no"] is used in the <meta name="viewport"> element or the [maximum-scale] attribute is less than 5.   禁用缩放是有问题的
- Displays images with incorrect aspect ratio  显示宽高比不正确的图像


##### performance API
参考网址 https://blog.csdn.net/weixin_44135121/article/details/103952234