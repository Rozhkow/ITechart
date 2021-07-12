import React, { useState } from "react";
import { Form, Button, Container } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { useFormm } from "../../util/hooks";

import "./GoodForm/GoodForm.css";

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

  const { values, onChange, onSubmit } = useFormm(updateGoodCallback, {
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
  });

  function updateGoodCallback() {
    updateEvent();
  }

  return (
    <Container className="GoodCard">
      <Form onSubmit={onSubmit} noValidate className={loading && "loading"}>
        <h2>Update a good:</h2>
        <GoodFieldSection values={values} errors={errors} onChange={onChange} />
        <Button type="submit" color="teal">
          Update
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
}

export default UpdateGood;
