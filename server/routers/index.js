const express = require("express");
const md5 = require("blueimp-md5");
const qs = require("qs");
const TagModel = require("../Models/TagModel");
const ArticleModel = require("../Models/ArticleModel");
const CommentModel = require("../Models/CommentModel");
const UserModel = require("../Models/UserModel");
const LogModel = require("../Models/LogModel");

const router = express.Router();

const setHeader = (res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, OPTIONS, DELETE, PUT"
  );
};

router.post("/tag/list", (req, res) => {
  setHeader(res);
  TagModel.find()
    .then((tag) => {
      res.send({ status: 0, data: tag });
    })
    .catch((error) => {
      console.error("获取标签异常" + error);
      res.send({ status: 1, msg: "标签列表掉入异次元，请稍后再试" });
    });
});

router.post("/article/list", (req, res) => {
  const queue = {
    title: 1,
    desc: 1,
    time: 1,
    tags: 1,
    articleId: 1,
  };
  setHeader(res);
  ArticleModel.find({}, queue)
    .then((article) => {
      res.send({ status: 0, data: article });
    })
    .catch((error) => {
      res.send({ status: 1, msg: "非常抱歉，文章掉进黑洞了，博主打捞中" });
    });
});

router.get("/article/detail", (req, res) => {
  const articleId = req.query.id;
  setHeader(res);
  ArticleModel.findOne({ articleId: articleId })
    .then((article) => {
      res.send({ status: 0, data: article });
    })
    .catch((error) => {
      res.send({ status: 1, msg: "非常抱歉，文章掉进黑洞了，博主打捞中" });
    });
});

router.post("/article/create", (req, res) => {
  const { title, articleId, desc, time, content, tags } = qs.parse(req.body);
  console.log(title, articleId, desc, time);
  setHeader(res);
  ArticleModel.create({ title, articleId, desc, tags, time, content })
    .then((article) => {
      res.send({ status: 0, data:article });
    })
    .catch((error) => {
      res.send({ status: 1, msg: "非常抱歉，文章被哥斯拉吞了，请重试" });
    });
});

// 获得评论列表
router.post("/comment/list", (req, res) => {
  const { articleId } = qs.parse(req.body);
  setHeader(res);
  CommentModel.find({ articleId })
    .then((comments) => {
      res.send({ status: 0, data: comments });
    })
    .catch((error) => {
      console.log("数据库出错");
      res.send({ status: 1, msg: "评论被封印了，博主施法拯救中····" });
    });
});

router.post("/comment/add", (req, res) => {
  const { articleId, content, city } = qs.parse(req.body);
  setHeader(res);
  CommentModel.create({ content, articleId, city })
    .then((comments) => {
      res.send({ status: 0, data: comments });
    })
    .catch((error) => {
      res.send({ status: 1, msg: "评论被封印了，博主施法拯救中····" });
    });
});

router.post("/user/login", (req, res) => {
  const { username, password } = qs.parse(req.body);
  setHeader(res);
  UserModel.find({ username, password }, { username, level })
    .then((user) => {})
    .catch((error) => {
      res.send({ status: 1, msg: "用户名或密码错误" });
    });
});

router.post("/log/list", (req, res) => {
  setHeader(res);
  LogModel.find()
    .then((logs) => {
      res.send({ status: 0, data: logs });
    })
    .catch(() => {
      res.send({ status: 1, msg: "后台访问错误" });
    });
});

router.post("/log/create", (req, res) => {
  const log = qs.parse(req.body);
  setHeader(res);
  LogModel.create(log)
    .then((value) => {
      res.send({ status: 0, data: value });
    })
    .catch((e) => {
      res.send({ status: 1, msg: "后台访问错误" });
    });
});

module.exports = router;
