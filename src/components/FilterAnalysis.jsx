import React, { useState, useEffect } from "react";
import { classifyShot, getDiagnosis, classifyScore } from "../utils/shotAnalysis"
import { computeGrouping } from "../utils/groupingAnalysis";

export default function FilterAnalysis({ shots = [], onFilterChange }) {

  const [lighting, setLighting] = useState("Any");
  const [range, setRange] = useState("Any");

  // -------- Score shots Analysis --------
  const scoreCounts = shots.reduce((acc,shot)=>{
    const result = classifyScore(shot.x,shot.y);
    acc[result]++;
    return acc;
  },{
    in:0,
    out:0,
    miss:0
  });

  const inCount = scoreCounts.in;
  const outCount = scoreCounts.out;
  const missCount = scoreCounts.miss;

  const [inAdjust, setInAdjust] = useState(0);
  const [outAdjust, setOutAdjust] = useState(0);
  const [missAdjust, setMissAdjust] = useState(0);

  const score = (inCount + inAdjust) * 2 + (outCount + outAdjust);
  const animatedScore = useAnimatedNumber(score);

  // -------- Shot Segment Analysis -------- 
  const segments = shots.map(s => classifyShot(s.x, s.y));
  //const lastSegment = segments.length > 0 ? segments[segments.length - 1] : "Center";
  
  /* count segments for grouping */
  const segmentCounts = {};

  segments.forEach(s => {
    segmentCounts[s] = (segmentCounts[s] || 0) + 1;
  });

  /* find dominant grouping */
  const dominantSegment =
    Object.keys(segmentCounts).length > 0
      ? Object.entries(segmentCounts).sort((a, b) => b[1] - a[1])[0][0]
      : "Center";

  const groupingText = dominantSegment.replace(/([A-Z])/g, " $1").trim();
  //console.log("groupingText", groupingText);
  //const diagnosisData = getDiagnosis(groupingText);
  //console.log("diagnosisData", diagnosisData);

  // Instead of checking just the last shot, detect cluster direction.
  const grouping = detectGrouping(shots);
  const diagnosisData = getDiagnosis(grouping);

  const groupingCompute = computeGrouping(shots);
  
  // -------- Filter callback --------
  useEffect(() => {
    onFilterChange({ lighting, range, inCount, outCount, missCount });
  }, [lighting, range, inCount, outCount, missCount]);

  return(

    <div className="filter-panel">

      <div className="filter-row">

        <div className="filter-box">
          <label>Lighting Filter:</label>
          <select value={lighting} onChange={(e)=>setLighting(e.target.value)}>
            <option>Any</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="filter-box">
          <label>Range Filter:</label>
          <select value={range} onChange={(e)=>setRange(e.target.value)}>
            <option>Any</option>
            <option>5m</option>
            <option>10m</option>
            <option>15m</option>
          </select>
        </div>

      </div>

      {/* Table */}
      <table className="analysis-table">

        <tbody>

          <tr>
            <td className="label">In (x2)</td>
            <td className="value-blue">{inCount}</td>
            <td className="value-blue">{inAdjust}</td>
            <td className="buttons">
              <button className="minus" onClick={()=>setInAdjust(v=>v-1)}>−</button>
              <button className="plus" onClick={()=>setInAdjust(v=>v+1)}>+</button>
            </td>
            {/* <td>{inCount}</td>
            <td>
              <button onClick={()=>setInCount(v=>Math.max(v-1,0))}>−</button>
              <button onClick={()=>setInCount(v=>v+1)}>+</button>
            </td> */}
          </tr>

          <tr>
            <td className="label">Out (x1)</td>
            <td className="value-yellow">{outCount}</td>
            <td className="value-yellow">{outAdjust}</td>
            <td className="buttons">
             <button className="minus" onClick={()=>setOutAdjust(v=>v-1)}>−</button>
              <button className="plus" onClick={()=>setOutAdjust(v=>v+1)}>+</button>
            </td>
            {/* <td>{outCount}</td>
            <td>
              <button onClick={()=>setOutCount(v=>Math.max(v-1,0))}>−</button>
              <button onClick={()=>setOutCount(v=>v+1)}>+</button>
            </td> */}
          </tr>

          <tr>
            <td className="label">Miss</td>
            <td className="value-red">{missCount}</td>
            <td className="value-red">{missAdjust}</td>
            <td className="buttons">
              <button className="minus" onClick={()=>setMissAdjust(v=>v-1)}>−</button>
              <button className="plus" onClick={()=>setMissAdjust(v=>v+1)}>+</button>
            </td>
            {/* <td>{missCount}</td>
            <td>
              <button onClick={()=>setMissCount(v=>Math.max(v-1,0))}>−</button>
              <button onClick={()=>setMissCount(v=>v+1)}>+</button>
            </td> */}
          </tr>

        </tbody>

      </table>

      {/* Score */}

      <div className="score-row">
        Score <span>{animatedScore}</span>
      </div>

      <div className="grouping-stats">

        <div>
          Avg Spread: {groupingCompute.avgSpread.toFixed(2)}
        </div>

        <div>
          Group Radius: {groupingCompute.radius.toFixed(2)}
        </div>

      </div>

      {/* Analysis */}

      <div className="analysis-text">

        <strong>Analysis: {diagnosisData.title} Grouping</strong>

        {/* <ShotDirectionIndicator segment={grouping} /> */}

        <p>{diagnosisData.explanation}</p>
        {/* <p>
        You tighten your fingers with little support hand grip.
        Improper trigger pull causing shots to drift low left.
        </p> */}
      </div>

      {/* Advice */}

      <div className="advice">

        <strong>Advice:</strong>

        <ol>
          {diagnosisData.advice.map((a,i)=>(
            <li key={i}>{a}</li>
          ))}
        </ol>
        {/* <ol>
          <li>Only trigger finger moves</li>
          <li>Use pad of trigger finger</li>
          <li>Grip firmly and shoot naturally</li>
        </ol> */}

      </div>

    </div>

  )

  function useAnimatedNumber(value, speed=30){

    const [display,setDisplay]=React.useState(value)

    React.useEffect(()=>{

      let frame

      function step(){

        setDisplay(v=>{
          if(v===value) return v

          if(v<value) return v+1
          else return v-1
        })

        frame=requestAnimationFrame(step)

      }

      step()

      return ()=>cancelAnimationFrame(frame)

    },[value])

    return display
  }

  function ShotDirectionIndicator({segment}){

    const map={
      High:"↑",
      Low:"↓",
      Left:"←",
      Right:"→",
      HighLeft:"↖",
      HighRight:"↗",
      LowLeft:"↙",
      LowRight:"↘",
      Center:"●"
    }

    return(
      <div className="segment-indicator">
        {map[segment]}
      </div>
    )
  }

  function detectGrouping(shots){

    if(!shots.length) return "Center"

    let avgX=0
    let avgY=0

    shots.forEach(s=>{
      avgX+=s.x
      avgY+=s.y
    })

    avgX/=shots.length
    avgY/=shots.length

    return classifyShot(avgX,avgY)

  }
}