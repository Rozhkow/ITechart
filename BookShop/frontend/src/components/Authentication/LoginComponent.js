import React from "react";
import { Button, Form, Message } from "semantic-ui-react";

import ReusableComponent from "./ReusableComponent";

export const UserLoginButton = ({ onSubmit, loading }) => (
  <Form
    onSubmit={onSubmit}
    className="form-container"
    noValidate
    className={loading ? "loading" : ""}
  >
    <Button
      type="submit"
      primary
      style={{ marginTop: 10 }}
      className="LoginButton"
      loading={loading ? <Button loading>Loading</Button> : ""}
    >
      Login
    </Button>
  </Form>
);

export const UserLoginFieldSection = ({ values, errors, onChange }) => (
  <>
    <Form.Input
      label="Username"
      placeholder="Username.."
      name="username"
      type="text"
      value={values.username}
      error={errors.username ? true : false}
      onChange={onChange}
    />
    <Form.Input
      label="Password"
      placeholder="Password.."
      name="password"
      type="password"
      value={values.password}
      error={errors.password ? true : false}
      onChange={onChange}
    />
  </>
);
