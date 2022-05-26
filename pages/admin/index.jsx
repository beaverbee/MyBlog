import BackStage from "../../layout/Admin";
import Head from "next/head";


export default function Admin() {
  return (
    <BackStage>
      <Head>
        <title>后台管理系统</title>
        <meta
          name="BackStage"
          content="This is Blog project based on React.js and Next.js"
        />
      </Head>
      <span>Hello</span>
    </BackStage>
  );
}
