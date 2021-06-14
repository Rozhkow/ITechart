import React, { useState, useReducer, useEffect } from "react";
import _ from "lodash";
import { useQuery } from "@apollo/client";

import { Table, Button, Container, Checkbox } from "semantic-ui-react";

import { SHOPPING_ALL } from "../../util/graphql";

function sortReducer(state, action) {
    switch (action.type) {
      case "CHANGE_SORT":
        if (state.column === action.column) {
          return {
            ...state,
            shoppings: state.shoppings.slice().reverse(),
            direction:
              state.direction === "ascending" ? "descending" : "ascending",
          };
        }
  
        return {
          column: action.column,
          shoppings: _.sortBy(state.shoppings, [action.column]),
          direction: "ascending",
        };
      case "SHOPPING_ALL":
        return {
          ...state,
          shoppings: action.payload,
        };
      default:
        throw new Error();
    }
  }

function Shopping(){
    const { loading, data } = useQuery(SHOPPING_ALL);

    const [state, dispatch] = useReducer(sortReducer, {
        checked: false,
        column: null,
        event: data ? data.shoppings : [],
        direction: null,
      });

    const { column, event } = state;

    // const [event] = data.shoppings;
     
    // console.log(event.event)
    // const events = event.event
    // console.log(events)
    console.log(data.shoppings)

    useEffect(() => {
        if (!loading && data && data.shoppings) {
          dispatch({ type: "UPDATE_USERS", payload: data.shoppings });
        }
      }, [data, loading])

    return (
        <Container>
        <Table sortable celled compact>
        <Table.Header>
          <Table.Row
            textAlign="center"
            sorted={column === "title" && "autor" && "id" && "price"}
          >
            <Table.HeaderCell
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "title" })
              }
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
                dispatch({ type: "CHANGE_SORT", column: "id" })
              }
            >
              id
            </Table.HeaderCell>
            <Table.HeaderCell
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "price" })}
            >
              price
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {loading ? (
            <h1>Loading goods..</h1>
          ) : (
            event
              .map(({ title, autor, id, price }) => (
                <Table.Row textAlign="center" key={id}> 
                  <Table.Cell>{title}</Table.Cell>
                  <Table.Cell>{autor}</Table.Cell>
                  <Table.Cell>{id}</Table.Cell>
                  <Table.Cell>{price}</Table.Cell>
                </Table.Row>
              ))
          )}
        </Table.Body>
      </Table>
      </Container>
)
}

export default Shopping;