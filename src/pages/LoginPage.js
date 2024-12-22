import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState(null); // Holds logged-in user info
  const [error, setError] = useState(""); // Holds error messages

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

  const handleAuth = async () => {
    try {
      setError(""); // Clear previous errors
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUser(userCredential.user);
        alert("User signed up successfully!");
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUser(userCredential.user);
        alert("User logged in successfully!");
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError(err.message); // Set error message
    }
  };

  return (
    <div className="login-page">
      {/* Description for the user */}
      <div className="login-page__description">
        <p>
          Welcome to our serverless login/signup system! Create an account or log in to
          access your personal dashboard. Your information is securely managed with
          Firebase Authentication.
        </p>
      </div>
      
      {/* Display logged-in user's email or the login form */}
      {user ? (
        <div>
          <h1 className="login-page__title">Welcome!</h1>
          <p className="login-page__user-info">Logged in as: {user.email}</p>
          <button
            className="login-page__button"
            onClick={() => auth.signOut()}
          >
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
          {error && <p className="login-page__error">{error}</p>} {/* Display error */}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
