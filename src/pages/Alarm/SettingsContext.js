import React, { createContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [sessionCount, setSessionCount] = useState(
    localStorage.getItem('sessionCount') || 0
  );

  useEffect(() => {
    localStorage.setItem('sessionCount', sessionCount);
  }, [sessionCount]);

  return (
    <SettingsContext.Provider value={{ sessionCount, setSessionCount }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;