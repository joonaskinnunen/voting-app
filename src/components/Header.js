/* eslint-disable react/prop-types */
import React from "react"
import { Navbar, Nav, NavDropdown } from "react-bootstrap"
import Logo from "../vote.png"

const Header = ({ user, logout }) => {
  return (
    <div className="header">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">
          <img
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Vote app"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {user !== null && <Nav.Link href="/newpoll">Create new poll</Nav.Link>}
            {user === null && <Nav.Link href="/login">Sign up / login</Nav.Link>}
          </Nav>
          <Nav>
            {user !== null && <NavDropdown title={user.name} id="collasible-nav-dropdown">
              <NavDropdown.Item href="/mypolls">My polls</NavDropdown.Item>
              <NavDropdown.Item onClick={ logout }>Log out</NavDropdown.Item>
            </NavDropdown>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header
