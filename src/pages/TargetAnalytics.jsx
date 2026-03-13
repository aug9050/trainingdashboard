import React from "react";
import metadata from "../data/metadata.json";
import HeatmapOverlay from "../components/HeatmapOverlay";
import TargetHeatmap from "../components/TargetHeatmap";

const TargetAnalytics = () => {
  // accumulate all shots for analysis
  const shots = metadata.playback.flatMap(p => p.shots);

  return (
    <div>
      <h2>Marksmanship Heatmap Analytics</h2>

     <div
      style={{
        position: "relative",
        width: 500,
        height: 700,
        margin: "0 auto"   // center it
      }}
    >
      {/* Target Image */}
      {/* <img
        src="/target.png"
        alt="target"
        style={{
          width: "100%",
          height: "100%",
          display: "block"
        }}
      /> */}

      {/* Heatmap Overlay */}
      {/* <HeatmapOverlay shots={shots} /> */}
      <TargetHeatmap shots={shots} />
    </div>

    </div>
  );
};

export default TargetAnalytics;
