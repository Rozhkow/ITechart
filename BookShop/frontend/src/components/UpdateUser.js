import React, { useState } from "react";
import { Form, Container } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { useForm } from "../util/hooks";
import { UPDATE_USER } from "../util/graphql";

import FormComponent from "../components/Authentication/FormComponent";

const UserFieldSection = ({ values, errors, onChange }) => (
  <>
    <Form.Input
      placeholder="Username"
      name="username"
      onChange={onChange}
      error={!!errors.username}
      value={values.username}
    />
    <Form.Input
      placeholder="Email"
      name="email"
      onChange={onChange}
      error={!!errors.email}
      value={values.email}
    />
  </>
);

function UpdateUser({ id, username, email }) {
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({});

  const { values, onChange, onSubmit } = useForm(updateUserCallback, {
    id: id,
    username: username,
    email: email,
  });

  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    variables: values,
    update(proxy, result) {
      // TODO: remove goods from cache
      values.id = values.id;
      values.username = values.username;
      values.email = values.email;
      proxy.modify({
        fields: {
          User(existingUser = []) {
            return [...existingUser, result.data.updateUser];
          },
        },
      });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    onCompleted(message) {
      setMessage(() => (message = "Successful!"));
    },
  });

  function updateUserCallback() {
    updateUser();
  }

  return (
    <Container>
      <FormComponent
        title="Update user"
        onChange={onChange}
        onSubmit={onSubmit}
        errors={errors}
        values={values}
        loading={loading}
      >
        <UserFieldSection values={values} errors={errors} onChange={onChange} />
        {Object.keys(errors).length === 0 && message.length > 0 && (
          <div className="ui success message">{message}</div>
        )}
      </FormComponent>
    </Container>
  );
}

export default UpdateUser;
