import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const handleNav = () => {
    setNav(!nav);
  };

  const handleSignInOut = () => {
    if (isAuthenticated) {
      logout({ returnTo: window.location.origin });
    } else {
      loginWithRedirect();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center h-24 px-4 text-black bg-white shadow-md">
      <Link to="/" className="text-3xl font-bold">
        Pomodoro Plus
      </Link>
      <ul className="hidden md:flex items-center">
      <li className="p-4">
          <Link to="/profilepage">Profile</Link>
        </li>
        <li className="p-4">
          <Link to="/">Home</Link>
        </li>
        <li className="p-4">
          <Link to="/about">About Us</Link>
        </li>
        <li className="p-4">
          <Link to="/pomodoro">Pomodoro</Link>
        </li>

        <li className="p-4 cursor-pointer" onClick={handleSignInOut}>
          {isAuthenticated ? "Sign Out" : "Sign In"}
        </li>
      </ul>
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <ul
        className={
          nav
            ? "fixed left-0 top-24 w-[60%] h-full border-r border-r-gray-900 bg-[#ffffff] ease-in-out duration-500"
            : "ease-in-out duration-500 fixed left-[-100%]"
        }
      >
        <li className="p-4 border-b border-gray-600">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="p-4 border-b border-gray-600">
          <Link to="/">Home</Link>
        </li>
        <li className="p-4 border-b border-gray-600">
          <Link to="/about">About Us</Link>
        </li>
        <li className="p-4 border-b border-gray-600">
          <Link to="/pomodoro">Pomodoro</Link>
        </li>
        <li
          className="p-4 border-b border-gray-600 cursor-pointer"
          onClick={handleSignInOut}
        >
          {isAuthenticated ? "Sign Out" : "Sign In"}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
