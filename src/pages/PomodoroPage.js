import React from "react";
import { TodoWrapper } from "./TodoWrapper";
import ChatComponent from "./ChatComponent"; // Import the ChatComponent
import Timer from "./Alarm/Timer";

const PomodoroPage = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/5 bg-gray-800 text-white h-full"> 
        {/* channels section */}
        <div className="overflow-y-auto p-4 h-1/2">
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
        {/* todo component (mostly done) */}
        <div className="overflow-y-auto h-1/2">
          <TodoWrapper />
        </div>
      </div>
      {/* spotify bar (are we doing this?) */}
      <div className="w-4/5 flex flex-col bg-gray-100 h-screen">
        <div className="flex-1 p-4 mt-24 overflow-auto">
          {" "}
          <ChatComponent /> 
        </div>
        <div className="h-1/5 bg-gray-300 p-4">
          Bottom Bar works

      {/* Main content area with bottom bar */}
      <div className="w-4/5 flex flex-col bg-gray-700 h-screen">
        
      <div className="h-1/5 bg-gray-700 p-4">
          <Timer />
        </div>

        
      </div>
    </div>
  );
};

export default PomodoroPage;
