import React from "react";

export default function PlaybackControls({prev,next,play,playing,shot}){

  return(

    <div className="playback-controls">

      <button className="circle-btn" onClick={prev}>
        ◀
      </button>

      <button className="circle-btn" onClick={play}>
        {playing ? "⏸" : "▶"}
      </button>

      <span className="shot-number">
        Shot {shot}
      </span>

      <button className="circle-btn" onClick={next}>
        ▶
      </button>

    </div>

  )

}