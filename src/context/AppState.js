import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../backend/firebase.config";

const AppContext = createContext();

export default function AppState({ children }) {
  // Error messages or Alert messages
  const [error, setError] = useState({ error: false, msg: "" });

  //   database and collections
  const collectionRef = collection(db, `shoe_love_product`);

  // Authentication
  const [user, setUser] = useState("");
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsub();
    };
  }, []);

  const adminLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOutAdmin = () => {
    return signOut(auth);
  };

  return (
    <>
      <AppContext.Provider
        value={{
          user,
          adminLogin,
          logOutAdmin,
          error,
          setError,
          collectionRef,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
}

export const useAppState = () => {
  return useContext(AppContext);
};
