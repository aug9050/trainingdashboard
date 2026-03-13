import React, { useEffect, useRef } from "react";

const CanvasShots = ({ shots }) => {

  const canvasRef = useRef(null);

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const bulletImg = new Image();
    bulletImg.src = "/bullet-hole.png";

    bulletImg.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shots.forEach((shot, index) => {

        // ctx.beginPath();
        // ctx.arc(shot.x, shot.y, 6, 0, Math.PI * 2);
        // ctx.fillStyle = "cyan";
        // ctx.fill();

        // ctx.shadowBlur = 12;
        // ctx.shadowColor = "cyan";

        const size = 20;

        // ctx.drawImage(
        //   bulletImg,
        //   shot.x - size / 2,
        //   shot.y - size / 2,
        //   size,
        //   size
        // );
        ctx.save();
        ctx.translate(shot.x, shot.y);
        ctx.rotate(Math.random() * 0.3);
        ctx.drawImage(bulletImg, -size/2, -size/2, size, size);
        ctx.restore();

        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.beginPath();
        ctx.arc(shot.x, shot.y, 6, 0, Math.PI * 2);
        ctx.fill();

        /* Shot number */
        ctx.fillStyle = "red";
        ctx.font = "12px Arial";
        ctx.fillText(index + 1, shot.x + 8, shot.y - 8);

      });
    };

    

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