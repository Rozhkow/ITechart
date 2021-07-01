import React, { useState } from "react";
import { Form, Button, Container } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { useFormm } from "../util/hooks";
import { UPDATE_USER } from "../util/graphql";

const UserFieldSection = ({ values, errors, onChange }) => (
  <>
    <Form.Input
      placeholder="Username"
      name="username"
      onChange={onChange}
      error={errors.username ? true : false}
      value={values.username}
    />
    <Form.Input
      placeholder="Email"
      name="email"
      onChange={onChange}
      error={errors.email ? true : false}
      value={values.email}
    />
  </>
);

function UpdateUser({ id, username, email }) {
  const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useFormm(updateUserCallback, {
    id: id,
    username: username,
    email: email,
  });

  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    variables: values,
    update(proxy, result) {
      // TODO: remove goods from cache
      // values.picture = "";
      values.id = id;
      values.username = username;
      values.email = email;

      proxy.modify({
        fields: {
          User(existingUser = []) {
            return [...existingUser, result.data.updateUser];
          },
        },
      });
    },
    onError(err) {
      setErrors(err.message);
    },
  });

  function updateUserCallback() {
    updateUser();
  }

  return (
    <Container>
      <Form onSubmit={onSubmit} noValidate className={loading && "loading"}>
        <h2>Update user:</h2>
        <UserFieldSection values={values} errors={errors} onChange={onChange} />
        <Button type="submit" color="teal">
          Update
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">{Object.values(errors)}</ul>
        </div>
      )}
    </Container>
  );
}

export default UpdateUser;
