import React, { useContext } from 'react'
import { gql, useQuery } from '@apollo/client';
import { Card, Grid } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';


function SingleUser(props){
    const userId = props.match.params.userId;
    console.log(userId);

    const { data : { getUser }} = useQuery(FETCH_USER_QUERY, {
        variables: {
            userId
        }
    })

    let userMarkup;
    if(!getUser){
        userMarkup = <p>Loading user..</p>
    } else {
        const { username, email, createdAt, id } = getUser;

        userMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={5}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>{username}</Card.Header>
                            <Card.Header>{email}</Card.Header>
                            <Card.Header>{createdAt}</Card.Header>
                            <Card.Header>{id}</Card.Header>
                        </Card.Content>
                        <hr/>
                        <Card.Content extra>

                        </Card.Content>
                    </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    return userMarkup;
}

const FETCH_USER_QUERY = gql`
    query($userId: ID!){
        getUser(userId: $userId){
            username
            email
            createdAt
            id
        }
    }
`

export default SingleUser;


