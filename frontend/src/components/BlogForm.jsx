import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BlogForm = ( {fetchBlogs} ) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", author: "", excerpt: "", content: "" });

  // Fetch blog data if in edit mode
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await axios.get(`/api/blogs/${id}`);
          setFormData(response.data);  // Populate form with data for editing
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchData();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
        if (id) {
            // Update existing blog post
            await axios.put(`http://localhost:5010/api/blogs/${id}`, formData, {
            });
        } else {
            // Create new blog post
            await axios.post("http://localhost:5010/api/blogs", formData, {
            });
        }
        await fetchBlogs();
        navigate("/");  // Redirect to home after submission
    } catch (error) {
        console.error("Error submitting form:", error);
    }
};


  return (
    <div className="bg-white container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {id ? "Edit Post" : "New Post"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Title:
            </label>
            <input
              type="text"
              id="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Author Field */}
          <div>
            <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">
              Author:
            </label>
            <input
              type="text"
              id="author"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              required
            />
          </div>

          {/* Excerpt Field */}
          <div>
            <label htmlFor="excerpt" className="block text-gray-700 text-sm font-bold mb-2">
              Excerpt:
            </label>
            <input
              type="text"
              id="excerpt"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              required
            />
          </div>

          {/* Content Field */}
          <div>
            <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
              Content:
            </label>
            <textarea
              id="content"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows="5"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"  // Use type "button" for the Cancel button
              onClick={() => navigate("/")}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>

            <button
              type="submit"  // This triggers the form submission
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {id ? "Update Post" : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
