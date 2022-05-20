const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  time: { type: String, required: true },
  tags: { type: Array, default: [] },
  articleId: { type: String, required: [] },
  content: { type: String, default: "" },
});

const ArticleModel = mongoose.model("article", ArticleSchema, "article");

module.exports = ArticleModel;
