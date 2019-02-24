import React, { Component } from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Login from "./screens/login";
import Score from "./screens/score";
import Home from "./screens/home";
import "./App.css";
import Battle from "./screens/battle";
import SimpleMath from "./components/tasks/simpleMath";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/Score" component={Score} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Battle" component={Battle} />
          <Route exact path="/simpleMath" component={SimpleMath} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
