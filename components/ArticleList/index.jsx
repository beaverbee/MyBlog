import { Divider, Tag } from "antd";
import style from "./articleList.module.css";
export default function ArticleList(props) {
  const { list } = props;
  function jumpDetail(id) {}
  return (
    <ul className={style.list}>
      {list.map((item, index) => {
        return (
          <li
            key={index}
            onClick={() => {
              jumpDetail(item.id);
            }}
            className={style.listItem}
          >
            <Divider orientation="left">
              <span className={style.listItemTitle}>{item.title}</span>
              <span className={style.listItemTime}>{item.time}</span>
            </Divider>
            <div
              className={style.briefContent}
              dangerouslySetInnerHTML={{ __html: item.desc }}
            />
            <div>
              {item.tags.map((tag, index) => {
                return (
                  <Tag key={index} color="green" style={{ fontSize: "0.8rem" }}>
                    {tag}
                  </Tag>
                );
              })}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
