const mongoose = require('mongoose')

let Schema = mongoose.Schema

let message = mongoose.model('message', new Schema({
  //关联用户表
  user: {type:Schema.Types.ObjectId, ref:'user',required: true},
  //留言内容
  content: {type: String, required: true},
  // 日期
  date: {type: Date, default: Date.now},
  //子留言
  childrem: [
    {
      //子留言 用户
      user : {type:Schema.Types.ObjectId , ref:"user" , required:true},
      //子留言 内容
      content: {type: String,required: true},
      //子留言 评论对象
      reUser : {type:Schema.Types.ObjectId , ref:"user" , required:true},
      // 日期
      date: {type: Date,default: Date.now},
    }
  ]
}))

//测试
// for (let i =0;i<100;i++){
//   message.create({
//     user : "5ec4995fd2975a0ad423b288",
//     content : "<p>哈哈哈哈哈哈我来评论啦</p>"
//   });
// }
module.exports = message
