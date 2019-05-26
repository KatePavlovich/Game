import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./index.css";
class Home extends Component {
  render() {
    const { playerName } = this.props;
    return (
      <div>
        <div className="home-screen">
          {playerName === undefined &&
            <Link to="/Login" className="nav-link play-link">
              login, please
            </Link>}
          {playerName &&
            <Link to="/battle" className="nav-link play-link">
              play game
            </Link>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playerName: state.animation.playerName
});

export default connect(mapStateToProps)(Home);
