<template>
  <div class="model-container">
    <div class="title-wrap">
      <img :src="require('@/assets/star.gif')" class="star_img" />
      <img :src="require('@/assets/ai-text.png')" class="ai-text_img" />
    </div>
    <div class="content">
      <div class="draw-wrap">
        <bwt-draw
          ref="draw"
          :disabled="disabled"
          :ratioType="ratioType"
        ></bwt-draw>
        <div style="margin-top: 24px" v-if="loading">
          <el-progress
            :text-inside="true"
            :stroke-width="20"
            :percentage="percentage"
            :format="format"
            text-color="#000"
          ></el-progress>
        </div>
        <div class="draw-footer">
          <div class="main-btn_wrap">
            <el-button class="main-btn" @click="handleViewMainPic">
              产品主体
            </el-button>
          </div>
          <div class="ai-img_wrap" v-if="imgList.length > 0">
            <div
              class="ai-img-item"
              v-for="(item, index) in imgList"
              :key="index"
              @click="handleImgClick(item)"
            >
              <el-image class="ai-img" :src="item"></el-image>
            </div>
          </div>
        </div>
      </div>
      <div class="desc-wrap">
        <div class="title" style="min-height: 44px">
          <img :src="require('@/assets/ai-text.png')" class="ai-text_img" />
          <span class="label">:</span
          ><span
            >基于上传的广告主体图+核心描述+指定目标可全画像圈选，AI为您生成
            自然细腻光影融合的完整广告图。并支持前景后景边缘引导元素生成更个性化的效果。</span
          >
        </div>
        <div class="draw-info_wrap">
          <div class="draw-info_item">
            <div class="label">画面比例</div>
            <!-- <el-select
              size="small"
              v-model="ratioType"
              style="width: 200px; margin-left: 12px"
              @change="handleRatioChange"
            >
              <el-option
                v-for="item in ratioOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> -->
            <div class="ratio_wrap">
              <div
                :class="`ratio_item ${
                  ratioType === item.value && 'ratio_item_active'
                }`"
                v-for="(item, index) in ratioOptions"
                @click="handleRatioChange(item)"
              >
                <div :class="`ratio_icon ratio_icon_${index + 1}`"></div>
                <div>{{ item.label }}</div>
              </div>
            </div>
          </div>
          <div class="draw-info_item" style="margin-left: 120px" v-if="false">
            <div class="label">导出像素</div>
            <el-select
              size="small"
              v-model="pixelType"
              style="width: 200px; margin-left: 12px"
              disabled
            >
              <el-option
                v-for="item in pixelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div style="margin-top: 18px">
          <div class="item-title">核心描述</div>
          <bwt-form
            :model="model"
            :columns="columns"
            :showFooter="false"
            ref="form"
          ></bwt-form>
        </div>
        <!-- <div class="img-group">
          <div class="item-title">前景：</div>
          <bwt-upload
            ref="upload01"
            title="添加前景图片"
            v-model="model.foregroundUrl"
            :limit="1"
          ></bwt-upload>
        </div>
        <div class="img-group">
          <div class="item-title">后景：</div>
          <bwt-upload
            ref="upload02"
            title="添加后景图片"
            v-model="model.backgroundUrl"
            :limit="1"
          ></bwt-upload>
        </div> -->
        <div class="img-group">
          <div class="item-title">前后景</div>
          <div style="display: flex; height: 88px">
            <bwt-upload
              ref="upload01"
              title="前景"
              v-model="model.foregroundUrl"
              :limit="1"
            ></bwt-upload>
            <bwt-upload
              ref="upload02"
              title="后景"
              v-model="model.backgroundUrl"
              :limit="1"
            ></bwt-upload>
          </div>
        </div>
        <div>
          <div class="item-title">目标客户</div>
          <bwt-form
            :model="peopleModel"
            :columns="peopleColumns"
            :showFooter="false"
            :isNoLable="true"
            ref="form"
            :gutter="12"
          ></bwt-form>
        </div>
        <div>
          <div class="item-title">场景风格</div>
          <el-tabs v-model="activeName" @tab-click="handleTabClick">
            <el-tab-pane
              :label="styleMap[item]"
              :name="item"
              v-for="item in Object.keys(styleMap)"
              :key="item"
            >
              <el-empty
                description="暂无数据～"
                :image-size="50"
                style="padding-top: 0px"
              ></el-empty>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="btn-group">
          <el-button
            class="action-btn"
            type="primary"
            size="large"
            @click="handleGenerate"
            :disabled="loading"
            >生成创意</el-button
          >
        </div>
        <div style="margin-top: 12px">
          <!-- <el-button type="primary" size="large" @click="handleRetry"
            >重试</el-button
          > -->
        </div>
        <!-- <div class="img-list">
          <el-image
            class="img-item"
            v-for="item in imgList"
            :key="item.id"
            :src="item.content"
            :preview-src-list="[item.content]"
          ></el-image>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { uploadPic, generatePic, getGeneratePicList } from "@/api/draw";

export default {
  name: "BwtAi",
  props: {
    title: String,
  },
  data() {
    return {
      model: {
        desc: "",
        foregroundUrl: "",
        // foregroundUrl: [
        //   "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        //   "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        // ], // 前景图地址
        backgroundUrl: "", // 后景图地址
      },
      peopleModel: {},
      imgList: [
        // "https://bsp-oss.bwton.com/bsp-console/20241216/9719238dfa3b47809a99c1eb1e760825.png",
        // "https://bsp-oss.bwton.com/bsp-console/20241216/9badf65beda74b9abf916d71aad2f464.png",
        // "https://bsp-oss.bwton.com/bsp-console/20241216/9719238dfa3b47809a99c1eb1e760825.png",
        // "https://bsp-oss.bwton.com/bsp-console/20241216/9badf65beda74b9abf916d71aad2f464.png",
      ],
      timer: null,
      percentage: 0,
      loading: false,
      activeName: "jiaju",
      styleMap: {
        jiaju: "家具",
        meizhuang: "美妆",
        shuma: "数码",
      },
      record_id: "",
      focusOnMainPic: true, // 是否聚焦在产品主体图
      ratioType: 1,
      ratioOptions: [
        {
          value: 1,
          label: "16:9",
        },
        {
          value: 2,
          label: "16:16",
        },
        {
          value: 3,
          label: "9:16",
        },
      ],
    };
  },

  computed: {
    columns() {
      return [
        {
          prop: "desc",
          label: "核心描述",
          type: "textarea",
          showLabel: false,
          config: {
            placeholder: "输入文字，关键字可逗号隔开",
            rows: 4,
          },
        },
      ];
    },

    peopleColumns() {
      return [
        {
          prop: "sex",
          label: "",
          type: "select",
          span: 4,
          showLabel: false,
          config: {
            placeholder: "性别",
            size: "small",
          },
        },
        {
          prop: "age",
          label: "",
          type: "select",
          span: 4,
          showLabel: false,
          config: {
            placeholder: "年龄",
            size: "small",
          },
        },
      ];
    },

    disabled() {
      return !this.focusOnMainPic;
    },

    pixelType() {
      return this.ratioType;
    },

    pixelOptions() {
      return [
        {
          value: 1,
          label: "3200:1800",
        },
        {
          value: 2,
          label: "3200:3200",
        },
        {
          value: 3,
          label: "1800:3200",
        },
      ];
    },
  },

  created() {},

  methods: {
    async handleGenerate() {
      try {
        // console.log("handleGenerate-->", this.model);
        // return
        if (!this.model.desc) {
          this.$message.error("请填写核心描述");
          return;
        }
        const data = await this.uploadMixPic();
        this.percentage = 0;
        this.loading = true;
        this.handleLoading();
        const res = await this.generatePic(data);
        this.record_id = res?.record_id;
        await this.getGeneratePicList(res?.record_id);
      } catch (err) {
        console.log("handleGenerate err --->", err);
        this.percentage = 0;
        this.loading = false;
        if (err.errType != 1) {
          this.$message.error("生成失败!");
        }
        return Promise.reject(err);
      }
    },

    // 上传混合图
    async uploadMixPic() {
      try {
        const data = await this.$refs.draw.exportMixPicInfo();
        // console.log("uploadMixPic data", data);
        return uploadPic(
          new File([data.data], "mix.png", { type: "image/png" })
        );
      } catch (err) {
        console.log("uploadMixPic err", err);
        return Promise.reject(err);
      }
    },

    // ai图片生成
    async generatePic(ref_pic) {
      const { foregroundUrl, backgroundUrl } = this.model;
      const params = {
        foregroundUrl,
        backgroundUrl,
      };
      return generatePic({
        ref_pic,
        prompt: this.model.desc,
        method: "BACKGROUND_GENERATE",
        tenant_id: 1,
        extend: JSON.stringify(params),
      });
    },

    // 获取ai生成图片
    getGeneratePicList(no) {
      let time = 60;
      this.timer = setInterval(async () => {
        if (time > 0) {
          const data = await getGeneratePicList({
            tenant_id: 1,
            resource: "GENERATE",
            batch_no: no,
          });
          console.log("getGeneratePicList", data);
          if (data.length) {
            this.loading = false;
            this.imgList = [
              ...new Set([
                ...data.map((item) => item.content),
                ...this.imgList,
              ]),
            ];
            this.$message.success("生成成功!");
            clearInterval(this.timer);
          } else {
            time--;
          }
        } else {
          clearInterval(this.timer);
          this.loading = false;
          this.$message.error("生成失败!");
        }
      }, 1000);
    },

    // handlePreImgUpload(file) {
    //   console.log(file);
    // },

    handleImgClick(url) {
      if (this.focusOnMainPic) {
        this.$refs.draw.handleExportJsonData(url);
      }
      // 解决跨域问题，cdn图片转oss地址，临时方案
      const newUrl = `https://bwton-bsp.oss-cn-shanghai.aliyuncs.com/bsp-console${
        url.split("bsp-console")[1]
      }`;
      this.$refs.draw.handleSetNewPic(newUrl);
      this.focusOnMainPic = false;
    },

    handleViewMainPic() {
      this.focusOnMainPic = true;
      this.$refs.draw.setDrawJsonData();
    },

    handleTabClick(tab) {
      //console.log(tab);
    },

    handleRatioChange(item) {
      this.ratioType = item.value;
      this.$refs.draw.handleRatioChange();
    },

    handleRetry() {
      this.percentage = 0;
      this.loading = true;
      this.handleLoading();
      this.getGeneratePicList(this.record_id);
    },

    // 设置进度条
    handleLoading() {
      const timer = setInterval(() => {
        if (this.loading) {
          if (this.percentage <= 98) {
            this.percentage += 1;
          }
        } else {
          this.percentage = 100;
          clearInterval(timer);
        }
      }, 300);
    },

    format(percentage) {
      return `生成中 ${percentage}%`;
    },
  },
};
</script>
<style lang="scss" scoped>
.model-container {
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
  .content {
    display: flex;
    .draw-wrap {
      width: 640px;
      .draw-footer {
        margin-top: 24px;
        display: flex;
        align-items: center;
        .main-btn_wrap {
          margin-right: 24px;
          .main-btn {
            width: 180px;
            height: 70px;
            font-size: 22px;
            border-radius: 8px;
            color: #7b6aed;
            border-color: #d7d2fa;
            background-color: #f2f0fd;
          }
        }
        .ai-img_wrap {
          display: flex;
          background: #fff;
          padding: 6px;
          width: 100%;
          overflow: scroll;
          border-radius: 6px;
          .ai-img-item {
            flex-shrink: 0;
            width: 120px;
            height: 68px;
            margin-right: 6px;
            background: #f6f7fa;
            position: relative;
            .ai-img {
              border-radius: 6px;
              width: 120px;
              cursor: pointer;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate3d(-50%, -50%, 0);
            }
          }
        }
      }
    }
  }
  .desc-wrap {
    margin-left: 60px;
    margin-right: 24px;
    //margin-top: 42px;
    .title {
      font-size: 16px;
      color: #323b4b;
      .ai-text_img {
        height: 14px;
      }
      .label {
        color: #7b6aed;
        padding-left: 2px;
        padding-right: 6px;
        position: relative;
        top: -2px;
      }
    }
    .draw-info_wrap {
      display: flex;
      align-items: center;
      margin-top: 24px;
      .draw-info_item {
        display: flex;
        margin-right: 12px;
        align-items: center;
        .label {
          color: #323b4b;
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
  }
  .img-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 24px;
    .img-item {
      width: 200px;
      margin-right: 10px;
      margin-bottom: 10px;
      border-radius: 6px;
    }
  }
  .img-group {
    //display: flex;
    margin-bottom: 22px;
  }
  .btn-group {
    margin-top: 8px;
    .action-btn {
      height: 60px;
      width: 240px;
      font-size: 22px;
      border-radius: 8px;
    }
  }
  .item-title {
    font-weight: bold;
    font-size: 14px;
    color: #323b4b;
    margin-bottom: 6px;
  }
  .ratio_wrap {
    display: flex;
    align-items: center;
    margin-left: 24px;
    .ratio_item {
      display: flex;
      align-items: center;
      margin-right: 12px;
      height: 36px;
      line-height: 36px;
      width: 104px;
      text-align: center;
      background: #f0f2f5;
      justify-content: center;
      color: #808da5;
      font-size: 18px;
      border-radius: 6px;
      cursor: pointer;
      .ratio_icon {
        width: 12px;
        height: 12px;
        margin-right: 6px;
        border: 1px solid #808da5;
        border-radius: 2px;
      }
      .ratio_icon_1 {
        width: 16px;
        height: 12px;
      }
      .ratio_icon_2 {
        width: 12px;
        height: 12px;
      }
      .ratio_icon_3 {
        width: 12px;
        height: 16px;
      }
    }
    .ratio_item_active {
      color: #7B6AED;
      background: #F2F0FF;
      .ratio_icon {
        border-color: #7B6AED;
      }
    }
  }
}
::v-deep .el-form-item__label {
  font-weight: bold;
  font-size: 14px;
  color: #323b4b;
}
::v-deep .el-textarea__inner {
  background: transparent;
  border-color: #d2d7e2;
}
::v-deep .el-input__inner {
  background: transparent;
  border-radius: 8px;
}
::v-deep .el-upload--picture-card {
  background: transparent;
}
::v-deep .el-tabs__nav-wrap::after {
  display: none;
}
::v-deep .el-tabs__item {
  padding: 0 10px;
  font-weight: normal;
}
::v-deep .el-empty {
  padding-bottom: 12px;
}
::v-deep .el-upload--picture-card {
  width: 112px;
  height: 75px;
  line-height: 75px;
}
::v-deep .el-upload-list--picture-card .el-upload-list__item {
  width: 112px;
  height: 75px;
}
::v-deep .el-textarea__inner {
  //background: #f7f8fc;
  //border: none;
}
</style>
