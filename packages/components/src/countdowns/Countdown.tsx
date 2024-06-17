"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  startTime: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown({ startTime }: CountdownProps) {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startTimeDate = new Date(startTime);
    const difference = startTimeDate.getTime() - now.getTime();
    let timeLeft: TimeLeft;

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft;
  };

  const [time, setTime] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  return (
    <div className="grid auto-cols-max grid-flow-col gap-5 text-center">
      <div className="bg-primary rounded-box text-neutral-content flex flex-col p-2">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": time.days } as React.CSSProperties}></span>
        </span>
        days
      </div>
      <div className="bg-primary rounded-box text-neutral-content flex flex-col p-2">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": time.hours } as React.CSSProperties}></span>
        </span>
        hours
      </div>
      <div className="bg-primary rounded-box text-neutral-content flex flex-col p-2">
        <span className="countdown font-mono text-5xl">
          <span
            style={{ "--value": time.minutes } as React.CSSProperties}
          ></span>
        </span>
        min
      </div>
      <div className="bg-primary rounded-box text-neutral-content flex flex-col p-2">
        <span className="countdown font-mono text-5xl">
          <span
            style={{ "--value": time.seconds } as React.CSSProperties}
          ></span>
        </span>
        sec
      </div>
    </div>
  );
}
