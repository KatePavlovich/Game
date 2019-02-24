import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../../components/header";
import { Alert } from "antd";
import "./index.css";
import store from "../../store";
import { getPlayerNameAC } from "../../ac";

class Login extends Component {
  state = {
    showAlert: false
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
          showAlert: false
        });
        store.dispatch(getPlayerNameAC(newTaskInput.value));
        newTaskInput.value = "";
      }
    }
  };

  render() {
    return (
      <div>
        <Header />
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
