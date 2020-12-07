import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import VueCompositionApi from '@vue/composition-api';
Vue.use(VueCompositionApi);

// 系统默认的环境变量
console.log(process.env.NODE_ENV);
// 一般用它来干嘛呢？
// 如果是开发模式下 咱们有些配置和线下模式的配置是不一样的
// 在webpack里边 可以做配置
// 项目入口/基本路径publicPath
// 线上和线下基本路径是不一样的，就是主入口是不一样的
// 如果是在线下运行的，那么就在当前根目录
// 那么线下可能就是另一个目录
// 这个就需要根据环境来确定publicPath这个基本路径到底在哪里

// if (process.env.NODE_ENV) {
//     // 开发的时候
// } else {
//     // 线上
// }

// 环境变量是可以定义的：
/*
    自定义环境变量
    如果是线下 npm run serve
        会默认读取 .env.development 文件
    如果是线上 npm run build
        会默认读取 .env.production 文件
*/


// 导入css入口文件
// import "./styles/main.scss";
// 或者
// 可以通过文件vue.config.js文件配置文件

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");