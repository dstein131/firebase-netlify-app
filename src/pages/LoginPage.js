import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase"; // Import Firebase instances
import { setDoc, doc } from "firebase/firestore"; // Firestore functions
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Listen to auth state changes
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setError("");
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Save user data to Firestore
  const saveUserToFirestore = async (user) => {
    try {
      const userRef = doc(db, "Users", user.uid); // Reference to the user's document in /Users collection
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        phone: user.phoneNumber || null, // Include phone if available
        createdAt: new Date(), // Timestamp
      });
      console.log("User data saved to Firestore:", user.uid);
    } catch (err) {
      console.error("Error saving user data to Firestore:", err);
    }
  };

  // Handle email/password authentication
  const handleAuth = async () => {
    try {
      setError(""); // Clear previous errors
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        setUser(user);
        await saveUserToFirestore(user); // Save to Firestore
        alert("User signed up successfully!");
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        setUser(user);
        await saveUserToFirestore(user); // Save to Firestore
        alert("User logged in successfully!");
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError(err.message); // Set error message
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__description">
        <p>
          Welcome to our serverless login/signup system! Create an account or log in with
          your email and password. Your data will be securely saved in our Firestore database.
        </p>
      </div>
      {user ? (
        <div>
          <h1 className="login-page__title">Welcome!</h1>
          <p className="login-page__user-info">Logged in as: {user.email}</p>
          <button className="login-page__button" onClick={() => auth.signOut()}>
            Log Out
          </button>
        </div>
      ) : (
        <div>
          <h1 className="login-page__title">{isSignUp ? "Sign Up" : "Log In"}</h1>
          <div className="login-page__form">
            <input
              className="login-page__input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="login-page__input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-page__button" onClick={handleAuth}>
              {isSignUp ? "Sign Up" : "Log In"}
            </button>
            <button
              className="login-page__toggle-button"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              Switch to {isSignUp ? "Log In" : "Sign Up"}
            </button>
          </div>
          {error && <p className="login-page__error">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
