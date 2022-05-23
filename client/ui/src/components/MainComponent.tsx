import React, { useEffect, useState } from "react";
import { Button, Input, Layout, Menu, Modal, Popover } from "antd";
import Sidebar from "./Sidebar";
import { useHistory } from "react-router";
import Cookies from "js-cookie";
import axios from "axios";
import { LoginOutlined } from "@ant-design/icons";
import { BookOutlined } from "@ant-design/icons";
import lms from "../images/logolftcrop.png";

interface IUser {
  _id: string;
  email: string;
  password: string;
  fullName: string;
}

interface ILogin {
  email: string;
  password: string;
}

interface IError {
  message: string;
  email?: string;
  password?: string;
}
const { Header, Content, Footer, Sider } = Layout;
const MainComponent = (props: any) => {
  const [user, setUser] = useState({} as IUser);
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false as boolean);
  const cookie = Cookies.get("access_token");
  const [showModal, setShowModal] = useState(false as boolean);
  const [values, setValues] = useState({} as ILogin);
  const [error, setError] = useState({} as IError);
  const initialData = { message: "", email: "", password: "" };

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const getUser = async () => {
    const response = await axios.get("http://localhost:5000/api/user");
    setUser(response.data.data);
    console.log(response);
  };

  const handleClickLogin = (event: any) => {
    event.persist();
    setShowModal(true);
  };

  const handleChange = (event: any) => {
    event.persist();
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    const response = await axios.post(
      "http://localhost:5000/api/users/login",
      values
    );
    console.log(response);
    if (response.data.token) {
      Cookies.set("access_token", response.data.token);
      history.push("/dashboard");
      setShowModal(false);
    } else if (response.data.error) {
      setError(response.data.error);
    } else {
      setError(response.data);
    }
  };

  const handleCancel = () => {
    // setnewMember({
    //   _id: "",
    //   fullName: "",
    //   membership: "",
    // });
    setShowModal(false);
    setError(initialData);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleClickLogout = () => {
    setShowModal(true);
  };

  const handleLogout = () => {
    Cookies.remove("access_token");
    history.push("/");
    setShowModal(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div onClick={() => history.push("/")} className="logo">
          <img className="image" src={lms} alt="" />
        </div>
        <Sidebar />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Menu
            className="header-navbar"
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
          >
            <Menu.Item key="1">
              {cookie ? (
                <Button onClick={handleClickLogout} type="primary">
                  Logout
                </Button>
              ) : (
                <Button className ="my-2"onClick={handleClickLogin} type="primary">
                  Login
                </Button>
              )}
            </Menu.Item>
            {cookie && (
              <Menu.Item key="2">
                <Popover content={user.email} title={user.fullName}>
                  <Button type="primary">Admin</Button>
                </Popover>
              </Menu.Item>
            )}
          </Menu>
        </Header>
        <Content style={{ margin: "0 16px" }}>{props.children}</Content>
        <Footer style={{ textAlign: "center" }}>LeapFrog Inc ©2022</Footer>
        {cookie ? (
          <Modal
            title="Are You sure want to Logout?"
            visible={showModal}
            onOk={handleLogout}
            onCancel={handleCancel}
          ></Modal>
        ) : (
          <Modal
            title="Login"
            visible={showModal}
            onOk={handleSubmit}
            onCancel={handleCancel}
          >
            {error.email || error.password ? (
              <p>
                {error.email} <p>{error.password}</p>
              </p>
            ) : (
              <p>{error.message}</p>
            )}
            <div>
              <label>Email: </label>
              <Input
                onChange={handleChange}
                placeholder="Enter Email"
                name="email"
              />
            </div>
            <div>
              <label>Password: </label>
              <Input
                onChange={handleChange}
                placeholder="Enter Password"
                name="password"
                type="password"
              />
            </div>
            <div className="btn-wrapper"></div>
          </Modal>
        )}
      </Layout>
    </Layout>
  );
};

export default MainComponent;
