import BackStage from "../../../layout/Admin";
import Head from "next/head";
import { Table, Tag, Button, Modal, message } from "antd";
import style from "./list.module.css";
import axios from "../../../utils/axios";
import { WarningTwoTone } from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/router";

function List(props) {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [removeId, setRemoveId] = useState(-1);
  const { data } = props;
  const columns = [
    {
      title: "文章标题",
      dataIndex: "title",
      key: "title",
      width: "40%",
    },
    {
      title: "发表时间",
      dataIndex: "time",
      key: "time",
      width: "15%",
    },
    {
      title: "标签分类",
      dataIndex: "tags",
      key: "tags",
      width: "20%",
      render: (tags) => {
        return (
          <div>
            {tags.map((item, index) => {
              return (
                <Tag key={index} color="green">
                  {item}
                </Tag>
              );
            })}
          </div>
        );
      },
    },
    {
      title: "操作",
      key: "x",
      width: "20%",
      render: (data) => (
        <div className={style.action}>
          <Button
            type="primary"
            onClick={() => {
              edit(data.articleId);
            }}
          >
            编辑
          </Button>
          <Button
            danger
            onClick={() => {
              setVisible(true);
              setRemoveId(data.articleId);
            }}
          >
            删除
          </Button>
        </div>
      ),
    },
  ];

  function edit(articleId) {
    router.push({ pathname: "/admin/edit", query: { articleId } });
  }

  function remove() {
    if (removeId !== -1) {
      axios.get(`/article/delete?articleId=${removeId}`).then((value) => {
        if (value.status === 0) {
          message.success("文章删除成功");
        } else {
          message.error("文章删除失败");
        }
        setVisible(false);
        router.push("/admin/list");
      });
    }
  }

  return (
    <BackStage>
      <Head>
        <title>文章列表</title>
        <meta
          name="BackStage"
          content="This is Blog project based on React.js and Next.js"
        />
      </Head>

      {data.status === 0 ? (
        <Table
          columns={columns}
          rowKey="articleId"
          expandable={{
            expandedRowRender: (record) => (
              <div
                style={{
                  margin: 0,
                }}
                dangerouslySetInnerHTML={{ __html: record.desc }}
              ></div>
            ),
            rowExpandable: (record) => record.desc,
          }}
          dataSource={data.data}
          pagination={{ position: ["bottomRight"], defaultPageSize: 8 }}
        />
      ) : (
        <div>{data.msg}</div>
      )}
      <Modal
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        onOk={remove}
        title={<WarningTwoTone color="orange"></WarningTwoTone>}
        closable={false}
      >
        删除不可撤回，是否执行
      </Modal>
    </BackStage>
  );
}

export async function getStaticProps() {
  const data = await axios.post("/article/list");
  return { props: { data } };
}

export default List;
