import React, { useEffect, useRef } from "react";

export default function MantisCircleChart({ shot = {}}) {  //, onTraceReady }) {

  const canvasRef = useRef(null);

  useEffect(() => {

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const w = canvas.width;
    const h = canvas.height;

    const cx = w / 2;
    const cy = h / 2;

    let frame = 0;

    /* metrics influence trace */

    const stability = shot.stability || 80;
    const trigger = shot.triggerControl || 80;
    const score = shot.score || 80;

    // # If want use generateTrace data instead
    // const holdSpread = (100 - stability) / 8;
    // const triggerSpread = (100 - trigger) / 6;
    // const recoilSpread = (100 - score) / 5;

    // const holdTrace = generateTrace(25, { x: 0, y: -20 }, holdSpread);
    // const triggerTrace = generateTrace(
    //   15,
    //   holdTrace[holdTrace.length - 1],
    //   triggerSpread
    // );
    // const recoilTrace = generateTrace(
    //   10,
    //   triggerTrace[triggerTrace.length - 1],
    //   recoilSpread
    // );

    const holdTrace = shot.trace?.hold || [];
    const triggerTrace = shot.trace?.trigger || [];
    const recoilTrace = shot.trace?.recoil || [];

    // if (onTraceReady) {
    //   onTraceReady(holdTrace);
    // }

    /* draw circular grid */
    function drawGrid() {

      ctx.strokeStyle = "#ffffff";
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 1;

      for (let r = 30; r <= 120; r += 30) {

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();

      }

      ctx.globalAlpha = 1;

    }

    function drawCrosshair() {

      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.moveTo(cx - 6, cy);
      ctx.lineTo(cx + 6, cy);
      ctx.moveTo(cx, cy - 6);
      ctx.lineTo(cx, cy + 6);
      ctx.stroke();

      ctx.fillStyle = "#ffffff";

      ctx.beginPath();
      ctx.arc(cx, cy, 2, 0, Math.PI * 2);
      ctx.fill();

    }

    /* draw line trace */
    function drawTrace(trace, color) {

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;

      // glow effect
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;

      ctx.beginPath();

      trace.forEach((p, i) => {
        
        const x = cx + p.x;
        const y = cy + p.y;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {

          const prev = trace[i - 1];
          const px = cx + prev.x;
          const py = cy + prev.y;

          const midX = (px + x) / 2;
          const midY = (py + y) / 2;

          ctx.quadraticCurveTo(px, py, midX, midY);
        }
      });

      ctx.stroke();

      ctx.shadowBlur = 0;
    }

    function drawShotBreak(point) {

      const x = cx + point.x;
      const y = cy + point.y;

      ctx.fillStyle = "#ffd400";
      ctx.strokeStyle = "#ffd400";
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();

    }

    function animate() {

      ctx.clearRect(0, 0, w, h);

      drawGrid();
      drawCrosshair();

      drawTrace(
        holdTrace.slice(0, frame),
        "#00e5ff"
      );

      if (frame > holdTrace.length) {

        // Default for Trigger
        // drawTrace(
        //   triggerTrace.slice(0, frame - holdTrace.length),
        //   "#ff9800"
        // );

        // Simulate shot break
        const triggerFrame = frame - holdTrace.length;

        drawTrace(
          triggerTrace.slice(0, triggerFrame),
          "#ff9800"
        );

        if (triggerFrame >= triggerTrace.length) {

          drawShotBreak(
            triggerTrace[triggerTrace.length - 1]
          );
        }
      }

      if (frame > holdTrace.length + triggerTrace.length) {

        const recoilFrame = frame - holdTrace.length - triggerTrace.length;

        drawTrace(
          recoilTrace.slice(0, recoilFrame),
          "#ff3b3b"
        );

      }

      frame++;

      if (frame < holdTrace.length + triggerTrace.length + recoilTrace.length) {

        requestAnimationFrame(animate);

      }

    }

    animate();

  }, [shot?.shotId]);

  return (
    <canvas
      ref={canvasRef}
      width={260}
      height={260}
    />
  );
}


/* generate simulated sensor movement */

function generateTrace(points, start = { x: 0, y: -20 }, spread = 1) {

  const trace = [];

  let x = start.x;
  let y = start.y;

  for (let i = 0; i < points; i++) {

    x += (Math.random() - 0.5) * spread * 4;
    y += (Math.random() - 0.5) * spread * 4;

    trace.push({ x, y });

  }

  return trace;

}