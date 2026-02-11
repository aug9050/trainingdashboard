import React from 'react';
import ChartComponent from '../components/ChartComponent';
import metadata from '../data/metadata.json';

const PastTraining = () => {
  const pastData = metadata.pastTraining || [];

  return (
    <div>
      <h2>Past Training Metrics</h2>
      {pastData.length ? (
        pastData.map((session: any, idx: number) => (
          <ChartComponent key={idx} data={session.judgmental} dataKey="value" title={`Session ${idx + 1}`} />
        ))
      ) : (
        <p>No past training data</p>
      )}
    </div>
  );
};

export default PastTraining;
