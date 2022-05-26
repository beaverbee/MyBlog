const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  title: { type: String, required: true },
  time: { type: String, required: true },
});

const LogModel = mongoose.model("log", LogSchema, "log");

module.exports = LogModel;
