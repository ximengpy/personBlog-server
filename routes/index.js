var express = require('express');
var router = express.Router();


/*文章相关的接口*/
router.use("/article", require('./article/index'));

/*注册相关的接口*/
router.use("/register", require('./register/index'));

/*登录接口*/
router.use("/login", require('./login/index'));

/*留言接口*/
router.use("/message", require('./message/index'));

// 日记接口
router.use("/diary", require('./diary/index'));


/*最近访客接口*/
router.use("/visitor", require('./visitor/index'));

// 个人作品接口
router.use("/work", require('./work/index'));


/*上传接口*/
router.use("/upload", require('./upload/index'));


module.exports = router;