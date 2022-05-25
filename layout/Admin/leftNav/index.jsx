import {
  UnorderedListOutlined,
  EditOutlined,
  FormOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import style from "./leftNav.module.css";
import { getItem } from "../../../utils";
import { useRouter } from "next/dist/client/router";

const menusList = [
  getItem(
    "文章列表",
    "/admin/list",
    <UnorderedListOutlined className={style.icon} />
  ),
  getItem("修改文章", "/admin/editor", <EditOutlined className={style.icon} />),
  getItem("新建文章", "/admin/create", <FormOutlined className={style.icon} />),
  getItem("返回博客", "/", <RollbackOutlined className={style.icon} />),
];

const LeftNav = () => {
  const router = useRouter();
  const onClick = (key) => {
    router.push(key);
  };

  return (
    <div className={style.nav}>
      <ul className={style.menu}>
        <li style={{ height: "150px", marginTop: "10px" }}>
          <Image
            src="/profilephoto.png"
            alt="Beaver"
            width="120px"
            height="120px"
            priority
            className={style.profile}
          ></Image>
        </li>
        {menusList.map((menu) => (
          <li
            key={menu.key}
            className={style.menuItem}
            onClick={() => {
              onClick(menu.key);
            }}
          >
            {menu.icon}
            <span>{menu.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftNav;
