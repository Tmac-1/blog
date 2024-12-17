import BwtAiModel from "./bwt-ai-model.vue";
import BwtDraw from "./bwt-draw.vue";
import BwtForm from './bwt-form/index.vue';
import BwtUpload from './bwt-upload/index.vue';

const bwtEle = {
  install(Vue) {
    Vue.component("bwt-ai-model", BwtAiModel);
    Vue.component("bwt-draw", BwtDraw);
    Vue.component("bwt-form", BwtForm);
    Vue.component("bwt-upload", BwtUpload);
  },
};

export default bwtEle;
