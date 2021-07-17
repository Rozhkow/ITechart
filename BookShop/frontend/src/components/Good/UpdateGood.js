import React, { useState } from "react";
import { Form, Button, Container } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { useForm } from "../../util/hooks";

import "./GoodForm/GoodForm.css";

import FormComponent from "../Authentication/FormComponent";
import { GoodFieldSection } from "./GoodForm/GoodForm";
import { UPDATE_GOOD } from "../../util/graphql";

function UpdateGood({
  id,
  title,
  description,
  price,
  autor,
  pageNumber,
  publishYear,
}) {
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({});

  const { values, onChange, onSubmit } = useForm(updateGoodCallback, {
    id: id,
    title: title,
    description: description,
    price: price,
    autor: autor,
    pageNumber: pageNumber,
    publishYear: publishYear,
  });

  const [updateEvent, { loading }] = useMutation(UPDATE_GOOD, {
    variables: values,
    update(proxy, result) {
      // TODO: remove goods from cache
      values.id = values.id;
      values.title = values.title;
      values.description = values.description;
      values.price = values.price;
      values.autor = values.autor;
      values.pageNumber = values.pageNumber;
      values.publishYear = values.publishYear;

      proxy.modify({
        fields: {
          Event(existingEvents = []) {
            return [...existingEvents, result.data.updateEvent];
          },
        },
      });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    onCompleted(message) {
      setMessage(Object.values(message.updateEvent.message));
    },
  });

  function updateGoodCallback() {
    updateEvent();
  }

  return (
    <Container className="GoodCard">
      <FormComponent
        title="Update a good"
        onChange={onChange}
        onSubmit={onSubmit}
        errors={errors}
        values={values}
        loading={loading}
      >
        <GoodFieldSection values={values} errors={errors} onChange={onChange} />
        {Object.keys(errors).length === 0 &&
          Object.values(message).length > 0 && (
            <div className="ui success message">{Object.values(message)}</div>
          )}
      </FormComponent>
    </Container>
  );
}

export default UpdateGood;
