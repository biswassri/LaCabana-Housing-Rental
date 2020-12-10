import React, { Component } from "react";
import { connect } from "react-redux";
import { Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";

import { MDBRow, MDBCol, MDBIcon, MDBNavLink } from "mdbreact";

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
            <NavItem className="navbar-text">Hi, {this.props.user.username}</NavItem>
            <Nav.Link href="#home">Logout</Nav.Link>
            
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

//export default Header;

const mapStateToProps = state => {
  return { user: state.user };
};
export default connect( mapStateToProps)(Header);