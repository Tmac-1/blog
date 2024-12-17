<template>
  <div class="container">
    <div class="action-area" v-if="false">
      <el-upload
        action=""
        :on-change="onChange"
        :auto-upload="false"
        :show-file-list="false"
        accept="image/jpg, image/png, image/jpeg"
      >
        <el-button size="small" type="primary" :disabled="disabledUploadBtn"
          >上传主体图</el-button
        >
      </el-upload>
      <el-button
        style="width: 100px; margin-left: 12px"
        size="small"
        type="primary"
        @click="handleDownload"
      >
        下载合成图
      </el-button>
      <el-select
        size="small"
        v-model="ratioType"
        style="width: 100px; margin-left: 12px"
        @change="handleRatioChange"
      >
        <el-option
          v-for="item in ratioOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select
        size="small"
        v-model="pixelType"
        style="width: 120px; margin-left: 12px"
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
      <!-- <el-button size="small" type="primary" @click="handleTest">测试</el-button> -->
      <!-- <el-button size="small" type="primary" @click="handleSetNewPic"
        >设置主体图</el-button
      > -->
    </div>
    <div class="bwt-draw" :style="`width:${width}px;height:${width}px`">
      <div
        id="pic"
        :class="`pic ${ratioType == 1 && 'pic1'} ${ratioType == 3 && 'pic3'}`"
        :style="`width:${picWidth}px;height:${picHeight}px`"
      ></div>
      <div class="main-upload_btn" v-if="showMainUploadBtn">
        <el-upload
          action=""
          :on-change="onChange"
          :auto-upload="false"
          :show-file-list="false"
          accept="image/jpg, image/png, image/jpeg"
        >
          <el-button
            size="small"
            type="primary"
            class="upload-btn"
            :disabled="disabledUploadBtn"
            >上传主体图</el-button
          >
        </el-upload>
      </div>
    </div>
  </div>
</template>
<script>
import {
  App,
  Leafer,
  Rect,
  Platform,
  Image,
  Box,
  PointerEvent,
} from "leafer-ui";
import { Editor } from "@leafer-in/editor"; // 导入图形编辑器插件
import axios from "axios";

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    ratioType: {
      type: Number,
      default: 1, // // 画板比例 1-16:9 2-16:16 3-9:16
    },
  },

  data() {
    return {
      width: 640,
      height: 640,
      // ratioType: 1, // 画板比例 1-16:9 2-16:16 3-9:16
      app: null,
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
      url: null,
      drawJsonData: null, // 画布导出数据，用于回溯
      isViewBigPic: false,
      mainPicUrl: "", // 主图在线url
      rect: null,
      newPicRect: null,
    };
  },

  computed: {
    picWidth() {
      if (this.ratioType == 1) {
        return this.width;
      } else if (this.ratioType == 2) {
        return this.width;
      } else if (this.ratioType == 3) {
        return (this.width * 9) / 16;
      }
    },

    picHeight() {
      if (this.ratioType == 1) {
        return (this.width * 9) / 16;
      } else if (this.ratioType == 2) {
        return this.width;
      } else if (this.ratioType == 3) {
        return this.width;
      }
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

    disabledUploadBtn() {
      return !!this.url || this.disabled;
    },

    pixelType() {
      return this.ratioType;
    },

    showMainUploadBtn() {
      if (this.isViewBigPic) {
        return false;
      } else {
        return !this.url;
      }
    },
  },

  mounted() {
    this.init();
  },

  methods: {
    handleTest() {
      this.app.editor.target = null;
    },

    init() {
      console.log("init-->", this.picWidth, this.picHeight);
      const app = new App({
        view: "pic", // 支持 window 、div、canvas 标签对象， 可使用id字符串(不用加 # 号)
        //width: this.picWidth, // 不能设置为 0， 否则会变成自动布局
        //height: this.picHeight,
        //fill: "#dedede", // 背景色
      });

      app.sky = app.addLeafer({ type: "draw", usePartRender: false });
      app.editor = new Editor();
      app.sky.add(app.editor);

      // const border = new Rect({
      //   x: 100,
      //   y: 100,
      //   stroke: "blue",
      //   draggable: true,
      //   fill: "#32cd79",
      //   editable: true,
      // });
      // app.sky.add(border);

      // 添加移除按钮
      const button = Box.one({
        around: "center",
        fill: "#FEB027",
        cornerRadius: 20,
        cursor: "pointer",
        children: [
          { tag: "Text", fill: "white", text: "删除", padding: [7, 10] },
        ],
      });
      app.editor.buttons.add(button);

      button.on(PointerEvent.TAP, () => {
        // 点击删除元素，并取消选择
        app.editor.list.forEach((rect) => rect.remove());
        app.editor.target = null;
        this.url = null;
      });

      this.app = app;
    },

    async onChange(file, fileList) {
      console.log(file, fileList);
      let url = URL.createObjectURL(file.raw);
      this.url = url;
      // console.log(url);
      const { w, h } = await this.getPicWH(file.raw);
      const { width, height } = this.setPicWH(w, h);
      const { x, y } = this.setPicCoord(width, height);
      console.log("原始宽高-->", w, h);
      console.log("渲染宽高-->", width, height);
      console.log("渲染坐标-->", x, y);
      const rect = new Rect({
        x,
        y,
        draggable: true,
        editable: true,
        fill: {
          type: "image",
          url: url,
          mode: "stretch",
        },
        width,
        height,
      });
      this.rect = rect;
      this.app.sky.add(rect);
    },

    // 获取图片原始宽高
    getPicWH(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = function (e) {
          let txt = e.target.result;
          let img = document.createElement("img");
          img.src = txt;
          img.onload = function () {
            // console.log("宽度：", img.width);
            // console.log("高度：", img.height);
            resolve({
              w: img.width,
              h: img.height,
            });
          };
        };
        reader.readAsDataURL(file);
      });
    },

    // 设置图片宽高
    setPicWH(w, h) {
      // console.log("setPicWH-->", w, h);
      // 图片的宽或者高大于画板的宽或者高的1/2，需要进行缩放 (设置成画布大小的1/3)
      let width = w;
      let height = h;

      if (w > this.picWidth / 2 || h > this.picHeight / 2) {
        // if (this.ratioType == 1) {
        // 根据图片的宽高，来决定根据宽度还是高度进行缩放
        if (w >= h) {
          // 宽度大于高度，根据宽度缩放
          width = this.picWidth / 3;
          height = (h / w) * width;
        } else {
          // 高度大于宽度，根据高度缩放
          height = this.picHeight / 3;
          width = (w / h) * height;
        }
        // }
      }
      return {
        width,
        height,
      };
    },

    // 设置图片坐标
    setPicCoord(w, h) {
      // console.log('setPicCoord-->', w, h);
      const center_x = this.picWidth / 2;
      const center_y = this.picHeight / 2;
      let x = 0;
      let y = 0;
      x = center_x - w / 2;
      y = center_y - h / 2;
      console.log(x, y);
      return {
        x,
        y,
      };
    },

    handleRatioChange() {
      this.app.destroy();
      this.init();
    },

    // 设置新图片画报
    handleSetNewPic(url) {
      this.isViewBigPic = true;
      this.rect?.remove() 
      //this.app.sky.clear(); // 清空并销毁所有子元素
      const rect = new Rect({
        x: 0,
        y: 0,
        draggable: false,
        editable: false,
        fill: {
          type: "image",
          url,
          mode: "stretch",
        },
        width: this.picWidth,
        height: this.picHeight,
      });
      // this.url = "https://img0.baidu.com/it/u=2191392668,814349101&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1399"
      // this.url = "https://bsp-oss.bwton.com/bsp-console/20241212/9d7ed8ebc50242e192e6517d5009b4ec.png";
      this.newPicRect = rect
      this.app.sky.add(rect);
    },

    // 导出画布json数据
    handleExportJsonData() {
      if (this.url) {
        this.drawJsonData = JSON.parse(JSON.stringify(this.app.sky.toJSON()));
        console.log("handleExportJsonData", this.drawJsonData);
      }
    },

    // 设置画布数据
    setDrawJsonData() {
      // console.log("setDrawJsonData", this.drawJsonData, this.app.sky);
      // this.isViewBigPic = false;
      // this.app.sky.set(data.children)
      // if (this.drawJsonData) {
      //   //this.app.sky.set(this.drawJsonData);
      // }
      console.log("setDrawJsonData", this.rect, this.newPicRect);
      this.isViewBigPic = false;
      this.app.sky.clear(); // 清空并销毁所有子元素
      this.init()
      if(this.rect) {
        this.app.sky.add(this.rect)
      }
      return
      if(!this.url) return
      this.app.sky.clear(); // 清空并销毁所有子元素
      const rect = new Rect({
        x: 0,
        y: 0,
        draggable: false,
        editable: true,
        fill: {
          type: "image",
          url: this.url,
          mode: "stretch",
        },
        width: this.picWidth,
        height: this.picHeight,
      });
      // this.url = "https://img0.baidu.com/it/u=2191392668,814349101&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1399"
      // this.url = "https://bsp-oss.bwton.com/bsp-console/20241212/9d7ed8ebc50242e192e6517d5009b4ec.png";
      this.app.sky.add(rect);
    },

    // 导出
    exportMixPicInfo() {
      if (this.url) {
        this.app.editor.target = null;
        return this.app.export("png", { blob: true, scale: 1 });
      } else {
        this.$message.error("请先上传主体图片");
        return Promise.reject({
          errType: 1,
          message: "请先上传图片",
        });
      }
    },

    // 下载
    handleDownload() {
      if (this.url) {
        this.app.editor.target = null;
        setTimeout(() => {
          this.app.export("HD.png", { pixelRatio: 10, scale: 2 });
        }, 100);
      } else {
        this.$message.error("请先上传主体图片");
      }
    },
  },
};
</script>
<style scoped lang="scss">
.container {
  .action-area {
    display: flex;
    margin-bottom: 12px;
  }
  .bwt-draw {
    //color: red;
    //width: 500px;
    //height: 500px;
    background: #f7f8fc;
    border-radius: 8px;
    position: relative;
    .main-upload_btn {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      .upload-btn {
        width: 106px;
        height: 50px;
        font-size: 15px;
        border-radius: 8px;
        font-weight: normal;
      }
    }
    .pic {
      position: absolute;
      background: #e4e6f0;
      border-radius: 8px;
    }
    .pic1 {
      top: 50%;
      transform: translateY(-50%);
    }
    .pic3 {
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
