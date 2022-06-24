import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppState } from "../context/ContextApi";

export default function Register() {
  const { showPass, setShowPass, message, setMessage, registerNewUser } =
    useAppState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      return setMessage({ error: true, mag: "Some missing feilds" });
    }

    try {
      await registerNewUser(email, password);
    } catch (err) {
      setMessage({ error: true, mag: err.code });
    }
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          {message?.msg && (
            <Alert
              variant={message?.error ? "danger" : "success"}
              dismissible
              onClose={() => {
                setMessage("");
              }}
            >
              {message?.msg}
            </Alert>
          )}
          <Card>
            <Card.Body>
              <Card.Title className="w-100 text-center fs-3 fw-bolder">
                Register
              </Card.Title>
              <Form onSubmit={register}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text
                      onClick={() => {
                        if (showPass) {
                          setShowPass(false);
                        } else {
                          setShowPass(true);
                        }
                      }}
                    >
                      {showPass ? (
                        <FontAwesomeIcon icon="fa-solid fa-eye" />
                      ) : (
                        <FontAwesomeIcon icon="fa-solid fa-eye-slash" />
                      )}
                    </InputGroup.Text>
                    <Form.Control
                      id="password"
                      type={showPass ? "text" : "password"}
                      placeholder="your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
                <Button type="submit" className="mb-3 w-100">
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <Card.Text>
                Already have an account? &nbsp;
                <Link to="/login">Login</Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
