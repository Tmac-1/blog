# 什么是whistle
whistle(读音[ˈwɪsəl]，拼音[wēisǒu])基于Node实现的跨平台web调试代理工具

# 安装启动
1. 安装Node 
2. 安装whistle 
``` bash
 npm install -g whistle
```
3. 启动whistle
``` bash
w2 start  // 启动
w2 stop   // 关闭
```
4. 配置代理
5. 安装根证书


# 常用功能
- 数据mock
``` js
https://cs.bwton.cn/mall-test02/gateways/miniapp/trade/order/get/10241029000019 file://{test}
```
- 添加调试工具 （en）
  安装 w2 i whistle.inspect
```
# 插入 Vconsole
https://h5.icoupongo.cn whistle.inspect://vConsole
# 插入 Erude
https://h5.icoupongo.cn whistle.inspect://eruda
```
- weinre （web远程调试）
```
# 设置 weinre  Web Inspector Remote
https://juejin.cn weinre://juejin
https://cs.bwton.cn weinre://bwton
```
- 添加log日志
``` 
https://h5.icoupongo.cn/ log://
```
- 添加/篡改请求头
```
# 添加请求头
# https://api.icoupongo.cn reqHeaders://{"X-Custom-Header":"234234"}
# 篡改请求头
# https://api.icoupongo.cn reqHeaders://{"appid":"123456"}
```
- 接口转发
```
# https://api.icoupongo.cn/mall https://cs.bwton.cn/mall-test02
# https://api.bwton.com https://cs.bwton.cn/bmp-test01
```

### 参考文档
https://wproxy.org/whistle/install.html