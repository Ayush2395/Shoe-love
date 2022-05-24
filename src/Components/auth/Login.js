import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import { useAppState } from "../../context/AppState";

export default function Login() {
  const {
    showPassword,
    setShowPassword,
    error,
    setError,
    loginUser,
    userDetails,
    setUserDetails,
    googleUserLogin,
  } = useAppState();
  const navigate = useNavigate();

  const handleLoginUser = async (event) => {
    event.preventDefault();

    if (userDetails.email === "" || userDetails.password === "") {
      return setError({ error: true, msg: "Invalid credential" });
    }

    try {
      await loginUser(userDetails.email, userDetails.password);
      navigate("/");
    } catch (err) {
      setError({ error: true, msg: err.message });
    }

    setUserDetails({ email: "", password: "" });
  };

  const googleUser = async () => {
    try {
      await googleUserLogin();
      navigate("/");
    } catch (err) {
      setError({ error: true, msg: err.message });
    }
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
              <h1 className="text-center mb-3">Login</h1>
              <Form onSubmit={handleLoginUser}>
                <Form.Group className="mb-3">
                  <Form.Control
                    value={userDetails.email}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        email: e.target.value,
                      })
                    }
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
                    type={showPassword ? "text" : "password"}
                    placeholder="Your email"
                    value={userDetails.password}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        password: e.target.value,
                      })
                    }
                  />
                </InputGroup>
                <Button type="submit" className="w-100 mb-3" variant="success">
                  Login
                </Button>
              </Form>
              <GoogleButton
                onClick={googleUser}
                className="mb-3 w-100"
                label="Login with google"
              />
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <Card.Text>
                Don't have an account?
                <Link to="/register">create new account</Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
