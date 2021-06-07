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
  console.log(id);
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
            <Card.Content className="Data">
              <Card.Header>
                <h1>{title}</h1>
              </Card.Header>
              <Card.Description>Description: {description}</Card.Description>
              <Card.Description>Autor: {autor}</Card.Description>
              <Card.Description>Number of page: {pageNumber}</Card.Description>
              <Card.Description>
                Year of publishing: {publishYear}
              </Card.Description>
              <Card.Description>id: {id}</Card.Description>
              <hr />
              <Card.Content>{price}$</Card.Content>
            </Card.Content>
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
