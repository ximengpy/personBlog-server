
const express = require("express");
const svgCaptcha = require("svg-captcha");
const userDB = require("../../db/user")

let router = express.Router();
let registerCode = {}
//注册的API
router.post("/",(req,res)=>{
  let {user,pwd,svgCode} = req.body;


  //验证数据有效性
  if (!user || !pwd || !svgCode){
    res.send({
      code : 1,
      msg : "数据无效，请检查后再注册。"
    });
    return;
  }

  //后端再次验证验证码
  if (svgCode.toLocaleLowerCase() !== registerCode.text.toLocaleLowerCase()) {
    res.send({
      code : 2,
      msg : "验证码错误"
    });
    return;
  }


  //检测用户名是否重复
  userDB.findOne({user})
    .then(data=>{
      /*data如果有值(是一个对象)，说明user重复
      * data如果没有值（是null），说明user不重复
      * */
      if (data){
        res.send({
          code : 3,
          msg : "用户名已存在"
        });
      }else{
        //用户名不存在，接着存数据到数据库
        userDB.create({user,pwd})
          .then(d=>{
            //走到这里说明注册成功
            res.send({
              code : 0,
              msg : "注册成功"
            });
          })
          .catch(e=>{
            res.send({
              code : 4,
              msg : "服务器错误"
            });
          });
      }
    })
    .catch(e=>{
      res.send({
        code : 4,
        msg : "服务器错误"
      });
    });

});

//验证码请求接口
router.post("/vcode",(req,res)=>{

  let captcha = svgCaptcha.create({
    size: 4, // 验证码长度
    ignoreChars: '0o1i', // 验证码字符中排除 0o1i
    noise: 1, // 干扰线条的数量
  });
  registerCode = captcha;

  //将svg发送到前端
  res.send({
    code : 0,
    data : captcha.data,
    time : 60000
  });
});

//验证码失去焦点的请求
router.post("/checkVcode",(req,res)=>{
  // let {svgCode} = req.body;

  // if (!svgCode || (svgCode.toLocaleLowerCase() !== req.session.registerVCode.text.toLocaleLowerCase())){
  //   res.send({
  //     code : 1,
  //     msg : "验证失败"
  //   });
  // }else{
  //   res.send({
  //     code : 0,
  //     msg : "验证成功"
  //   });
  // }
});


module.exports = router;
