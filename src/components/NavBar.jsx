// src/components/NavBar.jsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../redux/authSlice";
import "./NavBar.css"; // Import corresponding CSS

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogOut = async () => {
    await dispatch(logOutUser());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="navbar__brand">CoffeeHouse</h2>
      <div className="navbar__links">
        <Link to="/about" className="navbar__link">
          About
        </Link>
        <Link to="/menu" className="navbar__link">
          Menu
        </Link>
        <Link to="/contact" className="navbar__link">
          Contact
        </Link>
        {user ? (
          <>
            <span className="navbar__user">Welcome, {user.email}</span>
            <button className="navbar__button" onClick={handleLogOut}>
              Log Out
            </button>
          </>
        ) : (
          <Link to="/login" className="navbar__link">
            Log In / Sign Up
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
