import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Card, Grid, Image } from "semantic-ui-react";

import { AuthContext } from "../../../context/auth";
import DeleteButton from "../../../components/DeleteButton";
import UpdateGood from "../../../components/Good/UpdateGood";

import "./SingleGood.css";

import { FETCH_GOOD_QUERY } from "../../../util/graphql";

function SingleGood(props) {
  const id = props.match.params.id;

  const { user } = useContext(AuthContext);

  const { data } = useQuery(FETCH_GOOD_QUERY, {
    variables: {
      id,
    },
  });

  console.log(data);

  let goodMarkup;
  if (!data) {
    goodMarkup = <p>Loading good..</p>;
  } else {
    const { title, description, price, id, autor, pageNumber, publishYear } =
      data.getEvent;

    goodMarkup = (
      <Grid className="SingleGood">
        <Grid.Column className="img" width={5}>
          <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
        </Grid.Column>
        <Grid.Column width={6}>
          <Card fluid>
            <Card.Header className="Data">
              <Card.Content>
                <h1>{title}</h1>
              </Card.Content>
              <Card.Content>Description: {description}</Card.Content>
              <Card.Content>Autor: {autor}</Card.Content>
              <Card.Content>Number of page: {pageNumber}</Card.Content>
              <Card.Content>Year of publishing: {publishYear}</Card.Content>
              <Card.Content>id: {id}</Card.Content>
              <hr />
              <Card.Content>{price}$</Card.Content>
            </Card.Header>
            <hr />
            <Card.Content extra>
              {user && user.admin === true ? <DeleteButton id={id} /> : null}
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={5}>
          {user && user.admin === true ? <UpdateGood /> : null}
        </Grid.Column>
      </Grid>
    );
  }
  return goodMarkup;
}

export default SingleGood;
