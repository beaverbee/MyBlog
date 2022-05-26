import BackStage from "../../../layout/Admin";
import Head from "next/head";
import LogTimeLine from "../../../components/LogTimeline";

export default function Log() {
  return (
    <BackStage>
      <Head>
        <title>博客日志</title>
        <meta
          name="BackStage"
          content="This is Blog project based on React.js and Next.js"
        />
      </Head>
      <LogTimeLine></LogTimeLine>
    </BackStage>
  );
}
