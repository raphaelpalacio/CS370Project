import React, { useContext, useState, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import SettingsContext from "./SettingsContext";
import './Timer.css';

// Constants
const red = '#f54e4e';
const green = '#4aec8c';

function Timer() {
  // State and Refs
  const settingsInfo = useContext(SettingsContext);
  const [stop, setStop] = useState(true);
  const [mode, setMode] = useState('work');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const secondsLeftRef = useRef(secondsLeft);
  const stopRef = useRef(stop);
  const modeRef = useRef(mode);

  // Effects
  useEffect(() => {
    const calculateNextMode = () => {
      if (modeRef.current === 'work') settingsInfo.setSessionCount(prevCount => prevCount + 1);

      const nextMode = modeRef.current === 'work' ? 'break' : 'work';
      const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    };

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (!stopRef.current) {
        if (secondsLeftRef.current === 0) {
          calculateNextMode();
        } else {
          secondsLeftRef.current--;
          setSecondsLeft(secondsLeftRef.current);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  // Calculations
  const totalSeconds = mode === 'work'
    ? settingsInfo.workMinutes * 60
    : settingsInfo.breakMinutes * 60;
  const percentage = Math.round(secondsLeft / totalSeconds * 100);
  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = '0' + seconds;

  // Render
  return (
    <div className="timer-container" style={{ marginTop: '50px' }}> {/* Adjust marginTop as needed */}
      <div className="progressbar-container">
        <div className="progressbar-content">
          <CircularProgressbar
            value={percentage}
            text={`${minutes}:${seconds}`}
            styles={buildStyles({
              textColor: '#fff',
              pathColor: mode === 'work' ? red : green,
              tailColor: 'rgba(255,255,255,.2)',
            })}
          />
          <div style={{ marginTop: '20px' }}>
            {stop
              ? <PlayButton onClick={() => { setStop(false); stopRef.current = false; }} />
              : <PauseButton onClick={() => { setStop(true); stopRef.current = true; }} />}
          </div>
          <div style={{ marginTop: '20px' }}>
            <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timer;