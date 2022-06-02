import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import productService from "../backend/product.service";

export default function Products() {
  const [product, setProduct] = useState([]);

  const getAllProducts = async () => {
    await productService
      .productList()
      .then((snapShot) =>
        setProduct(snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <section className="section">
      <Container className="my-5">
        <div className="mb-4">
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2 "
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </div>
        <Row>
          {product.map((item) => {
            return (
              <Col
                key={item.brandName}
                className="mb-3"
                xs="12"
                sm="12"
                md="4"
                lg="3"
              >
                <Card>
                  <Card.Body>
                    <Card.Img src={item.imgURL_1} alt="product image" />
                    <Card.Text>{item.brandName}</Card.Text>
                    <Card.Title>{item.productName}</Card.Title>
                    <Card.Text>{item.price}</Card.Text>
                    <Button className="w-100" variant="outline-danger">
                      <AiFillDelete /> Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}
