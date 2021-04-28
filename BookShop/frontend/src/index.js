import React from 'react';
import { render } from 'react-dom';
import { gql } from '@apollo/client';


import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';


render(<App />, document.getElementById('root'));