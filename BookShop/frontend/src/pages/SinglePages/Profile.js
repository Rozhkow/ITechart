import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Card, Grid } from "semantic-ui-react";

import { AuthContext } from "../../context/auth";

import { FETCH_USER_QUERY } from "../../util/graphql";
import { ORDER_ALL } from "../../util/graphql";
import UpdateUser from "../../components/UpdateUser";

function Profile() {
  const user = useContext(AuthContext);
  const { id } = user.user;

  const { orderData } = useQuery(ORDER_ALL);

  console.log(orderData);

  const { data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      id,
    },
  });

  console.log(data);

  if (!data) {
    <p>Loading user..</p>;
  } else {
    const { username, email, name, lastname, phoneNumber, createdAt, id } =
      data.getUser;

    return (
      <>
        <Grid className="SingleUser">
          <Grid.Row>
            <Grid.Column width={5}>
              <Card fluid>
                <Card.Content className="Data">
                  <Card.Header>Username: {username}</Card.Header>
                  <Card.Description>Email: {email}</Card.Description>
                  <Card.Description>Name: {name}</Card.Description>
                  <Card.Description>Lastname: {lastname}</Card.Description>
                  <Card.Description>
                    PhoneNumber: {phoneNumber}
                  </Card.Description>
                  <Card.Description>Created at: {createdAt}</Card.Description>
                  <Card.Description>ID: {id}</Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={5}>
              <UpdateUser
                id={id}
                username={username}
                email={email}
                name={name}
                lastname={lastname}
                phoneNumber={phoneNumber}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
  return Profile;
}

export default Profile;
