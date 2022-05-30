import { useState, useEffect } from "react";
import { Input, Row, Col, Form, Button, message, Spin, Modal } from "antd";
import { WarningTwoTone } from "@ant-design/icons";
import style from "./editor.module.css";
import Content from "../Content";
import { translateMarkdown } from "../../utils";
import "highlight.js/styles/atom-one-light.css";
import useRequestLoading from "../../hooks/useAjaxLoading";
import moment from "moment";
import axios from "../../utils/axios";
import { nanoid } from "nanoid";
import qs from "qs";
import { useRouter } from "next/router";

const { TextArea } = Input;
const { useForm } = Form;

function Editor(props) {
  const { data } = props;
  const [clear, setClear] = useState(true);
  const [contentForm] = useForm();
  const [htmlContent, sethtmlContent] = useState("");
  const [loading, withloading] = useRequestLoading();
  const [visible, setVisible] = useState(false);
  const [subInformation, setSubInformation] = useState({});
  const router = useRouter();
  function clearContent() {
    setClear(true);
    setVisible(false);
    contentForm.setFieldsValue({ title: "", desc: "", tags: "", content: "" });
  }

  function submitContent() {
    withloading(contentForm.validateFields())
      .then((value) => {
        const { title, desc } = value;
        const tags = value.tags.split("#");
        const htmlContent = value.content;
        const time = moment().format("YYYY-MM-DD");
        return axios.post(
          data && data.status === 0 ? "/article/edit" : "/article/create",
          qs.stringify({
            title,
            desc,
            time,
            content: htmlContent,
            tags,
            articleId:
              data && data.status === 0 ? data.data.articleId : nanoid(),
          })
        );
      })
      .then((value) => {
        if (value.status === 0) {
          message.success(`文章${data ? "修改" : "发表"}成功`);
          axios.post(
            "/log/create",
            qs.stringify({
              action: data ? "edit" : "create",
              time: moment().format("YYYY-MM-DD"),
              title: value.data.title,
            })
          );
          router.push(`/article/${value.data.articleId}`);
        } else {
          message.error(value.msg);
        }
      })
      .catch((error) => {
        if (error.errorFields) {
          for (const e of error.errorFields) {
            message.warn(e.errors);
          }
        } else {
          console.log(error);
        }
      });
  }

  function previewContent() {
    withloading(contentForm.validateFields())
      .then((value) => {
        sethtmlContent(translateMarkdown(value.content));
        const tags = value.tags.split("#");
        setSubInformation({
          title: value.title,
          desc: value.desc,
          tags,
          time: moment().format("YYYY-MM-DD"),
        });
        setClear(false);
      })
      .catch((error) => {
        for (const e of error.errorFields) {
          message.warn(e.errors);
        }
      });
  }
  useEffect(() => {
    if (data && data.status === 0) {
      const tags = data.data.tags.join("#");
      const {
        data: { title, content, desc },
      } = data;
      contentForm.setFieldsValue({ title, content, desc, tags });
    }
  }, [data, contentForm]);

  return (
    <Spin spinning={loading} delay={500}>
      <Row>
        <Col span={12}>
          <Form
            name="editorArticle"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 20 }}
            form={contentForm}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: "请填写文章标题" }]}
            >
              <Input placeholder="文章标题"></Input>
            </Form.Item>
            <Form.Item
              label="简介"
              name="desc"
              rules={[{ required: true, message: "请填写文章简介" }]}
            >
              <TextArea placeholder="文章简介" allowClear></TextArea>
            </Form.Item>
            <Form.Item
              label="标签"
              name="tags"
              rules={[{ required: true, message: "请填写文章标签" }]}
            >
              <Input placeholder="给文章打tags 用#分割"></Input>
            </Form.Item>
            <Form.Item
              name="content"
              rules={[{ required: true, message: "请填写文章内容" }]}
              wrapperCol={{ span: 24 }}
            >
              <TextArea
                placeholder="编辑文本 支持Markdowng格式编辑"
                className={`${style.content} ${style.textarea}`}
              ></TextArea>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12} offset={0}>
          <div className={style.function}>
            <Button type="primary" onClick={previewContent}>
              预览
            </Button>
            <Button type="loading" onClick={submitContent}>
              提交
            </Button>
            <Button
              type="danger"
              onClick={() => {
                setVisible(true);
              }}
            >
              一键清空
            </Button>
          </div>
          <div className={style.content}>
            {clear ? (
              <div className={style.clear}>未生成预览</div>
            ) : (
              <Content
                {...{
                  article: subInformation,
                  content: htmlContent,
                  isEdit: true,
                }}
              ></Content>
            )}
          </div>
        </Col>
      </Row>
      <Modal
        visible={visible}
        title={
          <WarningTwoTone twoToneColor="orange" style={{ fontSize: "20px" }} />
        }
        onCancel={() => {
          setVisible(false);
        }}
        cancelText="取消"
        onOk={clearContent}
        okText="清空"
        closable={false}
      >
        该操作无法撤回，是否清空所有内容
      </Modal>
    </Spin>
  );
}

export default Editor;
