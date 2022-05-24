import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../backend/firebase.config";
import { useAppState } from "../context/AppState";

export default function NavigationBar() {
  const [userName, setUserName] = useState("username");
  const { user, signOutUser } = useAppState();
  const [disabledBtn, setDisabledBtn] = useState(true);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOutUser();
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser.displayName === null) {
        setUserName("username");
      } else {
        setUserName(`${currentUser.displayName}`);
      }

      if (!currentUser) {
        setDisabledBtn(true);
      } else if (currentUser) {
        setDisabledBtn(false);
      }
    });
  }, []);
  return (
    <>
      <Navbar fixed="top" bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Shoe Love <FontAwesomeIcon icon="fa-solid fa-shoe-prints" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/">
                <FontAwesomeIcon icon="fa-solid fa-house" /> Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/shopping">
                <FontAwesomeIcon icon="fa-solid fa-store" /> Shopping
              </Nav.Link>
              <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item disabled={disabledBtn} href="#action/3.1">
                  <FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> Cart
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/myaccount"
                  disabled={disabledBtn}
                >
                  <FontAwesomeIcon icon="fa-solid fa-user" /> My account
                </NavDropdown.Item>
                <NavDropdown.Item disabled={disabledBtn} href="#action/3.3">
                  <FontAwesomeIcon icon="fa-solid fa-bag-shopping" /> Your Order
                </NavDropdown.Item>
                <NavDropdown.Divider />
                {user ? (
                  <NavDropdown.Item onClick={logout}>
                    <FontAwesomeIcon icon="fa-solid fa-lock" /> Logout
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item as={Link} to="/login">
                    <FontAwesomeIcon icon="fa-solid fa-lock" /> Login
                  </NavDropdown.Item>
                )}
              </NavDropdown>
              <div>
                <Button variant="warning" className="w-100" disabled>
                  {userName}
                </Button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
