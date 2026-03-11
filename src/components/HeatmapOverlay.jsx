import React, { useEffect, useRef } from "react";

const TargetHeatmap = ({ shots }) => {

  const canvasRef = useRef(null);

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height);

    shots.forEach((shot)=>{

      const gradient = ctx.createRadialGradient(
        shot.x,
        shot.y,
        5,
        shot.x,
        shot.y,
        35
      );

      gradient.addColorStop(0,"rgba(255,0,0,0.8)");
      gradient.addColorStop(0.4,"rgba(255,120,0,0.5)");
      gradient.addColorStop(1,"rgba(255,0,0,0)");

      ctx.fillStyle = gradient;

      ctx.beginPath();
      ctx.arc(shot.x,shot.y,35,0,Math.PI*2);
      ctx.fill();

    });

  },[shots]);

  return (

    <div style={{
      position:"relative",
      width:"420px",
      height:"650px",
      margin:"auto"
    }}>

      <img
        src="/target.png"
        alt="target"
        style={{
          width:"100%",
          height:"100%",
          display:"block"
        }}
      />

      <canvas
        ref={canvasRef}
        width={420}
        height={650}
        style={{
          position:"absolute",
          top:0,
          left:0,
          pointerEvents:"none"
        }}
      />

    </div>

  );
};

export default TargetHeatmap;