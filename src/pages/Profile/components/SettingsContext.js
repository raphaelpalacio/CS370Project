import react from 'react';

const SettingsContext = react.createContext({
  workMinutes: 1,
  breakMinutes: 5,
  setShowSettings: () => {}, 
  setWorkingTime: () => {}, 
  setBreakMinutes: () => {}, 
  sessionCount: 0,
  setSessionCount: () => {}, 
});

export default SettingsContext;