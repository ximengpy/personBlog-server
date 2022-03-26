const mongoose = require("mongoose");
let diary = mongoose.model("diary", new mongoose.Schema({
  txt: String,
  img: String,
  date: {type: Date, default: Date.now}
}))
// for(let i = 0; i< 30; i++) {
//   diary.create({
//     txt : 'hahahah哈哈hahahah哈哈hahahah哈哈hahahah哈哈hahahah哈哈hahahah哈哈hahahah哈哈hahahah哈哈hahahah哈哈hahahah哈哈hahahah哈哈hahahah哈哈hahahah哈哈',
//   });
// }


module.exports = diary
