const express = require("express");
const workDB = require("../../db/work");



let router = express.Router();


//请求所有列表
router.get('/', (req, res) => {
  workDB.find({}).then(data => {
      res.send({
        code: 0,
        msg: '请求成功',
        data
      })
    })
    .catch(() => {
      res.send({
        code: 4,
        msg: "服务器错误",
        data: []
      });
    })
})

/*获取单篇文章信息*/
router.post("/detail", (req, res) => {
  let {
    _id
  } = req.body;

  /*判断有没有_id*/
  if (!_id) {
    res.send({
      code: 2,
      msg: "请传入要查询的文章id"
    });
    return;
  }

  /*通过ID查文章*/
  workDB.findById(_id)
    .then(data => {
      /*判断data是否有值*/
      if (data) {
        //有对应的文章
        // article.updateOne({_id}, {$inc: {pv: 1}}).then(() =>{})
        res.send({
          code: 0,
          msg: "查询成功",
          data
        });
      } else {
        //没有对应的文章
        res.send({
          code: 1,
          msg: "没有对应的文章"
        });
      }
    })
    .catch(() => {
      res.send({
        code: 4,
        msg: "服务器错误"
      });
    })
});

module.exports = router;
