import React, { Component } from "react";
import { connect } from "react-redux";
import "./login.css";
import { getPlayerNameAC, isLoggedIn } from "../../ac";
import { withRouter } from "react-router";

class Login extends Component {
  state = {
    name: ""
  };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  handleSubmit = () => {
    const { history } = this.props;
    const { name } = this.state;
    this.props.setIsLoggedIn();
    this.props.getPlayerName(name);
    this.setState({ name: "" });
    history.push("/levelsMap");
  };

  render() {
    const { name } = this.state;

    return (
      <div>
        <form className="loginForm" onSubmit={this.handleSubmit}>
          <h2 className="loginForm__title">Enter your name!</h2>
          <input
            className="loginForm__input"
            type="text"
            placeholder="name"
            onChange={this.handleChange}
            required="required"
            value={name}
            autoFocus={true}
          />
          <input type="submit" value="Send" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getPlayerName: name => {
    dispatch(getPlayerNameAC(name));
  },
  setIsLoggedIn: () => {
    dispatch(isLoggedIn());
  }
});

export default withRouter(connect(null, mapDispatchToProps)(Login));
