import React, { Component } from "react";
import { connect } from "react-redux";
import { Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../actions/user.actions";
import { useHistory } from "react-router-dom";

import { MDBRow, MDBCol, MDBIcon, MDBNavLink } from "mdbreact";

class Header extends Component {
  state = {};
  handleLogout = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.props.logout();
  };
  render() {
    const { user = {} } = this.props;
    const { username, isLogin = false } = user;
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
            {isLogin ? (
              <NavItem className="navbar-text">Hi, {username}</NavItem>
            ) : (
              <Nav.Link className="navbar-text" href="/login">
                Login
              </Nav.Link>
            )}
            {isLogin ? (
              <NavDropdown title="Owner Section" id="basic-nav-dropdown">
                <NavDropdown.Item href="/rentals/new">Create Rental</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="rentals/manage">Manage Rentals</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/bookings/manage">Manage Bookings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="//user/profile">User Profile</NavDropdown.Item>
              </NavDropdown>
            ) : ""}
            {isLogin ? (
              <Nav.Link href="/" onClick={this.handleLogout}>
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link className="navbar-text" href="/register">
                Register
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

//export default Header;

const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps, { logout })(Header);
