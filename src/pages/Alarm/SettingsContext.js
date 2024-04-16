import react from 'react';

const SettingsContext = react.createContext({
  workMinutes: 25,
  breakMinutes: 5,
  setShowSettings: () => {}, // Placeholder function
  setWorkMinutes: () => {}, // Placeholder function
  setBreakMinutes: () => {}, // Placeholder function
});

export default SettingsContext;