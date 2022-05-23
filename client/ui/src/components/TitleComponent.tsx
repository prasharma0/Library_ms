import React, { MouseEventHandler } from "react";
import { Button } from "antd";
import ButtonComponent from "./ButtonComponent";

interface IProps {
  title: string;
  addButton?: string;
  addBtnClickFunction?: MouseEventHandler<HTMLElement>;
}

const TitleComponent = (props: IProps) => {
  return (
    <div className="title-wrapper">
      <h3>{props.title}</h3>
      {props.addButton && props.addButton.length > 0 && (
        <ButtonComponent
          onClick={props.addBtnClickFunction}
          type="primary"
          btnText={props.addButton}
        />
      )}
    </div>
  );
};

export default TitleComponent;
