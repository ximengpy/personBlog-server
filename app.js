var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
const expressJwt = require('express-jwt')

/*连接数据库*/
mongoose.connect("mongodb://localhost:27017/blog",{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>{console.log("数据库连接成功")})
  .catch(()=>{console.log("数据库连接失败")});

//App实例
var app = express();
//中间件设置
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//设置session
app.use(require("./utils/session.js"));
//允许跨域
app.use((req,res,next)=>{
  res.header({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
    'Content-Type': 'application/json; charset=utf-8'
  });
  if (req.method === "OPTIONS"){
    res.sendStatus(200);
  }else{
    next();
  }
});
app.use(expressJwt({
  secret: 'py' , // 签名的密钥 或 PublicKey
  algorithms:['HS256']
}).unless({
  path: ['/login','/upload', '/register/vcode', '/register', '/article/getHot']  // 指定路径不经过 Token 解析
}))
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
	  //  这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
    res.status(200).send({
      code: 5,
      msg: '登录过期'
    });
  }
});


//设置路由
app.use('/', require('./routes/index'));

module.exports = app;
