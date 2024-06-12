"use client";

import React, { useEffect, useState } from "react";

export function Countdown() {
  const [time, setTime] = useState({
    days: 15,
    hours: 10,
    minutes: 24,
    seconds: 5,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              } else {
                clearInterval(timer);
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
