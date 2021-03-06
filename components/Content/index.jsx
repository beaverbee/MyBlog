import { useEffect } from "react";
import { Divider, Tag } from "antd";
import styles from "./content.module.css";
import { translateMarkdown } from "../../utils";
import "highlight.js/styles/atom-one-light.css";

export default function Content({ article, content, isEdit }) {
  return (
    <div className={isEdit ? styles.article : undefined}>
      <article className={styles["article-detail"]}>
        <div className={styles.postHeader}>
          <div className={styles.title}>{article.title}</div>
          <div className={styles.subInformation} style={{ fontSize: "1rem" }}>
            <span className="iconfont icon-date"></span>
            <span>{`Posted On ${article.time}`}</span>
            <Divider type="vertical" className={styles.divider}></Divider>
            <span className="iconfont icon-post"></span>
            <span>
              {article.tags.map((item, index) => {
                return (
                  <Tag key={index} color="blue" style={{ fontSize: "1rem" }}>
                    {item}
                  </Tag>
                );
              })}
            </span>
            <Divider type="vertical" className={styles.divider}></Divider>
          </div>
        </div>
        <Divider style={{ border: "1px solid rgba(0,0,0,0.4)" }}></Divider>
        <div
          className={styles["article-detail"]}
          dangerouslySetInnerHTML={{ __html: translateMarkdown(content) }}
        />
      </article>
    </div>
  );
}
