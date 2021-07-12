import React, { useState } from "react";
import { Form, Button, Container, Message } from "semantic-ui-react";
import { ApolloCache, useMutation } from "@apollo/client";

import { useFormm } from "../util/hooks";
import { UPDATE_USER } from "../util/graphql";

import "./UpdateUser.css";

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
  const [message, setMessage] = useState({});

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
      setMessage(message.updateUser.message)
    }
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
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
      {Object.keys(errors).length === 0 && (<div className="ui success message">
          {Object.values(message)}
        </div>
      )}
    </Container>
  );
}

export default UpdateUser;
