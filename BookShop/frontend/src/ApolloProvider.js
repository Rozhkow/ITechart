import React from "react";
import App from "./App/App";
import { ApolloClient, InMemoryCache, from } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/client/react";
import { setContext } from "apollo-link-context";

import { createUploadLink } from "apollo-upload-client";

const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql", // endpoint to our localserver
});


const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken"); // let us keep pair of key/defenition in brouser
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: from([authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
