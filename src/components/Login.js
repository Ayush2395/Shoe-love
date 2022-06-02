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
import { useNavigate } from "react-router-dom";
import { auth } from "../backend/firebase.config";
import { useAppState } from "../context/AppState";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Login() {
  const [loginCreds, setLoginCreds] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const { error, setError, adminLogin } = useAppState();

  const handleLoginAdmin = async (event) => {
    event.preventDefault();
    setError("");
    if (loginCreds.email === "" || loginCreds.password === "") {
      return setError({ error: true, msg: "Invalid Credential" });
    }

    try {
      await adminLogin(loginCreds.email, loginCreds.password);
      navigate(`/admin`);
    } catch (err) {
      console.log(err.code);
      setError({ error: true, msg: err.code });
      if (err.code === "auth/network-request-failed") {
        setError({ error: true, msg: "Check your Internet connection" });
      } else if (err.code === "auth/wrong-password") {
        setError({ error: true, msg: "You entered wrong password" });
      } else if (err.code === "auth/user-not-found") {
        setError({
          error: true,
          msg: `User is not registered on this ${loginCreds.email} email`,
        });
      }
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/");
      } else if (currentUser) {
        navigate("/admin");
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
          {error?.msg && (
            <Alert
              variant={error?.error ? "danger" : "success"}
              dismissible
              onClose={() => setError("")}
            >
              {error?.msg}
            </Alert>
          )}
          <Alert variant="warning">
            This Panel is only for Shoe Love Admin
          </Alert>
          <Card>
            <Card.Body>
              <Card.Title>Login</Card.Title>
              <Form onSubmit={handleLoginAdmin}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control
                    id="email"
                    type="email"
                    placeholder="Admin email"
                    value={loginCreds.email}
                    onChange={(e) =>
                      setLoginCreds({ ...loginCreds, email: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text
                      onClick={() => {
                        if (showPass) {
                          setShowPass(false);
                        } else if (!showPass) {
                          setShowPass(true);
                        }
                      }}
                    >
                      {showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </InputGroup.Text>
                    <Form.Control
                      id="password"
                      type={showPass ? "text" : "password"}
                      value={loginCreds.password}
                      onChange={(e) =>
                        setLoginCreds({
                          ...loginCreds,
                          password: e.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </Form.Group>
                <Button type="submit" className="mb-3 w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
