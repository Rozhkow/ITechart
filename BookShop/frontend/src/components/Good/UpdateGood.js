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
    // picture: "",
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
      // values.picture = "";
      values.id = id;
      values.title = title;
      values.description = description;
      values.price = price;
      values.autor = autor;
      values.pageNumber = pageNumber;
      values.publishYear = publishYear;

      proxy.modify({
        fields: {
          Event(existingEvents = []) {
            return [...existingEvents, result.data.updateEvent];
          },
        },
      });
    },
    onError(err) {
      setErrors(err.message);
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
          <ul className="list">{Object.values(errors)}</ul>
        </div>
      )}
    </Container>
  );
}

export default UpdateGood;
