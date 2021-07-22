import React from "react";
import { useQuery } from "@apollo/client";
import { Card, Grid } from "semantic-ui-react";

import DeleteButton from "../../../components/DeleteButton";
import Spinner from "../../../components/Spinner";

import "./SingleUser.css";

import { FETCH_USER_QUERY } from "../../../util/graphql";

function SingleUser(props) {
  const id = props.match.params.id;

  const { data, loading } = useQuery(FETCH_USER_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) {
    return <Spinner />;
  }

  if (data) {
    const { username, email, createdAt, id } = data.getUser;

    return (
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
                <DeleteButton id={id} />
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return SingleUser;
}

export default SingleUser;
