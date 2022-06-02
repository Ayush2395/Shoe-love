import React from "react";
import Login from "./components/Login";
import AppState from "./context/AppState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./page/admin";
import Products from "./page/products";
import Orders from "./page/orders";
import PageNotFound from "./page/pageNotFound";
import Menubar from "./components/Menubar";

export default function App() {
  return (
    <>
      <AppState>
        <Router>
          <Menubar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="admin/orders" element={<Orders />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AppState>
    </>
  );
}
