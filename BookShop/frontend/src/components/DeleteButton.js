import React, { useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";

import { Link } from "react-router-dom";

function DeleteButton({ onConfirm }) {
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
        as={Link}
        to="/"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={onConfirm}
      />
    </>
  );
}

export default DeleteButton;
