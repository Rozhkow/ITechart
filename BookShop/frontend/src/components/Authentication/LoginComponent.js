import React from "react";
import { Form } from "semantic-ui-react";

export const UserLoginFieldSection = ({
  values,
  errors,
  onChange,
  children,
}) => (
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
    {children}
  </>
);
