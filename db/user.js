const mongoose = require('mongoose')
const crypto = require('crypto')
const url = require('../utils/baseURL')
let userSchema = new mongoose.Schema({
  user:{
    type: String,
    required: true,
  },
  pwd:{
    type: String,
    required: true,
  },
  photo:{
    type: String,
    default: url.baseUrl+"/img/9.jpg"
  },
  //是否禁用
  disabled:{
    type:Boolean,
    default: false
  },
  //是否管理员
  admin: {
    type:Boolean,
    default: false
  },
  //注册时间
  reqDate: {
    type: Number,
    default:Date.now
  }
})

userSchema.pre('save', function(next) {
  let pwd = this.pwd
  this.pwd = crypto.createHash('sha256').update(pwd).digest('hex')
  next()
})

let user = mongoose.model('user', userSchema)


module.exports = user
