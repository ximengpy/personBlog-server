const mongoose = require("mongoose");


let articleInfo = mongoose.model("articleInfo",new mongoose.Schema({
  tag : {
    type : String,
    default : ''
  },
  num : Number,

}));

// articleInfo.create({
//   tags : ["HTML&Css","JavaScript","Node","Vue&React","Other"],
//   num : 0
// });
/**假数据 */
// for (let i=0;i<5;i++){
//   const tags = ["HTML&Css","JavaScript","Node","Vue&React","Other"]
//   articleInfo.create({
//     tag: tags[i]
//   });
// }

module.exports = articleInfo;
