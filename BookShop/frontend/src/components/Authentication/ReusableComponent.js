import React, { useContext } from "react";
import { Form } from "semantic-ui-react";

import { AuthContext } from "../../context/auth";

function ReusableComponent({ onChange, errors, values }) {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="form-container">
      {user && user.admin === true ? (
        <Form.Field>
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
        </Form.Field>
      ) : (
        <Form>
          <Form.Input
            label="Username"
            placeholder="Username.."
            name="username"
            type="text"
            value={values.username}
            error={errors.username ? true : false}
            onChange={onChange}
          />
          <Form.Input
            label="Password"
            placeholder="Password.."
            name="password"
            type="password"
            value={values.password}
            error={errors.password ? true : false}
            onChange={onChange}
          />
        </Form>
      )}

      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">{Object.values(errors)}</ul>
        </div>
      )}
    </div>
  );
}

export default ReusableComponent;
