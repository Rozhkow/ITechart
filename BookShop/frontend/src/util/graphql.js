import gql from "graphql-tag";

export const FETCH_ITEMS_QUERY = gql`
  query events {
    events {
      title
      description
      price
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId)
  }
`;

export const CREATE_GOOD_MUTATION = gql`
  mutation createEvent(
    $picture: Upload
    $title: String!
    $description: String!
    $price: String!
  ) {
    createEvent(
      eventInput: {
        picture: $picture
        title: $title
        description: $description
        price: $price
      }
    ) {
      picture
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
      createdAt
      id
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
