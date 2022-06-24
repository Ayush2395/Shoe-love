import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../backend/firebase.config";
const API = createContext();

export default function ContextApi({ children }) {
  // authentication
  const [user, setUser] = useState("");

  //   const regiter new user
  const registeNewUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        sendEmailVerification(user);
      })
      .catch((err) => console.log(`from register fn: ${err.code}`));
  };

  // login user
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // google signin and authentication
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsub();
    };
  }, []);

  // minor states
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState({ error: false, msg: "" });

  return (
    <>
      <API.Provider
        value={{
          user,
          showPass,
          message,
          registeNewUser,
          loginUser,
          googleSignIn,
          setShowPass,
          setMessage,
        }}
      >
        {children}
      </API.Provider>
    </>
  );
}

export const useAppState = () => {
  return useContext(API);
};
