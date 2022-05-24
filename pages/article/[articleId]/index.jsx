import { useEffect, useState } from "react";
import Head from "next/head";
import Web from "../../../layout/Web";
import styles from "./article.module.css";
import { Spin, Divider, Tag, Row, Col } from "antd";
import Navigation from "../../../components/Navigation";
import axios from "../../../utils/axios";
import Discuss from "../../../components/Discuss";

function getAnchorList(str) {
  const pattern = /<(h[1-6])[\s\S]+?(?=<\/\1>)/g; //正则匹配 h1-h6 作为锚点标题
  const list = [];
  function pushItem(arr, item) {
    const len = arr.length;
    const matchItem = arr[len - 1];
    if (matchItem && matchItem.tag !== item.tag) {
      pushItem(matchItem.children, item);
    } else {
      arr.push(item);
      // debugger
    }
  }
  let newStr = str.replace(pattern, ($0, $1) => {
    const endIndex = $0.indexOf("</");
    const startIndex = $0
      .substring(0, endIndex === -1 ? undefined : endIndex)
      .lastIndexOf(">");
    const title = `${$0.substring(
      startIndex + 1,
      endIndex === -1 ? undefined : endIndex
    )}`;
    const href = `#${title}`;
    const currentItem = {
      tag: $1, // 标签类型
      title,
      href,
      children: [],
    };
    pushItem(list, currentItem);
    return `<${$1 + " id='" + title + "'" + $0.substring(3)}`;
  });
  return [list, newStr];
}

const navigationLayout = { xxl: 4, xl: 3, lg: 3, sm: 0, xs: 0 };

export default function Article(props) {
  const [loading, setLoading] = useState(false);

  const { article } = props;
  const [list, newContent] = getAnchorList(article.data.content);
  useEffect(() => {
    var time = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(time);
    };
  }, []);

  return (
    <Web>
      <Head>
        <title>{`My Blog: ${article.data.title}`}</title>

        <meta
          name="description"
          content="This is Blog project based on React.js and Next.js"
        />
      </Head>
      <Spin spinning={loading}>
        {article.status === 0 ? (
          <Row>
            <Col span={18}>
              <article>
                <div className={styles.postHeader}>
                  <div className={styles.title}>{article.data.title}</div>
                  <div
                    className={styles.subInformation}
                    style={{ fontSize: "1rem" }}
                  >
                    <span className="iconfont icon-date"></span>
                    <span>{`Posted On ${article.data.time}`}</span>
                    <Divider
                      type="vertical"
                      className={styles.divider}
                    ></Divider>
                    <span className="iconfont icon-post"></span>
                    <span>
                      {article.data.tags.map((item, index) => {
                        return (
                          <Tag
                            key={index}
                            color="blue"
                            style={{ fontSize: "1rem" }}
                          >
                            {item}
                          </Tag>
                        );
                      })}
                    </span>
                    <Divider
                      type="vertical"
                      className={styles.divider}
                    ></Divider>
                  </div>
                </div>
                <Divider></Divider>
                <div
                  className={styles.articleDetail}
                  dangerouslySetInnerHTML={{ __html: newContent }}
                />
              </article>
              <Divider
                style={{
                  height: "2px",
                  backgroundColor: "rgba(227,227,227,0.6)",
                }}
              ></Divider>
              <Discuss {...{ articleId: article.data.articleId }}></Discuss>
            </Col>
            <Col {...navigationLayout}>
              <Navigation list={list}></Navigation>
            </Col>
          </Row>
        ) : (
          <h2>{article.msg}</h2>
        )}
      </Spin>
    </Web>
  );
}

export async function getStaticPaths() {
  const {data} = await axios.post("/article/list");
  return {
    paths: data.map((item) => ({ params: { articleId: item.articleId } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await axios.get(`/article/detail?id=${params.articleId || 1}`);
  return {
    props: { article: data },
  };
}
