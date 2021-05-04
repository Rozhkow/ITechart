import React, { useState } from 'react';
import gql, { useMutation } from "@apollo/client";

import { Button, Confirm } from 'semantic-ui-react';
import { useState } from "react";

function DeleteButton({ userId }) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
        update() {
            setConfirmOpen(false);
            // TODO: remove user from cache
        },
        variables: {
            userId
        }
    })
    return (
        <>
        <Button
            as="div"
            color="red"
            floated="right"
            onClick={() => console.log('Delete user')}
        >
            <Icon name="trash" style={{ margin: 0 }} />
        </Button>
        <Confirm 
            open={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={deleteUser}
        />    
        </>
    )
}

const DELETE_USER_MUTATION = gql`
    mutation deleteUser($userId: ID!){
        deleteUser($userId: userId)
    }

`

export default DeleteButton;