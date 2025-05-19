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
    const days = Math.floor(seconds / 86400);
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${days}d ${hrs}h ${mins}m ${secs}s`;
  };

  return <div className="text-xl font-semibold text-blue-500">{formatTime(elapsed)}</div>;
};

export default Clock;