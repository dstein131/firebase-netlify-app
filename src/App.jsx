import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listenToAuthChanges } from "./redux/authSlice";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs"; // Blog Listing Component
import BlogPost from "./pages/BlogPost"; // Single Blog Post Component
import CreateBlog from "./pages/CreateBlog"; // Create Blog Component
import ProtectedRoute from "./components/ProtectedRoute"; // For protected routes
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);

  if (status === "loading") {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="app-container">
        {/* Navbar is displayed on all routes */}
        <NavBar />
        <main className="content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs" element={<Blogs />} /> {/* Blog Listing */}
            <Route path="/blogs/:id" element={<BlogPost />} /> {/* Individual Blog Post */}
            <Route
              path="/login"
              element={!user ? <LoginPage /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            {/* Protected Route for Creating Blog */}
            <Route
              path="/admin/create"
              element={
                <ProtectedRoute>
                  <CreateBlog />
                </ProtectedRoute>
              }
            />
            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        {/* Footer is displayed on all routes */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
