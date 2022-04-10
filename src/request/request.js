import axios from "axios";

import { Message } from "element-ui";
import { Loading } from "element-ui";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.baseURL = "//blog-server.hunger-valley.com";
// 添加请求拦截器
let count = 0;
console.log(count)
let loadingInstance;
axios.interceptors.request.use(
  function (config) {
    count ++
    // 在发送请求之前做些什么
    if(count>=1){
        loadingInstance = Loading.service({ fullscreen: true, background: "#fff" });
    }
    
    return config;
  },
  function (error) {
    this.$nextTick(() => {
      // 以服务的方式调用的 Loading 需要异步关闭
      loadingInstance.close();
    });
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {

    // 对响应数据做点什么
    count--
    if(count<=0){
        loadingInstance.close();
        
    }
    

    // loadingInstance=Loading.service({ fullscreen: true });
    // this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
    //     loadingInstance.close();
    //   });
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    this.$nextTick(() => {
      // 以服务的方式调用的 Loading 需要异步关闭
      loadingInstance.close();
    });
    return Promise.reject(error);
  }
);

export default function request(url, type = "GET", data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type,
    };
    if (type.toLowerCase() === "get") {
      option.params = data;
    } else {
      option.data = data;
    }
    if (localStorage.token) {
      axios.defaults.headers.common["Authorization"] = localStorage.token;
    }

    axios(option)
      .then((res) => {
        if (res.data.status === "ok") {
          if (res.data.token) {
            localStorage.token = res.data.token;
          }
          resolve(res.data);
        } else {
          Message.error(res.data.msg);
          reject(res.data);
        }
      })
      .catch(() => {
        Message.error("网络异常");
        reject({ msg: "网络异常" });
      });
  });
}
