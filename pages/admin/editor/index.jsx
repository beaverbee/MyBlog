import BackStage from "../../../layout/Admin";
import Head from "next/head";

export default function Editor() {
  return (
    <BackStage>
      <Head>
        <title>修改文章</title>
        <meta
          name="BackStage"
          content="This is Blog project based on React.js and Next.js"
        />
      </Head>
      <span>editor</span>
    </BackStage>
  );
}
