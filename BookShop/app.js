const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());       // parses JSON data, buffers, strings and urls passed using an HTTP POST request
app.use(bodyParser.urlencoded({
  extended: false
}));

  app.use(isAuth);   // authorization check

  app.use(    
    '/graphql',
    graphqlHttp({
      schema: graphQlSchema,
      rootValue: graphQlResolvers,
      graphiql: true
    })
  );

  // user connection

mongoose.connect(`mongodb+srv://${      
        process.env.MONGO_USER}:${process.env.MONGO_PASSWORD
    }@cluster0.accxh.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
)
.then(() => {
    app.listen(3000); 
})
.catch(err => {
    console.log(err);
});

