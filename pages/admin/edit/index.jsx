import BackStage from "../../../layout/Admin";
import Head from "next/head";
import Editor from "../../../components/Editor";
import axios from "../../../utils/axios";

function Edit(props) {
  const { data } = props;
  function handleChange() {}
  return (
    <BackStage>
      <Head>
        <title>新建文章</title>
        <meta
          name="BackStage"
          content="This is Blog project based on React.js and Next.js"
        />
        <meta charSet="utf-8"></meta>
      </Head>
      <Editor data={data}></Editor>
    </BackStage>
  );
}

export async function getServerSideProps(context) {
  if (context.query.articleId) {
    const data = await axios.get(
      `/article/detail?id=${context.query.articleId}`
    );
    return { props: { data } };
  } else {
    return { props: {} };
  }
}

export default Edit;
