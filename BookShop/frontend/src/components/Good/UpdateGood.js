import React, { useState } from "react";
import { Form, Button, Container } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { useForm } from "../../util/hooks";

import "./GoodForm.css";

import { UPDATE_GOOD } from "../../util/graphql";
import { FETCH_GOOD_QUERY } from "../../util/graphql";

function UpdateGood() {
  const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(updateGoodCallback, {
    // picture: "",
    id: "",
    title: "",
    description: "",
    price: "",
    autor: "",
    pageNumber: "",
    publishYear: "",
  });

  const [updateEvent, { loading }] = useMutation(UPDATE_GOOD, {
    variables: values,
    update(proxy, result) {
      debugger;
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
    onError(err) {
      setErrors(err.message);
    },
  });

  function updateGoodCallback() {
    updateEvent();
  }

  // console.log(typeof(values.title))
  // console.log(typeof(values.description))
  // console.log(typeof values.price);

  return (
    <Container className="GoodCard">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
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
            error={errors.id ? true : false}
            value={values.id}
          />
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
            error={errors.autor ? true : false}
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
          <Button type="submit" color="teal">
            Update
          </Button>
        </Form.Field>
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
