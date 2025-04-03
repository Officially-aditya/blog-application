const express = require('express');
const router = express.Router();

// In-memory blog storage (Temporary solution)
let blogs = [];

// Create a new blog post (POST request)
router.post('/', (req, res) => {
  const { title, author, excerpt, content } = req.body;
  
  if (!title || !author || !excerpt || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }
  
  // Create a new blog post
  const newBlog = {
    id: (blogs.length + 1),  // Generate a simple ID based on length of the array
    title,
    author,
    excerpt,
    content,
    createdAt: new Date()
  };

  blogs.push(newBlog);  // Add the new blog post to the in-memory array
  console.log('Blogs after adding:', blogs); 
  res.status(201).json(newBlog);  // Return the created blog post as response
});

// Get all blog posts (GET request)
router.get('/', (req, res) => {
  res.json(blogs);
});

// Get a single blog post (GET request)
router.get('/:id', (req, res) => {
  const blog = blogs.find(b => b.id === parseInt(req.params.id));
  if (!blog) {
    return res.status(404).json({ message: "Blog post not found" });
  }
  res.json(blog);
});

// Update a blog post (PUT request)
router.put('/:id', (req, res) => {
  const { title, author, excerpt, content } = req.body;
  const blog = blogs.find(b => b.id === parseInt(req.params.id));

  if (!blog) {
    return res.status(404).json({ message: "Blog post not found" });
  }

  // Update the blog post
  blog.title = title || blog.title;
  blog.author = author || blog.author;
  blog.excerpt = excerpt || blog.excerpt;
  blog.content = content || blog.content;

  res.json(blog);
});

// Delete a blog post (DELETE request)
router.delete('/:id', (req, res) => {
  const blogIndex = blogs.findIndex(b => b.id === parseInt(req.params.id));

  if (blogIndex === -1) {
    return res.status(404).json({ message: "Blog post not found" });
  }

  // Remove the blog post from the array
  blogs.splice(blogIndex, 1);
  res.status(204).end();  // Respond with no content (204)
});

module.exports = router;
