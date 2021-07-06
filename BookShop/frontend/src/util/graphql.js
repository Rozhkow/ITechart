import gql from "graphql-tag";

export const FETCH_ITEMS_QUERY = gql`
  query events {
    events {
      id
      title
      description
      price
      commentCount
    }
  }
`;

export const DELETE_GOOD_MUTATION = gql`
  mutation deleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
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
  query ($id: ID!) {
    getUser(id: $id) {
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
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
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

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $username: String!, $email: String!) {
    updateUser(id: $id, username: $username, email: $email) {
      id
      username
      email
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
    updateEvent(
      id: $id
      title: $title
      description: $description
      price: $price
      autor: $autor
      pageNumber: $pageNumber
      publishYear: $publishYear
    ) {
      id
      title
      description
      price
      autor
      pageNumber
      publishYear
    }
  }
`;

export const SHOPPING_ALL = gql`
  query shoppings {
    shoppings {
      shoppingId
      createdAt
      event {
        id
        title
        description
        price
        autor
        pageNumber
        publishYear
      }
      username
    }
  }
`;

export const SHOP_EVENT = gql`
  mutation shopEvent($id: ID!) {
    shopEvent(id: $id) {
      shoppingId
      event {
        id
        title
        autor
        price
      }
      username
      createdAt
      updatedAt
    }
  }
`;

export const CANCEL_SHOPPING = gql`
  mutation cancelShopping($shoppingId: ID!) {
    cancelShopping(shoppingId: $shoppingId)
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID!, $commentId: ID!) {
    deleteComment(id: $id, commentId: $commentId) {
      id
      comments {
        id
        createdAt
        body
        username
      }
    }
  }
`;

export const SUBMIT_COMMENT = gql`
  mutation ($id: String!, $body: String!) {
    createComment(id: $id, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

export const ADDING_ORDER = gql`
  mutation addingOrder(
    $name: String!
    $lastname: String!
    $address: String!
    $shoppingId: ID!
  ) {
    addingOrder(
      name: $name
      lastname: $lastname
      address: $address
      shoppingId: $shoppingId
    ) {
      name
      lastname
      address
      shopping {
        event {
          id
          title
          autor
          price
        }
        username
        createdAt
        updatedAt
      }
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation deleteOrder($orderId: ID!) {
    deleteOrder(orderId: $orderId)
  }
`;

export const ORDER_ALL = gql`
  query orders {
    orders {
      orderId
      name
      lastname
      address
      shopping {
        username
        createdAt
        event {
          id
          title
          autor
          price
        }
      }
    }
  }
`;

export const FETCH_ORDER_QUERY = gql`
  query getOrder($orderId: ID!) {
    getOrder(orderId: $orderId) {
      name
      lastname
      address
      shopping {
        event {
          id
          title
          autor
          price
        }
        username
        createdAt
        updatedAt
      }
    }
  }
`;
