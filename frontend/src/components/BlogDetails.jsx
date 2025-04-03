import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs/${id}`);
        setBlog(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch the blog post. Please try again later.");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      try {
        await axios.delete(`/api/blogs/${id}`);
        navigate("/");
      } catch (err) {
        setError("Failed to delete the post. Please try again later.");
      }
    }
  };

  if (loading) return <div className="container mx-auto p-6 text-center">Loading...</div>;
  if (error) return <div className="container mx-auto p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-4xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">{blog.title}</h1>
        <p className="text-gray-600 mb-4 text-center">By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}</p>
        <p className="text-gray-700 leading-relaxed">{blog.content}</p>
        <div className="mt-6 flex justify-center space-x-4">
          <Link to="/" className="text-blue-500 hover:text-blue-700">Back to Posts</Link>
          <Link to={`/edit/${blog._id}`} className="text-yellow-500 hover:text-yellow-700">Edit Post</Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Delete Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
