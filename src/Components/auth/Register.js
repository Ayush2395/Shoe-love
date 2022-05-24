import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppState } from "../../context/AppState";

export default function Register() {
  const {
    error,
    setError,
    showPassword,
    setShowPassword,
    userDetails,
    setUserDetails,
    registerNewUser,
  } = useAppState();

  const navigate = useNavigate();

  const handleRegisterUser = async (event) => {
    event.preventDefault();
    setError("");

    if (userDetails.email === "" || userDetails.password === "") {
      return setError({ error: true, msg: "Invalid credential" });
    }

    if (
      userDetails.password !== userDetails.confirmPass &&
      userDetails.password.length !== userDetails.confirmPass
    ) {
      return setError({ error: true, msg: "Password doesn't match" });
    }
    try {
      await registerNewUser(userDetails.email, userDetails.password);
      navigate("/verification");
    } catch (err) {
      setError({ error: true, msg: err.message });
    }

    setUserDetails({ email: "", password: "", confirmPass: "" });
  };

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
          <h1 className="text-center">Shoe Love</h1>
          <Card>
            <Card.Body>
              <h1 className="text-center mb-3">Register</h1>
              <Form onSubmit={handleRegisterUser}>
                <Form.Group className="mb-3">
                  <Form.Control
                    value={userDetails.email}
                    onChange={(e) => {
                      setUserDetails({ ...userDetails, email: e.target.value });
                    }}
                    type="email"
                    placeholder="Your email"
                  />
                </Form.Group>
                <InputGroup className="mb-3">
                  <InputGroup.Text
                    onClick={() => {
                      if (showPassword) {
                        setShowPassword(false);
                      } else {
                        setShowPassword(true);
                      }
                    }}
                  >
                    {showPassword ? (
                      <FontAwesomeIcon icon="fa-solid fa-eye" />
                    ) : (
                      <FontAwesomeIcon icon="fa-solid fa-eye-slash" />
                    )}
                  </InputGroup.Text>
                  <Form.Control
                    value={userDetails.password}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        password: e.target.value,
                      })
                    }
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text
                    onClick={() => {
                      if (showPassword) {
                        setShowPassword(false);
                      } else {
                        setShowPassword(true);
                      }
                    }}
                  >
                    {showPassword ? (
                      <FontAwesomeIcon icon="fa-solid fa-eye" />
                    ) : (
                      <FontAwesomeIcon icon="fa-solid fa-eye-slash" />
                    )}
                  </InputGroup.Text>
                  <Form.Control
                    value={userDetails.confirmPass}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        confirmPass: e.target.value,
                      })
                    }
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm password"
                  />
                </InputGroup>
                <Button className="w-100 mb-3" type="submit" variant="success">
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <Card.Text>
                Already have an account?
                <Link to="/login">Login</Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
