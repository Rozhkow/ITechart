import React, { useState } from "react";
import { Form, Container } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { useFormm } from "../../../util/hooks";

import "./GoodForm.css";

import { CREATE_GOOD_MUTATION } from "../../../util/graphql";

import FormComponent from "../../Authentication/FormComponent";

const GoodFieldSection = ({ values, errors, onChange }) => (
  <>
    <Form.Input
      placeholder="Title"
      name="title"
      onChange={onChange}
      error={!!errors.title}
      value={values.title}
    />
    <Form.Input
      placeholder="Description"
      name="description"
      onChange={onChange}
      error={!!errors.description}
      value={values.description}
    />
    <Form.Input
      type="number"
      placeholder="Price"
      name="price"
      onChange={onChange}
      error={!!errors.price}
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
      error={!!errors.pageNumber}
      value={values.pageNumber}
    />
    <Form.Input
      placeholder="publishYear"
      name="publishYear"
      onChange={onChange}
      error={!!errors.publishYear}
      value={values.publishYear}
    />
  </>
);

function GoodForm(props) {
  const [errors, setErrors] = useState({});

  const data = props.data;
  console.log(data);

  const { values, onChange, onSubmit } = useFormm(createGoodCallback, {
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
      values.title = "";
      values.description = "";
      values.price = "";
      values.autor = "";
      values.pageNumber = "";
      values.publishYear = "";

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
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
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
        loading={loading}
      >
        <GoodFieldSection values={values} errors={errors} onChange={onChange} />
      </FormComponent>
    </Container>
  );
}

export default GoodForm;

export { GoodFieldSection };
