import React, { useState, useContext } from "react";
import { Card, Icon, Image, Accordion, Button, Label } from "semantic-ui-react";

import { Link } from "react-router-dom";
import DeleteButton from "../../DeleteButton";
import "./GoodCard.css";
import { AuthContext } from "../../../context/auth";
import { useMutation } from "@apollo/client";

import { DELETE_GOOD_MUTATION } from "../../../util/graphql";
import { FETCH_ITEMS_QUERY } from "../../../util/graphql";

import { SHOP_EVENT } from "../../../util/graphql";
import { SHOPPING_ALL } from "../../../util/graphql";

function GoodCard({
  good: { title, description, price, id, commentCount },
  image,
}) {
  const { user } = useContext(AuthContext);
  const [shopEvent, { loading }] = useMutation(SHOP_EVENT, {
    update(proxy, result) {
      // TODO: remove users from cache
      const data = proxy.readQuery({
        query: SHOPPING_ALL,
      });
      let newData = [...data.shoppings];
      newData = [result.data.shoppings, ...newData];
      proxy.writeQuery({
        query: SHOPPING_ALL,
        data: {
          ...data,
          shoppings: {
            newData,
          },
        },
      });
    },
    variables: { id: id },
  });

  const [toggle, handleClick] = useState(0);

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

  return (
    <Card style={{ height: "100%" }}>
      <Card.Content
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Image
          centered
          size="medium"
          src={image}
          as={Link}
          to={`/goods/${id}`}
        />
        <Card.Header
          as={Link}
          to={`/goods/${id}`}
          style={{ marginTop: "auto" }}
        >
          {title}
        </Card.Header>
        <Accordion>
          <Accordion.Title
            active={toggle === true}
            onClick={() => handleClick(!!!toggle)}
          >
            <Icon name="dropdown" />
            Description
          </Accordion.Title>
          <Accordion.Content active={toggle === true}>
            <p>{description}</p>
          </Accordion.Content>
        </Accordion>
      </Card.Content>
      <Card.Content extra>
        <Card.Meta>{price}$</Card.Meta>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {user?.admin && <DeleteButton id={id} onConfirm={deleteEvent} />}
          {user && !user.admin && (
            <Button
              animated="vertical"
              primary
              style={{ backgroundColor: "#00B5AD" }}
              onClick={shopEvent}
              id={id}
              loading={loading}
            >
              <Button.Content hidden>Shop</Button.Content>
              <Button.Content visible>
                <Icon name="shop" />
              </Button.Content>
            </Button>
          )}
          {user && (
            <Button
              labelPosition="right"
              as={Link}
              to={`/goods/${id}`}
              className="commentButton"
            >
              <Button color="blue" basic>
                <Icon name="comments" />
              </Button>
              <Label basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          )}
        </div>
      </Card.Content>
    </Card>
  );
}

export default GoodCard;
