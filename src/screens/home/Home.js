import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classNames from "classnames";
import styles from "./Home.module.scss";

const Home = isLoggedIn => {
  return (
    <div>
      <div className={styles.homeScreen}>
        <Link
          to={!isLoggedIn ? "/levelsMap" : "/login"}
          className={classNames(styles.navLink, styles.playLink)}
        >
          play game
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.player.isLoggedIn
});

export default connect(mapStateToProps)(Home);
