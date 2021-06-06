import React from "react";
import { Button, Form, Message } from "semantic-ui-react";

const RegisterComponent = ({ onSubmit, onChange, errors, values, loading }) => (
    <div className="form-container">
        <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
            <h1>Register</h1>
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
                label="Email"
                placeholder="Email.."
                name="email"
                type="email"
                value={values.email}
                error={errors.email ? true : false}
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
            <Form.Input
                label="Confirm Password"
                placeholder="Confirm Password.."
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                error={errors.confirmPassword ? true : false}
                onChange={onChange}
            />
            <Button type="submit" primary>
                Register
        </Button>
            <Message>
                <Message.Header>Rouls of register</Message.Header>
                <hr />
                <p>* Username must be unique</p>
                <p>* Email must be valid</p>
                <p>* Passwords must match</p>
            </Message>
        </Form>
        {Object.keys(errors).length > 0 && (
            <div className="ui error message">
                <ul className="list">{Object.values(errors)}</ul>
            </div>
        )}
    </div>
)

export default RegisterComponent