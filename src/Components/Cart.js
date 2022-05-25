import { Button } from "react-bootstrap";
import React from "react";
import {
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Cart() {
  return (
    <Container className="my-5">
      <h1>Your Cart</h1>
      <Row>
        <Col>
          <Card style={{ width: "18rem" }} className="my-5">
            <Card.Img
              variant="top"
              src="https://firebasestorage.googleapis.com/v0/b/shoe-love.appspot.com/o/shoeProducts%2FGucci%201st.png?alt=media&token=5f204667-f272-4725-97dc-de6a27566587"
            />
            <Card.Body>
              <Card.Title>Gucci</Card.Title>
              <Card.Text>Price: 1200</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Order by: Ayush</ListGroupItem>
              <ListGroupItem>Address: 635-R,Model Town, Ludhiana</ListGroupItem>
              <ListGroupItem>Contact number: 9464342754</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button variant="outline-danger" className="mx-1">
                <FontAwesomeIcon icon="fa-solid fa-trash" /> Remove
              </Button>
              <Button variant="outline-success" className="mx-1">
                <FontAwesomeIcon icon="fa-solid fa-bag-shopping" /> Buy
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "18rem" }} className="my-5">
            <Card.Img
              variant="top"
              src="https://firebasestorage.googleapis.com/v0/b/shoe-love.appspot.com/o/shoeProducts%2FGucci%201st.png?alt=media&token=5f204667-f272-4725-97dc-de6a27566587"
            />
            <Card.Body>
              <Card.Title>Gucci</Card.Title>
              <Card.Text>Price: 1200</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Order by: Ayush</ListGroupItem>
              <ListGroupItem>Address: 635-R,Model Town, Ludhiana</ListGroupItem>
              <ListGroupItem>Contact number: 9464342754</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button variant="outline-danger" className="mx-1">
                <FontAwesomeIcon icon="fa-solid fa-trash" /> Remove
              </Button>
              <Button variant="outline-success" className="mx-1">
                <FontAwesomeIcon icon="fa-solid fa-bag-shopping" /> Buy
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "18rem" }} className="my-5">
            <Card.Img
              variant="top"
              src="https://firebasestorage.googleapis.com/v0/b/shoe-love.appspot.com/o/shoeProducts%2FGucci%201st.png?alt=media&token=5f204667-f272-4725-97dc-de6a27566587"
            />
            <Card.Body>
              <Card.Title>Gucci</Card.Title>
              <Card.Text>Price: 1200</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Order by: Ayush</ListGroupItem>
              <ListGroupItem>Address: 635-R,Model Town, Ludhiana</ListGroupItem>
              <ListGroupItem>Contact number: 9464342754</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button variant="outline-danger" className="mx-1">
                <FontAwesomeIcon icon="fa-solid fa-trash" /> Remove
              </Button>
              <Button variant="outline-success" className="mx-1">
                <FontAwesomeIcon icon="fa-solid fa-bag-shopping" /> Buy
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "18rem" }} className="my-5">
            <Card.Img
              variant="top"
              src="https://firebasestorage.googleapis.com/v0/b/shoe-love.appspot.com/o/shoeProducts%2FGucci%201st.png?alt=media&token=5f204667-f272-4725-97dc-de6a27566587"
            />
            <Card.Body>
              <Card.Title>Gucci</Card.Title>
              <Card.Text>Price: 1200</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Order by: Ayush</ListGroupItem>
              <ListGroupItem>Address: 635-R,Model Town, Ludhiana</ListGroupItem>
              <ListGroupItem>Contact number: 9464342754</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button variant="outline-danger" className="mx-1">
                <FontAwesomeIcon icon="fa-solid fa-trash" /> Remove
              </Button>
              <Button variant="outline-success" className="mx-1">
                <FontAwesomeIcon icon="fa-solid fa-bag-shopping" /> Buy
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
