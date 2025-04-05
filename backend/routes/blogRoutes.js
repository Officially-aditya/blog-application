const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog'); // Mongoose model

// Utility to map _id to id
const formatBlog = (blog) => ({
  id: blog._id,
  title: blog.title,
  author: blog.author,
  excerpt: blog.excerpt,
  content: blog.content,
  createdAt: blog.createdAt,
});

// Create a new blog post
router.post('/', async (req, res) => {
  try {
    const { title, author, excerpt, content } = req.body;

    if (!title || !author || !excerpt || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBlog = new Blog({
      title,
      author,
      excerpt,
      content,
      createdAt: new Date()
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(formatBlog(savedBlog));
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Server error while creating blog" });
  }
});

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    const formattedBlogs = blogs.map(formatBlog);
    res.json(formattedBlogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Server error while fetching blogs" });
  }
});

// Get a single blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(formatBlog(blog));
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Server error while fetching blog" });
  }
});

// Update a blog post
router.put('/:id', async (req, res) => {
  try {
    const { title, author, excerpt, content } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, author, excerpt, content },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.json(formatBlog(updatedBlog));
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Server error while updating blog" });
  }
});

// Delete a blog post
router.delete('/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Server error while deleting blog" });
  }
});

module.exports = router;
