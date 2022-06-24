import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { db } from "../backend/firebase.config";
import { useAppState } from "../context/ContextApi";

export default function ProductsCard() {
  const productCollection = collection(db, "shoe_love_product");
  const [products, setProducts] = useState([]);

  const fetchProductDetails = async () => {
    try {
      const data = await getDocs(productCollection);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      console.log(err.code);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <>
      <Row className="mt-3">
        {products.map((item) => {
          return (
            <Col className="mb-3" xs="12" sm="12" md="4" lg="3" key={item.id}>
              <Card>
                <Card.Body>
                  <Card.Img src="https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
                  <Card.Text className="mt-3">{item.brandName}</Card.Text>
                  <Card.Title className="fw-bold">
                    {item.productName}
                  </Card.Title>
                  <Card.Text>
                    Price:{" "}
                    <FontAwesomeIcon
                      size="xs"
                      icon="fa-solid fa-indian-rupee-sign"
                    />{" "}
                    {item.price}
                  </Card.Text>
                  <Button className="w-100">View</Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
