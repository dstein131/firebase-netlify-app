// src/pages/LoginPage.jsx

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser, logInUser } from "../redux/authSlice";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signUpUser({ email, password }));
    } else {
      dispatch(logInUser({ email, password }));
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__description">
        <p>
          Welcome to our serverless login/signup system! Create an account or log in with your email
          and password. Your data will be securely saved in our Firestore database.
        </p>
      </div>
      <div className="login-page__form-container">
        <h1 className="login-page__title">{isSignUp ? "Sign Up" : "Log In"}</h1>
        <form onSubmit={handleAuth} className="login-page__form">
          <input
            className="login-page__input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="login-page__input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="login-page__button" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Processing..." : isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>
        <button
          type="button"
          className="login-page__toggle-button"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
        </button>
        {error && <p className="login-page__error">{error}</p>}
      </div>
      <div className="login-page__redirect">
        {isSignUp ? (
          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        ) : (
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
