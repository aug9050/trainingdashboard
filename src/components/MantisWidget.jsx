import React from "react";

const MantisWidget = ({ data }) => {

  return (
    <div>

      <h3>Mantis Sensor</h3>

      {data.slice(-3).map((shot) => (

        <div key={shot.shotId} className="mantis-row">

          <strong>Shot {shot.shotId}</strong>

          <div>Score: {shot.score}</div>
          <div>Stability: {shot.stability}%</div>
          <div>Trigger: {shot.triggerControl}%</div>

        </div>

      ))}

    </div>
  );
};

export default MantisWidget;