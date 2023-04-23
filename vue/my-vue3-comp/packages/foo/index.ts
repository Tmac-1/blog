import { App } from 'vue'
import Foo from './src'

// 添加install方法，可以作为单个插件使用，也可以在demo-ui全部引入，一下子可以用多个插件
Foo.install = (app: App) => {
  app.component(Foo.name, Foo)
}

export default Foo