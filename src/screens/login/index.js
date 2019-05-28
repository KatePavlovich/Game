import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Alert } from "antd";
import "./index.css";
import store from "../../store";
import { getPlayerNameAC, isLoggedIn } from "../../ac";
import history from "../../history";

class Login extends Component {
  state = {
    showAlert: false,
    playerName: ""
  };

  showBattleScreen = () => {
    history.push("/Battle");
  };

  putNameToState = e => {
    const newTaskInput = e.currentTarget;
    if (e.key === "Enter") {
      if (newTaskInput.value.length === 0) {
        this.setState({
          showAlert: true
        });
      } else {
        this.setState({
          showAlert: false,
          playerName: newTaskInput.value
        });
        store.dispatch(getPlayerNameAC(newTaskInput.value));
        store.dispatch(isLoggedIn());
        newTaskInput.value = "";
        this.showBattleScreen();
      }
    }
  };

  render() {
    return (
      <div className="loginPage__wrapper">
        <div className="loginForm">
          <h2 className="loginForm__title">Enter your name!</h2>
          {this.state.showAlert &&
            <Alert message="Please, enter your name" type="error" />}
          <input
            className="loginForm__input"
            type="text"
            placeholder="name"
            onKeyPress={this.putNameToState}
            required="required"
            autoFocus={true}
          />
        </div>
      </div>
    );
  }
}

export default connect()(Login);
