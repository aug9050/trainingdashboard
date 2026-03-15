import React from "react";

export default function PlaybackControls({prev,next,play,reset,playing,shot}){

  return(

    <div>
      <div className="playback-controls">

        <button className="circle-btn" onClick={prev}>
          ◀
        </button>
        <span className="shot-number">
          Shot {shot}
        </span>
        <button className="circle-btn" onClick={next}>
          ▶
        </button>
      </div>

      <div className="playback-playpause">
        <button className="circle-btn" onClick={play}>
          {playing ? "⏸" : "▶"}
        </button>
        <button className="circle-btn" onClick={reset}>
          ⟲
        </button>
      </div>

    </div>
    
  )

}