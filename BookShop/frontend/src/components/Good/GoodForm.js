import React, { useState } from "react";
import { Form, Button, Container } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { useForm } from "../../util/hooks";

import "./GoodForm.css";

import { CREATE_GOOD_MUTATION } from "../../util/graphql";
import { FETCH_ITEMS_QUERY } from "../../util/graphql";


function GoodForm() {
const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(createGoodCallback, {
    // picture: "",
    title: "",
    description: "",
    price: "",
    autor: "",
    pageNumber: "",
    publishYear: ""
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
    onError(err) {
      alert(err.graphQLErrors[0].message);
    }
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
            value={values.title}
            error={errors.title ? true : false}
            onChange={onChange}
          />
          <Form.Input
            placeholder="Description"
            name="description"
            value={values.description}
            error={errors.description ? true : false}
            onChange={onChange}
          />
          <Form.Input
            type="number"
            placeholder="Price"
            name="price"
            value={values.price}
            error={errors.price ? true : false}
            onChange={onChange}
          />
          <Form.Input
            placeholder="Autor"
            name="autor"
            value={values.autor}
            error={errors.autor ? true : false}
            onChange={onChange}
          />
          <Form.Input
            placeholder="pageNumber"
            name="pageNumber"
            value={values.pageNumber}
            error={errors.pageNumber ? true : false}
            onChange={onChange}
          />
          <Form.Input
            placeholder="publishYear"
            name="publishYear"
            value={values.publishYear}
            error={errors.publishYear ? true : false}
            onChange={onChange}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
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

export default GoodForm;
