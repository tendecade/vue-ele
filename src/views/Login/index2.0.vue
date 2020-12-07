<template>
  <div id="Login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li :class='{"current":item.current}'
            v-for="(item,index) in menuTab"
            :key="index"
            @click="toggleMenu(item)">{{item.txt}}</li>
      </ul>
      <el-form :model="ruleForm"
               status-icon
               :rules="rules"
               ref="ruleForm"
               class="login-form"
               size="medium">

        <!-- 输入邮箱 -->
        <el-form-item prop="username"
                      class="from-item">
          <label for="username">邮箱：</label>
          <el-input id="username"
                    type="text"
                    v-model="ruleForm.username"
                    autocomplete="off"></el-input>
        </el-form-item>
        <!-- 输入密码 -->
        <el-form-item prop="password"
                      class="from-item">
          <label for="password">密码：</label>
          <el-input id="password"
                    type="text"
                    v-model="ruleForm.password"
                    autocomplete="off"></el-input>
        </el-form-item>

        <!-- 在注册里边出现，重复输入密码 -->
        <el-form-item prop="password1"
                      class="from-item"
                      v-show='mode=="register"'>
          <label for="password1">重复验证密码：</label>
          <el-input id="password1"
                    type="text"
                    v-model="ruleForm.password1"
                    autocomplete="off"></el-input>
        </el-form-item>

        <!-- 输入验证码 -->
        <el-form-item prop="code"
                      class="from-item">
          <label for="code">验证码：</label>

          <el-row :gutter="10">
            <el-col :span="15">
              <!-- <el-input id="code"
                        v-model.number="ruleForm.code"></el-input> -->
              <!-- 因为validate.js过滤出来的数字不再是数值类型，所以需要将.number去掉 -->
              <el-input id="code"
                        v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success"
                         class="block">发送验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="danger"
                     class="block submita"
                     @click="submitForm('ruleForm')">{{this.mode=='login'?'登录':'注册'}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// 过滤特殊字符
// 还需要在vue.config.js上配置@符 代表src路径

// import { validate_inputValue, test_code, test_password, test_email } from '@/utils/validate.js'
// 对应的正则匹配这些：test_code(value)（没有统一导出变量名，分开导出变量名）

import validateUtils from '@/utils/validate.js'
// 统一导出变量名

export default {
  data () {
    // 验证验证码
    var validateCode = (rule, value, callback) => {
      // console.log(validate_inputValue(value));
      // 过滤器 过滤特殊字符
      this.ruleForm.code = value = validateUtils.validate_inputValue(value, "code");
      // let reg = /^[a-z0-9]{6}$/;  // 将正则移至validate.js文件内了
      if (!value) {
        return callback(new Error('验证码不能为空'));
        // } else if (!reg.test(value)) { // 移入validate.js文件前的 老 版本
        // } else if (test_code(value)) { // 移入validate.js文件后的 新 版本（没有统一导出）
      } else if (validateUtils.test_code(value)) { // 移入validate.js文件后的 新 版本（统一导出）
        callback(new Error('验证码必须是六位数'));
      } else {
        callback();
      }
    };
    // 验证邮箱
    var validateUsername = (rule, value, callback) => {
      // 过滤器 过滤特殊字符
      this.ruleForm.username = value = validateUtils.validate_inputValue(value, "email");
      //   let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      //   严谨模式的邮箱
      // let reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
      // 将正则移至validate.js文件内了
      if (value === '') {
        callback(new Error('请输入邮箱'))
        // } else if (!reg.test(value)) { // 移入validate.js文件前的 老 版本
        // } else if (test_email(value)) { // // 移入validate.js文件后的 新 版本（没有统一导出）
      } else if (validateUtils.test_email(value)) { // // 移入validate.js文件后的 新 版本（统一导出）
        callback(new Error('邮箱格式错误'))
      } else {
        callback()
      }
    }
    // 验证密码
    var validatePassWord = (rule, value, callback) => {
      // 过滤器 过滤特殊字符
      this.ruleForm.password = value = validateUtils.validate_inputValue(value, "password");
      // 验证的字段 输入的值 验证后做什么（回调函数）
      // let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/; // 将正则移至validate.js文件内了
      if (value === '') {
        // 错误了
        callback(new Error('请输入密码'));
        // } else if (!reg.test(value)) { // 移入validate.js文件前的 老 版本
        // } else if (test_password(value)) { // 移入validate.js文件后的 新 版本（没有统一导出）
      } else if (validateUtils.test_password(value)) { // 移入validate.js文件后的 新 版本（统一导出）
        callback(new Error('密码格式不正确，长短在6-20左右!'));
      } else {
        // 正确
        callback();
      }
    };

    // 验证重复密码
    var validatePassWord1 = (rule, value, callback) => {
      // v-show只是隐藏了元素，但是没有从Dom树上移除，影响登录界面的提交
      // 为了消除这个影响，必须加上这一句话：
      if (this.mode == "login") {
        callback()
        return
      }
      // 过滤器 过滤特殊字符
      this.ruleForm.password1 = value = validateUtils.validate_inputValue(value, "password1");
      // 验证的字段 输入的值 验证后做什么（回调函数）
      if (value != this.ruleForm.password) { // 
        // 验证与上边的密码框内容是否一样
        callback(new Error('两次密码不一致'));
      } else {
        // 正确
        callback();
      }
    };

    return {
      mode: "login",
      menuTab: [
        { txt: "登录", current: true, type: "login" },
        { txt: "注册", current: false, type: "register" }
      ],
      // 表单input的双向数据绑定
      ruleForm: {
        username: '',
        password: '',
        password1: '',
        code: ''
      },
      // 校验方式
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassWord, trigger: 'blur' }
        ],
        password1: [
          { validator: validatePassWord1, trigger: 'blur' }
        ],
        code: [
          { validator: validateCode, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    toggleMenu (item) {
      console.log(item); // 指的是当前点击的那个item
      // 循环数组menuTab里边所有的current，使其都为false
      this.menuTab.map(itema => itema.current = false);
      // 相当于下边这个函数：
      // this.menuTab.map(function (itema) {
      //   console.log(itema);
      //   itema.current = false;
      // })
      // item代表的是当前点击的li，使得当前点击的li的current为true
      item.current = true;
      // 切换mode的值 切换mode值为当前注册或登录 
      this.mode = item.type;
    },
    // 提交
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>
<style lang="scss">
#Login {
  height: 100vh; // 100% vh是基于浏览器的可视区域处理的
  background-color: #344a5f;
}
.login-wrap {
  width: 329px;
  height: 652px;
  margin: 0px auto 0 auto;
  box-sizing: content-box;
  // border: 1px solid white;
}
.menu-tab {
  text-align: center;
  // margin-top: 250px;
  padding-top: 250px;
  margin-bottom: 37px;
  li {
    display: inline-block;
    width: 88px;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: white;
    border-radius: 2px;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  label {
    display: block;
    color: white;
    font-size: 14px;
    margin-bottom: 3px;
    line-height: 12px;
    height: 12px;
    font-size: 12px;
    margin-top: 1px;
    margin-bottom: 12px;
  }
  // .form-item {
  //   margin-bottom: 13px;
  // }
}
.block {
  display: block;
  width: 100%;
}
.submita {
  margin-top: 10px;
}
</style>
/*
let a=10;
let b=a;
b=3;
console.log(a);//10
console.log(b);//3


let a=[1,2,3];
let b=a;//数据的拷贝
b[1]=100;
console.log(a);//[1,100,3];
console.log(b);//[1,100,3];


let a=[1,2,3];
let b=a;//地址 指针的赋值，引用赋值
b[1]=100;
console.log(a);//[1,100,3];
console.log(b);//[1,100,3];


let a={name:'zhangsan',age:18};
let b=a;//指针赋值
let b={name:"lisi"};//当b执行这一步操作时，就相当于将b的指针指向了{name:"lisi"}
console.log(a);//zhangsan


let a={name:'zhangsan',age:18};
let b=a;//指针赋值
let b.name=lisi;
console.log(a);//lisi
*/