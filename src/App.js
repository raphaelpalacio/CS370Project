import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PomodoroPage from "./pages/PomodoroPage"; 
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import AboutPage from "./pages/AboutPage";

function App() {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <p>Authentication Error: {error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <BrowserRouter>
      {/* <Navbar />  */}
      <main className="column">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pomodoro" element={<PomodoroPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginButton />} />
          <Route path="/logout" element={<LogoutButton />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
