// import { from } from "core-js/fn/array";
import { from } from "core-js/fn/array";
import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login/index.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: "/home"
    },
    {
        path: "/home",
        name: "Home",
        component: () =>
            import ("../views/Home/index.vue"),
    }, {
        path: "/login",
        name: "Login",
        component: Login,
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});


//  //路由守卫（就是看门的）：
//  //已经登陆了，才能跳转home页，没登录的话想都别想
router.beforeEach((to, form, next) => {

    console.log(to); // to是一个对象 // 从哪来
    console.log(form); // form是一个对象 // 到哪去
    console.log(next); // next是一个方法 // 

    const isLogin = localStorage.getItem('ele_login') ? true : false;
    // // localStorage用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。
    // // 读取数据语法

    if (to.path === '/login') {
        // alert("123");
        // if (to.path === '/login') {
        // console.log(localStorage.getItem('ele_login'));
        next();
        // console.log(isLogin);
    } else {
        // console.log(localStorage.getItem('ele_login'));
        // // 是否登录
        // // 没有登陆，不让访问其他页面，只能重定向到登录页面
        // // 如果登录了，就正常next
        // alert("123456")
        // console.log(isLogin);
        // console.log(to.pwxxjath);
        isLogin ? next() : next('/login');
    }
})


export default router;