import axios from "axios";
// import store from "../store";
// import Message from "@/utils/message";
// import { clearEmptyParam } from "@/utils/utils";

const beforeUrl = window.location.origin + window.location.pathname;

export const baseUrl = `${beforeUrl}base-platform-admin/api/console`;
// export const baseUrl = `${beforeUrl}base-platform-admin/`; // 调用后端本地
// const baseUrl = `${beforeUrl}/api`; // 绕过权限管理台

const service = axios.create({
  baseURL: '/api',
  headers: {
    microFrontends: window.__POWERED_BY_QIANKUN__ ? "y" : null,
    "Content-Type": "application/json; charset=UTF-8",
  },
});

service.interceptors.request.use(
  (config) => {
    // if (store.getters.token) {
    //   config.withCredentials = true;
    // }
    // if (config.method === "get") {
    //   //  给data赋值以绕过if判断
    //   config.data = true;
    // }
    // clearEmptyParam(config);
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    /**
     * code为非0000是抛错
     */
    console.log("response", response);
    const res = response.data;
    if (res.success) {
      return Promise.resolve(res.result);
    }else {
      return Promise.reject(res);
    }
  },
  (error) => {
    console.log("error", error);
    return Promise.reject(error);
  }
);
/**
 * 请求
 * @param {Boolean} showError: 是否展示错误信息，部分接口由调用处控制错误信息展示
 * @returns
 */
const postService = ({
  url,
  data = {},
  headers,
  method = "post",
  showError = true,
}) => {
  return service({
    method,
    url,
    data,
    headers,
    showError,
  });
};

export default postService;
