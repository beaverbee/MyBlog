/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import "../styles/globals.css";
import "antd/dist/antd.css";
import BlogHeader from "../layout/Web/header";
import Head from "next/head";
import Script from "next/script";
import { BrowserRouter } from "react-router-dom";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Blog</title>
        <meta
          name="description"
          content="This is Blog project based on React.js and Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="/js/easeljs.min.js" strategy="beforeInteractive"></Script>
      <Script src="/js/cicleMove.js" strategy="beforeInteractive"></Script>
      <Script src="/js/cicleLineCanvas.js"></Script>
        <BlogHeader />
        <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
