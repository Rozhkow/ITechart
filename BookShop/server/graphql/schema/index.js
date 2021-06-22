const { buildSchema } = require("graphql");

module.exports = buildSchema(`

type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }

type Shopping {
    shoppingId: ID!
    event: Event!
    createdAt: String!
    updatedAt: String!
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

type RootQuery {
    getUser(id: ID!): User
    getEvent(id: ID!): Event
    users: [User]
    events: [Event]
    shoppings: [Shopping!]!
}


type RootMutation {
    register(registerInput: RegisterInput): User
    login(username: String!, password: String!): User
    createEvent(eventInput: EventInput): Event
    deleteUser(id: ID!): String!
    deleteEvent(id: ID!): String!
    updateEvent(id: ID!, title: String!, description: String!, price: String!, autor: String!, pageNumber: String!, publishYear: String!): Event
    updateUser(id: ID!, username: String!, email: String!): User
    shopEvent(id: ID!): Shopping!
    cancelShopping(shoppingId: ID!): Event!
    createComment(id: String!, body: String!): Event!
    deleteComment(id: ID!, commentId: ID!): Event!
}


schema {
    query: RootQuery
    mutation: RootMutation
}
`);
