// src/pages/BlogPost.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams, Link } from 'react-router-dom';
import { Container, Image, Button } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './BlogPost.css'; // Optional: Create a separate CSS file if preferred

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBlog({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <Container className="blogpost-page my-5">
        <h2>Loading...</h2>
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container className="blogpost-page my-5">
        <h2>Blog Post Not Found</h2>
        <p>The blog post you are looking for does not exist.</p>
        <Button as={Link} to="/blogs" variant="primary">
          Back to Blogs
        </Button>
      </Container>
    );
  }

  return (
    <Container className="blogpost-page my-5">
      <h2 className="mb-3">{blog.title}</h2>
      <p className="blog-meta">
        By {blog.author} on {blog.createdAt?.toDate().toLocaleDateString()}
      </p>
      {blog.imageUrl && (
        <Image src={blog.imageUrl} alt={blog.title} fluid className="mb-4" />
      )}
      <div className="blog-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.content}
        </ReactMarkdown>
      </div>
      <Button as={Link} to="/blogs" variant="primary" className="mt-4">
        Back to Blogs
      </Button>
    </Container>
  );
};

export default BlogPost;
