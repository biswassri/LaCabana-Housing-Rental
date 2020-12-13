import React, { Component } from "react";
import { connect } from "react-redux";
import { Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

import { MDBRow, MDBCol, MDBIcon, MDBNavLink } from "mdbreact";

class Header extends Component {
  state = {};
  render() {
    const { user = {}} = this.props;
    const { username , isLogin = false} = user
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        sticky="top"
        className="navbar navbar-custom"
      >
        <Link to="/" className="navbar-brand flex-fill" href="/">
          <img
            src="/assets/Logo.png"
            width="200"
            height="50"
            className="d-inline-block align-middle"
            alt="React Bootstrap logo"
          />
        </Link>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {
              isLogin 
              ? 
              <NavItem className="navbar-text">Hi, {username}</NavItem> 
              : 
              <Nav.Link className="navbar-text" href="/login">Login</Nav.Link>
            }
            {
              isLogin 
              ? 
              <Nav.Link href="#home">Logout</Nav.Link>
              : 
              <Nav.Link className="navbar-text" href="/register">Register</Nav.Link>
            }
            
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