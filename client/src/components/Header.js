import React from "react";
import { Nav, Navbar } from "react-bootstrap";
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
      <a id="navDash" href="/dashboard">Dashboard</a>
    </li>
    <li>
      <a id="navLog" href="/login">Login</a>
    </li>
    <li>
      <a id="navSign" href="/signup">Sign Up</a>
    </li>
  </ul>
</nav>
      {/* <Navbar id="navBar" expand="lg">
        <Navbar.Brand className="navLinks navTitle">Stalk Stock Drops</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="navLinks" href="/">Home</Nav.Link>
            <Nav.Link className="navLinks" href="/login">Login</Nav.Link>
            <Nav.Link className="navLinks" href="/signup">Sign Up</Nav.Link>
            <Nav.Link className="navLinks dashBoard" href="/dashboard">Dashboard</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar> */}
    </div>
  );
}

export default Header;
