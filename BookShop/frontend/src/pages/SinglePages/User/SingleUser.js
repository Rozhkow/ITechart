import React from "react";
import { useQuery } from "@apollo/client";
import { Card, Grid } from "semantic-ui-react";

import DeleteButton from "../../../components/DeleteButton";

import "./SingleUser.css";

import { FETCH_USER_QUERY } from "../../../util/graphql";

function SingleUser(props) {
  const userId = props.match.params.userId;

  const { data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId,
    },
  });

  console.log(data);

  let userMarkup;
  if (!data) {
    userMarkup = <p>Loading user..</p>;
  } else {
    const { username, email, createdAt, id } = data.getUser;

    userMarkup = (
      <Grid className="SingleUser">
        <Grid.Row>
          <Grid.Column width={5}>
            <Card fluid>
              <Card.Content className="Data">
                <Card.Header>Username: {username}</Card.Header>
                <Card.Description>Email: {email}</Card.Description>
                <Card.Description>Created at: {createdAt}</Card.Description>
                <Card.Description>ID: {id}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <DeleteButton userId={id} />
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return userMarkup;
}

export default SingleUser;
