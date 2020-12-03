/*
    用来过滤input框中的特殊字符
*/
// function  stripscript(s)  {    
//     var  pattern  =  new  RegExp("[`+-_/`][——、^~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]") ;
//     // 
//     var  rs  =  "";    
//     for  (var  i  =  0;  i  <  s.length;  i++)  {
//         rs  =  rs  +  s.substr(i,  1).replace(pattern,  '');        
//     }    
//     return  rs;    
// }
// 箭头函数，增加命名
// export导出
const validate_inputValue = (s, type) => {    
    if (type == 'email') {
        var  pattern  =  new  RegExp("[`~!#$^+&-*()_=|{}':;',\\[\\]<>/?~！#￥……&*（）%&;—|{}【】‘；：”“'。，、？]") ;
    } else {
        var  pattern  =  new  RegExp("[`@~!#$^+&-*()_=|{}':;',\\[\\]<>/?~！@#￥……&*（）%&;—|{}【】‘；：”“'。，、？]") ;
    }
    var  rs  =  "";    
    for  (var  i  =  0;  i  <  s.length;  i++)  {
        rs  =  rs  +  s.substr(i,  1).replace(pattern,  '');        
    }    
    return  rs;    
}


// 验证验证码
const test_code = (value) => {
    let reg = /^[a-z0-9]{6}/;
    return !reg.test(value);
};
// 验证密码
// 验证重复密码
const test_password = (value) => {
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return !reg.test(value);
};
// 验证邮箱
const test_email = (value) => {
    let reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    return !reg.test(value);
};


// 1.这样可以直接导出，分开导出，需要在对应的页面的script开头引入变量名
//     （如：login文件夹下的index.vue项目的script内开头引入
//          import { validate_inputValue, test_code, test_password, test_email } from '@/utils/validate.js'）
// 前提条件：每个const命名的变量名之前都有一个export（导出）如：（export const test_email = (value) => {）

// 2.也可以去掉每个const命名的变量名之前的export，将变量名都写在一块儿，统一导出
// 在对应的页面的script开头引入该js文件
export default {
    validate_inputValue,
    test_code,
    test_password,
    test_email
}