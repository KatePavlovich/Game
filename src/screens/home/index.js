import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./index.css";
class Home extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        <div className="home-screen">
          some info about game
          <Link
            to={isLoggedIn ? "/battle" : "/Login"}
            className="nav-link play-link"
          >
            play game
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.player.isLoggedIn
});

export default connect(mapStateToProps)(Home);
