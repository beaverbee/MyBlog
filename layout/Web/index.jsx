import React from "react";
import { Row, Col, BackTopmButton } from "antd";
import style from "./Web.module.css";
import LeftNav from "./leftNav";


// 响应式
const siderLayout = { xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0 };
const contentLayout = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 };

export default function Web({ children }) {

  return (
    <div className={style.content}>
      <Row>
        <Col span={4} offset={1}>
          <LeftNav></LeftNav>
        </Col>
        <Col span={14} offset={1}>
          {children}
        </Col>
      </Row>
    </div>
  );
}
