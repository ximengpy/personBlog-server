const express = require("express")
const diaryDB = require("../../db/diary")
let router = express.Router();
router.get("/", (req, res) =>{
  diaryDB.find({}, {}, {sort: {date: -1}})
    .then(data =>{
      res.send({
        code: 0,
        msg: '请求成功',
        data
      })
    }).catch(() =>{
      res.send({
        code: 4,
        msg: '服务器错误',
        data: []
      })
    })
})

//发表日记
router.post("/submit",(req,res)=>{
  let {txt,img} = req.body;

  if (!txt && !img){
    res.send({
      code : 2,
      msg : "请输入文字或图片"
    });
    return;
  }

  let data = {};
  txt && (data.txt = txt);
  img && (data.img = img);

  //存数据
  diaryDB.create(data)
    .then(()=>{
      res.send({
        code : 0,
        msg : "发表成功"
      });
    })
    .catch(()=>{
      res.send({
        code : 4,
        msg : "服务器错误"
      });
    })
});

//删除日记
router.post("/delete",(req,res)=>{
  let {_id} = req.body;

  diaryDB.deleteOne({_id})
    .then(()=>{
      res.send({
        code : 0,
        msg : "请求成功"
      })
    })
    .catch(()=>{
      res.send({
        code:4,msg:"服务器错误~"
      })
    })
})
module.exports = router;
