import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './index.css';

const Home = isLoggedIn => {
  return (
    <div>
      <div className="home-screen">
        <Link
          to={!isLoggedIn ? '/battle' : '/login'}
          className="nav-link play-link"
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
