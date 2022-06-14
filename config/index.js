import {
  UnorderedListOutlined,
  EditOutlined,
  FormOutlined,
  RollbackOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { getItem } from '../utils';
import style from '../layout/Admin/leftNav/leftNav.module.css'

export const API_BASE_URL = "http://localhost:6060";

//reducer action
export const GET_CITY = "getCity";
export const SET_VISIT = "setVisit";
export const SET_LOADING = "serLoading";

export const LOGIN = "login";
export const REGISTER = "register";

export const menusList = [
  getItem("后台首页", "/admin", <HomeOutlined className={style.icon}/>),
  getItem(
    "文章列表",
    "/admin/list",
    <UnorderedListOutlined className={style.icon} />
  ),
  getItem("博客日志", "/admin/log", <EditOutlined className={style.icon} />),
  getItem("编辑文章", "/admin/edit", <FormOutlined className={style.icon} />),
  getItem("返回博客", "/", <RollbackOutlined className={style.icon} />),
];


export const actionMap={create:'发表',delete:'删除',edit:'修改'}

