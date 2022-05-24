import React from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import EmailVerification from "./Components/auth/EmailVerification";
import AccountSettings from "./Components/auth/AccountSettings";

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
  faMobileScreen
);

export default function App() {
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
          </Routes>
        </Router>
      </AppState>
    </>
  );
}
