import React, { useEffect } from 'react';
import './Overlay.scss';

const Overlay = ({ bg, color }) => {
  useEffect(() => {
    const overlay = document.querySelector('.overlay');
    overlay.style.backgroundColor = color;
    overlay.classList.add('fade-in');
  }, [color]);

  return (
    <div className="overlay-container">
      <img className="bg" src={bg} alt="background" />
      <div className="overlay"></div>
    </div>
  );
};

export default Overlay;
