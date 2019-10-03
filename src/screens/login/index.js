import React, { Component } from 'react';
// import { connect } from 'react-redux';
import './index.css';
import store from '../../store';
import { getPlayerNameAC, isLoggedIn } from '../../ac';
import history from '../../history';

class Login extends Component {
  state = {
    playerName: ''
  };

  showBattleScreen = () => {
    history.push('/Battle');
  };

  handleChange = e => {
    console.log('jjj', e);
    this.setState({ playerName: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    // const newTaskInput = e.target;
    const { playerName } = this.state;
    store.dispatch(getPlayerNameAC(playerName));
    store.dispatch(isLoggedIn());
    // newTaskInput.value = '';
    this.showBattleScreen();
  };

  render() {
    return (
      <div className="loginPage__wrapper">
        <div className="loginForm">
          <h2 className="loginForm__title">Enter your name!</h2>
          <form onSubmit={this.handleSubmit}>
            <input
              className="loginForm__input"
              type="text"
              placeholder="name"
              onChange={this.handleChange}
              required="required"
              autoFocus={true}
            />
            <input type="submit" value="Send" />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
