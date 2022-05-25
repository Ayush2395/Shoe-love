import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import productView from "../backend/product.view";

export default function ShoeCards() {
  const [product, setProduct] = useState([]);

  async function fetchProduct() {
    const productData = await productView.getProductData();
    setProduct(productData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <Row className="my-4">
        {product.map((prod) => {
          return (
            <Col key={prod.id} xs="6" sm="6" lg="4">
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
    </>
  );
}
