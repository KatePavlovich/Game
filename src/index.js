import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import "antd/dist/antd.css";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
import Login from "./screens/login";
import Score from "./screens/score";
import Home from "./screens/home";
import Battle from "./screens/battle";
import SimpleMath from "./components/tasks/simpleMath";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Score" component={Score} />
          <Route path="/Login" component={Login} />
          <Route path="/Battle" component={Battle} />
          <Route path="/simpleMath" component={SimpleMath} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
