import React, { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import styles from '@/styles/Home.module.css';

let minuteSeconds = 60;
let hourSeconds = 3600;
let daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6,
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;

export default function ClockFace() {
  let endTime = 0;
  const startTime = Date.now() / 1000;
  const remainingTime = endTime - startTime;

  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  function handleSubmit(event) {
    event.preventDefault();
    calculateEndTime(minutes, hours);
  }

  function calculateEndTime(minutesToAdd, hoursToAdd) {
    const today = new Date();
    const currentTotalMinutes = today.getHours() * 60 + today.getMinutes();
    const newTotalMinutes = currentTotalMinutes + hoursToAdd * 60 + minutesToAdd;
    const newHours = Math.floor(newTotalMinutes / 60) % 24; // Consider the rollover of hours
    const newMinutes = newTotalMinutes % 60;
    const newSeconds = today.getSeconds();
  
    const finishingTime = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
  
    console.log(today.getMinutes());
    console.log(today.getHours());
    console.log(finishingTime);
  
    return finishingTime;
  }


  return (
    <>
      <div className={styles.clock}>
        <CountdownCircleTimer
          {...timerProps}
          colors="#D14081"
          duration={daySeconds}
          initialRemainingTime={remainingTime % daySeconds}
          onComplete={(totalElapsedTime) => ({
            shouldRepeat: remainingTime - totalElapsedTime > hourSeconds,
          })}
        >
          {({ elapsedTime, color }) => (
            <span style={{ color }}>
              {renderTime('hours', getTimeHours(daySeconds - elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          colors="#EF798A"
          duration={hourSeconds}
          initialRemainingTime={remainingTime % hourSeconds}
          onComplete={(totalElapsedTime) => ({
            shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds,
          })}
        >
          {({ elapsedTime, color }) => (
            <span style={{ color }}>
              {renderTime('minutes', getTimeMinutes(hourSeconds - elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer>
        <CountdownCircleTimer
          {...timerProps}
          colors="#218380"
          duration={minuteSeconds}
          initialRemainingTime={remainingTime % minuteSeconds}
          onComplete={(totalElapsedTime) => ({
            shouldRepeat: remainingTime - totalElapsedTime > 0,
          })}
        >
          {({ elapsedTime, color }) => (
            <span style={{ color }}>
              {renderTime('seconds', getTimeSeconds(elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer>
      </div>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="hours">Hours</label>
            <input
              type="number"
              id="hours"
              name="hours"
              min={0}
              max={24}
              onChange={(event) => setHours(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="minutes">Minutes</label>
            <input
              type="number"
              id="minutes"
              name="minutes"
              min={0}
              max={59}
              onChange={(event) => setMinutes(event.target.value)}
            />
          </div>
          <div>
            <button type="submit">Go!</button>
          </div>
        </form>
      </div>
    </>
  );
}
