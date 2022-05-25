import { useState } from "react";
import { Layout, Row, Col, Button, Modal, Form, Input } from "antd";
import style from "./header.module.css";
import Image from "next/image";
import { useRouter } from "next/router";


const { Header } = Layout;
const title = [
  { title: "首页", icon: "iconfont icon-home-fill", path: "/" },
  { title: "文章列表", icon: "iconfont icon-format_points", path: "/article" },
  { title: "留言板", icon: "iconfont icon-sms_outlined", path: "/board" },
  { title: "个人中心", icon: "iconfont icon-person", path: "/person" },
  { title: "Github", icon: "iconfont icon-github" },
];

export default function BlogHeader(props) {
  const router = useRouter();
  const [login, setlogin] = useState(-1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const routerSwitch = (path) => {
    if (path) {
        router.push(path);      
    } else {
      window.location.href = "https://github.com/beaverbee";
    }
  };

  function onLoginIn() {
    console.log(1);
    setIsModalVisible(true);
  }

  function onUserSubmit() {}

  return (
    <Header className={style.header}>
      <Row style={{ height: "100%" }}>
        <Col span={6} className={style.leftHeader}>
          <Image
            alt="Beaver"
            src="/profilephoto.png"
            className={style.profile}
            width="50px"
            height="50px"
          ></Image>
          <span>Beaver</span>
        </Col>
        <Col span={10} offset={1} className={style.titleList}>
          {title.map((item, index) => {
            return (
              <div
                key={index}
                className={style.title}
                onClick={() => {
                  routerSwitch(item.path || undefined);
                }}
              >
                <span className={item.icon}></span>
                <span>{item.title}</span>
              </div>
            );
          })}
        </Col>
        <Col span={3} offset={3}>
          <div className={style.headerButton}>
            <Button ghost onClick={onLoginIn} style={{ marginRight: "10px" }}>
              {login === -1 ? "登录" : "退出"}
            </Button>
            {login === -1 ? <Button ghost onClick={()=>{router.push('/admin')}}>后台管理</Button> : undefined}
          </div>
        </Col>
      </Row>
      <Modal
        visible={isModalVisible}
        title={login === -1 ? "登录" : "退出"}
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
            <Button type="primary" className={style.button}>
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
    </Header>
  );
}
