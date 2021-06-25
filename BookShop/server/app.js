const { ApolloServer, PubSub } = require("apollo-server");
const typeDefs = require("./graphql/schema/typeDefs");
const resolvers = require("./graphql/resolvers");

const mongoose = require("mongoose");
const { MONGODB } = require("./config.js");

const pubsub = new PubSub();

const PORT = process.env.port || 8000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(MONGODB)
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });
