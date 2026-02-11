import React from "react";
import metadata from "../data/metadata.json";
import CanvasShots from "../components/CanvasShots";
import { usePlayback } from "../hooks/usePlayback";

const Playback = () => {
  const duration = metadata.playback.length;
  const { time, setTime, playing, setPlaying } = usePlayback(duration);

  const frame =
    metadata.playback.find(p => p.time >= time) ||
    metadata.playback[0];

  return (
    <div>
      <h2>Training Playback</h2>

      <button onClick={() => setPlaying(!playing)}>
        {playing ? "Pause" : "Play"}
      </button>

      <input
        type="range"
        min={0}
        max={duration}
        step={0.1}
        value={time}
        onChange={e => setTime(parseFloat(e.target.value))}
      />

      <CanvasShots data={frame.shots} />
    </div>
  );
};

export default Playback;
