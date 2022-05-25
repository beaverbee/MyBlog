import LeftNav from "./leftNav";
import style from "./Admin.module.css";
import { Row, Col, Spin } from "antd";
import { useBus } from "../../hooks/useBus";

export default function BackStage({ children }) {
  const {
    state: {
      params: { spinning },
    },
  } = useBus();
  return (
    <Spin spinning={spinning} className={style.spin} tip="Loading" size="large" delay={500}>
      <div className={style.admin}>
        <Row>
          <Col span={2}>
            <LeftNav></LeftNav>
          </Col>
          <Col span={16} offset={2}>
            {children}
          </Col>
        </Row>
      </div>
    </Spin>
  );
}
