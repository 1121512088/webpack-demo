import axios from "axios";
import Qs from "qs";
import config from "./projectConfig";

const service = axios.create({
  baseURL: config.getHostUrl, // 该参数前缀未有 http / https 则会原基础上增加localhost:8080字段
  timeout: 30000, // 超时
});

// 请求拦截
service.interceptors.request.use(config => {
  const nConfig = {
    ...config,
    method: (config.method || 'GET').toUpperCase(),
    headers: {
      // ...config?.headers,
      'Content-Type': 'application/json;charset=utf-8',
      '_token': `${config.Token} ${localStorage.token}`,
    },
    data: Qs.stringify({
      ...config?.data || {},
    }),
  };
  return nConfig;
}, error => {
  return error;
});

// 响应拦截
service.interceptors.response.use(response => {
  switch (response.status) {
    case 200:
      return { ...response, success: true };
    default: return response;
  }
}, error => {
  return { status: 404, success: false, data: {} };
});

export default service;
