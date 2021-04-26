import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';


  function Login() {

    const [values, setValues] = useState({
      username: '',
      password: '',
    })
  
    const onChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value});
    }
    
    const onSubmit = (event) => {
      event.preventDefault(); 
      login();
    }

    const [login, { loading }] = useMutation(LOGIN_USER, {
      update(rezult){  // to update the cache after a mutation
        console.log(rezult)
      },
      variables: values
    });
  

    return (
      <div className="form-container">
        <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
          <h1>Login</h1>
          <Form.Input
            label="Username"
            placeholder="Username.."
            name="username"
            type="text"
            value={values.username}
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
          <Button type="submit" primary>
            Login
          </Button>
        </Form>
      </div>
    );
}


const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;