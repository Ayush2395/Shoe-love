import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import productView from "../backend/product.view";

export default function Shopping() {
  const [product, setProduct] = useState([]);
  async function fecthProduct() {
    const data = await productView.getProductData();
    setProduct(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  useEffect(() => {
    fecthProduct();
  }, []);

  return (
    <>
      <section className="section shopping_section container">
        <Container>
          <h1 className="fw-bolder">Shopping time shoe lovers</h1>
          <Row className="my-4">
            {product.map((prod) => {
              return (
                <Col key={prod.id} xs="6" sm="6" lg="4" md="4">
                  <Card>
                    <Card.Body>
                      <Card.Img src={prod.imgURL_1} />
                      <Card.Text>{prod.productName}</Card.Text>
                      <Card.Text>&#8377; {prod.price}</Card.Text>
                      <Button
                        as={Link}
                        to={`/product/${prod.slug}/${prod.id}`}
                        className="w-100"
                      >
                        View
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
    </>
  );
}
