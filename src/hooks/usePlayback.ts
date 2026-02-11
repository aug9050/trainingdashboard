import { useEffect, useState } from "react";

export const usePlayback = (duration: number) => {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;

    const id = requestAnimationFrame(() => {
      setTime(prev => {
        if (prev >= duration) return duration;
        return prev + 0.05;
      });
    });

    return () => cancelAnimationFrame(id);
  }, [time, playing, duration]);

  return { time, setTime, playing, setPlaying };
};
