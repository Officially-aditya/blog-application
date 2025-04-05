// src/pages/EditPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BlogForm from "../components/BlogForm";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5010/api/blogs/${id}`);
        setBlog(response.data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        setError("Blog not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async (updatedBlog) => {
    try {
      await axios.put(`http://localhost:5010/api/blogs/${id}`, updatedBlog);
      navigate("/");
    } catch (err) {
      console.error("Failed to update blog:", err);
      alert("Error updating blog");
    }
  };

  if (loading) return <div className="p-4">Loading form...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Edit Blog Post</h2>
      {/* ✅ Passing blog data as initialValues */}
      <BlogForm initialValues={blog} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditPage;
