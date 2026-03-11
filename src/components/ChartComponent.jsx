import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ChartComponent = ({ data, title }) => {
  const [animatedData, setAnimatedData] = useState([]);

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setAnimatedData(prev => [...prev, data[i]]);
      i++;

      if (i >= data.length) clearInterval(interval);
    }, 300); // speed of animation

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div style={{ marginBottom: 30 }}>
      <h3>{title}</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={animatedData}>
          <XAxis dataKey="timestamp" stroke="#B0C4DE" />
          <YAxis stroke="#B0C4DE" />
          <Tooltip />
          <Line
            dataKey="value"
            stroke="#00BFFF"
            strokeWidth={3}
            isAnimationActive
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
