import React from 'react';
import ChartComponent from '../components/ChartComponent';
import metadata from '../data/metadata.json';

const CurrentTraining = () => {
  const data = metadata.currentTraining.judgmental;
  const accuracyData = data.filter(d => d.metric === "accuracy");

  return (
    <div>
      <h2>Current Judgmental Training Metrics</h2>
      <ChartComponent data={accuracyData} dataKey="value" title="Accuracy / Reaction Time" />
    </div>
  );
};

export default CurrentTraining;
