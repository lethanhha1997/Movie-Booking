import axios from 'axios';
import { ACCESS_TOKEN, TOKEN, URL_API } from './setting';
export const http = axios.create({
  baseURL: URL_API,
  timeout: 20000
});

http.interceptors.request.use(config => {

  config.headers = {
    ...config.headers,
    'TokenCybersoft': TOKEN,
    'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
