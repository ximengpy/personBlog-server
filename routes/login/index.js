
const express = require("express");
const userDB = require("../../db/user");
const visitorDB = require("../../db/visitor");
const crypto = require('crypto')
let router = express.Router();

//登录接口
router.post("/",(req,res)=>{

  //已经登录就不需要往下走了
  if (req.session.login) {
    res.send({
      code : 2,
      msg : "已经登录，请退出之后再登录"
    });
    return;
  }

  let {user,pwd} = req.body;
  //验证数据有效性
  if (!user || !pwd){
    res.send({
      code : 1,
      msg : "数据无效，请检查后再注册。"
    });
    return;
  }

  userDB.findOne({user})
    .then(data=>{
      if (data){
        //有这个用户
        if (data.pwd === crypto.createHash('sha256').update(pwd).digest('hex')){
          //写入session
          req.session.login = data;

          //返回前端
          res.send({
            code : 0,
            msg : "登录成功",
            data: {
              user: data.user,
              photo: data.photo
            }
          });

          /*添加到最近访客列表*/
          visitorDB.deleteMany({user:data._id})
            .then(()=>{
              visitorDB.create({
                user : data._id
              },()=>{});
            })
            .catch(()=>{})
        }else{
          res.send({
            code : 2,
            msg : "密码错误！"
          })
        }
      }else{
        //没有这个用户
        res.send({
          code : 1,
          msg : "用户不存在！"
        })
      }
    })
    .catch(e=>{
      res.send({
        code : 4,
        msg : "服务器错误~请稍后再试"
      })
    })
})

//验证是否登录
router.post("/ifLogin",(req,res)=>{
  let data = req.session.login;
  // console.log(req)
  let resData = false;
  if (data){
    delete data.pwd;
    delete data.__v;
    resData = data;
  }
  res.send({
    userInfo : resData,
    code: 0
  });
});

//登出
router.post("/logout",(req,res)=>{
  req.session.destroy();
  res.send({
    code : 0,
    msg : "退出登陆成功"
  });
});

module.exports = router;
