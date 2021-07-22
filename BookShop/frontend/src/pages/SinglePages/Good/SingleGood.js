import React, { useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Card, Grid, Image } from "semantic-ui-react";

import { AuthContext } from "../../../context/auth";
import DeleteButton from "../../../components/DeleteButton";
import UpdateGood from "../../../components/Good/UpdateGood";
import Spinner from "../../../components/Spinner";

import "./SingleGood.css";

import { FETCH_GOOD_QUERY } from "../../../util/graphql";
import { FETCH_ITEMS_QUERY } from "../../../util/graphql";
import { DELETE_GOOD_MUTATION } from "../../../util/graphql";

import CommentCard from "../../../components/Comment/CommentCard";

function SingleGood(props) {
  const id = props.match.params.id;
  const { user } = useContext(AuthContext);

  const { data, loading } = useQuery(FETCH_GOOD_QUERY, {
    variables: {
      id,
    },
  });

  const [deleteEvent] = useMutation(DELETE_GOOD_MUTATION, {
    update(proxy) {
      // TODO: remove users from cache

      const data = proxy.readQuery({
        query: FETCH_ITEMS_QUERY,
      });

      const newData = {
        events: data.events.filter((p) => p.id !== id),
      };

      proxy.writeQuery({
        query: FETCH_ITEMS_QUERY,
        data: {
          events: {
            newData,
          },
        },
      });
      props.history.push("/");
    },
    variables: { id: id },
  });

  if (loading) {
    return <Spinner />;
  }

  if (data) {
    const {
      title,
      description,
      price,
      id,
      autor,
      pageNumber,
      publishYear,
      comments,
    } = data.getEvent;

    return (
      <>
        <Grid className="SingleGood">
          <Grid.Column className="img" width={5}>
            <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
          </Grid.Column>
          <Grid.Column width={6}>
            <Card fluid>
              <Card.Content className="Data">
                <Card.Header>
                  <h1>{title}</h1>
                </Card.Header>
                <Card.Description>Description: {description}</Card.Description>
                <Card.Description>Autor: {autor}</Card.Description>
                <Card.Description>
                  Number of page: {pageNumber}
                </Card.Description>
                <Card.Description>
                  Year of publishing: {publishYear}
                </Card.Description>
                <Card.Description>id: {id}</Card.Description>
                <hr />
                <Card.Content>{price}$</Card.Content>
              </Card.Content>
              <hr />
              <Card.Content extra>
                {user && user.admin && <DeleteButton onConfirm={deleteEvent} />}
              </Card.Content>
            </Card>
          </Grid.Column>

          {user && user.admin && (
            <Grid.Column width={5}>
              <UpdateGood
                id={id}
                title={title}
                description={description}
                price={price}
                autor={autor}
                pageNumber={pageNumber}
                publishYear={publishYear}
              />
            </Grid.Column>
          )}
        </Grid>

        <CommentCard comments={comments} id={id} />
      </>
    );
  }
  return SingleGood;
}

export default SingleGood;
