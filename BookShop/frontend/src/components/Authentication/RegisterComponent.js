import React from "react";
import { Button, Form, Message } from "semantic-ui-react";

import ReusableComponent from "./ReusableComponent";

const RegisterComponent = ({ onSubmit, onChange, errors, values, loading }) => (
  <div className="form-container">
    <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
      <h1>Register</h1>
      <ReusableComponent onChange={onChange} errors={errors} values={values} />
      <Form.Input
        label="Email"
        placeholder="Email.."
        name="email"
        type="email"
        value={values.email}
        error={errors.email ? true : false}
        onChange={onChange}
      />
      <Form.Input
        label="Confirm Password"
        placeholder="Confirm Password.."
        name="confirmPassword"
        type="password"
        value={values.confirmPassword}
        error={errors.confirmPassword ? true : false}
        onChange={onChange}
      />
      <Button type="submit" primary>
        Register
      </Button>
      <Message>
        <Message.Header>Rules of register</Message.Header>
        <hr />
        <p>* Username must be unique</p>
        <p>* Email must be valid</p>
        <p>* Passwords must match</p>
      </Message>
    </Form>
  </div>
);

export default RegisterComponent;
