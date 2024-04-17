import React from "react";
import { TodoWrapper } from "./TodoWrapper";
import ChatComponent from "./ChatComponent"; // Import the ChatComponent
import Timer from "./Alarm/Timer"; // Ensure this path is correct

const PomodoroPage = () => {
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

      {/* Main content area with chat and timer side by side */}
      <div
        className="w-4/5 flex flex-col h-screen"
        style={{ backgroundColor: "rgb(84, 29, 146)" }}
      >
        <div className="flex flex-1">
          <div className="flex-1 p-4 mt-24 overflow-auto">
            <ChatComponent />
          </div>
          <div className="flex items-center justify-center flex-1">
            <Timer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroPage;
