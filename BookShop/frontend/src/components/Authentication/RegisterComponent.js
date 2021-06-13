import React from "react";
import { Form } from "semantic-ui-react";

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
