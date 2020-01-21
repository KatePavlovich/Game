import React, { Component } from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Login from "./screens/login";
import Score from "./screens/score";
import Home from "./screens/home";
import "./App.css";
import { LevelsMap } from "./screens/levelsMap";
import { SimpleMath } from "./components/tasks/simpleMath";
import { FindLetter } from "./components/tasks/findLetter";
import Header from "./components/header";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/score" component={Score} />
          <Route path="/login" component={Login} />
          <Route path="/levelsMap" component={LevelsMap} />
          <Route path="/simpleMath" component={SimpleMath} />
          <Route path="/findLetter" component={FindLetter} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
