import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Confirm, Icon } from "semantic-ui-react";

import { DELETE_USER_MUTATION } from "../util/graphql";
import { DELETE_GOOD_MUTATION } from "../util/graphql";

import { ALL_USERS } from "../util/graphql";
import { FETCH_ITEMS_QUERY } from "../util/graphql";

function DeleteButton({ userId, id }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = userId ? DELETE_USER_MUTATION : DELETE_GOOD_MUTATION;

  const [deleteEventOrUser] = useMutation(mutation, {
    update(proxy, result) {
      // TODO: remove users from cache
      if (userId) {
        const data = proxy.readQuery({
          query: ALL_USERS,
        });
        let newData = [...data.users];
        newData = [result.data.users, ...newData];
        proxy.writeQuery({
          query: ALL_USERS,
          data: {
            ...data,
            users: {
              newData,
            },
          },
        });
      }
      if (id) {
        const data = proxy.readQuery({
          // read data from cache
          query: FETCH_ITEMS_QUERY,
        });
        let newData = [...data.events];
        newData = [result.data.events, ...newData];
        proxy.writeQuery({
          // update data in cache
          query: FETCH_ITEMS_QUERY,
          data: {
            ...data,
            events: {
              newData,
            },
          },
        });
      }
    },
    variables: {
      userId,
      id,
    },
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
        onConfirm={deleteEventOrUser}
      />
    </>
  );
}

export default DeleteButton;
