// src/pages/EditBlog.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setBlog(data);
          setTitle(data.title);
          setContent(data.content);
          setImageUrl(data.imageUrl || "");
        } else {
          setError("No such blog post found.");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to fetch blog post.");
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError("Title and content are required.");
      return;
    }
    try {
      const docRef = doc(db, "blogs", id);
      await updateDoc(docRef, {
        title,
        content,
        imageUrl,
        updatedAt: serverTimestamp(),
      });
      navigate(`/blogs/${id}`);
    } catch (err) {
      console.error("Error updating blog:", err);
      setError("Failed to update blog post.");
    }
  };

  if (!blog) {
    return (
      <Container className="my-5">
        <h2>Loading...</h2>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2>Edit Blog Post</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleUpdate}>
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
          Update Blog Post
        </Button>
      </Form>
    </Container>
  );
};

export default EditBlog;
