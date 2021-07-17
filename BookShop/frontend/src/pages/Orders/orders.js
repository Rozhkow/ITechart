import React, { useReducer } from "react";
import { useQuery, useMutation } from "@apollo/client";
import _ from "lodash";
import { Link } from "react-router-dom";

import DeleteButton from "../../components/DeleteButton";

import { ORDER_ALL } from "../../util/graphql";
import { DELETE_ORDER } from "../../util/graphql";

import { Container, Table } from "semantic-ui-react";

function sortReducer(state, action) {
  switch (action.type) {
    case "CHANGE_SORT":
      if (state.column === action.column) {
        return {
          ...state,
          orders: state.orders.slice().reverse(),
          direction:
            state.direction === "ascending" ? "descending" : "ascending",
        };
      }

      return {
        column: action.column,
        orders: _.sortBy(state.orders, [action.column]),
        direction: "ascending",
      };
    default:
      throw new Error();
  }
}

function Orders() {
  const { loading, data } = useQuery(ORDER_ALL);

  const [state, dispatch] = useReducer(sortReducer, {
    column: null,
    direction: null,
  });

  const orders = (!loading && data && data?.orders) || [];

  const { column } = state;

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
    <Container classname="Orders">
      <h1>Orders</h1>
      <Table sortable celled compact>
        <Table.Header>
          <Table.Row
            textAlign="center"
            sorted={
              column === "name" &&
              "lastname" &&
              "username" &&
              "address" &&
              "orderId" &&
              "goods" &&
              "createdAt" &&
              "price"
            }
          >
            <Table.HeaderCell
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "name" })}
            >
              name
            </Table.HeaderCell>
            <Table.HeaderCell
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "lastname" })
              }
            >
              lastname
            </Table.HeaderCell>
            <Table.HeaderCell
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "username" })
              }
            >
              username
            </Table.HeaderCell>
            <Table.HeaderCell
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "address" })
              }
            >
              address
            </Table.HeaderCell>
            <Table.HeaderCell
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "orderId" })
              }
            >
              orderId
            </Table.HeaderCell>
            <Table.HeaderCell
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "goods" })}
            >
              goods
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
            <Table.HeaderCell>delete order</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {loading ? (
            <h1>Loading orders..</h1>
          ) : (
            orders &&
            orders.map(
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
                <Table.Row textAlign="center" key={name}>
                  <Table.Cell>{name}</Table.Cell>
                  <Table.Cell>{lastname}</Table.Cell>
                  <Table.Cell>{username}</Table.Cell>
                  <Table.Cell>{address}</Table.Cell>
                  <Table.Cell>{orderId}</Table.Cell>
                  <Table.Cell>
                    {shoppings
                      .filter((purchase) => purchase.username === username)
                      .map(({ event: { title, id } }) => (
                        <Table.Cell as={Link} to={`/goods/${id}`}>
                          <div>{title}</div>
                        </Table.Cell>
                      ))}
                  </Table.Cell>
                  <Table.Cell>{createdAt}</Table.Cell>
                  <Table.Cell>
                    {shoppings
                      .filter((purchase) => purchase.username === username)
                      .map(({ totalPrice }) => (
                        <div>{totalPrice}</div>
                      ))}
                    {totalPrice}
                  </Table.Cell>
                  <Table.Cell>
                    <DeleteButton
                      onConfirm={() => {
                        deleteOrder({ variables: { orderId } });
                      }}
                    />
                  </Table.Cell>
                </Table.Row>
              )
            )
          )}
        </Table.Body>
      </Table>
    </Container>
  );
}

export default Orders;
