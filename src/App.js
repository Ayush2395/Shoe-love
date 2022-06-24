import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import ContextApi from "./context/ContextApi";
import Home from "./pages/Home";
import Shopping from "./pages/Shopping";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCartShopping,
  faHouse,
  faIndianRupeeSign,
  faShop,
  faTriangleExclamation,
  faTruck,
  faUser,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartProduct from "./pages/CartProduct";
import Login from "./components/Login";
import Register from "./components/Register";
library.add(
  faHouse,
  faShop,
  faIndianRupeeSign,
  faCartShopping,
  faTruck,
  faUser,
  faTriangleExclamation,
  faEye,
  faEyeSlash
);

export default function App() {
  return (
    <>
      <ContextApi>
        <Router>
          <NavMenu />
          <div className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shopping" element={<Shopping />} />
              <Route path="/cart/:id" element={<CartProduct />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="*"
                element={
                  <div>
                    <Container
                      className="d-flex justify-content-center align-items-center"
                      style={{ minHeight: "100vh" }}
                    >
                      <h1>
                        <FontAwesomeIcon
                          color="crimson"
                          icon="fa-solid fa-triangle-exclamation"
                        />
                        &nbsp; 400, Page not found!
                      </h1>
                    </Container>
                  </div>
                }
              />
            </Routes>
          </div>
        </Router>
      </ContextApi>
    </>
  );
}
