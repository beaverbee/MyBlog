import { useState, useEffect } from "react";
import {
  Comment,
  Avatar,
  Tooltip,
  Divider,
  Input,
  Form,
  Button,
  message,
} from "antd";
import style from "./Discuss.module.css";
import Image from "next/image";
import axios from "../../utils/axios";
import qs from "qs";
import useRequestLoading from "../../hooks/useAjaxLoading";

const { TextArea } = Input;
const Editor = ({ onChange, onSubmit, submitting, value }) => {
  return (
    <div>
      <Form.Item>
        <TextArea
          rows={5}
          placeholder="说点什么"
          onChange={onChange}
          value={value}
        ></TextArea>
      </Form.Item>
      <Form.Item>
        <Button
          className={style.sumbitButton}
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          添加评论
        </Button>
      </Form.Item>
    </div>
  );
};

const Discuss = (props) => {
  const { articleId } = props;
  const [value, setValue] = useState("");
  const [comment, setComment] = useState([]);
  const [submitting, withLoading] = useRequestLoading();

  useEffect(() => {
    async function getComment() {
      const data = await axios.post(
        "/comment/list",
        qs.stringify({ articleId })
      );
      if (data.status === 0) {
        console.log(data.data);
        setComment(data.data);
      } else {
        message.error(data.msg);
      }
    }
    getComment();
  }, [articleId]);

  function handleSubmit() {
    if (!value) return message.warn("消息不能为空");

    withLoading(
      axios.post("/comment/add", qs.stringify({ articleId, content: value }))
    ).then((res) => {
      setValue("");
      if (res.status === 0) {
        setComment([...comment, res.data]);
      } else {
        message.error(res.msg);
      }
    });
  }

  return (
    <div className="discuss">
      <span className="discuss-count"></span>
      <Comment
        author={<span style={{ fontSize: "1.1rem" }}>visitor</span>}
        avatar={
          <Avatar
            src={
              <Image
                src="/assets/default.png"
                width="60px"
                height="60px"
                alt="visitor"
              ></Image>
            }
            alt="visitor"
            size={60}
          ></Avatar>
        }
        content={
          <Editor
            value={value}
            onChange={(e) => setValue(e.target.value)}
            submitting={submitting}
            onSubmit={handleSubmit}
          ></Editor>
        }
      ></Comment>

      {comment.length !== 0 ? (
        comment.map((com) => {
          return (
            <div key={com._id} className={style.discussItem}>
              <Comment
                author={<span style={{ fontSize: "1rem" }}>visitor</span>}
                avatar={
                  <Avatar
                    src={
                      <Image
                        src="/assets/default.png"
                        width="48px"
                        height="48px"
                        alt="visitor"
                      ></Image>
                    }
                    alt="visitor"
                    size={48}
                  ></Avatar>
                }
                content={<p style={{ fontSize: "1.1rem" }}>{com.content}</p>}
                datetime={
                  <Tooltip title={com.time}>
                    <span style={{ fontSize: "1rem" }}>{com.time}</span>
                  </Tooltip>
                }
              ></Comment>
            </div>
          );
        })
      ) : (
        <span>还没有人留言</span>
      )}
    </div>
  );
};

export default Discuss;
