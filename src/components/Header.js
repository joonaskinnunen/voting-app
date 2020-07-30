/* eslint-disable react/prop-types */
import React from "react"
import { Navbar, Nav } from "react-bootstrap"

const Header = ({ user, logout }) => {
  return (
    <div className="header">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Vote app</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {user !== null && <Nav.Link href="/newpoll">Create new poll</Nav.Link>}
            {user !== null && <Navbar.Text>Logged in as {user.name}</Navbar.Text>}
            {user === null ? <Nav.Link href="/login">Login</Nav.Link> : <Nav.Link onClick={ logout }>Log out</Nav.Link>}
            {user === null && <Nav.Link href="/signup">Sign up</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header
