import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Confirm, Icon } from "semantic-ui-react";

import { DELETE_USER_MUTATION } from "../util/graphql";
import { ALL_USERS } from "../util/graphql";

function DeleteButton({ userId, callback }) {
  console.log(userId);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);
      // TODO: remove user from cache
      if (userId) {
        const data = proxy.readQuery({
          query: ALL_USERS
        });
        data.users = data.users.filter((p) => p.id !== userId);
        proxy.writeQuery({ query: ALL_USERS, data });
      }
      if(callback) callback();
    },
    variables: {
      userId
    }
  });
  
  return (
    <>
      <Button
        class="ui right floated button"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" color="red" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteUser}
      />
    </>
  );
}

export default DeleteButton;
