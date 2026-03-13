import React from "react";

import metadata from "../data/metadata.json"
import MantisChart from "./MantisChart"

export default function MantisWidget(){

  const shots = metadata.mantisSensor || []

  const lastShot = shots[shots.length - 1] || {};

  console.log("lastShot", lastShot)

  if(!lastShot) return null

  return(

    <div className="panel">

      <h3>Mantis Shot Analysis</h3>

      <div className="mantis-row">

        <span>Hold</span>
        <MantisChart data={lastShot.score   || []} color="#4caf50"/>

      </div>

      <div className="mantis-row">

        <span>Trigger</span>
        <MantisChart data={lastShot.triggerControl    || []} color="#ff9800"/>

      </div>

      <div className="mantis-row">

        <span>Recoil</span>
        <MantisChart data={lastShot.stability  || []} color="#f44336"/>

      </div>

    </div>

  )

}