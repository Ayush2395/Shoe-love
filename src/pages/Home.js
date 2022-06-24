import React from "react";
import { Badge } from "react-bootstrap";
import ProductsCard from "../components/ProductsCard";
import ProductSlider from "../components/ProductSlider";

export default function Home() {
  return (
    <>
      <ProductSlider size="350px" />
      <h1 className="d-inline mt-3 fs-3 fw-bold">Recent Products</h1>
      <Badge className="fs-8 mx-3 ">New</Badge>
      <ProductsCard />
    </>
  );
}
