import React from "react";
import {Nav, NavDropdown, Navbar} from "react-bootstrap"

function Header() {
  return (
    <div>
      <Navbar bg="dark" expand="lg">
  <Navbar.Brand >Stalk Stock Drops</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/login" >Login</Nav.Link>
      <Nav.Link href="/signup" >Sign Up</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item>Action</NavDropdown.Item>
        <NavDropdown.Item>Another action</NavDropdown.Item>
        <NavDropdown.Item>Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>
</div>
  );
}

export default Header;
