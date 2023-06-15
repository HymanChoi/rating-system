import axios from "axios";

// 创建一个实例
const service = axios.create({
  baseURL: "",
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
