import React, { useEffect, useRef } from "react";

const HeatmapOverlay = ({ shots }: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    shots.forEach((shot: any) => {
      const gradient = ctx.createRadialGradient(
        shot.x,
        shot.y,
        5,
        shot.x,
        shot.y,
        50
      );

      gradient.addColorStop(0, "rgba(255,0,0,0.8)");
      gradient.addColorStop(0.4, "rgba(255,0,0,0.4)");
      gradient.addColorStop(1, "rgba(255,0,0,0)");

      ctx.fillStyle = gradient;

      ctx.beginPath();
      ctx.arc(shot.x, shot.y, 50, 0, Math.PI * 2);
      ctx.fill();
    });

  }, [shots]);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={700}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none"
      }}
    />
  );
};

export default HeatmapOverlay;
