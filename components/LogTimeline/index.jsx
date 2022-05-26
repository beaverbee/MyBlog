import { FieldTimeOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Fragment } from "react";
import { Timeline } from "antd";
import style from './logTimeline.module.css'
import { groupBy } from "../../utils";
import { useBackStage } from "../../hooks/useBackStage";
import {actionMap} from '../../config'


export default function LogTimeLine() {
  const {logList}=useBackStage()
  const list = groupBy(logList, (item) => item.time.slice(0, 4));
  function handleClick() {}

  return (
    <Fragment>
      {logList.length !== 0 ? (
        <Timeline className={style.timeline}>
          <Timeline className={style.timeline}>
            <FieldTimeOutlined
              style={{ fontSize: "30px", marginRight: "10px" }}
            />
            <span
              className={style.desc}
            >{`已找到${logList.length}条记录`}</span>
            <br></br>
            <br></br>
          </Timeline>
          {list.map((data, index) => {
            return (
              <Fragment key={index}>
                <Timeline.Item
                  style={{ fontSize: "18px" }}
                  color="skyblue"
                  dot={<ClockCircleOutlined />}
                >
                  <div className={style.year}>
                    {data[0]["time"].slice(0, 4)}
                  </div>
                </Timeline.Item>
                {data.map((item) => (
                  <Timeline.Item key={item._id}>
                    <span style={{ fontSize: "16px", marginRight: "20px" }}>
                      在<strong>{` ${item.time.slice(5, 10)} `}</strong>
                      <span
                        className={style.link}
                        onClick={() => {
                          handleClick();
                        }}
                      >
                        {`${actionMap[item.action]}   ${item.title}`}
                      </span>
                    </span>
                  </Timeline.Item>
                ))}
              </Fragment>
            );
          })}
        </Timeline>
      ) : (
        <div>懒狗还不更新博客</div>
      )}
    </Fragment>
  );
}
