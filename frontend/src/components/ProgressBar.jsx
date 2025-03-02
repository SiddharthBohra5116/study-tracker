import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgressBar = ({ completed, total }) => {
  const percentage = (completed / total) * 100;
  const remaining = total - completed;

  // Dynamic text color based on progress
  let textColor = "#FF0000"; // Red (low progress)
  if (percentage > 30) textColor = "#ff7700"; 
  if (percentage > 60) textColor = "#ffc800"; 
  if(percentage >80) textColor = "#32CD32"

  return (
    <div style={{ display: "flex", alignItems: "center",justifyContent:"center", gap: "20px" }}>
      {/* Circular Progress Bar */}
      <div style={{ width: "160px", height: "160px", position: "relative" }}>
        <CircularProgressbar
          value={percentage}
          text={`${Math.round(percentage)}%`}
          styles={buildStyles({
            pathColor: `url(#custom-gradient)`,
            textColor: textColor,
            trailColor: "#1A1A1A",
          })}
          strokeWidth={14}
        />
        {/* Gradient */}
        <svg width="0" height="0">
          <defs>
            <linearGradient id="custom-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00E0FF" />
              <stop offset="50%" stopColor="#3A86FF" />
              <stop offset="100%" stopColor="#6A0572" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Lecture Details */}
      <div style={{ color: "#E0E0E0", fontSize: "1.2rem", fontWeight: "bold" }}>
        <p>Total : {total}</p>
        <p>Remaining : {remaining}</p>
        <p>Completed : {completed}</p>
      </div>
    </div>
  );
};

export default CircularProgressBar;
