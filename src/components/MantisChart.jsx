import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts";


export default function MantisChart({value = 0, color}){

//   const chartData = data.map((value, index) => ({
//     index,
//     value
//   }));


  const data = generateTrace(value)

  return (

    <ResponsiveContainer width="100%" height={80}>

      <LineChart data={data}>

        <XAxis dataKey="index" hide />
        <YAxis hide />

        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />

      </LineChart>

    </ResponsiveContainer>

  );
  
}

function generateTrace(value){

  const points=[]

  for(let i=0;i<20;i++){

    const noise=(Math.random()-0.5)*6

    points.push({
      index:i,
      value:value+noise
    })

  }

  return points
}