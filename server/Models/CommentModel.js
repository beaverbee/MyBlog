const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  articleId: { type: String, required: true },
  content: { type: String, default: "" },
  city: { type: String },
});

const CommentModel = mongoose.model("comment", CommentSchema, "comment");

module.exports = CommentModel;
