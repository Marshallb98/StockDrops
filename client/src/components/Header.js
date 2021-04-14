import React from "react";
import "../styles/header.css";
function Header() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <a id="navStalk">Stalk Stock Drops</a>
          </li>
          <li>
            <a id="navDash" href="/dashboard">
              Dashboard
            </a>
          </li>
          <li>
            <a id="navLog" href="/login">
              Login
            </a>
          </li>
          <li>
            <a id="navSign" href="/signup">
              Sign Up
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
