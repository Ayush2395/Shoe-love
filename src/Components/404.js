import React from "react";
import { Card, Container } from "react-bootstrap";

export default function Error() {
  return (
    <>
      <Container>
        <div className="w-100">
          <Card>
            <Card.Body>
              <Card.Title>404 Error Page not found</Card.Title>
              <Card.Text>It seems like your logged out</Card.Text>
              <Card.Text>Please login</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
