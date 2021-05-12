import React from 'react';
import ReactDOM from "react-dom";
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache } from '@apollo/client';

import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache()
});



ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));