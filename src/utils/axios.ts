import axios from "axios";

// 创建一个实例
const service = axios.create({
  baseURL: "",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // 添加apikey
    config.params.apikey = "0df993c66c0c636e29ecbb5344252a4a";
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
