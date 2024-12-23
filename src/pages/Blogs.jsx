import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./Blogs.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { user } = useSelector((state) => state.auth); // Access the logged-in user

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const blogsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Container className="blogs-page my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Our Blogs</h2>
        {user && (
          <Button as={Link} to="/admin/create" variant="primary">
            Create Blog
          </Button>
        )}
      </div>
      <Row>
        {blogs.map((blog) => (
          <Col md={4} key={blog.id} className="mb-4">
            <Card className="blog-card h-100">
              {blog.imageUrl && (
                <Card.Img variant="top" src={blog.imageUrl} alt={blog.title} />
              )}
              <Card.Body className="d-flex flex-column">
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text className="flex-grow-1">
                  {blog.content.substring(0, 100)}...
                </Card.Text>
                <Button as={Link} to={`/blogs/${blog.id}`} variant="primary">
                  Read More
                </Button>
              </Card.Body>
              <Card.Footer className="blog-footer">
                <small>
                  By {blog.author?.username || "Anonymous"} on{" "}
                  {blog.createdAt?.toDate().toLocaleDateString()}
                </small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Blogs;
