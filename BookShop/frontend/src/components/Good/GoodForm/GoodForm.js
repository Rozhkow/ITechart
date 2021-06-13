import React, { useState } from "react";
import { Form, Button, Container } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { useForm } from "../../../util/hooks";

import "./GoodForm.css";

import { CREATE_GOOD_MUTATION } from "../../../util/graphql";
import { FETCH_ITEMS_QUERY } from "../../../util/graphql";

import FormComponent from "../../Authentication/FormComponent";

const GoodFieldSection = ({ values, errors, onChange }) => (
  <>
    <Form.Input
      placeholder="Title"
      name="title"
      onChange={onChange}
      error={errors.title ? true : false}
      value={values.title}
    />
    <Form.Input
      placeholder="Description"
      name="description"
      onChange={onChange}
      error={errors.description ? true : false}
      value={values.description}
    />
    <Form.Input
      type="number"
      placeholder="Price"
      name="price"
      onChange={onChange}
      error={errors.price ? true : false}
      value={values.price}
    />
    <Form.Input
      placeholder="Autor"
      name="autor"
      onChange={onChange}
      error={!!errors.autor}
      value={values.autor}
    />
    <Form.Input
      placeholder="pageNumber"
      name="pageNumber"
      onChange={onChange}
      error={errors.pageNumber ? true : false}
      value={values.pageNumber}
    />
    <Form.Input
      placeholder="publishYear"
      name="publishYear"
      onChange={onChange}
      error={errors.publishYear ? true : false}
      value={values.publishYear}
    />
  </>
);

function GoodForm(props) {
  const [errors, setErrors] = useState({});

  const data = props.data;
  console.log(data);

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
            console.log(result.data.createEvent);
            console.log(existingEvents);
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

  return (
    <Container className="GoodCard">

      <FormComponent
        title="Create a good:"
        onChange={onChange}
        onSubmit={onSubmit}
        errors={errors}
        values={values}
      >
        <GoodFieldSection
          values={values}
          errors={errors}
          onChange={onChange}
        />
      </FormComponent>

    </Container>
  );
}

export default GoodForm;

export { GoodFieldSection };
