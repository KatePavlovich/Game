import React from "react";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import "./index.css";

function Home() {
  return (
    <div>
      <Header />
      <div className="home-screen">
        <Link to="/battle" className="nav-link play-link">
          play game
        </Link>
      </div>
    </div>
  );
}

export default Home;
