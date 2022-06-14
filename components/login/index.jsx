import { Button, Form, Modal, Input, message } from "antd";
import style from "./login.module.css";
import axios from "../../utils/axios";
import qs from "qs";
import { useState } from "react";
import { useBus } from "../../hooks/useBus";
import { LOGIN } from "../../config";
import { useRouter } from "next/router";


const { useForm } = Form;

export default function Login(props) {
  const router = useRouter();
  const { userReducer } = useBus();
  const [user, dispatch] = userReducer;
  const { level } = user;
  const [form] = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  function onLogin() {
    setIsModalVisible(true);
  }

  function onLogout() {
    dispatch({
      type: LOGIN,
      value: -1,
    });
  }

  function onUserSubmit() {
    form
      .validateFields()
      .then((value) => {
        axios.post("/login", qs.stringify(value)).then((data) => {
          if (data.status == 0) {
            message.success("登录成功");
            setIsModalVisible(false);
            dispatch({
              type: LOGIN,
              value: data.data.level,
            });
            form.setFieldsValue({ username: "", password: "" });
          }else{
            message.error(data.msg)
          }
        });
      })
      .catch(() => {
        message.error("请输入用户名和密码");
      });
  }
  return (
    <div className={style.headerButton}>
      {level === -1 ? (
        <Button ghost onClick={onLogin} style={{ marginRight: "10px" }}>
          登录
        </Button>
      ) : (
        <Button ghost onClick={onLogout} style={{ marginRight: "10px" }}>
          退出
        </Button>
      )}

      {level !== -1 ? (
        <Button
          ghost
          onClick={() => {
            router.push("/admin");
          }}
        >
          后台管理
        </Button>
      ) : undefined}
      <Modal
        visible={isModalVisible}
        title={"登录"}
        footer={null}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              className={style.button}
              onClick={onUserSubmit}
            >
              登录
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              className={style.button}
              onClick={() => {
                setIsModalVisible(false);
              }}
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
