import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../../context/auth";
import { useForm } from "../../util/hooks";

import LoginComponent from "../../components/Authentication/LoginComponent";

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
    onError(err) {
      setErrors(err.message);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <LoginComponent
      onSubmit={onSubmit}
      onChange={onChange}
      errors={errors}
      values={values}
      loading={loading}
    />
  );
}

export default Login;
