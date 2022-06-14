const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  level: { type: Number, required: true },
});

const UserModel = mongoose.model("users", userSchema, "user");

module.exports = UserModel;
