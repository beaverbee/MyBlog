import Image from "next/image";
import style from "./leftNav.module.css";
import { useRouter } from "next/dist/client/router";
import { useBackStage } from "../../../hooks/useBackStage";


const LeftNav = () => {
  const { menusList } = useBackStage();
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
            className={`${style.menuItem} ${router.pathname==menu.key?style.selected:undefined}`}
            onClick={(e) => {
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
