import React from "react";
import Header from "../../components/header";
import "./index.css";

function Score() {
  return (
    <div>
      <Header />
      <div className="score">
        <h2>Score</h2>
        <div className="score__data">
          <span>hero1</span>
          <span>5</span>
        </div>
      </div>
    </div>
  );
}

export default Score;
