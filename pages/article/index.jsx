import { Fragment } from "react";
import Head from "next/head";
import Web from "../../layout/Web";
import style from "./article.module.css";
import { Timeline } from "antd";
import axios from "../../utils/axios";
import { groupBy } from "../../utils";
import { useRouter } from "next/router";
import { ClockCircleOutlined } from "@ant-design/icons";



export default function Article(props) {
  const router = useRouter();
  const { data } = props;
  const list = groupBy(data.data, (item) => item.time.slice(0, 4));
  const handleClick = (articleId) => {
    router.push(`/article/${articleId}`);
  };

  return (
    <Web>
      <Head>
        <title>{`文章列表`}</title>
        <meta
          name="description"
          content="This is Blog project based on React.js and Next.js"
        />
      </Head>

      {data.status === 0 ? (
        <Timeline className={style.timeline}>
          <Timeline.Item>
            <span
              className={style.desc}
            >{`Nice! ${data.data.length} posts in total. Keep going.`}</span>
            <br />
            <br />
          </Timeline.Item>
          {list.map((data, index) => (
            <Fragment key={index}>
              <Timeline.Item
                style={{ fontSize: "16px" }}
                color="orange"
                dot={<ClockCircleOutlined />}
              >
                <div className={style.year}>
                  {data[0]["time"].slice(0, 4)}
                  ...
                </div>
              </Timeline.Item>
              {data.map((item) => (
                <Timeline.Item key={item._id}>
                  <span style={{ fontSize: "16px", marginRight: "20px" }}>
                    {item.time.slice(5, 10)}
                    <span
                      className={style.link}
                      onClick={() => {
                        handleClick(item.articleId);
                      }}
                    >
                      {item.title}
                    </span>
                  </span>
                </Timeline.Item>
              ))}
            </Fragment>
          ))}
        </Timeline>
      ) : (
        <h2>{data.msg}</h2>
      )}
    </Web>
  );
}

export async function getStaticProps() {
  const data = await axios.post(`/article/list`);
  return { props: { data } };
}
