import React, { useState } from "react";
import { Button, Icon } from "semantic-ui-react";

import { ConfirmPopup } from "./ConfirmPopup";
// import { Link } from "react-router-dom";

function DeleteButton({ onConfirm }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <ConfirmPopup
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={onConfirm}
      >
        <Button
          class="ui right floated button"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" color="red" style={{ margin: 0 }} />
        </Button>
      </ConfirmPopup>
    </>
  );
}

export default DeleteButton;
