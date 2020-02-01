import React, { Component } from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Login } from "./screens/Login";
import { Score } from "./screens/Score";
import { Home } from "./screens/Home";
import { LevelsMap } from "./screens/LevelsMap";
import { SimpleMath } from "./components/tasks/simpleMath";
import { FindLetter } from "./components/tasks/findLetter";
import { Header } from "./components/Header";

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

export { App };
