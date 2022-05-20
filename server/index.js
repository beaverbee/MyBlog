const mongoose = require("mongoose");
const express = require("express");
const cookiePaser = require("cookie-parser");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(express.static("public")); //声明使用的中间件
// app.use(express.urlencoded({ extendedL: true }));
app.use(express.json()); //请求体参数为json
app.use(cookiePaser());
const indexRouter = require("./routers");
app.use("/", indexRouter); //

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

mongoose
  .connect("mongodb://localhost/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connect success");
    app.listen("6060", () => {
      console.log("server start success,port: http://localhost:6060");
    });
  })
  .catch((error) => {
    console.log("mongoda connect fail" + error);
  });
