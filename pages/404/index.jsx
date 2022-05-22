import { Divider } from "antd";
import { memo } from "react";
import style from "./404.module.css";
import { useRouter } from "next/router";
import Svg from "../../components/svg";
import Head from "next/head";

export default memo(function NOT_FOUNT() {
  const router=useRouter()
  return (
    <div>
      <Head>
        <title>Ooop 404</title>
        <meta
          name="description"
          content="This is Blog project based on React.js and Next.js"
        />
      </Head> 
      <div className={style.notFount}>
        <Svg></Svg>
        <div className={style.content} onClick={()=>{router.back()}}>
          <span>Back</span>
          <Divider type="vertical" className={style.divider}></Divider>
          <span>Sorry, the page you visited does not exist.</span>
        </div>
      </div>
    </div>
  );
});
