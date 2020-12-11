import React, { Component } from "react";
import { Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import { MDBRow, MDBCol, MDBIcon } from "mdbreact";

class Header extends Component {
  state = {};
  render() {
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        sticky="top"
        className="navbar navbar-custom"
      >
        <img
          src="/assets/Logo.png"
          width="200"
          height="50"
          className="d-inline-block align-middle"
          alt="React Bootstrap logo"
        />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <NavItem className="navbar-text">Hi, User</NavItem>
            <Nav.Link href="#home">Logout</Nav.Link>
            <NavDropdown title="Select Login Option" id="basic-nav-dropdown">
                 <NavDropdown.Item>Login with Google</NavDropdown.Item>
                 <NavDropdown.Divider />
                 <NavDropdown.Item>Login with Email</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>Help</Nav.Link>
            <NavItem>
                <MDBIcon icon="question-circle" />
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
