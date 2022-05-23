import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useEffect, useState } from "react";
import {
  TeamOutlined,
  BookOutlined,
  HomeOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router";
import axios from "axios";
import { Typography } from "antd";
const { Title } = Typography;

const Sidebar = () => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(true as boolean);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Menu theme="dark" defaultSelectedKeys={[""]} mode="inline">
      <Menu.Item className="mt-3"
        onClick={() => {
          history.push("/");
        }}
        key="1"
        icon={<HomeOutlined />}
      >
        Home
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          history.push("/books");
        }}
        key="2"
        icon={<BookOutlined />}
      >
        Books
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          history.push("/members");
        }}
        key="3"
        icon={<TeamOutlined />}
      >
        Members
      </Menu.Item>

      <Menu.Item
        onClick={() => {
          history.push("/histories");
        }}
        key="4"
        icon={<HistoryOutlined />}
      >
        Histories
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
