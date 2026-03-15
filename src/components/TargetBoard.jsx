import React from "react";
import CanvasShots from "./CanvasShots";

export default function TargetBoard({ shots }) {

  return(
    <div className="target-container">
      <img
        src="/target_1.png"
        alt="target"
        className="target-image"
      />
      <CanvasShots shots={shots} />
    </div>
  )
}