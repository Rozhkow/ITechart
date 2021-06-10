import React from "react";
import { Button, Form, Message } from "semantic-ui-react";

import { UserLoginButton } from "./LoginComponent";
import { UserLoginFieldSection } from "./LoginComponent";

function ReusableComponent({
  errors,
  title,
  children,
  notes,
  messageTitle,
  loading,
  onSubmit,
}) {
  return (
    <Form className="form-container">
      <h1>{title}</h1>
      {children}
      <Form
        onSubmit={onSubmit}
        className="form-container"
        noValidate
        className={loading ? "loading" : ""}
      >
        <Button type="submit" primary onSubmit={onSubmit} loading={loading}>
          {title}
        </Button>
      </Form>
      {notes && (
        <Message>
          <Message.Header>{messageTitle}</Message.Header>
          <hr />
          {notes.map((note, i) => (
            <p key={i}> * {note}</p>
          ))}
        </Message>
      )}
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">{Object.values(errors)}</ul>
        </div>
      )}
    </Form>
  );
}

export default ReusableComponent;
