
const express = require("express");
const userDB = require("../../db/user");
const visitorDB = require("../../db/visitor");
const crypto = require('crypto')
let router = express.Router();
const jwt = require('jsonwebtoken')
//登录接口
router.post("/",(req,res)=>{


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
          const token = 'Bearer ' + jwt.sign({
            admin: data.admin === true,
            _id:data.id
          }, 'py', { expiresIn: '230h' });

          //返回前端
          res.send({
            code : 0,
            msg : "登录成功",
            data: {
              user: data.user,
              photo: data.photo,
              token
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

//登出
router.post("/logout",(req,res)=>{
  res.send({
    code : 0,
    msg : "退出登陆成功"
  });
});

module.exports = router;
