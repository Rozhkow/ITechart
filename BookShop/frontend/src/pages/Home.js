import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Card, Grid } from 'semantic-ui-react';

import GoodCard from '../components/GoodCard';

const FETCH_ITEMS_QUERY = gql`
    query {
        events {
            id
            title
            description
            price
        }
    }
`


function HomePage() {
    const { data } = useQuery(FETCH_ITEMS_QUERY);
    // if (data) {
    //     console.log(data);
    // }

    return (
        <Grid columns={3}>
            <Grid.Row>
                <h1>Current Goods</h1>
            </Grid.Row>
            <Grid.Row>
            {
                    data && data.map((good) => {
                        <Grid.Column key={good.id}>
                            <GoodCard good={good} />
                        </Grid.Column>
                    })
    }
            </Grid.Row>
        </Grid>
    )
}

export default HomePage;