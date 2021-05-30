import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Card, Grid, Image, Accordion, Icon } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";
import UpdateGood from "../components/UpdateGood";

import "./SingleGood.css";

import { FETCH_GOOD_QUERY } from "../util/graphql";

function SingleGood(props) {
  const id = props.match.params.id;
  
  const { user } = useContext(AuthContext);
  
  const { data } = useQuery(FETCH_GOOD_QUERY, {
    variables: {
      id
    },
  });

  console.log(data);

  let goodMarkup;
  if (!data) {
    goodMarkup = <p>Loading good..</p>;
  } else {
    const { title, description, price, id, autor, pageNumber, publishYear } = data.getEvent;

    goodMarkup = 
    user && user.username === "admin" ? (
      <Grid className="SingleGood">
            <Grid.Column className="img" width={5}>
                <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
            </Grid.Column>
          <Grid.Column width={6}>
            <Card fluid>
              <Card.Content>
                <Card.Header><h1>{title}</h1></Card.Header>
                <Card.Header>Description: {description}</Card.Header>
                <Card.Header>Autor: {autor}</Card.Header>
                <Card.Header>Number of page: {pageNumber}</Card.Header>
                <Card.Header>Year of publishing: {publishYear}</Card.Header>
                <Card.Header>id: {id}</Card.Header>
                <hr />
                <Card.Header>{price}$</Card.Header>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <DeleteButton id={id} />
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={5}>
            <UpdateGood />
          </Grid.Column>
      </Grid>
    ) : (
        <Grid className="SingleGood">
            <Grid.Column className="img" width={7}>
                <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
            </Grid.Column>
          <Grid.Column width={9}>
            <Card fluid>
              <Card.Content>
                <Card.Header><h1>{title}</h1></Card.Header>
                <Card.Header>Description: {description}</Card.Header>
                <Card.Header>Autor: {autor}</Card.Header>
                <Card.Header>Number of page: {pageNumber}</Card.Header>
                <Card.Header>Year of publishing: {publishYear}</Card.Header>
                <hr />
                <Card.Header>{price}$</Card.Header>
                <hr />
                <Card.Content extra>
                <Icon size="large" name='shopping cart' />
              </Card.Content>
              </Card.Content>
            </Card>
          </Grid.Column>
      </Grid>
    )}
  return goodMarkup;
}

export default SingleGood;