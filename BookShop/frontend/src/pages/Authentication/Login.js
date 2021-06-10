import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../../context/auth";
import { useForm } from "../../util/hooks";

import "./Login.css";

import ReusableComponent from "../../components/Authentication/ReusableComponent";
import { UserLoginButton } from "../../components/Authentication/LoginComponent";
import { UserLoginFieldSection } from "../../components/Authentication/LoginComponent";

import { Form, Button } from "semantic-ui-react";

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
    <>
      <ReusableComponent
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
      </ReusableComponent>
      <UserLoginButton onSubmit={onSubmit} loading={loading} />
    </>
  );
}

export default Login;

// const RegiFieldsSection = ({ values, errors, onChange }) => (
//   <>
//     <Form.Input
//       label="Email"
//       placeholder="Username.."
//       name="username"
//       type="text"
//       value={values.username}
//       error={errors.username ? true : false}
//       onChange={onChange}
//     />
//     <UserLoginFieldSection />
//   </>
// );
