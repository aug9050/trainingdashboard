import React, { useEffect, useRef } from "react";
import { computeGrouping } from "../utils/groupingAnalysis"

const CanvasShots = ({ shots }) => {

  const canvasRef = useRef(null);

  function drawShootingBox(ctx, width, height){

    const targetLeft = width * 0.25;
    const targetWidth = width * 0.5;

    const targetBottom = height * 0.1;
    const targetHeight = height * 0.82;

    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;

    // dotted line
    ctx.setLineDash([6,6]);

    ctx.strokeRect(
      targetLeft,
      targetBottom,
      targetWidth,
      targetHeight
    );

    // ctx.beginPath()
    // ctx.moveTo(width/2, targetBottom)
    // ctx.lineTo(width/2, targetBottom + targetHeight)
    // ctx.stroke()

    // ctx.beginPath()
    // ctx.moveTo(targetLeft, height*0.62)
    // ctx.lineTo(targetLeft + targetWidth, height*0.62)
    // ctx.stroke()

    // reset dash
    ctx.setLineDash([])

  }

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // draw shooting scoring box
    drawShootingBox(ctx, width, height);

    const bulletImg = new Image();
    bulletImg.src = "/bullet-hole.png";

    bulletImg.onload = () => {

      shots.forEach((shot, index) => {

        // convert normalized coordinates (0-100)
        const targetLeft = width * 0.25;
        const targetWidth = width * 0.5;

        const targetBottom = height * 0.1;
        const targetHeight = height * 0.82;

        const x = targetLeft + (shot.x / 100) * targetWidth;
        const y = targetBottom + (1 - shot.y / 100) * targetHeight;

        // bullet image
        const size = 20;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.random() * 0.3);
        ctx.drawImage(bulletImg, -size/2, -size/2, size, size);
        ctx.restore();

        ctx.fillStyle = "black";

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        

        // shot number label
        ctx.fillStyle = "cyan";
        ctx.font = "10px Arial";
        ctx.fillText(index + 1, x - 4, y + 3);

        const grouping = computeGrouping(shots);
        const gx = targetLeft + (grouping.centerX/100)*targetWidth;
        const gy = targetBottom + (1-grouping.centerY/100)*targetHeight;

        const gr = grouping.radius/100 * targetWidth;

        ctx.strokeStyle="yellow"
        ctx.lineWidth=1;
        ctx.beginPath()
        ctx.arc(gx,gy,gr,0,Math.PI*2)
        ctx.stroke()

      });
    }

    // const bulletImg = new Image();
    // bulletImg.src = "/bullet-hole.png";

    // bulletImg.onload = () => {
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);

    //   shots.forEach((shot, index) => {

    //     const size = 20;

    //     ctx.save();
    //     ctx.translate(shot.x, shot.y);
    //     ctx.rotate(Math.random() * 0.3);
    //     ctx.drawImage(bulletImg, -size/2, -size/2, size, size);
    //     ctx.restore();

    //     ctx.fillStyle = "rgba(0,0,0,0.5)";
    //     ctx.beginPath();
    //     ctx.arc(shot.x, shot.y, 6, 0, Math.PI * 2);
    //     ctx.fill();

    //     /* Shot number */
    //     ctx.fillStyle = "red";
    //     ctx.font = "12px Arial";
    //     ctx.fillText(index + 1, shot.x + 8, shot.y - 8);

    //   });
    // };

    

  }, [shots]);

  return (
    <canvas
      ref={canvasRef}
      className="shots-canvas"
      width={400}
      height={700}
    />
  );
};

export default CanvasShots;