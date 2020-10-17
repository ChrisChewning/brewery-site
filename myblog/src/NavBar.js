import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => (
  <nav className="navbar">
    <ul>
      <li className="nav-pages">
        <Link to="/">Home</Link>
      </li>
      <li className="nav-pages">
        <Link to="/Breweries">Breweries</Link>
      </li>
      <li className="nav-pages">
        <Link to="/News-Events">News & Events</Link>
      </li>
      <li className="nav-pages" id="about">
        <Link to="/About">About</Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;
