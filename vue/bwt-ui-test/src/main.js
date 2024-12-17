import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI, { ElImageViewer } from "element-ui";
import '@/styles/theme.scss';

import bwtEle from "./components/index";


Vue.component("el-image-viewer", () =>
  import("element-ui/packages/image/src/image-viewer")
);
Vue.use(ElementUI);
Vue.use(bwtEle);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
