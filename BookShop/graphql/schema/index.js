const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Shopping {
    id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type Event {
    id: ID!
    title: String!
    description: String!
    price: String!
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
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input EventInput {

    title: String!
    description: String!
    price: String!
}

input UserInput {
    email: String!
    password: String!
}

input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
}

type RootQuery {
    getUser(userId: ID!): User
    getEvent(id: ID!): Event
    users: [User]
    events: [Event]
    shoppings: [Shopping!]!
}

type RootMutation {
    register(registerInput: RegisterInput): User
    login(username: String!, password: String!): User
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    deleteUser(userId: ID!): String!
    deleteEvent(id: ID!): String!
    shopEvent(id: ID!): Shopping!
    cancelShopping(shoppingId: ID!): Event!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
