// NavBar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../redux/authSlice";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "./NavBar.css"; // Import the customized CSS

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogOut = async () => {
    await dispatch(logOutUser());
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Navbar expand="lg" collapseOnSelect className="custom-navbar">
      <Container className="d-flex align-items-center">
        <Navbar.Brand as={Link} to="/" className="me-3">
          CoffeeHouse
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto align-items-center">
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/menu">
              Menu
            </Nav.Link>
            <Nav.Link as={Link} to="/blogs">
              Blogs
            </Nav.Link> {/* Added Blogs link */}
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
            {user && (
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
            )}
          </Nav>
          <Nav className="ms-auto align-items-center">
            {user ? (
              <>
                <Navbar.Text className="me-2">
                  Welcome, {user.email}
                </Navbar.Text>
                <Button
                  variant="outline-light"
                  className="logout-btn"
                  onClick={handleLogOut}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <Button variant="outline-light" onClick={handleLogin}>
                Log In / Sign Up
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
