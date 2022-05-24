import React from "react";
import { Button, Card } from "react-bootstrap";

export default function ShoeCards() {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Img
            src="https://images.unsplash.com/photo-1518894781321-630e638d0742?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNob2VzfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=600"
            className="img-circle"
          />
          <Card.Title>Gucci</Card.Title>
          <Button className="w-100">Buy now</Button>
        </Card.Body>
      </Card>
    </>
  );
}
