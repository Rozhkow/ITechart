import React from "react";
import { Form, Button, Container } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import { useForm } from "../util/hooks";

import "./GoodForm.css";

import { CREATE_GOOD_MUTATION } from "../util/graphql";

function GoodForm() {
  const { values, onChange, onSubmit } = useForm(createGoodCallback, {
    picture: "",
    title: "",
    description: "",
    price: "",
  });

  const [createEvent] = useMutation(CREATE_GOOD_MUTATION, {
    variables: values,
    update(_, result) {
      console.log(result);
      values.picture = "";
      values.title = "";
      values.description = "";
      values.price = "";
    },
  });

  function createGoodCallback() {
    createEvent();
  }

  // console.log(typeof(values.title))
  // console.log(typeof(values.description))
  console.log(typeof values.price);

  return (
    <Container className="GoodCard" noValidate>
      <Form onSubmit={onSubmit}>
        <h2>Create a good:</h2>
        <Form.Field>
          <Form.Input
            name="picture"
            type="file"
            onChange={onChange}
            value={String(values.picture)}
          />
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
