import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => (
  <header>
  <nav className="navbar">
    <ul>
      <li className="nav-pages">
        <Link to="/">Home</Link>
      </li>
      <li className="nav-pages">
        <Link to="/Breweries">Breweries</Link>
      </li>
      <li className="nav-pages">
        <Link to="/Community">Community</Link>
      </li>
      <li className="nav-pages" id="about">
        <Link to="/About">About</Link>
      </li>

      <li className="nav-pages" id="account">
        <Link to="/MyAccount">Account</Link>
      </li>

      <li className="nav-pages" id="auth">
        <Link to="/Login">Login </Link>
      </li>

    </ul>
  </nav>
  </header>
);

export default NavBar;
