const express = require("express");
const md5 = require("blueimp-md5");
const TagModel = require("../Models/TagModel");

const router = express.Router();

// const setHeader = (res) => {
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
// };

router.post("/tag/list", (req, res) => {
  console.log(req.body)
  TagModel.find()
    .then((tag) => {
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
      res.send({ status: 0, data: tag });
    })
    .catch((error) => {
      console.error("获取标签异常" + error);
      res.send({ status: 1, msg: "标签列表掉入异次元，请稍后再试" });
    });
});

// 获取角色列表

module.exports = router;
