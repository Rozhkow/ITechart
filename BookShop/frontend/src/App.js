import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import MainNavigation from './components/Navigation/MainNavigation';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';





function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MainNavigation />
          <Route exact path="/" component={HomePage}/>
          <AuthRoute exact path="/login" component={LoginPage}/>
          <AuthRoute exact path="/register" component={RegisterPage}/>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;