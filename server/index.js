const mongoose = require("mongoose");
const express = require("express");
const cors=require('cors')
const fs = require("fs");
const app = express();

app.use(express.static("public")); //声明使用的中间件
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //请求体参数为json

const cookiePaser = require("cookie-parser");
app.use(cookiePaser());
const indexRouter = require("./routers");
app.use("/", indexRouter); //

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use(cors({
    origin: 'http://localhost:3000', // 此处为你的前端地址，值可以是string | Array<string>
    credentials: true // 允许跨域携带cookie
})) // 跨域
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
