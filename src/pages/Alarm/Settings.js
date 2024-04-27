import ReactSlider from 'react-slider';
import './slider.css'
import SettingsContext from "./SettingsContext";
import {useContext} from "react";
import BackButton from "./BackButton";


function Settings() {
  const { workMinutes, breakMinutes, setWorkMinutes, setBreakMinutes, setShowSettings } = useContext(SettingsContext);

  const settingsInfo = useContext(SettingsContext);
  return(
    <div style={{textAlign:'left', paddingTop: '130px'}}>
      <label>work: {settingsInfo.workMinutes}:00</label>
      <ReactSlider
        className={'slider'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={workMinutes}
        onChange={newValue => setWorkMinutes(newValue)}
        min={1}
        max={120}
      />
      <label>break: {settingsInfo.breakMinutes}:00</label>
      <ReactSlider
        className={'slider green'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={breakMinutes}
        onChange={newValue => setBreakMinutes(newValue)}
        min={1}
        max={120}
      />
      <div style={{textAlign:'center', marginTop:'20px'}}>
        <BackButton onClick={() => setShowSettings(false)} />
      </div>

    </div>
  );
}

export default Settings;