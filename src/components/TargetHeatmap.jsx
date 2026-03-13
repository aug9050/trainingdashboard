import React, { useEffect, useRef } from "react";

const TargetHeatmap = ({ shots }) => {

  const canvasRef = useRef(null);

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height);

    if(!shots || shots.length === 0) return;

    let sumX = 0;
    let sumY = 0;

    shots.forEach(s => {
      sumX += s.x;
      sumY += s.y;
    });

    const centerX = sumX / shots.length;
    const centerY = sumY / shots.length;

    let maxDistance = 0;

    shots.forEach((shot,index)=>{

      const dx = shot.x - centerX;
      const dy = shot.y - centerY;
      const distance = Math.sqrt(dx*dx + dy*dy);

      if(distance > maxDistance) maxDistance = distance;

      /* HEATMAP */

      const gradient = ctx.createRadialGradient(
        shot.x,
        shot.y,
        5,
        shot.x,
        shot.y,
        30
      );

      gradient.addColorStop(0,"rgba(255,0,0,0.8)");
      gradient.addColorStop(0.4,"rgba(255,120,0,0.5)");
      gradient.addColorStop(1,"rgba(255,0,0,0)");

      ctx.fillStyle = gradient;

      ctx.beginPath();
      ctx.arc(shot.x,shot.y,30,0,Math.PI*2);
      ctx.fill();

      /* BULLET HOLE */

      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(shot.x,shot.y,3,0,Math.PI*2);
      ctx.fill();

      /* SHOT NUMBER */

      ctx.fillStyle = "white";
      ctx.font = "12px Arial";
      ctx.fillText(index+1,shot.x+6,shot.y-6);

    });

    /* GROUPING CIRCLE */

    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(centerX,centerY,maxDistance,0,Math.PI*2);
    ctx.stroke();

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