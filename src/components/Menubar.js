import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../backend/firebase.config";
import { useAppState } from "../context/AppState";

export default function Menubar() {
  const navigate = useNavigate();

  const [disabledBTN, setDisabledBTN] = useState(false);
  const { user, logOutAdmin } = useAppState();

  const handleLogOut = async () => {
    try {
      await logOutAdmin();
      navigate("/");
    } catch (err) {
      console.log(err.code);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        setDisabledBTN(true);
        navigate("/");
      } else if (currentUser) {
        setDisabledBTN(false);
        navigate("/");
      }
    });
  }, []);
  return (
    <>
      <Navbar fixed="top" bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to={`/admin`}>
            Shoe love admin
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link disabled={disabledBTN} as={NavLink} to={`/admin`}>
                Home
              </Nav.Link>
              <Nav.Link
                disabled={disabledBTN}
                as={NavLink}
                to={`/admin/products`}
              >
                Products
              </Nav.Link>
              <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item
                  disabled={disabledBTN}
                  as={Link}
                  to="/admin/orders"
                >
                  Orders
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item disabled={disabledBTN} onClick={handleLogOut}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
