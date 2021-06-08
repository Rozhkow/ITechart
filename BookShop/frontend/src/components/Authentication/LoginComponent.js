import React from "react";
import { Button, Form, Message } from "semantic-ui-react";

import ReusableComponent from "./ReusableComponent";

const LoginComponent = ({ onSubmit, onChange, errors, values, loading }) => (
  <div className="form-container">
    <Form
      className="qweqwe"
      onSubmit={onSubmit}
      noValidate
      className={loading ? "loading" : ""}
    >
      <h1>Login</h1>
      <ReusableComponent onChange={onChange} errors={errors} values={values} />
      <Button type="submit" primary style={{ marginTop: 10 }}>
        Login
      </Button>
      <Message>
        <Message.Header>Rules of Login</Message.Header>
        <hr />
        <p>* Username must not be empty</p>
        <p>* Password must not be empty</p>
      </Message>
    </Form>
  </div>
);

export default LoginComponent;
