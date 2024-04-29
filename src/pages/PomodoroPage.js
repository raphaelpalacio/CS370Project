import React, { useState, useEffect } from "react";
import { TodoWrapper } from "./TodoWrapper"; // Import TodoWrapper
import ChatComponent from "./ChatComponent"; // Import the ChatComponent
import Function from "./Alarm/TimerFunction";
import SettingsContext from "./Alarm/SettingsContext";

const PomodoroPage = () => {
  const [completedPomodoros, setCompletedPomodoros] = useState(0); // State for completedPomodoros
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);
  const [sessionCount, setSessionCount] = useState(() => {
    const storedSessionCount = localStorage.getItem("sessionCount");
    return storedSessionCount ? parseInt(storedSessionCount) : 0;
  });
  const [completedMinutes, setCompletedMinutes] = useState(() => {
    const storedCompletedMinutes = localStorage.getItem("completedMinutes");
    return storedCompletedMinutes ? parseInt(storedCompletedMinutes) : 0;
  });

  useEffect(() => {
    localStorage.setItem("sessionCount", sessionCount.toString());
  }, [sessionCount]);

  useEffect(() => {
    localStorage.setItem("completedMinutes", completedMinutes.toString());
  }, [completedMinutes]);

  // Function to increment completedPomodoros and update localStorage
  const incrementCompletedPomodoros = () => {
     setSessionCount(prevSessionCount => prevSessionCount + 1);
  setCompletedMinutes(prevCompletedMinutes => {
    console.log("Updating completed minutes...", prevCompletedMinutes + workMinutes);
    return prevCompletedMinutes + workMinutes;
  });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/5 bg-gray-800 text-white h-full">
        {/* Channels section */}
        <div className="overflow-y-auto p-4 mt-20 h-1/2">
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <h2 className="font-bold">Channels</h2>
            <ul>
              <li>
                CS 377
                <ul>
                  <li>Group 1</li>
                  <li>Group 2</li>
                </ul>
              </li>
              <li>
                CS 370
                <ul>
                  <li>Group 1</li>
                  <li>Group 2</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        {/* Todo component */}
        <div className="overflow-y-auto h-1/2">
          <TodoWrapper />
        </div>
      </div>

      {/* Main content area with bottom bar */}
      <div className="w-4/5 flex flex-col bg-gray-700 h-screen">
        <SettingsContext.Provider
          value={{
            showSettings,
            setShowSettings,
            workMinutes,
            breakMinutes,
            setWorkMinutes,
            setBreakMinutes,
            sessionCount,
            setSessionCount
          }}
        >
          <div className="h-1/5 bg-gray-700 p-4">
            <Function incrementCompletedPomodoros={incrementCompletedPomodoros} />
          </div>
          <div className="text-white">
            Completed Sessions: {sessionCount} <br />
            Completed Minutes: {completedMinutes}
          </div>
        </SettingsContext.Provider>
      </div>
    </div>
  );
};

export default PomodoroPage;