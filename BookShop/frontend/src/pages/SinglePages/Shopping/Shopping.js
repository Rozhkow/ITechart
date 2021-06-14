import React, { useState, useReducer, useEffect } from "react";
import _ from "lodash";
import { useQuery, useMutation } from "@apollo/client";
import { Table, Button, Container, Icon } from "semantic-ui-react";

import "./Shopping.css";

import DeleteButton from "../../../components/DeleteButton";

import { SHOPPING_ALL } from "../../../util/graphql";
import { CANCEL_SHOPPING } from "../../../util/graphql";

function sortReducer(state, action) {
  switch (action.type) {
    case "CHANGE_SORT":
      if (state.column === action.column) {
        return {
          ...state,
          event: state.event.slice().reverse(),
          direction:
            state.direction === "ascending" ? "descending" : "ascending",
        };
      }

      return {
        column: action.column,
        event: _.sortBy(state.event, [action.column]),
        direction: "ascending",
      };
    case "SHOPPING_ALL":
      return {
        ...state,
        event: action.payload,
      };
    default:
      throw new Error();
  }
}

// function setTotalPrice(){
//   const totalPrice = event;
//   return totalPrice
// }

function Shopping() {
  const { loading, data } = useQuery(SHOPPING_ALL);

  const [state, dispatch] = useReducer(sortReducer, {
    checked: false,
    column: null,
    event: data ? data.shoppings : [],
    direction: null,
  });

  const { column, event, direction } = state;

  let totalPrice = 0;

  // const [event] = data.shoppings;

  // console.log(event.event)
  // const events = event.event
  // console.log(events)
  // console.log(data.shoppings);
  console.log(event);

  const [cancelShopping] = useMutation(CANCEL_SHOPPING, {
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
  });

  useEffect(() => {
    if (!loading && event) {
      dispatch({ type: "SHOPPING_ALL", payload: event });
    }
  }, [event, loading]);

  return (
    <Container className="Shopping">
      <h1>Shopping cart:</h1>
      <Table sortable celled compact>
        <Table.Header>
          <Table.Row
            textAlign="center"
            sorted={
              column === "title" && "autor" && "id" && "createdAt" && "price"
            }
          >
            <Table.HeaderCell>title</Table.HeaderCell>
            <Table.HeaderCell>autor</Table.HeaderCell>
            <Table.HeaderCell>shoppingId</Table.HeaderCell>
            <Table.HeaderCell>createdAt</Table.HeaderCell>
            <Table.HeaderCell>price</Table.HeaderCell>
            <Table.HeaderCell>cancel</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {loading ? (
            <h1>Loading goods..</h1>
          ) : (
            event.map(({ event: { title, autor, price }, createdAt, id }) => (
              <Table.Row textAlign="center" key={id}>
                <Table.Cell>{title}</Table.Cell>
                <Table.Cell>{autor}</Table.Cell>
                <Table.Cell>{id}</Table.Cell>
                <Table.Cell>{createdAt}</Table.Cell>
                <Table.Cell>{price}</Table.Cell>
                <Table.Cell>
                  <DeleteButton
                    onConfirm={() => {
                      cancelShopping({ variables: { id } });
                    }}
                  />
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
      <div style={{ display: "none" }}>
        {event.map(({ event: { price } }) => (totalPrice += +price))}
      </div>
      <h1>Total price: {totalPrice}$</h1>
    </Container>
  );
}

export default Shopping;
