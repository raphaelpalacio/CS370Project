import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Profile from "./pages/Profile/Profile"
import PomodoroPage from "./pages/PomodoroPage";

//import ProfilePage from "./pages/Profile/container/ProfilePage";
//import ProfilePage from './pages/ProfilePage';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isLoading, error, isAuthenticated } = useAuth0();

  if (error) {
    return <p>Authentication Error: {error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
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
              <Profile />
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
          element={
            <div >
              <PomodoroPage />
            </div>
          }
          //element={isAuthenticated ? <PomodoroPage /> : <Navigate to="/" />}
        />
        
      </Routes>
    </Router>
  );
}

export default App;
