import request from "@/utils/request";

// 上传图片
export const uploadPic = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  // formData.append("image", file);
  return request({
    url: "/common/uploadPic",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 生成图片
export const generatePic = (data) => {
  return request({
    url: "/bwe/data/operate/v1/generate",
    data,
  });
};

// 查询生成图片
export const getGeneratePicList = (data) => {
  return request({
    url: "/bwe/data/material/v1/query-list",
    data,
  });
};
