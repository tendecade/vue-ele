// path common.js
const path = require('path');
// console.log('项目的绝对路径', __dirname);
// 
// console.log('项目中某个目录的绝对路径', path.resolve(__dirname, './src/components'));
// 在visual code控制台输出结果为：C:\Users\lenovo\Desktop\vue-ele\src\components

module.exports = {
    // 基本路径
    publicPath: process.env.NODE_ENV === "production" ? '' : '/',
    // 如果是线上production 那应该就是某一个路径
    // 如果是线下development 那就是根目录

    lintOnSave: false, // 是否开启语法检测功能 fasle：关闭
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: true,
        // css预设器配置项
        loaderOptions: {
            scss: {
                prependData: `@import "./src/styles/main.scss";`
            }
        },
    },
    // 配置目录的别名
    configureWebpack: (config) => {
        config.resolve = {
            // 加上下边这句话之后，
            // 在Home.vue文件中import Abc from '@c/HelloWorld';
            // HelloWorld可以不带后缀.vue，不会报错。。。
            // 引入文件的时候不写后缀名。默认加载的文件类型
            extensions: ['.js', '.json', '.vue'],
            // 
            alias: {
                //获取绝对路径
                "@": path.resolve(__dirname, './src'),
                "@c": path.resolve(__dirname, './src/components'),
                "@a": path.resolve(__dirname, './src/assets'),
                "public": path.resolve(__dirname, './public'),
                vue$: "vue/dist/vue.esm.js",
                //和vue.js的区别：
                // vue.esm.js这个里边是通过import导出的一个对象，是vue的一个框架
                // vue.js就是一个正常的插件的一种方式

            }
        }
    },
    // 跨域的核心：两个后台之间相互访问 不存在跨域
    // 中间启一个node代理服务器，node去帮忙请求接口。
    // 代理
    devServer: {
        port: 8081,
        open: true, //启动项目会自动代开浏览器
        // 改变接口 http://localhost:8082/login
        // logLevel: "debug", //查看代理日志
        // 代理:
        proxy: {
            // http: //localhost:8082/login
            // www.web-jshtml.cn/productapi/api/getSms/
            // www.web-jshtml.cn/productapi/getSms/
            '/api': {
                // 以api开头的
                target: "http://www.web-jshtml.cn/productapi/", //目标接口
                // 必须写：生成一个代理服务器
                changeOrigin: true, // 跨域 生成一个localhost:8082域名下的一个node服务器 帮你做代理
                // 重写url
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }

    // http://nodejs.cn/api/path.html#path_path_resolve_paths
}