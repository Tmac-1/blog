<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <el-button type="primary">测试按钮</el-button>
    <el-button type="primary" @click="handleDownload">下载</el-button>
    <el-button type="primary" @click="handleClear">清除画布</el-button>
    <el-button type="primary" @click="handleExport">导出数据</el-button>
    <el-button type="primary" @click="handleImport">导入数据</el-button>
    <!-- <el-button type="primary" @click="handleUpload">上传主图</el-button> -->
    <el-upload
      class="upload-demo"
      action="#"
      :on-change="onChange"
      :auto-upload="false"
      :show-file-list="false"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <!-- <img :src="url" /> -->
    <!-- <bwt-ai title="AI大模型"></bwt-ai> -->
    <div id="pic" style="width: 1000px; height: 600px; background: pink"></div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
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
import test from "./test.png"; // 导入文本编辑器插件

export default {
  name: "home",
  components: {
    // HelloWorld,
  },

  data() {
    return {
      leafer: null,
      img: test,
      app: null,
      url: "",
      exportData: null,
    };
  },

  mounted() {
    // this.$nextTick(() => {
    //   this.test();
    // })
    // this.test2();
    this.test3();
    // this.test4();
    // this.test5();
    // this.test6();
    // this.test7();
  },

  methods: {
    handleClear() {
      this.app.sky.clear();
    },

    handleExport() {
      console.log("handleExport", this.app.sky);
      const data = this.app.sky.toJSON();
      this.exportData = data;
      console.log(data);
      // const leafer = new Leafer({ view: window });
      // const rect = new Rect({
      //   x: 100,
      //   y: 100,
      //   width: 200,
      //   height: 200,
      //   fill: "#32cd79",
      //   draggable: true,
      // });
      // leafer.add(rect);

      // const json = leafer.toJSON();
      // console.log(json);
    },

    handleImport() {
      console.log(
        "handleImport-->",
        JSON.parse(JSON.stringify(this.exportData))
        // this.app.tree.set()
      );
      // this.app.tree.set({ children: this.exportData.children });
      // return 
      // this.app.sky.set({ children: this.exportData.children });
      // const leafer = new Leafer({ view: window , fill: 'black' })
      // leafer.add(this.exportData)
      const leafer = new Leafer({ view: window });

      // const json = {
      //   tag: "Group",
      //   x: 20,
      //   y: 20,
      //   children: [
      //     {
      //       tag: "Rect",
      //       x: 100,
      //       y: 100,
      //       width: 200,
      //       height: 200,
      //       fill: "#32cd79",
      //       draggable: true,
      //     },
      //   ],
      // };
      const json = {
        tag: "Leafer",
        children: [
          {
            tag: "Group",
            children: [
              {
                tag: "Leaf",
                hittable: false,
              },
              {
                tag: "Group",
                children: [
                  {
                    tag: "Leaf",
                    hittable: false,
                    strokeAlign: "center",
                  },
                  {
                    tag: "Leaf",
                    hittable: false,
                    strokeAlign: "center",
                  },
                  {
                    tag: "Group",
                    visible: false,
                    hittable: false,
                    children: [
                      {
                        tag: "Rect",
                      },
                      {
                        tag: "Rect",
                        strokeAlign: "center",
                      },
                    ],
                  },
                ],
              },
              {
                tag: "Group",
                visible: false,
                children: [
                  {
                    tag: "Group",
                    children: [
                      {
                        tag: "Box",
                        name: "rotate-point",
                        width: 15,
                        height: 15,
                        around: "bottom-right",
                        hitFill: "all",
                        children: [],
                      },
                      {
                        tag: "Box",
                        name: "rotate-point",
                        width: 15,
                        height: 15,
                        around: "bottom",
                        hitFill: "all",
                        children: [],
                      },
                      {
                        tag: "Box",
                        name: "rotate-point",
                        width: 15,
                        height: 15,
                        around: "bottom-left",
                        hitFill: "all",
                        children: [],
                      },
                      {
                        tag: "Box",
                        name: "rotate-point",
                        width: 15,
                        height: 15,
                        around: "left",
                        hitFill: "all",
                        children: [],
                      },
                      {
                        tag: "Box",
                        name: "rotate-point",
                        width: 15,
                        height: 15,
                        around: "top-left",
                        hitFill: "all",
                        children: [],
                      },
                      {
                        tag: "Box",
                        name: "rotate-point",
                        width: 15,
                        height: 15,
                        around: "top",
                        hitFill: "all",
                        children: [],
                      },
                      {
                        tag: "Box",
                        name: "rotate-point",
                        width: 15,
                        height: 15,
                        around: "top-right",
                        hitFill: "all",
                        children: [],
                      },
                      {
                        tag: "Box",
                        name: "rotate-point",
                        width: 15,
                        height: 15,
                        around: "right",
                        hitFill: "all",
                        children: [],
                      },
                      {
                        tag: "Box",
                        name: "rect",
                        hitFill: "all",
                        hitStroke: "none",
                        hitRadius: 5,
                        strokeAlign: "center",
                        children: [],
                      },
                      {
                        tag: "Box",
                        name: "circle",
                        around: "center",
                        hitRadius: 5,
                        cursor: "crosshair",
                        strokeAlign: "center",
                        children: [],
                      },
                      {
                        tag: "Group",
                        around: "center",
                        hitSelf: false,
                        children: [
                          {
                            tag: "Box",
                            around: "center",
                            cursor: "pointer",
                            fill: "#FEB027",
                            cornerRadius: 20,
                            children: [
                              {
                                tag: "Text",
                                fill: "white",
                                text: "删除",
                                lineHeight: {
                                  type: "percent",
                                  value: 1.5,
                                },
                                padding: [7, 10],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        tag: "Box",
                        name: "resize-line",
                        width: 10,
                        height: 10,
                        around: "center",
                        hitFill: "all",
                        children: [],
                      },
                      {
                        tag: "Box",
                        name: "resize-line",
                        width: 10,
                        height: 10,
                        around: "center",
                        hitFill: "all",
                        children: [],
                      },
                      {
                        tag: "Box",
                        name: "resize-line",
                        width: 10,
                        height: 10,
                        around: "center",
                        hitFill: "all",
                        children: [],
                      },
                      {
                        tag: "Box",
                        name: "resize-line",
                        width: 10,
                        height: 10,
                        around: "center",
                        hitFill: "all",
                        children: [],
                      },
                      {
                        tag: "Box",
                        name: "resize-point",
                        hitRadius: 5,
                        children: [],
                      },
                      {
                        tag: "Box",
                        name: "resize-point",
                        hitRadius: 5,
                        children: [],
                      },
                      {
                        tag: "Box",
                        name: "resize-point",
                        hitRadius: 5,
                        children: [],
                      },
                      {
                        tag: "Box",
                        name: "resize-point",
                        hitRadius: 5,
                        children: [],
                      },
                      {
                        tag: "Box",
                        name: "resize-point",
                        hitRadius: 5,
                        children: [],
                      },
                      {
                        tag: "Box",
                        name: "resize-point",
                        hitRadius: 5,
                        children: [],
                      },
                      {
                        tag: "Box",
                        name: "resize-point",
                        hitRadius: 5,
                        children: [],
                      },
                      {
                        tag: "Box",
                        name: "resize-point",
                        hitRadius: 5,
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            tag: "Rect",
            x: 300,
            y: 300,
            draggable: true,
            editable: true,
            fill: "#32cd79",
            stroke: "blue",
          },
        ],
      };

      // leafer.add(json.children[0]);
      this.app.tree.set({ children: json.children });
    },

    onChange(file, fileList) {
      console.log(file, fileList);
      let url = URL.createObjectURL(file.raw);
      console.log(url);
      this.url = url;
      const rect = new Rect({
        x: 100,
        y: 100,
        // fill: "#32cd79",
        draggable: true,
        editable: true,
        fill: {
          type: "image",
          url: url,
          mode: "stretch",
        },
      });
      this.app.tree.add(rect);
    },
    async handleDownload() {
      this.app.export("screenshot.png", { screenshot: true });
      // this.app.export('HD.png', { pixelRatio: 2 })
      // const result = await this.app.export("jpg");
      // console.log(result);
    },

    handleUpload() {
      const rect = new Rect({
        x: 100,
        y: 100,
        // fill: "#32cd79",
        draggable: true,
        editable: true,
        fill: {
          type: "image",
          url: require("./test.png"),
        },
      });
      this.app.tree.add(rect);
    },

    test() {
      this.leafer = new Leafer({
        view: window, // 支持 window 、div、canvas 标签对象， 可使用id字符串(不用加 # 号)
        //width: 600, // 不能设置为 0， 否则会变成自动布局
        //height: 600,
      });
      const rect = new Rect({
        x: 100,
        y: 100,
        width: 200,
        height: 200,
        // fill: "#32cd79",
        fill: {
          type: "image",
          //url: "/assets/logo.png",
          url: require("./test.png"),
          //mode: 'cover'
          format: "png",
        },
      });
      this.leafer.add(rect);

      // const image = new Image({
      //   url: "./test.png",
      //   draggable: true,
      // });

      // this.leafer.add(image);
    },
    test2() {
      this.leafer = new Leafer({
        view: "pic", // 支持 window 、div、canvas 标签对象， 可使用id字符串(不用加 # 号)
        width: 1000, // 不能设置为 0， 否则会变成自动布局
        height: 600,
        fill: "black", // 背景色
      });
      const rect = new Rect({
        x: 100,
        y: 100,
        width: 200,
        height: 200,
        fill: "#32cd79", // 背景色
        draggable: true,
      });
      this.leafer.add(rect);
    },

    test3() {
      const app = new App({
        // view: window,
        move: {
          // disabled: true
        },
        view: "pic", // 支持 window 、div、canvas 标签对象， 可使用id字符串(不用加 # 号)
        width: 1000, // 不能设置为 0， 否则会变成自动布局
        height: 600,
        //fill: "pink", // 背景色
        // editor: { buttonsFixed: true }
      });
      // app.ground = app.addLeafer({ type: "draw" });
      app.tree = app.addLeafer({});
      app.sky = app.addLeafer({ type: "draw", usePartRender: false });
      app.editor = new Editor();
      app.sky.add(app.editor);

      const background = new Rect({ width: 800, height: 600, fill: "gray" });
      const rect = new Rect({
        x: 100,
        y: 100,
        //fill: "#32cd79",
        draggable: true,
        // editable: true,
        fill: {
          type: "image",
          url: require("./test.png"),
        },
      });
      const border = new Rect({
        x: 300,
        y: 300,
        stroke: "blue",
        // draggable: true,
        fill: "#32cd79",
        //editable: true,
      });

      // const button = Box.one({
      //   // 添加移除按钮
      //   around: "center",
      //   fill: "#FEB027",
      //   cornerRadius: 20,
      //   cursor: "pointer",
      //   children: [
      //     { tag: "Text", fill: "white", text: "删除", padding: [7, 10] },
      //   ],
      // });
      // app.editor.buttons.add(button);

      // button.on(PointerEvent.TAP, () => {
      //   // 点击删除元素，并取消选择
      //   app.editor.list.forEach((rect) => rect.remove());
      //   app.editor.target = null;
      // });

      // app.ground.add(background);
      // app.tree.add(rect);
      app.sky.add(border);

      // setTimeout(() => {
      //   app.export('screenshot.png', { screenshot: true })
      // })
      this.app = app;
    },

    test4() {
      const div = document.body.appendChild(document.createElement("div"));
      const canvas = document.body.appendChild(
        document.createElement("canvas")
      );

      div.style.height = "600px";
      div.innerText = "请往下滑，会出现一个矩形";

      const leafer = new Leafer({ view: canvas, type: "block", height: 800 });

      const rect = new Rect({
        x: 100,
        y: 100,
        width: 200,
        height: 200,
        fill: "#32cd79",
        cornerRadius: [50, 80, 0, 80],
        draggable: true,
      });

      leafer.add(rect);
    },

    test5() {
      const leafer = new Leafer({
        view: window,
        move: { drag: true },
      });

      leafer.add(Rect.one({ fill: "#32cd79", draggable: true }, 100, 100));
      leafer.add(Rect.one({ fill: "#32cd79", draggable: true }, 300, 100));

      //leafer.config.move.drag = true; // 预览模式，可在应用运行中实时修改。
    },

    test6() {
      const leafer = new Leafer({
        view: window,
        move: { dragOut: true },
      });

      const rect = new Rect({
        x: 100,
        y: 100,
        fill: "#32cd79",
        draggable: true,
      });
      const rect2 = new Rect({
        x: 100,
        y: 300,
        fill: "#32cd79",
        draggable: true,
      });

      leafer.add(rect);
      leafer.add(rect2);
    },

    test7() {
      Platform.image.crossOrigin = "anonymous";
      const app = new App({ view: window });

      app.tree = app.addLeafer({
        // view: "pic", // 支持 window 、div、canvas 标签对象， 可使用id字符串(不用加 # 号)
        // width: 1000, // 不能设置为 0， 否则会变成自动布局
        // height: 600,
        fill: "black", // 背景色
      });
      app.sky = app.addLeafer({
        type: "draw",
        usePartRender: false,
        // view: "pic", // 支持 window 、div、canvas 标签对象， 可使用id字符串(不用加 # 号)
        // width: 1000, // 不能设置为 0， 否则会变成自动布局
        // height: 600,
        // fill: "black", // 背景色
      });

      app.editor = new Editor();
      app.sky.add(app.editor);

      app.tree.add(
        Rect.one(
          { editable: true, fill: "#FFE04B", cornerRadius: [0, 20, 20, 0] },
          300,
          100
        )
      );

      app.tree.add(
        Rect.one(
          {
            editable: true,
            fill: {
              type: "image",
              url: require("./test.png"),
            },
          },
          100,
          100
        )
      );
    },
  },
};
</script>
