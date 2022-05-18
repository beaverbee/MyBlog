const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  tag: { type: String, required: true },
  articleId: { type: Array, default: [] },
});

const TagModel = mongoose.model("tags", tagSchema, "tag");

module.exports = TagModel;
