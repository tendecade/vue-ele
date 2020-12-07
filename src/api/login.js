import axios from "@/utils/request.js";
// // 对应login下面的文件
// // 自动导入
// // 请求和响应进行拦截

//请求 和响应 拦截
//获取验证码
export const get_code = (data) => {
    // 系统默认的环境变量
    // console.log(process.env.NODE_ENV);

    return axios.request({
        method: "post",
        url: "/getSms/",
        // 与https://www.baidu.com结合形成https://www.baidu.com/getSms
        // 但是会报错：（跨域导致的）
        /*
           // 跨域指的是浏览器由于同源策略 不同域名的请求就会出现跨域 
           // 但是如果是两个后台发起的网络请求就不存在跨域
            Access to XMLHttpRequest at 'https://www.baidu.com/getSms/' from 
            origin 'http://localhost:8081' has been blocked by 
            CORS policy: Response to preflight request doesn't 
            pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
        */

        data
        // data放空，请求也能发，只不过是没有传参数而已
    });
    // 错误码：resCode只要不是零 就表示错误
    // resCode是零，才表示正确

};
// 登录

// 注册