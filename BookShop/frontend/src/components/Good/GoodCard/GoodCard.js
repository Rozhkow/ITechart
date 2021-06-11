import React, { useContext } from "react";
import { Card, Icon, Image, Accordion } from "semantic-ui-react";

import { Link } from "react-router-dom";
import DeleteButton from "../../DeleteButton";
import "./GoodCard.css";
import { AuthContext } from "../../../context/auth";
import { useMutation } from "@apollo/client";

import { DELETE_GOOD_MUTATION } from "../../../util/graphql";
import { FETCH_ITEMS_QUERY } from "../../../util/graphql";

function GoodCard({ good: { title, description, price, id } }) {
  const { user } = useContext(AuthContext);

  const [toggle, handleClick] = React.useState(0);

  const [deleteEvent] = useMutation(DELETE_GOOD_MUTATION, {
    update(proxy, result) {
      // TODO: remove users from cache

      const data = proxy.readQuery({
        query: FETCH_ITEMS_QUERY,
      });
      let newData = [...data.events];
      newData = [result.data.events, ...newData];
      proxy.writeQuery({
        query: FETCH_ITEMS_QUERY,
        data: {
          ...data,
          events: {
            newData,
          },
        },
      });
    },
    variables: { id: id },
  });

  const GoodCard = (
    <Card>
      <Card.Content>
        <Image
          centered
          size="medium"
          src={"https://react.semantic-ui.com/images/wireframe/image.png"}
        />
        <Card.Header as={Link} to={`/goods/${id}`}>
          {title}
        </Card.Header>
        <Accordion>
          <Accordion.Title
            active={toggle === false}
            onClick={() => handleClick(!!toggle)}
          >
            <Icon name="dropdown" />
            Description
          </Accordion.Title>
          <Accordion.Content active={toggle === false}>
            <p>{description}</p>
          </Accordion.Content>
        </Accordion>
      </Card.Content>
      <Card.Content extra>
        <Card.Meta>{price}$</Card.Meta>
        <br />
        {user && user.admin === true ? (
          <DeleteButton id={id} onConfirm={deleteEvent} />
        ) : null}
      </Card.Content>
    </Card>
  );
  return GoodCard;
}

export default GoodCard;
