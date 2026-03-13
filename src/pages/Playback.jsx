import React, { useState, useEffect } from "react";
import metadata from "../data/metadata.json";
import CanvasShots from "../components/CanvasShots";
import MantisWidget from "../components/MantisWidget";

const Playback = () => {

  const playbackData = metadata.playback || [];

  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {

    if (!isPlaying) return;

    const timer = setInterval(() => {

      setFrameIndex(prev => {
        if (prev >= playbackData.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });

    }, 1500);

    return () => clearInterval(timer);

  }, [isPlaying, playbackData.length]);

  const shots = playbackData
    .slice(0, frameIndex + 1)
    .flatMap(p => p.shots || []);

  return (
    <div>

      {/* Target Board */}
      <div
        style={{
          position: "relative",
          width: "420px",
          marginBottom: "20px"
        }}
      >
        <img
          src="/target_2.png"
          alt="target"
          style={{
            width: "100%",
            display: "block"
          }}
        />

        <CanvasShots shots={shots} />
      </div>

      {/* Controls */}
      <div className="playback-controls">

        <button className="circle-btn"
          onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? "⏸" : "▶"}
        </button>

        <button className="circle-btn"
          onClick={() =>
            setFrameIndex(prev => Math.max(prev - 1, 0))
          }
        >
          ⏮
        </button>

        <button className="circle-btn"
          onClick={() =>
            setFrameIndex(prev =>
              Math.min(prev + 1, playbackData.length - 1)
            )
          }
        >
          ⏭
        </button>

        <button className="circle-btn"
          onClick={() => {
            setFrameIndex(0);
            setIsPlaying(false);
          }}
        >
          ⟲
        </button>

      </div>

    </div>
  );
};

export default Playback;