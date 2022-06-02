import { uploadBytesResumable, ref } from "firebase/storage";
import { storage } from "../backend/firebase.config";
import React, { useState } from "react";
import { Button, Card, Container, Form, ProgressBar } from "react-bootstrap";
import { useAppState } from "../context/AppState";

export default function Admin() {
  const { collectionRef, error, setError } = useAppState();
  const [productDetails, setProductDetails] = useState({
    brandName: "",
    productName: "",
    price: "",
    imgURL_1: null,
    imgURL_2: null,
    imgURL_3: null,
  });
  const storageRef = ref(storage, `shoeProducts/${productDetails.imgURL_1}`);
  const [progressBar, setProgressBar] = useState(0);

  const addProductDetails = async (event) => {
    event.preventDefault();
    setError("");

    const images_1 = {
      imgURL_1: productDetails.imgURL_1,
    };
    const images_2 = {
      imgURL_1: productDetails.imgURL_2,
    };
    const images_3 = {
      imgURL_1: productDetails.imgURL_3,
    };

    uploadBytesResumable(storageRef, productDetails.imgURL_1).on(
      "state_changed",
      (snap) => {
        const progress = Math.round(
          (snap.bytesTransferred / snap.totalBytes) * 100
        );
        setProgressBar(progress);
      },
      (err) => {
        console.log(err.code);
      },
      () => {
        setProgressBar(0);
      }
    );
  };
  return (
    <>
      <section className="section my-5">
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "92vh" }}
        >
          <div className="w-100 mb-5" style={{ maxWidth: "600px" }}>
            <Card>
              <Card.Body>
                <Card.Title>Enter products details</Card.Title>
                <hr />
                <Form onSubmit={addProductDetails}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="brandName">Brand name</Form.Label>
                    <Form.Control id="brandName" type="text" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="productName">Product name</Form.Label>
                    <Form.Control id="productName" type="text" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="price">Product price</Form.Label>
                    <Form.Control id="price" type="text" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="image">Product Image</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          setProductDetails({
                            ...productDetails,
                            imgURL_1: e.target.files[0],
                          });
                        }
                      }}
                      id="image"
                      type="file"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="image">Product Image</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          setProductDetails({
                            ...productDetails,
                            imgURL_2: e.target.files[0],
                          });
                        }
                      }}
                      id="image"
                      type="file"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="image">Product Image</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          setProductDetails({
                            ...productDetails,
                            imgURL_3: e.target.files[0],
                          });
                        }
                      }}
                      id="image"
                      type="file"
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="warning"
                    className="mb-3 w-100"
                  >
                    Upload
                  </Button>
                </Form>
                <ProgressBar
                  striped
                  animated
                  now={progressBar}
                  variant="success"
                  label={`${progressBar} %`}
                />
              </Card.Body>
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
}
