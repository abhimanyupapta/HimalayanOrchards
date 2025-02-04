import React from "react";
import "./Loader.css"; // Import the CSS file

const Loader = () => {
  return (
    <div className="loading-container">
      <div className="skeleton skeleton-image"></div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text"></div>
    </div>
  );
};

export default Loader;
