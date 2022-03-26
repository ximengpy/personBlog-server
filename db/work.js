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



let article = mongoose.model("work", work);


module.exports = article;
