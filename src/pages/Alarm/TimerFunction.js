import './TimerFunction.css';
import Timer from "./Timer";
import Settings from "./Settings";
import {useState, useEffect, useContext} from "react";
import SettingsContext from "./SettingsContext";

function Function() {
  const settingsInfo = useContext(SettingsContext);

 

  return (
    <main>
      {}
        {settingsInfo.showSettings ? <Settings /> : <Timer />}
      {}
    </main>
  );
}

export default Function;
