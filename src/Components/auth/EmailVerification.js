import React, { useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../context/AppState";

export default function EmailVerification() {
  const { user } = useAppState();
  const navigate = useNavigate();

  const emailVerify = () => {
    if (user.emailVerify) {
      navigate("/");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      emailVerify();
    }, 10000);

    if (user.emailVerify) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <div className="w-100">
          <Card>
            <Card.Body>
              <Card.Text>Verify your email {user.email}</Card.Text>
              <Card.Text>
                Verification link sent to your email, check your spam folder.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
