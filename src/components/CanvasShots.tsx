import React, { useEffect, useRef } from "react";

const CanvasShots = ({ data }: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // background
    ctx.fillStyle = "#0D2B5E";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // grid
    ctx.strokeStyle = "#1f3b75";
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }

    // shots
    data.forEach((shot: any) => {
      ctx.beginPath();
      ctx.arc(shot.x, shot.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#00FFFF";
      ctx.fill();
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#00FFFF";
    });
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={400}
      style={{
        border: "1px solid #1f3b75",
        borderRadius: 10,
      }}
    />
  );
};

export default CanvasShots;
