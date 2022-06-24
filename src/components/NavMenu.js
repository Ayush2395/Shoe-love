import React from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useAppState } from "../context/ContextApi";

export default function NavMenu() {
  const { user } = useAppState();
  return (
    <>
      <Navbar fixed="top" expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Shoe Love
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/shopping">
                Shopping
              </Nav.Link>
              <NavDropdown title="More">
                <NavDropdown.Item as={Link} to={`/cart/${user.uid}`}>
                  My Cart
                </NavDropdown.Item>
                <NavDropdown.Item>My Order</NavDropdown.Item>
                <NavDropdown.Item>My Account</NavDropdown.Item>
                <NavDropdown.Divider />
                {user ? (
                  <NavDropdown.Item as={Link} to="/login">
                    <Button variant="outline-danger" className="w-100">
                      Log out
                    </Button>
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item>
                    <Button variant="outline-success" className="w-100">
                      Login
                    </Button>
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
