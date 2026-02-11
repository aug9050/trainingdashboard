import React from "react";
import metadata from "../data/metadata.json";
import HeatmapOverlay from "../components/HeatmapOverlay";

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
          height: 700
        }}
      >
        {/* target board */}
        <img
          src="/target.png"
          alt="target"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain"
          }}
        />

        {/* heat overlay */}
        <HeatmapOverlay shots={shots} />
      </div>
    </div>
  );
};

export default TargetAnalytics;
