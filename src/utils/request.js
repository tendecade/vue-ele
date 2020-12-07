import axios from "axios";
import { from } from "core-js/fn/array";
import { Message } from 'element-ui';

/*  
    const http = axios.create();

    http.defaults.baseURL = 'http://www.web-jshtml.cn/productapi/';
    // 1.https://www.baidu.com/getSms
    // 与login.js的return axios.request下的method的getSms接口相结合
    // 2.跨域指的是浏览器由于同源策略 不同域名的请求就会出现跨域 
    // 但是如果是两个后台发起的网络请求就不存在跨域
    // 3.baseURL起到的作用：定义当前请求的时候接口的一个共同的域名
*/

const BASEURL = process.env.NODE_ENV === 'development' ? '/api' : '' // /api
const http = axios.create({
    // baseURL: 'http://www.web-jshtml.cn/productapi/',

    baseURL: BASEURL, // http://localhost:8081/api/getSms/
    // 只要url中/api开头的都是接口请求

    // 为什么是在线下代理是api
    // 首先 咱们的所有的网络请求 有的css的图片是不需要的
    // 第二 BASEURL中上线以后就是空了，上线以后都是同一个服务器了，就不需要代理了
});
// 解决跨域：两个后台发起的网络请求就不存在跨域
// 借助一个后台，来请求一个接口，后台需要我们去适配
// 1.设置代理node 在本地生成一个node服务器 用node服务器去访问 就不存在跨域了
//   创建一个index.js  使用node挂载index.js(node index.js)
//   



// 添加请求拦截器
http.interceptors.request.use(
    function(config) {
        // 在发送请求之前做些什么

        // 手动添加请求头参数 token userId csrf
        config.headers.token = "xxxxxxx"
            // console.log("请求参数", config.headers);
        return config;
    },
    function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
http.interceptors.response.use(function(response) {
    console.log(response);

    // 对响应数据做点什么
    if (response.data.resCode != 0) {
        // 提示服务器返回的信息
        // Message.error('错了哦，这是一条错误消息');
        Message.error(response.data.message);
        return Promise.reject(error);
    }
    return response;
}, function(error) {
    // 对响应错误做点什么
    // console.log("响应拦截");
    return Promise.reject(error);
});


export default http;

// export const get_code = () => {
//     Axios.request({
//         // method: 'post',
//         method: 'get',
//         url: '/user/12345',
//         // data: {
//         //     firstName: 'Fred',
//         //     lastName: 'Flintstone'
//         // }
//         Promise: {
//             firstName: 'Fred',
//             lastName: 'Flintstone'
//         }
//     })
// }

// export const get_code = (method, data) => {
//     Axios.request({
//         method: method,
//         url: '/user/12345',
//         data: data
//     })
// }