import React, { createContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [sessionCount, setSessionCount] = useState(
    localStorage.getItem('sessionCount') || 0
  );
  const [minuteCount, setMinuteCount] = useState(
    localStorage.getItem('minuteCount') || 0
  );

  useEffect(() => {
    localStorage.setItem('sessionCount', sessionCount);
  }, [sessionCount]);

  useEffect(() => {
    localStorage.setItem('minuteCount', minuteCount);
  }, [minuteCount]);

  return (
    <SettingsContext.Provider value={{ sessionCount, setSessionCount, minuteCount, setMinuteCount }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;