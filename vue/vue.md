### 数据代理模型
![](img/defineProperty.jpeg)
2.0版本vue，先通过new Vue获取vm实例，并把数据存储在_data下面，为了访问方便，也会把响应式数据直接放在vm对象下面，访问时候通过Object.defineProperty进行代理访问，访问到_data下的数据（通过vm对象代理data对象中的属性操作）

### composition API 的优势是
1、公用逻辑的抽离公用
2、代码组织更加清晰，同一个功能点不用耦合在不同的option(watch,methods四处分散)

### REACT 和 VUE 对比
1. defineProperty属于主动劫持，因此在Vue data中默认会遍历所有的响应式属性
2. 而Proxy属于Lazy Reflect，可以理解为访问之后触发，不会去改变数据本身，访问到再出发，在首次渲染的时候，有相当大的提升
3. 比如react 中的 setData，每次我们变动的时候，其实是使用了Update Queue队列来进行signing优化，而Vue的话采用了WeakMap的数据结构，记录响应映射
4. Vue3 采用了二分法查找的变异算法来减少复杂度，寻找变化的节点，而react的类似于bfs的算法，相对来说，复杂度较高一些