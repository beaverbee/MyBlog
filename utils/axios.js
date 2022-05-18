import axios from "axios";
import { message } from "antd";
import { API_BASE_URL } from "../config";

// // axios.defaults.withCredentials = true// Cookie跨域
// axios.defaults.headers = {
//   "Access-Control-Allow-Origin": "http://localhost:6060",
//   "Content-type": "application/x-www-form-urlencoded",
//   // "Access-Control-Allow-Methods": "POST, GET, PUT, OPTIONS, DELETE",
//   "Access-Control-Allow-Credentials":"true"
// };
const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  // withCredentials: true,
});

service.interceptors.request.use((config) => {
if (config.method === "post") {
  // 修改 Content-Type
  config.headers["Content-Type"] = "application/x-www-form-urlencoded";
  // 将对象参数转换为序列化的 URL 形式（key=val&key=val）
  config.data = JSON.stringify(config.data);
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
            message.error(data || "连接错误");
            break;
        }
      }
    }, 1000);
    return Promise.reject(err);
  }
);

export default service;
