import { Fragment } from "react";
import { useState } from "react";
// import { translateMarkdown } from "../../../utils";
import { Input, Row, Col, Form, Button, message, Spin } from "antd";
import style from "./editor.module.css";
import Content from "../Content";
import { translateMarkdown } from "../../utils";
import "highlight.js/styles/monokai-sublime.css";
import useRequestLoading from "../../hooks/useAjaxLoading";

const { TextArea } = Input;
const { useForm } = Form;

const content = { title: "111", desc: "111", tags: "Node#JavaScript" };

export default function Editor(props) {
  const [clear, setClear] = useState(true);
  const [contentForm] = useForm();
  const [htmlContent, sethtmlContent] = useState("");
  const [loading, withloading] = useRequestLoading();

  function clearContent() {
    setClear(true);
  }

  function submitContent() {
    withloading(contentForm.validateFields())
      .then((value) => {
        const html = translateMarkdown(value.content);
        sethtmlContent(html);
        message.success("文章发表成功");
      })
      .catch((error) => {
        for (const e of error.errorFields) {
          message.warn(e.errors);
        }
      });
  }

  function previewContent() {}

  return (
    <Spin spinning={loading} delay={500}>
      <Row>
        <Col span={12}>
          <Form
            name="editorArticle"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 20 }}
            form={contentForm}
            initialValues={content}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: "请填写文章标题" }]}
            >
              <Input></Input>
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
        <Col span={10} offset={1}>
          <div className={style.function}>
            <Button type="primary" onClick={previewContent}>
              预览
            </Button>
            <Button type="loading" onClick={submitContent}>
              提交
            </Button>
            <Button type="danger" onClick={clearContent}>
              一键清空
            </Button>
          </div>
          <div className={style.content}>
            {clear ? (
              <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
            ) : (
              <Content {...{}}></Content>
            )}
          </div>
        </Col>
      </Row>
    </Spin>
  );
}
