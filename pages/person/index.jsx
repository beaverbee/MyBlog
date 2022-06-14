import React from "react";
import Web from "../../layout/Web";
import { Divider } from "antd";
import style from "./person.module.css";

export default function Person(props) {
  return (
    <Web>
      <h2>Less is more</h2>
      <Divider orientation="left" className={style.divider}>
        博客简述
      </Divider>
      <div>
        <div className={style.brief}>
          前端技术栈采用Next.js + React Hooks + antd
        </div>
        <div className={style.brief}>后端技术栈采用Express + MongoDB</div>
        <div className={style.brief}>
          源码放在 <a href="https://github.com/beaverbee/MyBlog">github</a>
          ，欢迎使用
        </div>
        <div>一个半吊子的前端学渣 + 半吊子的NLPer</div>
        <div>有任何的建议和想法都可以写在下方评论区</div>
      </div>
    </Web>
  );
}
