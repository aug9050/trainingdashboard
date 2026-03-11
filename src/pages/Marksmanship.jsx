import React from "react";
import metadata from "../data/metadata.json";
import MantisWidget from "../components/MantisWidget";
import AccuracyChart from "../components/AccuracyChart";
import GroupingChart from "../components/GroupingChart";
import HeatmapOverlay from "../components/HeatmapOverlay";

const Marksmanship = () => {

  const shots = metadata.playback.flatMap(p => p.shots || []);

  return (
    <div className="analytics-container">

      <h2>Marksmanship Analytics</h2>

      <div className="analytics-top">

        <div className="card">
          <MantisWidget data={metadata.mantisSensor}/>
        </div>

        
        {/* <div className="card">
          <AccuracyChart data={metadata.currentTraining.marksmanship}/>
        </div>

        <div className="card">
          <GroupingChart shots={shots}/>
        </div> */}

      </div>

      <div className="analytics-target">

        <div className="target-container">

          {/* <img
            src="/target.png"
            alt="target"
            className="target-image"
          /> */}

          <HeatmapOverlay shots={shots}/>

        </div>

      </div>

    </div>
  );
};

export default Marksmanship;