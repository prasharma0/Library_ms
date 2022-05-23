import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

interface ILogin {
  email: string;
  password: string;
}
const Login = () => {
  const history = useHistory();
  const [values, setValues] = useState({} as ILogin);
  const [showModal, setShowModal] = useState(false as boolean);

  const handleChange = (event: any) => {
    event.persist();
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    const response = await axios.post(
      "http://localhost:4099/api/user/login",
      values
    );
    console.log(response);
    if (response.data.token) {
      Cookies.set("access_token", response.data.token);
      history.push("/dashboard");
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    // setnewMember({
    //   _id: "",
    //   fullName: "",
    //   membership: "",
    // });
    setShowModal(false);
  };

  return (
    <div className="main-wrapper">
      <div className="login-form-wrapper">
        <Modal
          title="Add Members"
          visible={showModal}
          onOk={handleSubmit}
          onCancel={handleCancel}
        >
          <div>
            <label>Email: </label>
            <Input
              onChange={handleChange}
              placeholder="Enter Email"
              name="email"
              value={values.email}
            />
          </div>
          <div>
            <label>Password: </label>
            <Input
              onChange={handleChange}
              placeholder="Enter Password"
              name="password"
              type="password"
              value={values.password}
            />
          </div>
          <div className="btn-wrapper">
            <Button onClick={handleSubmit} type="primary">
              Login
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Login;
