import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Confirm, Icon } from "semantic-ui-react";

import { DELETE_USER_MUTATION } from "../util/graphql";
import { DELETE_GOOD_MUTATION } from "../util/graphql";

import { ALL_USERS } from "../util/graphql";
import { FETCH_ITEMS_QUERY } from "../util/graphql";

import { Link } from "react-router-dom";

function DeleteButton({ userId, id, onConfirm }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

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
        // as={Link}
        // to="/"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={onConfirm}
      />
    </>
  );
}

export default DeleteButton;
