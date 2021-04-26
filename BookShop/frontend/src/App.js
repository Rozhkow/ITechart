import React, { Component } from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css'


import MainNavigation from './components/Navigation/MainNavigation';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache()
});

class App extends Component { 
  state = {
  token: null,
  userId: null
};

login = () => {
  this.setState({ token: null, userId: null });
};

logout = () => {
  this.setState({ token: null, userId: null });
};

render() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Container>
          <MainNavigation />
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/register" component={RegisterPage}/>
        </Container>
      </Router>
    </ApolloProvider>
  );
}}

export default App;