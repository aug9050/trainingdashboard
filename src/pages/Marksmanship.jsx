import React from "react";
import { useState, useEffect } from "react";
import metadata from "../data/metadata.json";
import FilterAnalysis from "../components/FilterAnalysis";
import MantisWidget from "../components/MantisWidget";
import AccuracyChart from "../components/AccuracyChart";
import GroupingChart from "../components/GroupingChart";
import HeatmapOverlay from "../components/HeatmapOverlay";
import Playback from "./Playback";
import "./Marksmanship.css";
import TargetBoard from "../components/TargetBoard";
import PlaybackControls from "../components/PlaybackControls";

const Marksmanship = () => {

  const [filters,setFilters] = useState({});

  const playbackData = metadata.playback || [];

  const [frameIndex,setFrameIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  let shots = playbackData
    .slice(0, frameIndex + 1)
    .flatMap(p => p.shots || []);

  const mantisData = metadata.mantisSensor || [];

  const currentShot = mantisData[frameIndex] || {};

  //console.log("currentShot", currentShot)
  // Example filtering logic
  shots = shots.filter(s => {

    if(filters.range && filters.range !== "Any"){
      if(s.range !== filters.range) return false;
    }

    if(filters.lighting && filters.lighting !== "Any"){
      if(s.lighting !== filters.lighting) return false;
    }

    return true;
  });

  useEffect(() => {

    if (!playing) return;

    const timer = setInterval(() => {

      setFrameIndex((i) => {

        if (i >= playbackData.length - 1) {
          setPlaying(false);
          return i;
        }

        return i + 1;

      });

    }, 800); // speed of playback

    return () => clearInterval(timer);

  }, [playing, playbackData.length]);

  return (
    <div>

      <div className="marksmanship-layout">

        <div className="left-panel">

          <FilterAnalysis shots={shots} onFilterChange={setFilters}/>

          <MantisWidget shot={currentShot} />

        </div>

        <div className="target-panel">

          <TargetBoard shots={shots} />

           <PlaybackControls
              shot={frameIndex + 1}
              playing={playing}
              prev={() => setFrameIndex(i => Math.max(i - 1, 0))}
              next={() => setFrameIndex(i => Math.min(i + 1, playbackData.length - 1))}
              play={() => setPlaying(p => !p)}
              reset={() => {setFrameIndex(0); setIsPlaying(false);}}
            />

        </div>

      </div>


    </div>
  );
};

export default Marksmanship;