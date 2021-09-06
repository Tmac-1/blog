### 数据代理模型
![](img/defineProperty.jpeg)
2.0版本vue，先通过new Vue获取vm实例，并把数据存储在_data下面，为了访问方便，也会把响应式数据直接放在vm对象下面，访问时候通过Object.defineProperty进行代理访问，访问到_data下的数据（通过vm对象代理data对象中的属性操作）