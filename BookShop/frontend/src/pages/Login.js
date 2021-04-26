import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

function LoginPage() {
    return (
    <div className="form-container">
      <Form>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
    </div>
    )
}

export default LoginPage;