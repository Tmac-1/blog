<template>
  <div class="draw-page">
    <!-- <div class="title-wrap">
      <img :src="require('@/assets/star.gif')" class="star_img" />
      <img :src="require('@/assets/ai-text.png')" class="ai-text_img" />
    </div> -->
    <bwt-ai-model />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.draw-page {
  padding: 24px;
  .title-wrap {
    display: flex;
    margin-bottom: 12px;
    .star_img {
      width: 28px;
      margin-right: 12px;
    }
    .ai-text_img {
      height: 22px;
    }
  }
}
</style>
