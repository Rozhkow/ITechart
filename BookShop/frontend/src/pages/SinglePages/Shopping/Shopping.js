import React, { useState, useReducer, useContext } from "react";
import _ from "lodash";
import { useQuery, useMutation } from "@apollo/client";
import {
  Table,
  Button,
  Container,
  Accordion,
  Form,
  FormGroup,
  Dropdown,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../context/auth";

import "./Shopping.css";

import DeleteButton from "../../../components/DeleteButton";

import { SHOPPING_ALL } from "../../../util/graphql";
import { CANCEL_SHOPPING } from "../../../util/graphql";
import { ADDING_ORDER } from "../../../util/graphql";
import { ORDER_ALL } from "../../../util/graphql";
import OrderCard from "../../../components/Order";

import { useForm } from "../../../util/hooks";

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
    default:
      throw new Error();
  }
}

const AddressesOption = [
  {
    key: "Lenina 44",
    text: "Lenina 44",
    value: "Lenina 44",
  },
  {
    key: "Shorsa 22",
    text: "Shorsa 22",
    value: "Shorsa 22",
  },
];

function Shopping() {
  const { loading, data } = useQuery(SHOPPING_ALL);
  const { user } = useContext(AuthContext);

  const event = (!loading && data && data?.shoppings) || [];

  const [errors, setErrors] = useState({});

  let [totalPrice, setTotalPrice] = useState(0);

  const [payment, setPayment] = useState("");

  const [delivery, setDelivery] = useState("");

  setTotalPrice = (price) => {
    totalPrice += +price;
  };

  const { onChange, onSubmit, values } = useForm(orderUserCallback, {
    name: "",
    lastname: "",
    address: "",
    // paymentMethod: "",
    // deliveryMethod: "",
    cardNumber: "",
  });

  const [state, dispatch] = useReducer(sortReducer, {
    column: null,
    direction: null,
  });

  const { column } = state;

  let shoppingIds = [];

  const [addingOrder] = useMutation(ADDING_ORDER, {
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
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      name: values.name,
      lastname: values.lastname,
      address: values.address,
      paymentMethod: payment,
      deliveryMethod: delivery,
      cardNumber: values.cardNumber,
      totalPrice: totalPrice,
      shoppingIds: shoppingIds,
    },
  });

  console.log(totalPrice);

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
            {/* <Form.Input
              label="Name"
              placeholder="Name"
              name="name"
              type="text"
              onChange={onChange}
              value={values.name}
              error={!!errors.name}
              disabled
            />
            <Form.Input
              label="Last Name"
              placeholder="Last Name"
              name="lastname"
              type="text"
              onChange={onChange}
              value={values.lastname}
              error={!!errors.lastname}
              disabled
            /> */}
            <FormGroup>
              <p>
                <input
                  name="Card"
                  label="Card"
                  type="radio"
                  value="Card"
                  checked={payment === "Card"}
                  onChange={(e) => setPayment(e.target.value)}
                  style={{ margin: 10 }}
                />
                Card
              </p>
              <p>
                <input
                  name="Cash"
                  label="Cash"
                  type="radio"
                  value="Cash"
                  checked={payment === "Cash"}
                  onChange={(e) => setPayment(e.target.value)}
                  style={{ margin: 10 }}
                />
                Cash
              </p>
            </FormGroup>
            {payment === "Card" && (
              <Form.Input
                label="CardNumber"
                placeholder="CardNumber"
                name="cardNumber"
                type="text"
                onChange={onChange}
                value={values.cardNumber}
                error={!!errors.cardNumber}
              />
            )}
            <FormGroup>
              <p>
                <input
                  name="pickUp"
                  label="PickUp"
                  type="radio"
                  value="PickUp"
                  checked={delivery === "PickUp"}
                  onChange={(e) => setDelivery(e.target.value)}
                  style={{ margin: 10 }}
                />
                PickUp
              </p>
              <p>
                <input
                  name="delivery"
                  label="Delivery"
                  type="radio"
                  value="Delivery"
                  checked={delivery === "Delivery"}
                  onChange={(e) => setDelivery(e.target.value)}
                  style={{ margin: 10 }}
                />
                Delivery
              </p>
            </FormGroup>
            {delivery === "Delivery" && (
              <Form.Input
                label="Address"
                placeholder="Address"
                name="address"
                type="text"
                onChange={onChange}
                value={values.address}
                error={!!errors.address}
              />
            )}
            {delivery === "PickUp" && (
              <Dropdown
                placeholder="Select Address"
                fluid
                selection
                options={AddressesOption}
                style={{ marginBottom: 10 }}
              />
            )}
            <Button loading={loading} className="order">
              Order
            </Button>
          </Form>
        ),
      },
    },
  ];

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
            <Table.HeaderCell>number</Table.HeaderCell>
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
              ({
                event: { title, autor, price, id },
                createdAt,
                shoppingId,
                username,
              }) => (
                <>
                  {username === user.username && (
                    <Table.Row textAlign="center" key={shoppingId}>
                      <Table.Cell>{shoppingIds.push(shoppingId)}</Table.Cell>
                      <Table.Cell>
                        <Table.Cell as={Link} to={`/goods/${id}`}>
                          {title}
                        </Table.Cell>
                      </Table.Cell>
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
                    </Table.Row>
                  )}
                </>
              )
            )
          )}
        </Table.Body>
      </Table>

      <div style={{ display: "none" }}>
        {event
          .filter((event) => event.username === user.username)
          .map(({ event: { price } }) => setTotalPrice(price))}
      </div>
      <h2 className="totalPrice">Total price: {totalPrice}$</h2>

      <Accordion panels={panels} />
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
      <OrderCard />
    </Container>
  );
}

export default Shopping;
