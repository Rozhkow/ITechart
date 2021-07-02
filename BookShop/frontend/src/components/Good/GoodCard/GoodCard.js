import React, { useContext } from "react";
import {
  Card,
  Icon,
  Image,
  Accordion,
  Button,
  Label,
} from "semantic-ui-react";

import { Link } from "react-router-dom";
import DeleteButton from "../../DeleteButton";
import "./GoodCard.css";
import { AuthContext } from "../../../context/auth";
import { useMutation } from "@apollo/client";

import { DELETE_GOOD_MUTATION } from "../../../util/graphql";
import { FETCH_ITEMS_QUERY } from "../../../util/graphql";

import { SHOP_EVENT } from "../../../util/graphql";

import img from "../../../img/1.jpg";

function GoodCard({ good: { title, description, price, id, commentCount } }) {
  const { user } = useContext(AuthContext);
  console.log(img)
  const [shopEvent, { loading }] = useMutation(SHOP_EVENT, {
    // update(proxy, result) {
    //   // TODO: remove users from cache

    //   const data = proxy.readQuery({
    //     query: SHOPPING_ALL,
    //   });
    //   let newData = [...data.shopping];
    //   newData = [result.data.shopping, ...newData];
    //   proxy.writeQuery({
    //     query: SHOPPING_ALL,
    //     data: {
    //       ...data,
    //       shopping: {
    //         newData,
    //       },
    //     },
    //   });
    // },
    variables: { id: id },
  });

  console.log(shopEvent);

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
        <Image centered size="medium" src={img} as={Link} to={`/goods/${id}`}/>
        <Card.Header as={Link} to={`/goods/${id}`}>
          {title}
        </Card.Header>
        <Accordion>
          <Accordion.Title
            active={toggle === false}
            onClick={() => handleClick(!!!toggle)}
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
        <div style={{display: "flex", justifyContent: "space-between"}}>
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
        <Button labelPosition="right" as={Link} to={`/goods/${id}`} className="commentButton">
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left" >
            {commentCount}
          </Label>
        </Button>
        )}
        </div>
      </Card.Content>
    </Card>
  );
  return GoodCard;
}

export default GoodCard;
