import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/" className="logo-text">
          Pomodoro +
        </a>
      </div>
      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/about">About Us</a>
        <a href="/pomodoro">Pomodoro</a>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
    </nav>
  );
};

export default Navbar;
