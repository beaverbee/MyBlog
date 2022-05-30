import LeftNav from "./leftNav";
import style from "./Admin.module.css";
import { Row, Col, Spin, message } from "antd";
import Header from "./header";
import { useBus } from "../../hooks/useBus";
import { useEffect, useState } from "react";
import { Provider } from "../../hooks/useBackStage";
import axios from "../../utils/axios";

export default function BackStage({ children }) {
  const {
    state: {
      params: { spinning },
    },
  } = useBus();
  const [logList, setLogList] = useState([]);
  useEffect(() => {
    async function getLog() {
      const data = await axios.post("/log/list");
      if (data.status == 0) {
        data.data.sort((a, b) => {
          if (b.time > a.time) {
            return 1;
          } else {
            return -1;
          }
        });
        setLogList(data.data);
      } else {
        message.error("服务器出问题了，赶紧去维护");
      }
    }
    getLog();
  }, []);
  return (
    <Provider {...{ logList }}>
      <Spin
        spinning={spinning}
        className={style.spin}
        tip="Loading"
        size="large"
        delay={500}
      >
        <div className={style.admin}>
          <Row>
            <Col span={2}>
              <LeftNav></LeftNav>
            </Col>
            <Col span={19} offset={2}>
              <Row>
                <Header></Header>
              </Row>
              <Row className={style.content}>
                <Col span={24}>{children}</Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Spin>
    </Provider>
  );
}
