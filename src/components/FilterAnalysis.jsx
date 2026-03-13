import { useState, useEffect } from "react";
import React from "react";

export default function FilterAnalysis({ onFilterChange }) {

  const [lighting, setLighting] = useState("Any");
  const [range, setRange] = useState("Any");
  const [inCount, setInCount] = useState(32);
  const [outCount, setOutCount] = useState(8);
  const [missCount, setMissCount] = useState(8);

  useEffect(() => {
    onFilterChange({ lighting, range, inCount, outCount, missCount });
  }, [lighting, range, inCount, outCount, missCount]);

  const score = inCount * 2 + outCount * 1

  return(

    <div className="filter-panel">

      <h3>Marksmanship</h3>

      {/* Filters */}

      <div className="filter-row">

        <div>
          <label>Lighting Filter:</label>
          <select value={lighting} onChange={(e)=>setLighting(e.target.value)}>
            <option>Any</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div>
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
            <td>In (x2)</td>
            <td>{inCount}</td>

            <td>
              <button onClick={()=>setInCount(v=>Math.max(v-1,0))}>−</button>
              <button onClick={()=>setInCount(v=>v+1)}>+</button>
            </td>
          </tr>

          <tr>
            <td>Out (x1)</td>
            <td>{outCount}</td>

            <td>
              <button onClick={()=>setOutCount(v=>Math.max(v-1,0))}>−</button>
              <button onClick={()=>setOutCount(v=>v+1)}>+</button>
            </td>
          </tr>

          <tr>
            <td>Miss</td>
            <td>{missCount}</td>

            <td>
              <button onClick={()=>setMissCount(v=>Math.max(v-1,0))}>−</button>
              <button onClick={()=>setMissCount(v=>v+1)}>+</button>
            </td>
          </tr>

        </tbody>

      </table>

      {/* Score */}

      <div className="score">
        Score: {score}
      </div>

      {/* Analysis */}

      <div className="analysis-text">

        <strong>Analysis: Low Left Grouping</strong>

        <p>
        You tighten your fingers with little support hand grip.
        Improper trigger pull causing shots to drift low left.
        </p>

      </div>

      {/* Advice */}

      <div className="advice">

        <strong>Advice:</strong>

        <ol>
          <li>Only trigger finger moves</li>
          <li>Use pad of trigger finger</li>
          <li>Grip firmly and shoot naturally</li>
        </ol>

      </div>

    </div>

  )

}