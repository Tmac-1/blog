<template>
  <div>
    <el-upload
      accept="image/jpg, image/png, image/jpeg, image/gif, image/tga, image/tif, image/raw"
      action="#"
      list-type="picture-card"
      :http-request="handleFileUpload"
      :on-remove="handleRemove"
      :auto-upload="true"
      :limit="limit"
      ref="upload"
      style="margin-right: 12px"
      :fileList="fileList"
      :on-preview="handlePictureCardPreview"
      :class="`${hide && 'hide'}`"
      v-bind="$attrs"
    >
      <div slot="default">
        <div style="line-height: 20px; margin-top: 18px">
          <i class="el-icon-plus c-primary" style="font-size: 14px"></i>
          <div><span style="font-size: 12px; color: #999">{{ title }}</span></div>
        </div>
      </div>
      <!-- <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            class="el-upload-list__item-delete"
            @click="handleDeleteImgRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div> -->
    </el-upload>
    <el-image-viewer
      v-if="dialogVisible"
      :on-close="() => (dialogVisible = false)"
      :url-list="[dialogImageUrl]"
    />
  </div>
</template>
<script>
import { uploadPic } from "@/api/draw";

export default {
  props: {
    title: {
      type: String,
      default: "请上传图片",
    },
    value: [String, Array],
    limit: {
      type: Number,
      default: 10,
    },
    type: String, // miti 多张图片上传 此时value为数组
  },

  data() {
    return {
      dialogVisible: false,
      fileList: [
        // {
        //   url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        // },
      ],
      dialogImageUrl: "",
    };
  },

  computed: {
    hide() {
      return this.limit ? this.fileList.length >= this.limit : false;
    },
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        console.log("val--->", val);
        // 初始化数据
        if (this.type == "muti") {
          if (val.length == 0) {
            this.fileList = [];
          } else {
            if (this.fileList.length == 0) {
              this.fileList = val.map((item, index) => {
                return {
                  url: item,
                  uid: index,
                };
              });
            }
          }
        } else {
          if (val) {
            if (this.fileList.length == 0) {
              this.fileList = [
                {
                  url: val,
                },
              ];
            }
          } else {
            this.fileList = [];
          }
        }
      },
    },
  },

  methods: {
    async handleFileUpload(file) {
      try {
        const data = await uploadPic(file.file);
        if (this.type == "muti") {
        } else {
          this.fileList = [
            {
              url: data,
              uid: file.file && file.file.uid,
            },
          ];
          this.$emit("input", data);
        }
        this.$message.success("上传成功");
      } catch (error) {
        this.$message.error(
          error.errmsg ||
            `图片${file.file && file.file.name}上传失败，请稍后重试！`
        );
        console.log("err-->", error, fileList);
      }
    },

    handleRemove(file, fileList) {
      console.log("handleRemove--->", file, fileList);
      this.fileList = fileList;
      if (this.type == "muti") {
        this.$emit(
          "input",
          fileList.map((item) => item.url)
        );
      } else {
        this.$emit("input", fileList[0] && fileList[0].url);
      }
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.hide {
  ::v-deep .el-upload--picture-card {
    display: none !important;
  }
}
</style>
