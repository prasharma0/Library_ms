import React from "react";
import { Breadcrumb } from "antd";

interface IProps {
  items?: string[];
}

const CustomBereadcrumb = (props: IProps) => {
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      {props.items &&
        props.items.map((item: string, index: number) => (
          <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
        ))}
    </Breadcrumb>
  );
};

export default CustomBereadcrumb;
