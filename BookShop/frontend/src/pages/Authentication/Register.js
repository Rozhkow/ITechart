import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../../context/auth";
import { useForm } from "../../util/hooks";

import RegisterComponent from "../../components/Authentication/RegisterComponent";

import { REGISTER_USER } from "../../util/graphql";

function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push("/"); // to the HomePage
    },
    onError(err) {
      setErrors(err.message);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <RegisterComponent
      onSubmit={onSubmit}
      onChange={onChange}
      errors={errors}
      values={values}
      loading={loading}
    />
  );
}

export default Register;
