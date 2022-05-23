import React from "react";
import { Button } from "antd";

const ButtonComponent = (props: any) => {
  const { btnText, btnFunction, ...rest } = props;
  return (
    <div className="btn-component-wrapper">
      <Button onClick={btnFunction} {...rest}>
        {btnText}
      </Button>
    </div>
  );
};

export default ButtonComponent;
