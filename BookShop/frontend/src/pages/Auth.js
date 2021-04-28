import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useNutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';



function AuthPage() {
    

    return (
        <div className="form-container">
      <Form>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
         
        />
        <Form.Input
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      
    </div>
    )
}

export default AuthPage;