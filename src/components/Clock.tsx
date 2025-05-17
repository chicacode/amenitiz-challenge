import React, { useEffect, useState } from 'react';

interface ClockProps {
  lastOnline: number; 
}

const Clock: React.FC<ClockProps> = ({ lastOnline }) => {
  const [elapsed, setElapsed] = useState<number>(Math.floor(Date.now() / 1000) - lastOnline);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  return <div className="text-lg font-mono text-blue-600">{formatTime(elapsed)}</div>;
};

export default Clock;