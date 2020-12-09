<template>
  <div id="Login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li :class="{ current: item.current }"
            v-for="(item, index) in menuTab"
            :key="index"
            @click="toggleMenu(item)">
          {{ item.txt }}
        </li>
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
                      v-show="mode == 'register'">
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
                         class="block"
                         :disabled="codeButtonStatus"
                         @click="getCode">{{codeButtonText}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="danger"
                     class="block submita"
                     @click="submitForm('ruleForm')"
                     :disabled="buttonStatus">{{ this.mode == "login" ? "登录" : "注册" }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import validateUtils from "@/utils/validate.js";
// 统一导出变量名

import { onMounted, reactive, ref } from "@vue/composition-api";

import { get_code, do_register, do_login } from "@/api/login.js";

export default {
  setup (prop, { refs, root }) {
    //----生命周期--------------------------------------生命周期----------------------------------生命周期----

    // onMounted(() => {
    //   get_code()
    //     .then(res => {
    //       console.log(res);
    //     })
    //     .catch(err => {
    //       console.log("请求错误", err);
    //     });
    // });

    //----data--------------------------------------data----------------------------------data----
    /*
         改动一：将验证码，密码，邮箱，重复密码前的var改为let
         改动二：将这四个方法中的"this."去掉
         改动三：不能直接使用mode获取mode的值，需要使用mode.value获取mode的值
         改动四：将对象格式转化为箭头函数，不能使用逗号
    */

    const status_username = ref(false);
    const status_password = ref(false);
    const status_password1 = ref(false);

    //  验证验证码
    let validateCode = (rule, value, callback) => {
      ruleForm.code = value = validateUtils.validate_inputValue(value, "code");
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else if (validateUtils.test_code(value)) {
        callback(new Error("验证码必须是六位数"));
      } else {
        callback();
      }
    };
    // 验证邮箱
    let validateUsername = (rule, value, callback) => {
      ruleForm.username = value = validateUtils.validate_inputValue(
        value,
        "email"
      );
      if (value === "") {
        status_username.value = false;
        callback(new Error("请输入邮箱"));
      } else if (validateUtils.test_email(value)) {
        status_username.value = false;
        callback(new Error("邮箱格式错误"));
      } else {
        status_username.value = true;
        callback();
      }
    };
    // 验证密码
    let validatePassWord = (rule, value, callback) => {
      ruleForm.password = value = validateUtils.validate_inputValue(
        value,
        "password"
      );
      if (value === "") {
        status_password.value = false;
        callback(new Error("请输入密码"));
      } else if (validateUtils.test_password(value)) {
        // 移入validate.js文件后的 新版本（统一导出）
        status_password.value = false;
        callback(new Error("密码格式不正确，长短在6-20左右!"));
      } else {
        status_password.value = true;
        callback();
      }
    };
    // 验证重复密码
    let validatePassWord1 = (rule, value, callback) => {
      if (mode.value == "login") {
        callback();
        return;
      }
      ruleForm.password1 = value = validateUtils.validate_inputValue(
        value,
        "password1"
      );
      if (value != ruleForm.password) {
        status_password1.value = false;
        callback(new Error("两次密码不一致"));
      } else {
        status_password1.value = true;
        callback();
      }
    };

    // 定义tab切换模式
    const mode = ref("login");
    // 定义表单相关数据
    const menuTab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" }
    ]);
    // input绑定的数据
    const ruleForm = reactive({
      username: "",
      password: "",
      password1: "",
      code: ""
    });
    // 校验方式
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassWord, trigger: "blur" }],
      password1: [{ validator: validatePassWord1, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }]
    });

    // true按钮禁用      false按钮启用
    // 定义登录注册按钮默认的启用和禁用
    const buttonStatus = ref(true);
    // 定义验证码按钮的启用和禁用
    const codeButtonStatus = ref(false);
    // 定义验证码按钮的内置文本
    const codeButtonText = ref('获取验证码');
    // 定义 验证码延迟定时器
    const timer_delay = ref(null)
    // 定义 验证码倒计时定时器
    const timer_count_down = ref(null);

    //----methods--------------------------------------methods----------------------------------methods----
    /*
         改动一：给toggleMenu和submitForm使用const定义变量名
         改动二：去掉全部的"this."
         改动三：为了得到mode的值，需要给mode添加一个".value"
         改动四：将对象格式转化为箭头函数，中间不能使用逗号分割
    */

    //  切换
    const toggleMenu = item => {
      console.log(item); // 指的是当前点击的那个item
      // 循环数组menuTab里边所有的current，使其都为false
      menuTab.map(itema => (itema.current = false));
      // item代表的是当前点击的li，使得当前点击的li的current为true
      item.current = true;
      // 切换mode的值 切换mode值为当前注册或登录
      mode.value = item.type;
      // 登录注册切换时清空input内容 还原初始化
      refs["ruleForm"].resetFields();
      // 切换时 还原验证码的相关状态
      resetCodeButton();
      // 还原登录注册按钮状态 切换之后禁用
      buttonStatus.value = true;
    };

    // 提交
    const submitForm = (formName => {
      refs[formName].validate((result) => {
        if (result) {
          // alert("submit!");
          // 执行登录注册 
          mode.value === 'login' ? doLogin() : doRegister();
        } else {
          // console.log("error submit!!");
          // console.log(result);
          return false;
        }
      });
    });

    // 获取验证码
    const getCode = (() => {
      console.log("send code");

      const { result, filed } = validateFileds()
      let offset = 0
      // 判断邮箱格式 密码 重复密码 的格式
      if (!result) { //返回true 验证通过
        filed.map(item => {
          offset += 40
          root.$message({
            type: 'error',
            offset: offset,
            message: `错误字段:${item.message}`,
            duration: 2000
          })
          // root.$message.error(`错误字段:${item.filed}`);
        })
        return false;
      }

      // 判断如果没有邮箱/不存在
      // if (ruleForm.username == '') {
      //   root.$message.error("邮箱不能为空！");
      //   return false
      // }

      // // 让按钮禁用 显示发送中
      // codeButtonStatus.value = true;
      // codeButtonText.value = "发送中...";
      // 相当于：
      setCodeButtom({
        status: true,
        text: '发送中...'
      })

      // 为了模拟网络延迟 使用一次性定时器
      timer_delay.value = setTimeout(() => {
        const data = {
          username: ruleForm.username,
          module: mode.value
        }
        get_code(data).then((res) => {
          // 获取到对应的验证码
          root.$message.success(res.data.message);
          // 显示倒计时 这是个函数 需要定义
          countDown(15)
          // 登录注册按钮启用
          buttonStatus.value = false
        }).catch((err) => {
          console.log("请求错误", err);
        })
      }, 3000)

    });

    //----辅助方法--------------------------------------辅助方法----------------------------------辅助方法----

    // 倒计时一分钟 验证码定时器的倒计时效果
    const countDown = (timer) => {
      if (timer_count_down.value) {//如果已经存在定时器，那就清空
        clearInterval(timer_count_down.value);
      }
      // 周期性定时器
      timer_count_down.value = setInterval(() => {
        timer--;
        // console.log(typeof timer)
        // timer等于零的时候 清除定时器
        if (timer === 0) {
          // 清除定时器
          clearInterval(timer_count_down.value);

          // // 显示重新发送
          // codeButtonText.value = '获取验证码'
          // // 启用发送按钮
          // codeButtonStatus.value = false;、
          // 相当于：
          setCodeButtom({
            status: false,
            text: '获取验证码'
          })

        } else {
          codeButtonText.value = `重新发送(${timer}s)`
        }
      }, 1000)
    }

    // 切换时 还原验证码的相关状态
    const resetCodeButton = () => {
      // 默认是启用 而且是一个发送中
      // codeButtonText.value = '获取验证码'
      // codeButtonStatus.value = false;
      // 相当于：
      setCodeButtom({
        status: false,
        text: '获取验证码'
      })
      // 清空所有定时器
      clearTimeout(timer_delay.value);
      clearInterval(timer_count_down.value);
    }

    // 设置获取验证码的相关状态
    const setCodeButtom = ({ status, text }) => {
      codeButtonStatus.value = status;
      codeButtonText.value = text;
    }

    // 执行登录
    const doLogin = () => {
      const data = {
        username: ruleForm.username,
        password: ruleForm.password,
        code: ruleForm.code
      }
      // 执行登录
      do_login(data).then(res => {
        root.$message.success(res.data.message);
      }).catch(err => {
        console.log(err);
      })
    }

    // 执行注册
    const doRegister = () => {
      const data = {
        username: ruleForm.username,
        password: ruleForm.password,
        code: ruleForm.code
      }
      // 执行注册
      do_register(data).then(res => {
        // console.log(res);
        // 提示注册成功完成
        root.$message.success(res.data.message);
        // 执行完注册之后（注册成功后）直接跳转到登录页面
        toggleMenu(menuTab[0]);
      }).catch(err => {
        console.log(err);
      })

    }

    // 发送验证码时验证相关字段
    const validateFileds = () => {
      // console.log(refs['ruleForm'].validateFiled('username'));
      // let _filed = status_username.value ? '' : '邮箱格式错误';
      const _filed_arr = [
        { filed: 'username', flag: status_username.value, message: "邮箱格式不正确" },
        { filed: 'password', flag: status_password.value, message: "密码格式不正确" },
        { filed: 'password1', flag: status_password1.value, message: "重复密码不正确" }
      ].filter(item => !item.flag)
      console.log(_filed_arr);
      return {
        result: status_username.value && status_password.value && status_password1.value,
        filed: _filed_arr
      }
    }

    // 要是想在模板中使用，必须return出去
    return {
      mode,
      menuTab,
      ruleForm,
      toggleMenu,
      submitForm,
      rules,
      getCode,
      buttonStatus,
      codeButtonText,
      codeButtonStatus,
    };
  }
};
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
  padding-top: 220px;
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
