import axios from "axios";
import { message } from "antd";
import { API_BASE_URL } from "../config";

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

service.interceptors.request.use((config) => {
  if (config.method === "post") {
    // 修改 Content-Type
    config.headers["Content-Type"] =
      "application/x-www-form-urlencoded;charset=UTF-8";
  }
  return config;
});

let timer;

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (err.response) {
        const { status, data } = err.response;
        switch (status) {
          case 401:
            message.error("登录信息过期或未授权，请重新登录！");
            break;
          default:
            message.error("异次元连接失败，请稍后");
            break;
        }
      }
    }, 1000);
    return Promise.reject(err);
  }
);

export default service;
