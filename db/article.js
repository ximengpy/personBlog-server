const mongoose = require("mongoose");
const url = require('../utils/baseURL')
let Schema = mongoose.Schema;
let articleSchema = new Schema({
  type : {type: String,required: true},
  title : {type: String,required: true},
  content : {type:String,required: true},
  tag : {
    type : Schema.Types.ObjectId,
    require: true,
    ref: "articleInfo"
  },
  date : {type: Date, default: Date.now},
  updateDate: {type: Date, default: Date.now},
  pv : {type: Number,default: 0},
  // comment : [{type:Schema.Types.ObjectID,ref:"comment"}]
  like: {type: Number,default: 0}
})

articleSchema.pre("update", function(next) {
  this.update = now.Date
  next()
})

let article = mongoose.model("article", articleSchema);

/*假数据*/
// for (let i=0;i<100;i++){
//   article.create({
//     type : ["原创","转载"][(Math.random()*2)|0],
//     title : `第${i+1}篇文章`,
//     content : (""+i+i+i+i+i+"哈哈哈哈哈我是文章的内容").repeat(10),
//     tag : "623f2fe8d1553356d134159e"
//   });
// }


module.exports = article;
