import React, { useEffect, useState } from "react";
import { Icon, Divider, Tag } from "antd";
import style from "./leftNav.module.css";
import Image from "next/image";
import { Author } from "../../../config/author";

const tag=['HTTP','MySQL','JavaScript','TypeScript','ES6','React','Vue']

export default function LeftNav() {
  return (
    <div className={style.leftNav}>
      {Author.map((item, index) => {
        return (
          <aside className={style.author} key={index}>
            <Image
              src={item.profile}
              alt={item.auther}
              width="150px"
              height="150px"
              className={style.profile}
            ></Image>
            <h2 className={style.auther}>{item.auther}</h2>
            <h4 className={style.subTitle}>{item.subTitle}</h4>
            <ul className={style.homePage}>
              <li>
                {item.homepages.github.icon}
                <a href={item.homepages.github.link}>Github</a>
              </li>
            </ul>
            <Divider orientation="left" style={{'fontSize':'16px'}}>标签</Divider>
            <div className={style.tagList}>
              {
                tag.map((item,index)=>{
                  return <Tag key={index} color='orange'>
                    {item}
                  </Tag>
                })
              }
            </div>
            {index !== Author.length - 1 ? <Divider></Divider> : null}
          </aside>
        );
      })}
    </div>

    // <aside className={style.leftNav}>
    //   <Image
    //     src={Author}
    //     alt="Beaver"
    //     width="150px"
    //     height="150px"
    //     className={style.profile}
    //   ></Image>
    //   <h2 className="auther">Beaver</h2>
    //   <h5 className="sub-title">Less is more</h5>
    // </aside>
  );
}
