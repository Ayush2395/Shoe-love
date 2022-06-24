import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import { db } from "../backend/firebase.config";
import { useAppState } from "../context/ContextApi";

export default function CartProduct() {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAppState();
  const cartCollection = collection(db, `users/${user.uid}/userCart`);
  const reorderCartCollection = query(
    cartCollection,
    orderBy("timeStamp", "desc")
  );

  const fetchCartItems = async () => {
    await getDocs(reorderCartCollection).then((cartItems) => {
      setCartItems(
        cartItems.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <>
      <Row>
        {cartItems.map((item) => {
          return (
            <Col key={item.id} xs="12" sm="12" md="3" lg="4">
              <Card>
                <Card.Body>
                  <Card.Img />
                  <Card.Text>{item.brandName}</Card.Text>
                  <Card.Title>{item.productName}</Card.Title>
                  <Card.Text>Price: {item.price}</Card.Text>
                  <ButtonGroup>
                    <Button variant="danger">Remove</Button>
                    <Button variant="success">Buy</Button>
                  </ButtonGroup>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
