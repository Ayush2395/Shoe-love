import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
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
import { auth, db } from "../../backend/firebase.config";
import { useAppState } from "../../context/AppState";

export default function AccountSettings() {
  const [userName, setUserName] = useState("username");
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [userData, setUserData] = useState([]);
  const [userDataId, setUserDataId] = useState("");
  const { user, error, setError } = useAppState();
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

  const collectionRef = collection(db, `users/${user.uid}/userDetails`);

  function getUserDataId(id) {
    console.log(id);
    setUserDataId(id);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser.displayName === null) {
        setUserName("username");
      } else {
        setUserName(`${currentUser.displayName}`);
      }

      if (!currentUser) {
        navigate("/login");
      } else if (currentUser) {
        navigate("/myaccount");
      }
    });
    onSnapshot(collectionRef, (snapShot) => {
      const data = snapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserData(data);
    });
  }, []);

  useEffect(() => {
    if (userDataId !== undefined || userDataId !== "") {
      editUserDetails();
    }
  }, [userDataId]);

  const editUserDetails = async () => {
    try {
      const snapDoc = doc(collectionRef, userDataId);
      const snap = await getDoc(snapDoc);
      setAddress(snap.data().address);
      setPinCode(snap.data().pinCode);
      setPhoneNum(snap.data().phoneNum);
      setGender(snap.data().gender);
    } catch (err) {
      //   setError({ error: true, msg: err.message });
      console.log(`Error: ${err.message}`);
    }
  };

  const updateUserProfile = async (event) => {
    event.preventDefault();

    if (userName === "" || address === "") {
      return setError({
        error: true,
        msg: "Check the username and address field",
      });
    }

    const userProfileDetails = { displayName: userName };

    await updateProfile(user, userProfileDetails)
      .then((res) => console.log(res))
      .catch((err) => setError({ error: true, msg: err.message }));

    setUserName(userProfileDetails.displayName);

    const userDetailsToDB = {
      username: userName,
      address: address,
      pincode: pinCode,
      gender: gender,
      phoneNum: phoneNum,
    };

    try {
      if (userDataId !== undefined || userDataId !== "") {
        const userDataDoc = doc(collectionRef, userDataId);
        await updateDoc(userDataDoc, userDetailsToDB);
        setError({ error: false, msg: "Profile is updated" });
        setUserDataId("");
      } else {
        await addDoc(collectionRef, userDetailsToDB);
        setError({ error: false, msg: "Profile is updated" });
      }
    } catch (err) {
      setError({ error: true, msg: err.message });
    }

    setAddress("");
    setPinCode("");
    setGender("");
    setPhoneNum("");
  };

  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center my-5"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100 my-5" style={{ maxWidth: "550px" }}>
          {error?.msg && (
            <Alert
              variant={error?.error ? "danger" : "success"}
              dismissible
              onClose={() => setError("")}
            >
              {error?.msg}
            </Alert>
          )}
          <Card>
            <Card.Body>
              <Form onSubmit={updateUserProfile}>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon
                        icon="fa-solid fa-user"
                        color="crimson"
                      />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your home/office address"
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      placeholder="Pin/Zip code"
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon="fa-solid fa-mobile-screen" />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      value={phoneNum}
                      onChange={(e) => setPhoneNum(e.target.value)}
                      placeholder="Your phone number"
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon="fa-solid fa-mars-and-venus" />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      value={gender}
                      placeholder="Gender"
                      disabled
                    />
                  </InputGroup>
                  <Form.Group className="mb-3 mt-3">
                    <Form.Select aria-label="Default select example">
                      <option>Select Gender</option>
                      <option
                        onClick={() => {
                          setGender("Male");
                        }}
                        value={gender}
                      >
                        Male
                      </option>
                      <option
                        onClick={() => {
                          setGender("Female");
                        }}
                        value={gender}
                      >
                        Female
                      </option>
                      <option
                        onClick={() => {
                          setGender("Transgender");
                        }}
                        value={gender}
                      >
                        Transgender
                      </option>
                    </Form.Select>
                  </Form.Group>
                </Form.Group>
                <Button
                  disabled={!flag}
                  onClick={() => setFlag(false)}
                  type="submit"
                  className="w-100"
                  variant="info"
                >
                  Save Details
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>User Details</Card.Title>
              <Card.Text>
                {" "}
                <strong>User name:</strong> {user.displayName}
              </Card.Text>
              {userData.map((item) => {
                return (
                  <div key={item.id}>
                    <Card.Text>
                      <strong>Address:</strong> {item.address}
                    </Card.Text>
                    <Card.Text>
                      <strong>Pincode:</strong> {item.pincode}
                    </Card.Text>
                    <Card.Text>
                      <strong>Phone no.:</strong> {item.phoneNum}
                    </Card.Text>
                    <Card.Text>
                      <strong>Gender:</strong> {item.gender}
                    </Card.Text>
                    <Button
                      disabled={flag}
                      onClick={() => {
                        getUserDataId(item.id);
                        setFlag(true);
                      }}
                      className="w-100"
                      variant="outline-warning"
                    >
                      Edit Details
                    </Button>
                  </div>
                );
              })}
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
