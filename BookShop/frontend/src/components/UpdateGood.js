import React from "react";
import { Form, Button, Container } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { useForm } from "../util/hooks";

import "./GoodForm.css";

import { UPDATE_GOOD } from "../util/graphql";
import { FETCH_GOOD_QUERY } from "../util/graphql";


function UpdateGood() {
  const { values, onChange, onSubmit } = useForm(updateGoodCallback, {
    // picture: "",
    id: "",
    title: "",
    description: "",
    price: "",
    autor: "",
    pageNumber: "",
    publishYear: ""
  });

  const [updateEvent] = useMutation(UPDATE_GOOD, {
    variables: values,
    update(proxy, result) {
      debugger
      // TODO: remove goods from cache
      // values.picture = "";
      values.id = "";
      values.title = "";
      values.description = "";
      values.price = "";
      values.autor = "";
      values.pageNumber = "";
      values.publishYear = "";

      
      // const data = proxy.readQuery({
      //   query: FETCH_GOOD_QUERY
      // });
      // let newData = [...data.getEvent];
      // newData = [result.data.getEvent, ...newData];
      // proxy.writeQuery({
      //   query: FETCH_GOOD_QUERY,
      //   data: {
      //     ...data,
      //     getEvent: {
      //       newData
      //     }
      //   }
      // })
    },
  });

  function updateGoodCallback() {
    updateEvent();
  }

  // console.log(typeof(values.title))
  // console.log(typeof(values.description))
  // console.log(typeof values.price);



  return (
    <Container className="GoodCard" noValidate>
      <Form onSubmit={onSubmit}>
        <h2>Update a good:</h2>
        <Form.Field>
          {/* <Form.Input
            name="picture"
            type="file"
            onChange={onChange}
            value={String(values.picture)}
          /> */}
          <Form.Input
            placeholder="ID"
            name="id"
            onChange={onChange}
            value={values.id}
          />
          <Form.Input
            placeholder="Title"
            name="title"
            onChange={onChange}
            value={values.title}
          />
          <Form.Input
            placeholder="Description"
            name="description"
            onChange={onChange}
            value={values.description}
          />
          <Form.Input
            type="number"
            placeholder="Price"
            name="price"
            onChange={onChange}
            value={values.price}
          />
          <Form.Input
            placeholder="Autor"
            name="autor"
            onChange={onChange}
            value={values.autor}
          />
          <Form.Input
            placeholder="pageNumber"
            name="pageNumber"
            onChange={onChange}
            value={values.pageNumber}
          />
          <Form.Input
            placeholder="publishYear"
            name="publishYear"
            onChange={onChange}
            value={values.publishYear}
          />
          <Button type="submit" color="teal">
            Update
          </Button>
        </Form.Field>
      </Form>
    </Container>
  );
}

export default UpdateGood;