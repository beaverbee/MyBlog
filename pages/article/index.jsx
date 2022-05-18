import { useEffect, useState } from "react";
import Head from "next/head";
import Web from "../../layout/Web";
import styles from "./article.module.css";
import { Spin, Divider, Tag, Row, Col, Anchor } from "antd";
import Navigation from "../../components/Navigation";

const article = {
  title: "用 node 写命令行工具",
  content: `
  <p>用来方便使用，免去繁琐的创建过程，所以写了个脚本工具，记录下来。</p><p>需求：执行 node 文件，在控制台输入 文章标题、文章分类、以及文件名后自动创建 MD 文件。实现的功能如下：</p><figure class="image"></figure><p>创建的内容如下：</p><p>---
title: node
date: 2020-01-09 10:09:38
---</p><p>路径则是 xxx/docs/node/node.md</p><h2><strong>前置知识</strong></h2><ul><li><a href="https://github.com/tj/commander.js">commander</a>: 解析用户命令行输入</li><li><a href="https://github.com/SBoudrias/Inquirer.js">inquirer</a>: 常见的交互式命令行用户界面的集合</li><li><a href="https://github.com/chalk/chalk">chalk</a>: 美化命令行，进行着色</li></ul><h3><strong>commander</strong></h3><p><a href="https://github.com/tj/commander.js">commander</a>灵感来自 Ruby，它提供了用户命令行输入和参数解析的强大功能，可以帮助我们简化命令行开发。<br>根据其官方的描述，具有以下特性:</p><ul><li>参数解析</li><li>强制多态</li><li>可变参数</li><li>Git 风格的子命令</li><li>自动化帮助信息</li><li>自定义帮助等</li></ul><p><strong>example</strong></p><p>const program = require('commander')
const inquirer = require('inquirer')
const chalk = require('chalk')
program
&nbsp;.command('module')
&nbsp;.alias('m')
&nbsp;.description('输入名称')
&nbsp;.option('-n, --name [moduleName]', '模块名称')
&nbsp;.action(option =&gt; {
&nbsp; &nbsp;console.log('Hello World', option.name)
&nbsp;})
&nbsp;.command('module')
&nbsp;.alias('m')
&nbsp;.description('输入名称')
&nbsp;.option('-n, --name [moduleName]', '模块名称')
&nbsp;.action(option =&gt; {
&nbsp; &nbsp;console.log('Hello World', option.name)
&nbsp;})
&nbsp;.command('module')
&nbsp;.alias('m')
&nbsp;.description('输入名称')
&nbsp;.option('-n, --name [moduleName]', '模块名称')
&nbsp;.action(option =&gt; {
&nbsp; &nbsp;console.log('Hello World', option.name)
&nbsp;})
&nbsp;.command('module')
&nbsp;.alias('m')
&nbsp;.description('输入名称')
&nbsp;.option('-n, --name [moduleName]', '模块名称')
&nbsp;.action(option =&gt; {
&nbsp; &nbsp;console.log('Hello World', option.name)
&nbsp;})
program.parse(process.argv)$ node app m -n guosw <i>// 输出：Hello World guosw</i></p><p><strong>commander API</strong></p>
<h2><strong>后置知识</strong></h2>
  `,
  tags: ["Node", "JavaScript"],
  time: "2020-01-14",
};

function getAnchorList(str) {
  const pattern = /<(h[1-6])[\s\S]+?(?=<\/\1>)/g; //正则匹配 h1-h6 作为锚点标题
  const list = [];
  function pushItem(arr, item) {
    const len = arr.length;
    const matchItem = arr[len - 1];
    if (matchItem && matchItem.tag !== item.tag) {
      pushItem(matchItem.children, item);
    } else {
      arr.push(item);
      // debugger
    }
  }
  let newStr = str.replace(pattern, ($0, $1) => {
    const endIndex = $0.indexOf("</");
    const startIndex = $0
      .substring(0, endIndex === -1 ? undefined : endIndex)
      .lastIndexOf(">");
    const title = `${$0.substring(
      startIndex + 1,
      endIndex === -1 ? undefined : endIndex
    )}`;
    const href = `#${title}`;
    const currentItem = {
      tag: $1, // 标签类型
      title,
      href,
      children: [],
    };
    pushItem(list, currentItem);
    return `<${$1 + " id='" + title + "'" + $0.substring(3)}`;
  });
  return [list, newStr];
}

const navigationLayout = { xxl: 4, xl: 3, lg: 3, sm: 0, xs: 0 };

export default function Article({ children }) {
  const [loading, setLoading] = useState(true);
  const { title, content, tags, categories, comments, time, viewCount } =
    article;
  const [list, newContent] = getAnchorList(content);
  useEffect(() => {
    var time = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(time);
    };
  }, []);

  return (
    <Web>
      <Head>
        <title>{`My Blog: ${title}`}</title>
        <meta
          name="description"
          content="This is Blog project based on React.js and Next.js"
        />
      </Head>
      <Spin spinning={loading}>
        <Row>
          <Col span={18}>
            <article>
              <div className={styles.postHeader}>
                <div className={styles.title}>{title}</div>
                <div
                  className={styles.subInformation}
                  style={{ fontSize: "1rem" }}
                >
                  <span className="iconfont icon-date"></span>
                  <span>{`Posted On ${time}`}</span>
                  <Divider type="vertical" className={styles.divider}></Divider>
                  <span className="iconfont icon-post"></span>
                  <span>
                    {tags.map((item, index) => {
                      return (
                        <Tag
                          key={index}
                          color="blue"
                          style={{ fontSize: "1rem" }}
                        >
                          {item}
                        </Tag>
                      );
                    })}
                  </span>
                  <Divider type="vertical" className={styles.divider}></Divider>
                </div>
              </div>
              <Divider></Divider>
              <div
                className={styles.articleDetail}
                dangerouslySetInnerHTML={{ __html: newContent }}
              />
            </article>
          </Col>
          <Col {...navigationLayout}>
            <Navigation list={list}></Navigation>
          </Col>
        </Row>
      </Spin>
    </Web>
  );
}
