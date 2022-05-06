import axios from "axios";
import _ from 'lodash'
import { Message } from "element-ui";
import { Loading } from "element-ui";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.baseURL = "//blog-server.hunger-valley.com";
// 添加请求拦截器

let loadingInstance;
function showLoading() {
    loadingInstance = Loading.service({
      fullscreen: true,
      background: "#fff",
    });
}
let hideLoading = _.debounce(() => {
  loadingInstance.close();
}, 300);
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    showLoading();
    return config;
  },
  function (error) {
    hideLoading();
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    hideLoading();
    return response;
  },
  function (error) {
    // 以服务的方式调用的 Loading 需要异步关闭
    hideLoading();
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
