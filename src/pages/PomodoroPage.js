import React from "react";
import { TodoWrapper } from "./TodoWrapper"; // Import TodoWrapper

const PomodoroPage = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/5 bg-gray-800 text-white h-full">
        {/* Channels Section */}
        <div className="overflow-y-auto p-4 h-1/2">
          <div className="bg-gray-700 p-4 rounded-lg mb-4">
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

        {/* TodoWrapper component */}
        <div className="overflow-y-auto p-4 h-1/2">
          <TodoWrapper />
        </div>
      </div>

      {/* Main content area */}
      <div className="w-4/5 bg-gray-100 p-4 h-screen">filler text</div>
    </div>
  );
};

export default PomodoroPage;
