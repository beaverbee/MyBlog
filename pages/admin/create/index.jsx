import BackStage from "../../../layout/Admin";
import Head from "next/head";
import Editor from "../../../components/Editor";


export default function Create() {
  function handleChange(){

  }
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
      <Editor></Editor>
    </BackStage>
  );
}
