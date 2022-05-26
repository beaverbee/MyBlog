import style from "./header.module.css";
import { Divider } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useBackStage } from "../../../hooks/useBackStage";
import { useRouter } from "next/dist/client/router";

export default function Header() {
  const { menusList } = useBackStage();
  const router = useRouter();
  const [title, setTitle] = useState("后台首页");
  useEffect(() => {
    let success = menusList.find((item) => {
      return item.key === router.pathname;
    });
    if (success) {
      setTitle(success.label);
    }
  }, [menusList, router.pathname]);
  return (
    <Fragment>
      <div className={style.header}>
        <span className={style.content}>{title}</span>
        <span className={style.content}>
          你已经有xx天没更新了，鸽子都没你能鸽
        </span>
      </div>
      <Divider className={style.divider}></Divider>
    </Fragment>
  );
}
