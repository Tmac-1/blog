import { defineComponent } from 'vue'
import { fooProps } from './types'
import { testLog } from '@demo-ui/utils'

const NAME = 'demo-foo'

export default defineComponent({
  name: NAME,
  props: fooProps,
  setup (props, context) {
    console.log(props, context)
    const onBtnClick = () => {
      console.log('点击按钮测试', props.msg)
      testLog(props.msg)
    }
    return () => (
      <div class={NAME}>
        <h1>YYG-Admin-UI Demo</h1>
        <p class={NAME + '__description'}>{ props.msg }</p>
        <el-button type='primary' onClick={onBtnClick}>点击我1</el-button>
      </div>
    )
  }
})
