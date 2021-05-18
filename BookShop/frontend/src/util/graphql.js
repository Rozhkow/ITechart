import gql from 'graphql-tag'

export const FETCH_ITEMS_QUERY = gql`
    query events{
        events {
            title
            description
            price
        }
    }
`