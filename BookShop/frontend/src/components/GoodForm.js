import React from 'react';
import { Form, Button, Container } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { useForm } from '../util/hooks';

import './GoodForm.css';


const CREATE_GOOD_MUTATION = gql `
    mutation createEvent(
        $title: String!
        $description: String!
        $price: Float!
    ) {
    createEvent(
        eventInput: {
            title: $title
            description: $description
            price: $price
        }
    )
    {
        title
        description
        price
    }
}
`


function GoodForm() {
    const { values, onChange, onSubmit } = useForm(createGoodCallback, {
        title: '',
        description: '',
        price: null
    })
    const [createEvent] = useMutation(CREATE_GOOD_MUTATION, {
        variables: values,
        update(_, result) {
            console.log(result);
            values.title = '';
            values.description = '';
            values.price = null;
        }
    });

    function createGoodCallback(){
        createEvent()
    };

    console.log(typeof(+values.price))
    
    return (
        <Container className="GoodCard">
        <Form onSubmit={onSubmit}>
            <h2>Create a good:</h2>
            <Form.Field>
                <Form.Input
                    placeholder="Title"
                    name="title"
                    onChange={onChange}
                    value={values.title}
                />
                <Form.Input
                    placeholder="Description"
                    name="description"
                    onChange={onChange}
                    value={values.description}
                />
                <Form.Input
                    placeholder="Price"
                    name="price"
                    onChange={onChange}
                    value={Number(values.price)}
                />
                <Button type="submit" color="teal">
                    Submit
                </Button>
            </Form.Field>
        </Form>
        </Container>
    )
};



export default GoodForm;