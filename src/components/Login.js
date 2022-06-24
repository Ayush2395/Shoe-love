import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
  InputGroup,
} from "react-bootstrap";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../backend/firebase.config";
import { useAppState } from "../context/ContextApi";

export default function Login() {
  const {
    user,
    showPass,
    setShowPass,
    message,
    setMessage,
    loginUser,
    googleSignIn,
  } = useAppState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setMessage("");

    if (email === "" && password === "") {
      return setMessage({ error: true, msg: "Missing Fields" });
    }

    try {
      await loginUser(email, password);
      navigate("/");
    } catch (err) {
      setMessage({ error: true, msg: err.code });
    }

    setEmail("");
    setPassword("");
  };

  const googleAuth = async () => {
    try {
      await googleSignIn();
      navigate("/");
    } catch (err) {
      setMessage({ error: true, msg: err.code });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      if (!user) {
        navigate("*");
      } else {
        navigate("/");
      }
    });
  }, []);

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
              <Card.Title className="w-100 fs-1 fw-bold text-center">
                Login
              </Card.Title>
              <Form onSubmit={login}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control
                    placeholder="Enter your email"
                    id="email"
                    type="email"
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
                      type={showPass ? "text" : "password"}
                      placeholder="Enter your password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
                <Button className="w-100 mb-3" type="submit">
                  Login
                </Button>
                <GoogleButton
                  className="mb-3 w-100"
                  label="Login with Google"
                  onClick={googleAuth}
                />
              </Form>
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <Card.Text>
                Don't have an account? <Link to="/register">Register</Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
