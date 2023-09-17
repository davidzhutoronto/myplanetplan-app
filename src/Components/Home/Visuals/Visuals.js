import React, { useState, useEffect } from 'react';
import { PointsThresholdsVisuals } from '../../../config';
import './Visuals.css';

const Visuals = ({ points }) => {
  const [level, setLevel] = useState(0);

  let currentThreshold;

  const getPointsToUpgrade = () => {
    for (let i = 0; i < PointsThresholdsVisuals.length; i++) {
      if (PointsThresholdsVisuals[i] > points) {
        currentThreshold = i;
        return `Points to next level: ${PointsThresholdsVisuals[i] - points}`;
      }
    }
    if (points >= PointsThresholdsVisuals[PointsThresholdsVisuals.length - 1]) {
      currentThreshold = 5;
      return 'Your house is at maximum greenness!';
    }
  };

  useEffect(() => {
    setLevel(currentThreshold);
  }, [points]);

  return (
    <div className="visuals-box">
      <div className="visuals-container">
        <div className="house">
          <div className="tree-container">
            {level > 1 && <div className="tree"></div>}
            {level > 2 && <div className="tree tree2"></div>}
            {level > 3 && <div className="tree tree3"></div>}
            {level > 0 && (
              <div className="bushes-container">
                <div className="bushes"></div>
              </div>
            )}
          </div>

          <div id="building-front">
            <div className="roof">{level > 4 && <div className="solar-panel"></div>}</div>
            <div className="triangle"></div>
            <div className="sidewall"></div>
            <div className="wall">
              <div className="window-top"></div>
              <div className="window-mid"></div>
              <div className="door"></div>

              {level > 0 && (
                <div className="house-bushes">
                  <div className="bushes-container">
                    <div className="bushes"></div>
                  </div>
                  <div className="bushes-container">
                    <div className="bushes"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div id="garage">
            <div className="roof"></div>
            <div className="triangle"></div>
            <div className="sidewall">
              {level > 0 && (
                <div className="bushes-container">
                  <div className="bushes"></div>
                </div>
              )}
            </div>
            <div className="wall"></div>
          </div>
        </div>
      </div>

      <p className="points-label">{getPointsToUpgrade()}</p>
    </div>
  );
};

export default Visuals;
