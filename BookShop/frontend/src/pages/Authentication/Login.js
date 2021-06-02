import React, { useContext, useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../../context/auth";
import { useForm } from "../../util/hooks";

import { LOGIN_USER } from "../../util/graphql";

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    // onError(err) {
    //   alert(err.graphQLErrors[0].message);
    // },
    onError(err) {
      setErrors(err.message);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
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
        <Button type="submit" primary>
          Login
        </Button>
        <Message>
          <Message.Header>Rouls of Login</Message.Header>
          <hr />
          <p>* Username must not be empty</p>
          <p>* Password must not be empty</p>
        </Message>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">{Object.values(errors)}</ul>
        </div>
      )}
    </div>
  );
}

export default Login;