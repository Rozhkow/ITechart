import React from "react";
import { Form, Button, Container } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { useForm } from "../util/hooks";

import "./GoodForm.css";

import { CREATE_GOOD_MUTATION } from "../util/graphql";
import { FETCH_ITEMS_QUERY } from "../util/graphql";

function GoodForm() {
  const { values, onChange, onSubmit } = useForm(createGoodCallback, {
    // picture: "",
    title: "",
    description: "",
    price: "",
  });

  const [createEvent] = useMutation(CREATE_GOOD_MUTATION, {
    variables: values,
    update(proxy, result) {
      // TODO: remove goods from cache
      // values.picture = "";
      values.title = "";
      values.description = "";
      values.price = "";
      const data = proxy.readQuery({
        query: FETCH_ITEMS_QUERY
      });
      let newData = [...data.events];
      newData = [result.data.events, ...newData];
      proxy.writeQuery({
        query: FETCH_ITEMS_QUERY,
        data: {
          ...data,
          events: {
            newData
          }
        }
      })
    },
  });

  function createGoodCallback() {
    createEvent();
  }

  // console.log(typeof(values.title))
  // console.log(typeof(values.description))
  // console.log(typeof values.price);

  return (
    <Container className="GoodCard" noValidate>
      <Form onSubmit={onSubmit}>
        <h2>Create a good:</h2>
        <Form.Field>
          {/* <Form.Input
            name="picture"
            type="file"
            onChange={onChange}
            value={String(values.picture)}
          /> */}
          <Form.Input
            placeholder="Title"
            name="title"
            onChange={onChange}
            value={String(values.title)}
          />
          <Form.Input
            placeholder="Description"
            name="description"
            onChange={onChange}
            value={String(values.description)}
          />
          <Form.Input
            type="number"
            placeholder="Price"
            name="price"
            onChange={onChange}
            value={values.price}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
    </Container>
  );
}

export default GoodForm;
