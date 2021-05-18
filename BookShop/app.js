const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql").graphqlHTTP;
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const { MONGODB } = require("./config.js");

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-auth");

const PORT = process.env.port || 8000;

const app = express();

app.use(bodyParser.json()); // parses JSON data, buffers, strings and urls passed using an HTTP POST request
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Every host and client can sent requests to the Server
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS"); // To control which kind of request can you sent
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // To control which kind of header can you sent
  // Checking a request because it can't be handled
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth); // authorization check

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

// user connection

mongoose
  .connect(MONGODB)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen({ port: PORT });
  })
  .catch((err) => {
    console.error(err);
  });
