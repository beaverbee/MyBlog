import { useEffect, useState } from "react";
import Head from "next/head";
import Web from "../../../layout/Web";
import styles from "./article.module.css";
import { Spin, Divider, Tag, Row, Col } from "antd";
import Navigation from "../../../components/Navigation";
import axios from "../../../utils/axios";
import Discuss from "../../../components/Discuss";
import Content from "../../../components/Content";
import getAnchorList from '../../../utils'



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
              <Content {...{ article:article.data, newContent }}></Content>
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
  const { data } = await axios.post("/article/list");
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
