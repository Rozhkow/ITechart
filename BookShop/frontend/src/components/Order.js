import React, { useReducer, useContext, useEffect } from "react";
import { Card, Grid } from "semantic-ui-react";

import DeleteButton from "./DeleteButton";
import { useQuery, useMutation } from "@apollo/client";

import { AuthContext } from "../context/auth";

import { DELETE_ORDER } from "../util/graphql";
import { ORDER_ALL } from "../util/graphql";

function reloadReducer(state, action) {
  switch (action.type) {
    case "UPDATE_ORDERS":
      return {
        ...state,
        orders: action.payload,
      };
    default:
      throw new Error();
  }
}

function OrderCard() {
  const { loading, data } = useQuery(ORDER_ALL);
  const { user } = useContext(AuthContext);

  const [state, dispatch] = useReducer(reloadReducer, {
    orders: data ? data.orders : [],
  });

  useEffect(() => {
    if (!loading && data && data.orders) {
      dispatch({ type: "UPDATE_ORDERS", payload: data.orders });
    }
  }, [data, loading]);

  const { orders } = state;

  const [deleteOrder] = useMutation(DELETE_ORDER, {
    update(proxy, result) {
      // TODO: remove users from cache

      const data = proxy.readQuery({
        query: ORDER_ALL,
      });

      let newData = [...data.orders];
      newData = [result.data.orders, ...newData];
      proxy.writeQuery({
        query: ORDER_ALL,
        data: {
          ...data,
          orders: {
            newData,
          },
        },
      });
    },
  });

  return (
    <Grid columns={3} className="Cards" stackable>
      <Grid.Column
        width={5}
        style={{
          marginBottom: 20,
          display: "flex",
          alignItems: "baseline",
        }}
      >
        {loading ? (
          <h1>Loading orders..</h1>
        ) : (
          orders &&
          orders
            .filter((purchase) => purchase.username === user.username)
            .map(
              ({
                name,
                lastname,
                address,
                orderId,
                createdAt,
                shoppings,
                username,
                totalPrice,
              }) => (
                <Card fluid style={{ margin: 10 }}>
                  <Card.Content>
                    <Card.Header>{name}'s order</Card.Header>
                    <hr />
                    <Card.Description>Lastname: {lastname}</Card.Description>
                    <Card.Description>Address: {address}</Card.Description>
                    <Card.Description>OrderID: {orderId}</Card.Description>
                    <Card.Description>Username: {username}</Card.Description>
                    <Card.Description>Created at: {createdAt}</Card.Description>

                    <Card.Header>
                      Goods:
                      {shoppings.map(({ event: { title } }) => (
                        <div>{title}</div>
                      ))}
                    </Card.Header>
                    <Card.Header>Price: {totalPrice}</Card.Header>
                    {/* <Card.Content>
                  {shoppings
                    .filter((purchase) => purchase.username === username)
                    .map(({ event: { price } }) => (
                      <div style={{ display: "none" }}>
                        {(totalPrice += +price)}
                      </div>
                    ))}
                  {totalPrice}
                </Card.Content> */}
                    <Card.Content extra style={{ marginTop: 10 }}>
                      <DeleteButton
                        onConfirm={() => {
                          deleteOrder({ variables: { orderId } });
                        }}
                      />
                    </Card.Content>
                  </Card.Content>
                </Card>
              )
            )
        )}
      </Grid.Column>
    </Grid>
  );
}

export default OrderCard;