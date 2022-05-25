import Head from "next/head";
import styles from "../styles/Home.module.css";
import Web from "../layout/Web";
import TypeItCompoment from "../components/typeit";
import { memo, useEffect, useState } from "react";
import { useBus } from "../hooks/useBus";
import axios from "../utils/axios";
import ArticleList from "../components/ArticleList";
import { SET_VISIT } from "../config";


const Home = memo(function MyHome(props) {
  const [instance, setInstance] = useState(true);
  const {
    state: {
      params: { firstVisit },
    },
    dispatch,
  } = useBus();
  const { data } = props;
  useEffect(() => {
    setTimeout(() => {
      setInstance(false);
    }, 6000);
    return () => {
      dispatch({ type: SET_VISIT, value: false });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Blog</title>
        <meta
          name="description"
          content="This is Blog project based on React.js and Next.js"
        />
      </Head>
      <Web>
        {instance && firstVisit ? (
          <TypeItCompoment />
        ) : (
          <ArticleList article={data}></ArticleList>
        )}
      </Web>
    </div>
  );
});

export async function getStaticProps() {
  const data = await axios.post("/article/list");
  return { props: { data } };
}

export default Home;
