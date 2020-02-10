import React, { Component } from "react";
import { connect } from "react-redux";
import { getPlayerNameAC, isLoggedIn } from "../../ac/playerAC";
import { withRouter } from "react-router";
import * as C from "../../constants";
import * as T from "../../constants/translation";
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
    history.push(C.LEVELS_MAP);
  };

  render() {
    const { name } = this.state;

    return (
      <div>
        <form className={styles.loginForm} onSubmit={this.handleSubmit}>
          <h2 className={styles.title}>{T.ENTER_NAME}</h2>
          <input
            className={styles.input}
            type="text"
            placeholder={T.ENTER_NAME}
            onChange={this.handleChange}
            required="required"
            value={name}
            autoFocus={true}
          />
          <input className={styles.button} type="submit" value={T.LOGIN} />
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
