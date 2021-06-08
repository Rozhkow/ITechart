import React, { useState } from "react";
import { Form, Button, Container } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { useForm } from "../../../util/hooks";

import "./GoodForm.css";

import { CREATE_GOOD_MUTATION } from "../../../util/graphql";
import { FETCH_ITEMS_QUERY } from "../../../util/graphql";

import ReusableComponent from "../../Authentication/ReusableComponent";

function GoodForm() {
  const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(createGoodCallback, {
    // picture: "",
    title: "",
    description: "",
    price: "",
    autor: "",
    pageNumber: "",
    publishYear: "",
  });

  const [createEvent, { loading }] = useMutation(CREATE_GOOD_MUTATION, {
    variables: values,
    update(proxy, result) {
      // TODO: remove goods from cache
      // values.picture = "";
      values.title = "";
      values.description = "";
      values.price = "";
      values.autor = "";
      values.pageNumber = "";
      values.publishYear = "";

      // const data = proxy.readQuery({
      //   query: FETCH_ITEMS_QUERY,
      // });
      // let newData = [...data.events];
      // newData = [result.data.events, ...newData];
      // proxy.writeQuery({
      //   query: FETCH_ITEMS_QUERY,
      //   data: {
      //     ...data,
      //     events: {
      //       newData,
      //     },
      //   },
      // });

      proxy.modify({
        fields: {
          events(existingEvents = []) {
            debugger;
            return [...existingEvents, result.data.createEvent];
          },
        },
      });
    },
    onError(err) {
      setErrors(err.message);
    },
  });

  function createGoodCallback() {
    createEvent();
  }

  // console.log(typeof(values.title))
  // console.log(typeof(values.description))
  // console.log(typeof values.price);

  return (
    <Container className="GoodCard">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h2>Create a good:</h2>
        <ReusableComponent
          onChange={onChange}
          errors={errors}
          values={values}
        />
        <Button
          type="submit"
          color="teal"
          loading={loading ? <Button loading>Loading</Button> : ""}
          style={{ marginTop: 10 }}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default GoodForm;
