import React from "react";
import Filler from "./filler";
import "./index.css";

const ProgressBar = props => {
  return (
    <div className="progressBar" title={props.percentage}>
      <Filler percentage={props.percentage} />
    </div>
  );
};

export default ProgressBar;
