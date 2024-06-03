// src/Preloader.js
import React from 'react';
import './Preloader.scss';  // Ensure this CSS file exists

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="spinner">
        <div className="note note1">♪</div>
        <div className="note note2">♫</div>
        <div className="note note3">♪</div>
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default Preloader;
