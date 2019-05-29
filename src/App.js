import React from "react";
import { connect } from "react-redux";
import Header from "../src/components/header";
import { Redirect } from "react-router";
import { Router, Route } from "react-router-dom";
import history from "./history";
import Login from "./screens/login";
import Score from "./screens/score";
import Home from "./screens/home";
import Battle from "./screens/battle";
import SimpleMath from "./components/tasks/simpleMath";
import "./App.css";

const App = isLoggedIn =>
  <Router history={history}>
    <div>
      <Header />
      <Route
        path="/"
        render={() => (isLoggedIn ? <Redirect to="/Login" /> : <Battle />)}
      />
      <Route exact path="/" component={Home} />
      <Route exact path="/Score" component={Score} />
      <Route exact path="/Login" component={Login} />
      <Route exact path="/Battle" component={Battle} />
      <Route exact path="/simpleMath" component={SimpleMath} />
    </div>
  </Router>;

const mapStateToProps = state => ({
  isLoggedIn: state.player.isLoggedIn
});

export default connect(mapStateToProps)(App);
