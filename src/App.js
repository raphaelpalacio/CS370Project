import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Profile from "./pages/Profile/Profile";
import PomodoroPage from "./pages/PomodoroPage";
import { useAuth0 } from "@auth0/auth0-react"; // import { useAuth0 } from "./auth0";

function App() {
  const { isLoading, error } = useAuth0();
  const [sessionCount, setSessionCount] = useState(() => {
    const storedSessionCount = localStorage.getItem("sessionCount");
    return storedSessionCount ? parseInt(storedSessionCount) : 0;
  });

  const incrementSessionCount = () => {
    setSessionCount((prevSessionCount) => prevSessionCount + 1);
  };

  if (error) {
    return <p>Authentication Error: {error.message}</p>;
  }

  if (isLoading) {
    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "navy",
          fontSize: "2em",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="">
              <HomePage />
            </div>
          }
        />
        <Route
          path="/profilepage"
          element={
            <div className="pt-20">
              <Profile sessionCount={sessionCount} />
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div className="pt-20">
              <AboutPage />
            </div>
          }
        />
        <Route
          path="/pomodoro"
          element={<PomodoroPage sessionCount={sessionCount} incrementSessionCount={incrementSessionCount} />}
        />
      </Routes>
    </Router>
  );
}

export default App;