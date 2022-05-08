import React from "react";
import Head from "next/head";
import ArticleDetail from './articleDetail'
import Web from "../../layout/Web";

export default function Article({children}) {
  return (
    <Web>
      <Head>
        <title>Content</title>
        <meta
          name="description"
          content="This is Blog project based on React.js and Next.js"
        />
      </Head>
      {/* {children} */}
      <h2>Some Blog Content</h2>
      {children}
    </Web>
  );
}
