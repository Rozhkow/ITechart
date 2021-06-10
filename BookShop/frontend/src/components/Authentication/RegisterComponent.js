import React from "react";
import { Button, Form } from "semantic-ui-react";

import ReusableComponent from "./ReusableComponent";

export const UserRegisterButton = ({ onSubmit, loading }) => (
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
      loading={loading ? <Button loading>Loading</Button> : ""}
    >
      Register
    </Button>
  </Form>
);

export const RegiFieldsSection = ({ values, errors, onChange }) => (
  <>
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
  </>
);
