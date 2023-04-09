### 数据代理模型
![](img/defineProperty.jpeg)
2.0版本vue，先通过new Vue获取vm实例，并把数据存储在_data下面，为了访问方便，也会把响应式数据直接放在vm对象下面，访问时候通过Object.defineProperty进行代理访问，访问到_data下的数据（通过vm对象代理data对象中的属性操作）
vue3 响应式原理： 利用proxy在取值时收集对应的effect，改值时找到对应的effect执行

### composition API 的优势是
1、公用逻辑的抽离公用
2、代码组织更加清晰，同一个功能点不用耦合在不同的option(watch,methods四处分散)

### REACT 和 VUE 对比
1. defineProperty属于主动劫持，因此在Vue data中默认会遍历所有的响应式属性
2. 而Proxy属于Lazy Reflect，可以理解为访问之后触发，不会去改变数据本身，访问到再出发，在首次渲染的时候，有相当大的提升
3. 比如react 中的 setData，每次我们变动的时候，其实是使用了Update Queue队列来进行signing优化，而Vue的话采用了WeakMap的数据结构，记录响应映射
4. Vue3 采用了二分法查找的最小递归子序列的算法来减少复杂度，寻找变化的节点，而react的类似于bfs的算法，相对来说，复杂度较高一些

### pinia和vuex的区别
1. 支持选项式api的组合式api的写法
2. pinia没有mutations，只有：state、getters、actions
3. pinia分模块不需要modules（之前vuex分模块需要modules）
4. 更简单的api，TypeScript支持更好
5. pinia体积更小（性能更好）
6. pinia通过storeToRefs解构之后可以直接修改state数据，vuex通过mutations才能修改

### vue3和vue2区别
1. 代码管理上，使用monorepo把这些模块拆分到不同package中，每个package有各自的API、类型定义和测试，职责划分明确，提高代码可维护性
2. flow --> TS
3. 体积更小（移除冷门feature、Tree Shaking）
4. 数据劫持优化 （Object.defineProperty不能检测到对象的属性的添加和删除，深层次数据响应需要递归遍历，性能不佳）
   Proxy也不能监听到内部深层次的对象变化，是在getter中递归响应式，这样的好处是真正访问到内部对象才会变成响应式，不是无脑递归，性能好
5. **编译优化**：
   - 通过编译阶段对静态模板分析，编译生成类Block Tree, 借助Block Tree，vue3将vnode更新性能由模板整体大小相关提升为与动态内容数量相关（不再是全量比对）
   - 编译时候添加patchFlag实现靶向更新
   - 静态节点做了静态提升，避免更新操作时候重复创建vnode的性能开销和内存占用
   - 预字符串化
   - 事件监听函数的缓存优化
6. 优化代码逻辑组织，提供类Compoition API, 能够解决mixin命名冲突和数据来源不清晰，
   - 逻辑复用方面的优势，也会有更好的类型支持 （用户在编写复杂业务逻辑反复横跳问题）
   - 因为他们都是一些函数，在函数调用时，自然所有的类型都被推导出来啦，不像options API所有的东西都用this
   - 另外，Composition API 对 tree-shaking友好（vue2中未使用的方法和属性依旧会被打包），代码也更容易压缩 
7. 支持自定义渲染器 createRenderer() 实现跨平台渲染
  
### 权限控制
https://juejin.cn/post/7209648356530896953
1. 按钮级别、 定义个权限管理的store，里面存贮着角色列表，然后写个usePermission的Hook，里面返回hasPermission的函数，然后用一个高阶函数包裹
   
### 编译过程
1. 先将模板进行分析，生成对应的ast树（一个对象来描述js语法的）
2. 做转化流程 transform -> 其中会对对动态节点做一些标记（指令、插槽、事件、属性）给vnode打上patchFlag
3. 代码生成 codegen -> 生成最终代码
   
### Block的概念 -> Block Tree
- diff算法的特点，是递归遍历，每次比较同一层
- Block的作用就是为了收集动态节点 （他自己下面所有的）将树的递归拍平成了一个数组
- 在createVnode的时候，会判断这个节点是动态的，就让外层的block收集起来
- 目的是为了diff的时候只diff动态节点