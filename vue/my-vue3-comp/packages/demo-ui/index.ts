import { App } from 'vue'
import Foo from '@demo-ui/foo'
import Tmac from '@demo-ui/tmac'
// import component end
import '../scss/index.scss'

const components = [
  Foo,
  Tmac
] // components

// 全局动态添加组件
const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export default {
  install
}
