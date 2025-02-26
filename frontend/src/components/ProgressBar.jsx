// CircularProgressBar.js
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"; // import the styles

const CircularProgressBar = ({ completed, total }) => {
  const percentage = (completed / total) * 100;

  return (
    <div style={{ width: "150px", height: "150px", margin: "0 auto" }}>
      <CircularProgressbar value={percentage} text={`${Math.round(percentage)}%`} />
    </div>
  );
};

export default CircularProgressBar;
