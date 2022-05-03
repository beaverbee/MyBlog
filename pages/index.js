import Head from "next/head";
import styles from "../styles/Home.module.css";
import Web from "../layout/Web";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog</title>
        <meta
          name="description"
          content="This is Blog project based on React.js and Next.js"
        />
        <link rel="icon" href="/favicon.ico" />

      </Head>
      <Web></Web>
    </div>
  );
}
