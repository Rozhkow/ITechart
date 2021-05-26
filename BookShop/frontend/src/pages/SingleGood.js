import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Card, Grid, Image } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";

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
    const { title, description, price, id } = data.getEvent;

    goodMarkup = 
    user && user.username === "admin" ? (
      <Grid className="SingleGood">
            <Grid.Column className="img" width={7}>
                <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
            </Grid.Column>
          <Grid.Column width={9}>
            <Card fluid>
              <Card.Content>
                <Card.Header><h1>{title}</h1></Card.Header>
                <Card.Header>{description}</Card.Header>
                <Card.Header>{price}$</Card.Header>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <DeleteButton id={id} />
              </Card.Content>
            </Card>
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
                <Card.Header>{description}</Card.Header>
                <Card.Header>{price}$</Card.Header>
              </Card.Content>
            </Card>
          </Grid.Column>
      </Grid>
    )}
  return goodMarkup;
}

export default SingleGood;