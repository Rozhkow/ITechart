import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Card, Grid } from "semantic-ui-react";

import { AuthContext } from "../../context/auth";

import { FETCH_USER_QUERY } from "../../util/graphql";
import UpdateUser from "../../components/UpdateUser";
import Spinner from "../../components/Spinner";

function Profile() {
  const user = useContext(AuthContext);
  const { id } = user.user;

  const { data, loading } = useQuery(FETCH_USER_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) {
    return <Spinner />;
  }

  if (data) {
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
