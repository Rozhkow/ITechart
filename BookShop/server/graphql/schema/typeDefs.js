const { gql } = require("apollo-server");

module.exports = gql(`

type Order {
    orderId: ID!
    name: String!
    lastname: String!
    address: String!
    paymentMethod: String!
    totalPrice: Float!
    shoppings: [Shopping!]
    createdAt: String!
    updatedAt: String!
    username: String!
}
  
type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
}

type Shopping {
    shoppingId: ID!
    event: Event!
    username: String!
    createdAt: String!
    updatedAt: String!
    totalPrice: Float!
}

type Event {
    id: ID!
    title: String!
    description: String!
    price: String!
    autor: String!
    pageNumber: String!
    publishYear: String!
    comments: [Comment]!
    commentCount: Int!
}

type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    admin: Boolean!
    createdAt: String!
}

type AuthData {
    id: ID!
    token: String!
    tokenExpiration: Int!
    admin: Boolean!
}

input EventInput {
    title: String!
    description: String!
    price: String!
    autor: String!
    pageNumber: String!
    publishYear: String!
}

input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
}

type Query {
    getUser(id: ID!): User
    getEvent(id: ID!): Event
    users: [User]
    events: [Event]
    shoppings: [Shopping!]!
    orders: [Order]
    getOrder(orderId: ID!): Order
}

type Mutation {
    register(registerInput: RegisterInput): User
    login(username: String!, password: String!): User
    createEvent(eventInput: EventInput): Event
    deleteUser(id: ID!): String!
    deleteEvent(id: ID!): String!
    updateEvent(id: ID!, title: String!, description: String!, price: String!, autor: String!, pageNumber: String!, publishYear: String!): Event
    updateUser(id: ID!, username: String!, email: String!): User
    shopEvent(id: ID!): Shopping!
    cancelShopping(shoppingId: ID!): String!
    createComment(id: String!, body: String!): Event!
    deleteComment(id: ID!, commentId: ID!): Event!
    addingOrder(name: String!, lastname: String!, address: String!, totalPrice: Float!, shoppingIds: [ID]): Order
    deleteOrder(orderId: ID!): String!
}
`);
