import React, { useEffect } from "react";
import NavigationBar from "./Components/NavigationBar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shopping from "./pages/Shopping";
import AppState from "./context/AppState";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEye,
  faEyeSlash,
  faCartShopping,
  faUser,
  faShoppingBag,
  faLock,
  faHome,
  faStore,
  faShoePrints,
  faLocationDot,
  faMarsAndVenus,
  faMobileScreen,
  faTrash,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import EmailVerification from "./Components/auth/EmailVerification";
import AccountSettings from "./Components/auth/AccountSettings";
import { scriptSrc } from "./js/main";
import Cart from "./Components/Cart";
import Error from "./Components/404";
import ProductView from "./Components/ProductView";

library.add(
  faEye,
  faEyeSlash,
  faCartShopping,
  faUser,
  faShoppingBag,
  faLock,
  faHome,
  faStore,
  faShoePrints,
  faLocationDot,
  faMarsAndVenus,
  faMobileScreen,
  faTrash,
  faBagShopping
);

export default function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = { scriptSrc };
  }, []);

  return (
    <>
      <AppState>
        <Router>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verification" element={<EmailVerification />} />
            <Route path="/myaccount" element={<AccountSettings />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/error" element={<Error />} />
            <Route path="/product/:id/:id" element={<ProductView />} />
          </Routes>
        </Router>
      </AppState>
    </>
  );
}
