import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <>
      <nav class="navbar">
        <div class="logo">Welcome</div>

        <ul class="nav-links">
          <div class="menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Register">Register</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li >
              <Link to="/">Log Out</Link>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
