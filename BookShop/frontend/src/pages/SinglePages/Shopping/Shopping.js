import React, { useState, useReducer, useEffect, useContext } from "react";
import _ from "lodash";
import { useQuery, useMutation } from "@apollo/client";
import { Table, Button, Container, Icon, Accordion, Form } from "semantic-ui-react";

import { AuthContext } from "../../../context/auth";

import "./Shopping.css";

import DeleteButton from "../../../components/DeleteButton";

import { SHOPPING_ALL } from "../../../util/graphql";
import { CANCEL_SHOPPING } from "../../../util/graphql";
import { ADDING_ORDER } from "../../../util/graphql";

import { useFormm } from "../../../util/hooks";

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
    case "UPDATE_SHOPPING":
      return {
        ...state,
        event: action.payload,
      };
    default:
      throw new Error();
  }
}

function Shopping() {
  const { loading, data } = useQuery(SHOPPING_ALL);
  const { user } = useContext(AuthContext);

  const { onChange, onSubmit, values } = useFormm(orderUserCallback, {
    name: "",
    lastname: "",
    address: "",
  });
  
  const [state, dispatch] = useReducer(sortReducer, {
    column: null,
    event: data ? data.shoppings : [],
    direction: null,
  });

  useEffect(() => {
    if (!loading && event && data) {
      dispatch({ type: "UPDATE_SHOPPING", payload: data.shoppings });
    }
  }, [data, loading]);

  const { column, event, direction } = state;

  let totalPrice = 0;

  const [addingOrder] = useMutation(ADDING_ORDER, {
    variables: {name: values.name, lastname: values.lastname, address: values.address, shoppingId: "60e3271dceae6036c8d35754"}
  });
  

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

  function orderUserCallback() {
    addingOrder();
  }

  const panels = [
    {
      title: {
        content: <Button className="order">Making an order</Button>,
      },
      content: {
        content: (
          <Form onSubmit={onSubmit}>
            <Form.Input
              placeholder="Name"
              name="name"
              onChange={onChange}
              value={values.name}
            />
            <Form.Input
              placeholder="Last Name"
              name="lastname"
              onChange={onChange}
              value={values.lastname}
            />
            <Form.Input
              placeholder="Address"
              name="address"
              onChange={onChange}
              value={values.address}
            />
            <Button className="order">Order</Button>
          </Form>
        ),
      },
    }
  ]

  return (
    <Container className="Shopping">
      <h1>Shopping cart:</h1>
      <Table sortable celled compact>
        <Table.Header>
          <Table.Row
            textAlign="center"
            sorted={
              column === "title" &&
              "autor" &&
              "shoppingId" &&
              "createdAt" &&
              "price"
            }
          >
            <Table.HeaderCell
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "title" })}
            >
              title
            </Table.HeaderCell>
            <Table.HeaderCell
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "autor" })}
            >
              autor
            </Table.HeaderCell>
            <Table.HeaderCell
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "shoppingId" })
              }
            >
              shoppingId
            </Table.HeaderCell>
            <Table.HeaderCell
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "createdAt" })
              }
            >
              createdAt
            </Table.HeaderCell>
            <Table.HeaderCell
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "price" })}
            >
              price
            </Table.HeaderCell>
            <Table.HeaderCell>cancel</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {loading ? (
            <h1>Loading cart..</h1>
          ) : (
            event &&
            event.map(
              ({ event: { title, autor, price }, createdAt, shoppingId, username }) => (
                <>
                {username === user.username && (<Table.Row textAlign="center" key={shoppingId}>
                  <Table.Cell>{title}</Table.Cell>
                  <Table.Cell>{autor}</Table.Cell>
                  <Table.Cell>{shoppingId}</Table.Cell>
                  <Table.Cell>{createdAt}</Table.Cell>
                  <Table.Cell>{price}</Table.Cell>
                  <Table.Cell>
                    <DeleteButton
                      onConfirm={() => {
                        cancelShopping({ variables: { shoppingId } });
                      }}
                    />
                  </Table.Cell>
                  </Table.Row>)}
                </>
              )
            )
          )}
        </Table.Body>
      </Table>
      {/* <div>
        {event.map({username === user.username ? (({event: { price } })=> (totalPrice += +price)) : null})}
      </div> */}
      <div style={{ display: "none" }}>
        {event.map(({ event: { price } }) => (totalPrice += +price))}
      </div>
      <h1>Total price: {totalPrice}$</h1>

      <Accordion panels={panels} />
    </Container>
  );
}

export default Shopping;
