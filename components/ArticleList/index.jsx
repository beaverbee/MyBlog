import { Divider, Tag, message,Spin } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import style from "./articleList.module.css";

export default function ArticleList(props) {
  const { article } = props;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  function jumpDetail(articleId) {
    setLoading(true)
    router.push(`/article/${articleId}`);
  }
  return (
    <Spin spinning={loading}>
      <ul className={style.list}>
        {article.status === 0
          ? article.data.map((item) => {
              return (
                <li
                  key={item._id}
                  onClick={() => {
                    jumpDetail(item.articleId);
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
                        <Tag
                          key={index}
                          color="green"
                          style={{ fontSize: "0.8rem" }}
                        >
                          {tag}
                        </Tag>
                      );
                    })}
                  </div>
                </li>
              );
            })
          : message.error(article.msg)}
      </ul>
    </Spin>
  );
}
