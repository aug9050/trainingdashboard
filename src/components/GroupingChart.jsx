import React from "react";

const GroupingChart = ({ shots }) => {

  if (!shots.length) return <div>No grouping data</div>;

  const centerX = 210;
  const centerY = 325;

  const distances = shots.map(s =>
    Math.sqrt((s.x - centerX) ** 2 + (s.y - centerY) ** 2)
  );

  const avg =
    distances.reduce((a,b)=>a+b,0)/distances.length;

  return (
    <div>

      <h3>Grouping Analysis</h3>

      <div>Avg Spread: {avg.toFixed(2)}</div>
      <div>Total Shots: {shots.length}</div>

    </div>
  );
};

export default GroupingChart;