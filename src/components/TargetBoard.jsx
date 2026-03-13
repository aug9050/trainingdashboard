import CanvasShots from "./CanvasShots";
import React from "react";

export default function TargetBoard({ shots }) {

  return(

    <div className="target-container">

      <img
        src="/target_2.png"
        alt="target"
        className="target-image"
      />

      <CanvasShots shots={shots} />

    </div>

  )

}