import Tmac from './src/tmac.vue'
import { App } from 'vue'

Tmac.name = 'demo-tmac'

Tmac.install = (app: App): void => {
  // 注册组件
  app.component(Tmac.name, Tmac)
}

export default Tmac
