import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import BlogList from "./components/BlogList";
import BlogDetails from "./components/BlogDetails";
import BlogForm from "./components/BlogForm";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Blogs
  const fetchBlogs = async () => {
    try {
      console.log("Fetching blogs...");
      const response = await axios.get("http://localhost:5010/api/blogs");
      setBlogs(response.data);
      console.log("Updated blogs state:", response.data)
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BlogList blogs={blogs} fetchBlogs={fetchBlogs} loading={loading} error={error} />} />
        <Route path="/view/:id" element={<BlogDetails />} />
        <Route path="/edit/:id" element={<BlogForm fetchBlogs={fetchBlogs} />} />
        <Route path="/new" element={<BlogForm fetchBlogs={fetchBlogs} />} />
      </Routes>
    </Router>
  );
}

export default App;
