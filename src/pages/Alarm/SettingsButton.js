// import { useContext, useEffect, useRef, useState } from "react";
// import SettingsContext from "./SettingsContext";

// function SettingsButton() {
//   const { setShowSettings } = useContext(SettingsContext);
//   const buttonRef = useRef(null);
//   const [fontSize, setFontSize] = useState(16); // Initial font size

//   const handleClick = () => {
//     setShowSettings((prevShowSettings) => !prevShowSettings); // Update the state to show settings
//   };
//   // Adjust font size dynamically based on button width
//   useEffect(() => {
//     const buttonWidth = buttonRef.current.offsetWidth;
//     const textWidth = buttonRef.current.firstChild.offsetWidth;

//     // Calculate the maximum font size based on the button width and text width
//     const maxFontSize = Math.floor(buttonWidth / textWidth * fontSize);

//     // Adjust font size to fit within the button
//     setFontSize(maxFontSize);
//   }, [fontSize]);

//   return (
//     <button className="with-text" onClick={handleClick}>
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//         <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
//       </svg>
//       Settings
//     </button>
//   );
// }

// export default SettingsButton;

import { useContext, useEffect, useRef, useState } from "react";
import SettingsContext from "./SettingsContext";

function SettingsButton() {
  const { setShowSettings } = useContext(SettingsContext);
  const buttonRef = useRef(null);
  const [initialFontSize] = useState(16); // Initial font size
  const [calculatedFontSize, setCalculatedFontSize] = useState(initialFontSize);

  // Adjust font size dynamically based on button width
  useEffect(() => {
    function handleResize() {
      if (buttonRef.current && buttonRef.current.firstChild) {
        const buttonWidth = buttonRef.current.offsetWidth;
        const textWidth = buttonRef.current.firstChild.offsetWidth;
        // Ensure textWidth is not zero to avoid division by zero
        if (textWidth > 0) {
          const maxFontSize = Math.floor(
            (buttonWidth / textWidth) * initialFontSize
          );
          setCalculatedFontSize(maxFontSize);
        }
      }
    }

    // Set initial font size when component mounts
    handleResize();

    // Adjust font size on window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, [initialFontSize]); // Depend on initialFontSize so it recalculates if this value changes

  // Function to handle the button click
  const handleClick = () => {
    setShowSettings((prevShowSettings) => !prevShowSettings);
  };

  return (
    <button
      ref={buttonRef}
      className="with-text"
      onClick={handleClick}
      style={{ fontSize: `${calculatedFontSize}px` }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
          clipRule="evenodd"
        />
      </svg>
      Settings
    </button>
  );
}

export default SettingsButton;
