import { useContext } from "react";
import SettingsContext from "./SettingsContext";

function SettingsButton() {
  const { setShowSettings } = useContext(SettingsContext);

  const handleClick = () => {
    setShowSettings((prevShowSettings) => !prevShowSettings); // Update the state to show settings
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '108px' }}> {/* Adjust marginLeft as needed */}
      <button className="with-text" onClick={handleClick} style={{ display: 'flex', alignItems: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-5" viewBox="0 0 25 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
        <span style={{ marginLeft: '-8px' }}></span> {/* Adjust marginLeft as needed */}
      </button>
    </div>
  );
}

export default SettingsButton;