import React from "react";
import { Button, Form, Message } from "semantic-ui-react";

function FormComponent({
  errors,
  title,
  children,
  notes,
  messageTitle,
  loading,
  onSubmit,
}) {
  return (
    <Form className="form-container" onSubmit={onSubmit}>
      <h1>{title}</h1>
      {children}

      <Button
        type="submit"
        primary
        loading={loading}
        style={{ backgroundColor: "#00b5ad" }}
      >
        {title}
      </Button>

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
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </Form>
  );
}

export default FormComponent;
