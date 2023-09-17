/**
 * Path: /src/Components/Shared/Misc/Confetti.js
 * Author: Haerin
 * Date Create: 30-Oct-2022
 * Purpose of this component: animation
 */

import React, { useState, useEffect } from 'react';

import Confetti from 'react-confetti';

// Confetti animation
const ReactConfetti = (props) => {
  const [windowDemension, setWindowDemension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const detectSize = () => {
    setWindowDemension({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener('resize', detectSize);
    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, [windowDemension]);

  return (
    <Confetti
      width={windowDemension.width}
      height={windowDemension.height}
      numberOfPieces={props.numberOfPieces}
    />
  );
};

export default ReactConfetti;
