import React from 'react';
import './Preloader.scss';  

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="spinner">
        <div className="note note1">♪</div>
        <div className="note note2">♫</div>
        <div className="note note3">♪</div>
      </div>
    </div>
  );
};

export default Preloader;
