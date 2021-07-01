import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../../context/auth";
import { useFormm } from "../../util/hooks";

import "./Login.css";

import FormComponent from "../../components/Authentication/FormComponent";
import { UserLoginFieldSection } from "../../components/Authentication/LoginComponent";

import { LOGIN_USER } from "../../util/graphql";

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useFormm(loginUserCallback, {
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
    <>
      <FormComponent
        onSubmit={onSubmit}
        onChange={onChange}
        errors={errors}
        title="Login"
        notes={["Username must not be empty", "Password must not be empty"]}
        messageTitle="Rules of Login"
        loading={loading}
        values={values}
      >
        <UserLoginFieldSection
          values={values}
          errors={errors}
          onChange={onChange}
        />
      </FormComponent>
    </>
  );
}

export default Login;
