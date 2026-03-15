import React, { useState } from "react";
import MantisCircleChart from "./MantisCircleChart";
import { getShotDiagnosis } from "../utils/shotDiagnosis"

export default function MantisWidget({ shot = {} }){
  //console.log("widget shot", shot)
  //const [trace, setTrace] = useState([]);
  const trace = shot.trace?.hold || [];
  const diagnosis = getShotDiagnosis(trace);
  return(

    <div>
      <h3 className="mantis-title">
        Mantis Shot Analysis
      </h3>

      <div className="mantis-panel">
        <div className="mantis-chart-area"> 
          <MantisCircleChart 
          shot={shot} />
          {/*//onTraceReady={setTrace} />*/}
        </div>
        
        <div className="mantis-footer">
          <div className="mantis-legend">
            <div className="legend-item">
              <span className="legend-color hold"></span>
              Hold
            </div>

            <div className="legend-item">
              <span className="legend-color trigger"></span>
              Trigger
            </div>

            <div className="legend-item">
              <span className="legend-color recoil"></span>
              Recoil
            </div>
          </div>

          <div className="mantis-score">
            {shot.score || "-"}
          </div>

        </div>
      </div>

      <div className="shot-diagnosis">
        {diagnosis}
      </div>

    </div>
    
  )
}