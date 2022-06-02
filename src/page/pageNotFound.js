import React from "react";
import { Container } from "react-bootstrap";

export default function PageNotFound() {
  return (
    <>
      <section className="section">
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "92vh" }}
        >
          <h1>404! Page not found</h1>
        </Container>
      </section>
    </>
  );
}
