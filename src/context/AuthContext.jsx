import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

// 1. Create the AuthContext
const AuthContext = createContext();

// 2. AuthContextProvider component
export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  // Register
  async function signUp(email, password) {
    // First create the user in Firebase Authentication
    await createUserWithEmailAndPassword(auth, email, password);
    
    // Then create the Firestore document for the new user
    await setDoc(doc(db, 'users', email), {
      savedShows: []
    });
  }

  // Login
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Logout
  function logOut() {
    return signOut(auth);
  }

  // Set current user when authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. useAuth custom hook
export function useAuth() {
  return useContext(AuthContext);
}
