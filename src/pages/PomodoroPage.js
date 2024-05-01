import React, { useState, useEffect } from "react";
import ChatComponent from "./ChatComponent";
import TimerFunction from "./Alarm/TimerFunction";
import SettingsContext from "./Alarm/SettingsContext";
import axios from "axios";
import { TodoWrapper } from "./TodoWrapper";

const PomodoroPage = () => {
  const [completedPomodoros, setCompletedPomodoros] = useState(0); // State for completedPomodoros
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkingTime] = useState(45);
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

  const completeSession = async (sessionId) => {
    console.log("Attempting to complete session", sessionId);
    try {
      const response = await axios.post("http://localhost:5000/session/counter", { session_id: sessionId });
      console.log(response.data.message);
      incrementCompletedPomodoros();
    } catch (error) {
      console.error("There was an error completing the session", error.response?.data || error.message);
    }
  };

  const incrementCompletedPomodoros = () => {
    setSessionCount(prevSessionCount => prevSessionCount + 1);
    setCompletedMinutes(prevCompletedMinutes => {
      console.log("Updating completed minutes...", prevCompletedMinutes + workMinutes);
      return prevCompletedMinutes + workMinutes;
    });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 text-white h-full">
        <div className="h-full overflow-y-auto">
          <ChatComponent />
          {/* TodoWrapper taking up the entire sidebar */}
          <div className="h-full">
            <TodoWrapper />
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="w-4/5 flex flex-col bg-gray-700 h-screen">
        <SettingsContext.Provider
          value={{
            showSettings,
            setShowSettings,
            workMinutes,
            breakMinutes,
            setWorkingTime,
            setBreakMinutes,
            sessionCount,
            setSessionCount
          }}
        >
          <div className="h-1/5 bg-gray-700 p-4">
            <TimerFunction
              incrementCompletedPomodoros={incrementCompletedPomodoros}
              onSessionComplete={completeSession}
            />
          </div>
          <div className="text-white">
            Completed Sessions: {sessionCount} <br />
          </div>
        </SettingsContext.Provider>
      </div>
    </div>
  );
};

export default PomodoroPage;