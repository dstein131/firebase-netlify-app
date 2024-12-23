import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth); // Get the logged-in user

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError("Title and content are required.");
      return;
    }
    try {
      await addDoc(collection(db, "blogs"), {
        title,
        content,
        imageUrl,
        author: user.email || "Unknown User", // Dynamically set the author
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      navigate("/blogs");
    } catch (err) {
      console.error("Error creating blog:", err);
      setError("Failed to create blog post.");
    }
  };

  return (
    <Container className="my-5">
      <h2>Create New Blog Post</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleCreate}>
        <Form.Group controlId="blogTitle" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="blogImage" className="mb-3">
          <Form.Label>Image URL (optional)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="blogContent" className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            placeholder="Enter blog content (Markdown supported)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Blog Post
        </Button>
      </Form>
    </Container>
  );
};

export default CreateBlog;
