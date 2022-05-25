import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../backend/firebase.config";

const AppContext = createContext();

export default function AppState({ children }) {
  const [error, setError] = useState({ error: false, msg: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    confirmPass: "",
  });

  //   Authentication

  const [user, setUser] = useState("");

  const registerNewUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(() => {
      sendEmailVerification(auth.currentUser);
    });
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleUserLogin = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsub();
    };
  }, []);

  // Cart functionallity
  const [count, setCount] = useState(0);

  function itemsCounter() {
    setCount(count + 1);
  }

  return (
    <>
      <AppContext.Provider
        value={{
          user,
          error,
          showPassword,
          userDetails,
          setError,
          setShowPassword,
          registerNewUser,
          signOutUser,
          setUserDetails,
          loginUser,
          googleUserLogin,
          itemsCounter,
          count
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
}

export function useAppState() {
  return useContext(AppContext);
}
