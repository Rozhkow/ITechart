import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';
import UnAuthRoute from './util/UnAuthRoute';

import MainNavigation from './components/Navigation/MainNavigation';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ProfilePage from './pages/Profile';
import AdminProfilePage from './pages/AdminProfile';
import Footer from './components/Navigation/Footer';
import { ApolloProvider } from '@apollo/client/react';


const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache()
});


function App() {
  return (
    <AuthProvider client={client}>
      <Router>
        <Container>
          <MainNavigation />
          <Route exact path="/" component={HomePage}/>
          <AuthRoute exact path="/login" component={LoginPage}/>
          <AuthRoute exact path="/register" component={RegisterPage}/>
          <UnAuthRoute exact path="/profile" component={ProfilePage}/>
          <UnAuthRoute exact path="/adminProfile" component={AdminProfilePage}/>
          <Footer />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;