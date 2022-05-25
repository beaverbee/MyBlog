import BackStage from "../../../layout/Admin";
import Head from "next/head";

export default function List() {
  return (
    <BackStage>
      <Head>
        <title>文章列表</title>
        <meta
          name="BackStage"
          content="This is Blog project based on React.js and Next.js"
        />
      </Head>
      <span>list</span>
    </BackStage>
  );
}
