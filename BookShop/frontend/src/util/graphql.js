import gql from "graphql-tag";

export const FETCH_ITEMS_QUERY = gql`
  query events {
    events {
      id
      title
      description
      price
    }
  }
`;

export const DELETE_GOOD_MUTATION = gql`
  mutation deleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId)
  }
`;

export const CREATE_GOOD_MUTATION = gql`
  mutation createEvent(
    
    $title: String!
    $description: String!
    $price: String!
    $autor: String!
    $pageNumber: String!
    $publishYear: String!
  ) {
    createEvent(
      eventInput: {

        title: $title
        description: $description
        price: $price
        autor: $autor
        pageNumber: $pageNumber
        publishYear: $publishYear
      }
    ) {
      
      title
      description
      price
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      admin
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const FETCH_USER_QUERY = gql`
  query ($userId: ID!) {
    getUser(userId: $userId) {
      username
      email
      admin
      createdAt
      id
    }
  }
`;

export const FETCH_GOOD_QUERY = gql`
  query getEvent($id: ID!) {
    getEvent(id: $id) {
      title
      description
      price
      id
      autor
      pageNumber
      publishYear
    }
  }
`;

export const ALL_USERS = gql`
  query users {
    users {
      username
      email
      createdAt
      id
    }
  }
`;

export const UPDATE_GOOD = gql`
mutation updateEvent(
  $id: ID!
  $title: String!
    $description: String!
    $price: String!
    $autor: String!
    $pageNumber: String!
    $publishYear: String!
) {
  updateEvent (
    id: $id
    title: $title
        description: $description
        price: $price
        autor: $autor
        pageNumber: $pageNumber
        publishYear: $publishYear
  ) {
    title
    description
    price
    autor
    pageNumber
    publishYear
  }
}
`;