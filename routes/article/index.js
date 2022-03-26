const express = require("express");
var article = require("../../db/article");
var articleInfo = require("../../db/articleInfo");

let router = express.Router();

/*获取单篇文章信息*/
router.post("/", (req, res) => {
  let {_id} = req.body;

  /*判断有没有_id*/
  if (!_id) {
    res.send({
      code: 2,
      msg: "请传入要查询的文章id"
    });
    return;
  }

  /*通过ID查文章*/
  article.findById(_id).populate("tag",{tag: 1, _id: 1})
    .then( async data => {
      /*判断data是否有值*/
      if (data) {
        let result = data
        //有对应的文章 ,更新点击率
        article.updateOne({_id}, {$inc: {pv: 1}}).then(() =>{})
        //获取延伸阅读
        let tag = result.tag._id || ''
        let extendList =await  article.find({tag}, {_id: 1, title: 1}, {skip: 0, limit: 2, sort: {pv: -1}})
        res.send({
          code: 0,
          msg: "查询成功",
          data: {
            result,
            extendList
          }
        });
      } else {
        //没有对应的文章
        res.send({
          code: 1,
          msg: "没有找到详情"
        });
      }
    })
    .catch((err) => {
      console.log( 334454444, err)
      res.send({
        code: 4,
        msg: "服务器错误"
      });
    })
});

// 点赞
router.post("/like", (req, res) =>{
  let { _id} = req.body
  article.findById(_id).then(data =>{
    article.updateOne({_id}, {$inc: {like: 1}}).then(() =>{})
    res.send({
      code: 0,
      msg: '点赞成功'
    })
  })

})

// /*延伸阅读*/
// router.post("/extend", (req, res) => {
//   let {tag} = req.body;

//   article.find({tag}, {_id: 1, title: 1}, {skip: 0, limit: 2, sort: {pv: -1}})
//     .then(data => {
//       res.send({
//         code: 0,
//         msg: "查询成功",
//         data
//       });
//     })
//     .catch(() => {
//       res.send({
//         code: 4,
//         msg: "服务器异常~",
//         data: []
//       });
//     });
// });

/*获取文章Info*/
router.post("/getInfo", (req, res) => {
  articleInfo.find({}, {_id: 1, __v: 0})
    .then(data => {
      res.send({
        code: 0,
        msg: "请求成功",
        data
      });
    })
    .catch(() => {
      res.send({
        code: 4,
        msg: "服务器错误",
        data: null
      });
    });
});

/*获取热门文章 8 篇*/
router.post("/getHot", (req, res) => {
  let {limit} = req.body;
  article.find({}, {__v: 0}, {sort: {pv: -1}, skip: 0, limit})
    .then(data => {
      res.send({
        code: 0,
        data
      });
    })
    .catch(() => {
      res.send({
        code: 4,
        msg: "服务器错误",
        data: null
      });
    })
});

/*文章列表的显示*/
router.post("/getShow", async (req, res) => {
  let {pageSize, currentPage, tag} = req.body;
  let skip = (currentPage-1) * pageSize
  let options = tag ? {tag} : {}
  const query = await article.find(options, {__v: 0}, {skip, limit: pageSize, sort: {date: -1}}).populate("tag",{tag: 1, _id: 1})
  const queryCount = await article.find().count()
  res.send({
    code: 0,
    data: {
      list: query,
      total: queryCount
    }
  })
  // article.find(options, {__v: 0}, {skip, limit: pageSize, sort: {date: -1}})
  // .populate("articleInfo",{tag: 1, _id: 1})
  //   .then(data => {
  //     res.send({
  //       code: 0,
  //       data
  //     });
  //   })
  //   .catch(err => {
  //     res.send({
  //       code: 4,
  //       msg: "服务器错误"
  //     });
  //   });
});

/*文章搜索*/
router.post("/search", (req, res) => {
  let {keywords} = req.body;

  /*判断keyword存在*/
  if (!keywords) {
    res.send({
      code: 1,
      msg: "请传入关键词参数",
      data: []
    });
    return;
  }

  /*查找*/
  let reg = new RegExp(keywords,'i');
  article.find(
    {$or: [{title: reg}, {tag: reg}]},
    {_id: 1, title: 1},
    {skip:0,limit:5,sort: {date: -1}}
  ).then(data => {

    res.send({
      code: 0,
      msg: "查询成功",
      data
    });
  }).catch(() => {
    res.send({
      code: 4,
      msg: "服务器异常~",
      data: []
    });
  })
});


//导出
module.exports = router;
