import React, { useState, useContext } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
// import gql from 'graphql-tag';


import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';


const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;


function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  
const { onChange, onSubmit, values } = useForm(registerUser, {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})
  
  

const [addUser, { loading }] = useMutation(REGISTER_USER, {
  update(_, { data: { register: userData}}) {
    context.login(userData)
    props.history.push('/') // to the HomePage
  },
  variables: values
})

function registerUser(){
  addUser();
}

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;