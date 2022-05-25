import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";

export default function ProductView() {
  const [shoeSize, setShoeSize] = useState([6, 7, 8, 9, 10]);
  const [color, setColor] = useState(["Brown", "Black"]);
  return (
    <>
      <Container className="my-5 py-5">
        <Row>
          <Col sm="12" md="6">
            <Card>
              <Card.Body>
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="https://firebasestorage.googleapis.com/v0/b/shoe-love.appspot.com/o/shoeProducts%2FGucci%201st.png?alt=media&token=5f204667-f272-4725-97dc-de6a27566587"
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <h3>First slide label</h3>
                      <p>
                        Nulla vitae elit libero, a pharetra augue mollis
                        interdum.
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="https://firebasestorage.googleapis.com/v0/b/shoe-love.appspot.com/o/shoeProducts%2FGucci%201st.png?alt=media&token=5f204667-f272-4725-97dc-de6a27566587"
                      alt="Second slide"
                    />

                    <Carousel.Caption>
                      <h3>Second slide label</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="https://firebasestorage.googleapis.com/v0/b/shoe-love.appspot.com/o/shoeProducts%2FGucci%201st.png?alt=media&token=5f204667-f272-4725-97dc-de6a27566587"
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>Third slide label</h3>
                      <p>
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur.
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </Card.Body>
            </Card>
          </Col>
          <Col sm="12" md="6">
            <Card style={{ height: "412px" }}>
              <Card.Body>
                <Card.Text>Brand name</Card.Text>
                <Card.Title className="fs-1">Product name</Card.Title>
                <Card.Text>
                  Size:{" "}
                  {shoeSize.map((size) => {
                    return (
                      <Form.Check
                        className="mb-3"
                        id={`size`}
                        inline
                        type="radio"
                        label={`${size}`}
                      />
                    );
                  })}
                </Card.Text>

                <Card.Text>
                  Color:{" "}
                  {color.map((col) => {
                    return (
                      <Form.Check
                        inline
                        className="mb-3"
                        type="checkbox"
                        label={col}
                      />
                    );
                  })}
                </Card.Text>
                <Card.Text className="fs-4">Price : $830</Card.Text>
                <Button className="mb-3 w-100" variant="secondary">
                  Add to cart{" "}
                  <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
                </Button>
                <Card.Text className="fs-6 fw-bolder">Stock left: 15</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}