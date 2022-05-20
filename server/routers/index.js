const express = require("express");
const md5 = require("blueimp-md5");
const TagModel = require("../Models/TagModel");
const ArticleModel = require("../Models/ArticleModel");

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
  console.log(articleId);
  setHeader(res);
  ArticleModel.findOne({ articleId: articleId })
    .then((article) => {
      res.send({ status: 0, data: article });
    })
    .catch((error) => {
      res.send({ status: 1, msg: "非常抱歉，文章掉进黑洞了，博主打捞中" });
    });
});

// 获取角色列表

module.exports = router;
