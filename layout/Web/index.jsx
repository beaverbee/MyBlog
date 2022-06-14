import { Row, Col, Spin } from "antd";
import style from "./Web.module.css";
import BlogHeader from "./header";
import LeftNav from "./leftNav";
import { useBus } from "../../hooks/useBus";

// 响应式
const siderLayout = { xxl: 4, xl: 4, lg: 4, sm: 0, xs: 0 };
const contentLayout = { xxl: 16, xl: 13, lg: 13, sm: 20, xs: 20 };

export default function Web({ children }) {
  const { paramsReducer } = useBus();
  const [params, _] = paramsReducer;
  const { spinning } = params;
  return (
    <Spin
      spinning={spinning}
      tip="Loading"
      size="large"
      delay={500}
      className={style.spin}
    >
      <div className={style.content}>
        <Row>
          <Col span={24}>
            <BlogHeader></BlogHeader>
          </Col>
        </Row>
        <Row style={{ marginTop: "60px" }}>
          <Col
            span={3}
            offset={1}
            {...siderLayout}
            style={{ position: "fixed" }}
          >
            <LeftNav></LeftNav>
          </Col>
          <Col offset={6} {...contentLayout}>
            {children}
          </Col>
        </Row>
      </div>
    </Spin>
  );
}
