const mongoose = require("mongoose");
const baseUrl = require("../utils/baseURL")
let Schema = mongoose.Schema;
let work = new Schema({
  title: {
    type: String,
    required: true
  },
  img: [{
    name: {
      type: String
    },
    url: {
      type: String
    }
  }],
  intro: {
    type: String,
    required: true
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  link: {
    type: String,
    require: true
  },
  account: [{
    act: {
      type: String,
      required: false
    },
    pwd: {
      type: String,
      required: false
    },
    info: {
      type: String,
      require: false
    }
  }]
})

work.pre("update", function (next) {
  this.update = new Date;
  next();
});



let works = mongoose.model("work", work);

/*假数据*/
// for (let i=0;i<100;i++){
//   works.create({
//     title: `作品%{i+1}`,
//     intro: '这是作品这是作品这是作品这是作品这是作品这是作品这是作品',
//     link: '作品链接作品链接作品链接作品链接作品链接',
//   });
// }


module.exports = works;
