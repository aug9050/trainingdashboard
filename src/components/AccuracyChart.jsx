import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const AccuracyChart = ({ data }) => {

  const accuracyData =
    data?.filter(d => d.metric === "hits") || [];

  return (

    <div>

      <h3>Accuracy</h3>

      <ResponsiveContainer width="100%" height={200}>

        <LineChart data={accuracyData}>

          <XAxis dataKey="timestamp"/>
          <YAxis/>
          <Tooltip/>

          <Line
            dataKey="value"
            stroke="#00BFFF"
            strokeWidth={2}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );
};

export default AccuracyChart;