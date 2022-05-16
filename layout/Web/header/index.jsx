import React from "react";
import { Layout, Menu, Row, Col } from "antd";
import style from "./header.module.css";
import Image from "next/image";

const { Header } = Layout;
import { useRouter } from "next/router";

const title = [
  { title: "首页", icon: "iconfont icon-home-fill", path: "/" },
  { title: "文章列表", icon: "iconfont icon-format_points", path: "/article" },
  { title: "留言板", icon: "iconfont icon-sms_outlined", path: "/board" },
  { title: "个人中心", icon: "iconfont icon-person", path: "/person" },
  { title: "Github", icon: "iconfont icon-github" },
];

export default function BlogHeader() {
  const router = useRouter();
  const routerSwitch = (path) => {
    if (path) {
      router.push(path);
    } else {
      window.location.href = "https://github.com/beaverbee";
    }
  };

  return (
    <Header className={style.header}>

        <Row style={{ height: "100%" }}>
          <Col span={6} className={style.leftHeader}>
            <Image
              alt="Beaver"
              src="/profilephoto.png"
              className={style.profile}
              width="50px"
              height="50px"
            ></Image>
            <span>Beaver</span>
          </Col>
          <Col span={10} offset={1} className={style.titleList}>
            {title.map((item, index) => {
              return (
                <div
                  key={index}
                  className={style.title}
                  onClick={() => {
                    routerSwitch(item.path || undefined);
                  }}
                >
                  <span className={item.icon}></span>
                  <span>{item.title}</span>
                </div>
              );
            })}
          </Col>
          <Col span={6}></Col>
        </Row>
    </Header>
  );
}
