import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBlogs = async () => {
        try {
            console.log("Fetching blogs...");
            const response = await axios.get("http://localhost:5010/api/blogs");
            setBlogs(response.data);
            console.log("Updated blogs:", response.data);
        } catch (err) {
            console.error("Error fetching blogs:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs(); // ✅ Fetch only once when component mounts
    }, []);  // ✅ Empty dependency array prevents infinite loop

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5010/api/blogs/${id}`);
            fetchBlogs();  // ✅ Refresh the list after deleting
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    if (loading) {
        return <div className="container mx-auto py-8">Loading posts...</div>;
    }

    if (error) {
        return <div className="container mx-auto py-8">Error: {error.message}</div>;
    }

    return (
        <div className=" bg-white h-full w-full py-2">
            <h2 className="text-4xl font-bold mb-8 text-center">Latest Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.length === 0 ? (
                    <p className="text-center text-gray-500">No posts available.</p>
                ) : (
                    blogs.map((blog) => (
                        <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
                                <p className="text-gray-600 mb-4">By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}</p>
                                <p className="text-gray-700">{blog.excerpt}</p>
                                <div className="mt-4">
                                    <Link to={`/view/${blog.id}`} className="text-blue-500 hover:text-blue-700 mr-2">Read More</Link>
                                    <Link to={`/edit/${blog.id}`} className="text-yellow-500 hover:text-yellow-700 mr-2">Edit</Link>
                                    <button onClick={() => handleDelete(blog.id)} className="text-red-500 hover:text-red-700">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BlogList;
