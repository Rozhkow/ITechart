import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "../context/auth";
import AuthRoute from "../util/AuthRoute";

import MainNavigation from "../components/Navigation/MainNavigation";
import HomePage from "../pages/Home/Home";
import LoginPage from "../pages/Authentication/Login";
import RegisterPage from "../pages/Authentication/Register";

import ProfilePage from "../pages/SinglePages/Profile";
import AdminProfilePage from "../pages/Admin/AdminProfile";
import Footer from "../components/Navigation/Footer";
import SingleUser from "../pages/SinglePages/User/SingleUser";
import SingleGood from "../pages/SinglePages/Good/SingleGood";
import ShoppingPage from "../pages/SinglePages/Shopping";

// parameter EXACT need to us because it desables partial matching for
// routs and we can be sure that it returns route only in case that our way match to current URL

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container className="mainContainer">
          <MainNavigation />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <AuthRoute exact path="/profile" component={ProfilePage} />
          <AuthRoute exact path="/adminProfile" component={AdminProfilePage} />
          <AuthRoute exact path="/shopping" component={ShoppingPage} />
          <AuthRoute exact path="/users/:userId" component={SingleUser} />
          <Route exact path="/goods/:id" component={SingleGood} />
          <Footer />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
