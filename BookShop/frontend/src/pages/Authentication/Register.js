import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../../context/auth";
import { useFormm } from "../../util/hooks";

import FormComponent from "../../components/Authentication/FormComponent";
import { RegiFieldsSection } from "../../components/Authentication/RegisterComponent";
import { UserLoginFieldSection } from "../../components/Authentication/LoginComponent";

import { REGISTER_USER } from "../../util/graphql";

function Register(props) { 
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useFormm(registerUser, {
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
    <>
      <FormComponent
        onSubmit={onSubmit}
        onChange={onChange}
        errors={errors}
        title="Register"
        buttonTitle="Register"
        notes={[
          "Username must be unique",
          "Email must be valid",
          "Passwords must match",
        ]}
        messageTitle="Rules of Register"
        loading={loading}
      >
        <UserLoginFieldSection
          values={values}
          errors={errors}
          onChange={onChange}
        />
        <RegiFieldsSection
          values={values}
          errors={errors}
          onChange={onChange}
        />
      </FormComponent>
    </>
  );
}

export default Register;
