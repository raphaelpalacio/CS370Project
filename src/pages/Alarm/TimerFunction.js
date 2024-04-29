import "./TimerFunction.css";
import Timer from "./Timer";
import Settings from "./Settings";
import { useState, useEffect, useContext } from "react";
import SettingsContext from "./SettingsContext";

function Function() {
  const settingsInfo = useContext(SettingsContext);

  // const [showSettings, setShowSettings] = useState(false);
  // const [workMinutes, setWorkMinutes] = useState(45);
  // const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <main>
      {/* <SettingsContext.Provider value={{
        showSettings,
        setShowSettings,
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
      }}> */}
      {settingsInfo.showSettings ? <Settings /> : <Timer />}
      {/* </SettingsContext.Provider> */}
    </main>
  );
}

export default Function;
