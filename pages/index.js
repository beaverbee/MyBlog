import Head from "next/head";
import styles from "../styles/Home.module.css";
import Web from "../layout/Web";
import TypeItCompoment from "../components/typeit";
import { memo, useEffect, useState } from "react";
import axios from "axios";
import ArticleList from "../components/ArticleList";

const article = [
  {
    title: "用 node 写命令行工具",
    time: "2020-01-14",
    tags: ["Node", "JavaScript"],
    desc: `<span>用来方便使用，免去繁琐的创建过程，所以写了个脚本工具，记录下来。<span/><br/>
      <span>需求：执行 node 文件，在控制台输入 文章标题、文章分类、以及文件名后自动创建 MD 文件。实现的功能如下<span/>`,
    id: 1,
  },
  {
    title: "实现 ssh 免密登陆服务器",
    time: "2020-01-14",
    tags: ["Git", "Node"],
    desc: `<span>创建 ssh 公钥<span/><br/>
    <span># 进入ssh 查看公钥cat ~/.ssh/id_rsa.pub<span/><br/>
    <span># 如果不存在 则需要创建公钥ssh-keygen -t rsa -C gershonv@163.com<span/><br/>
    <span>复制完公钥后，我们先登陆进服务器。<span/>`,
    id: 2,
  },
  {
    title: "实现 ssh 免密登陆服务器",
    time: "2020-01-14",
    tags: ["Git", "Node"],
    desc: `<span>创建 ssh 公钥<span/><br/>
    <span># 进入ssh 查看公钥cat ~/.ssh/id_rsa.pub<span/><br/>
    <span># 如果不存在 则需要创建公钥ssh-keygen -t rsa -C gershonv@163.com<span/><br/>
    <span>复制完公钥后，我们先登陆进服务器。<span/>`,
    id: 3,
  },
  {
    title: "实现 ssh 免密登陆服务器",
    time: "2020-01-14",
    tags: ["Git", "Node"],
    desc: `<span>创建 ssh 公钥<span/><br/>
    <span># 进入ssh 查看公钥cat ~/.ssh/id_rsa.pub<span/><br/>
    <span># 如果不存在 则需要创建公钥ssh-keygen -t rsa -C gershonv@163.com<span/><br/>
    <span>复制完公钥后，我们先登陆进服务器。<span/>`,
    id: 4,
  },
  {
    title: "实现 ssh 免密登陆服务器",
    time: "2020-01-14",
    tags: ["Git", "Node"],
    desc: `<span>创建 ssh 公钥<span/><br/>
    <span># 进入ssh 查看公钥cat ~/.ssh/id_rsa.pub<span/><br/>
    <span># 如果不存在 则需要创建公钥ssh-keygen -t rsa -C gershonv@163.com<span/><br/>
    <span>复制完公钥后，我们先登陆进服务器。<span/>`,
    id: 5,
  },
  {
    title: "实现 ssh 免密登陆服务器",
    time: "2020-01-14",
    tags: ["Git", "Node"],
    desc: `<span>创建 ssh 公钥<span/><br/>
    <span># 进入ssh 查看公钥cat ~/.ssh/id_rsa.pub<span/><br/>
    <span># 如果不存在 则需要创建公钥ssh-keygen -t rsa -C gershonv@163.com<span/><br/>
    <span>复制完公钥后，我们先登陆进服务器。<span/>`,
    id: 6,
  },
];

const Home = memo(function MyHome() {
  const [instance, setInstance] = useState(true);
  const [Data, setDate] = useState(null);
  useEffect(() => {
    async function loadData() {
      setDate(await axios.get("/api/hello"));
    }
    setTimeout(() => {
      setInstance(false);
    }, 1000);
    loadData();
  }, []);
  return (
    <div className={styles.container} >
      <Head>
        <title>Blog</title>
        <meta
          name="description"
          content="This is Blog project based on React.js and Next.js"
        />
      </Head>
      <Web>
        {instance ? (
          <TypeItCompoment />
        ) : (
          <ArticleList list={article}></ArticleList>
        )}
      </Web>
    </div>
  );
});

export default Home;
