import React, { useEffect, useRef } from "react";

const CanvasShots = ({ shots }) => {

  const canvasRef = useRef(null);

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    shots.forEach((shot, index) => {

      ctx.beginPath();
      ctx.arc(shot.x, shot.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = "cyan";
      ctx.fill();

      ctx.shadowBlur = 12;
      ctx.shadowColor = "cyan";

      ctx.fillStyle = "white";
      ctx.font = "12px Arial";
      ctx.fillText(index + 1, shot.x + 8, shot.y - 8);

    });

  }, [shots]);

  return (
    <canvas
      ref={canvasRef}
      width={420}
      height={650}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none"
      }}
    />
  );
};

export default CanvasShots;