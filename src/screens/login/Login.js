import React, { Component } from "react";
import { connect } from "react-redux";
import { getPlayerNameAC, isLoggedIn } from "../../ac";
import { withRouter } from "react-router";
import styles from "./Login.module.scss";

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
        <form className={styles.loginForm} onSubmit={this.handleSubmit}>
          <h2 className={styles.title}>Enter your name!</h2>
          <input
            className={styles.input}
            type="text"
            placeholder="name"
            onChange={this.handleChange}
            required="required"
            value={name}
            autoFocus={true}
          />
          <input className={styles.button} type="submit" value="Send" />
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
