import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";
import UnAuthRoute from "./util/UnAuthRoute";

import MainNavigation from "./components/Navigation/MainNavigation";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ProfilePage from "./pages/Profile";
import AdminProfilePage from "./pages/AdminProfile";
import Footer from "./components/Navigation/Footer";
import SingleUser from "./pages/SingleUser";

// parameter EXACT need to us because it desables partial matching for 
// routs and we can be sure that it returns route only in case that our way match to current URL 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container className="mainContainer">
          <MainNavigation /> 
          <Route exact  path="/" component={HomePage} /> 
          <AuthRoute exact path="/login" component={LoginPage} />
          <AuthRoute exact path="/register" component={RegisterPage} />
          <UnAuthRoute exact path="/profile" component={ProfilePage} />
          <UnAuthRoute
            exact
            path="/adminProfile"
            component={AdminProfilePage}
          />
          <Route exact path="/users/:userId" component={SingleUser} />
          <Footer />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
